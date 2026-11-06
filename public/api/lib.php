<?php
// Funzioni condivise dell'API dell'editor testi. Non richiamabile direttamente.
if (!defined('SIC_API')) {
    http_response_code(403);
    exit;
}

date_default_timezone_set('Europe/Zurich');

const SIC_MAX_BODY = 600000;     // byte
const SIC_MAX_ENTRIES = 4000;    // testi modificati per lingua
const SIC_MAX_KEY = 3000;        // byte
const SIC_MAX_VALUE = 12000;     // byte
const SIC_SESSION_TTL = 28800;   // 8 ore
const SIC_BACKUPS_KEEP = 40;
const SIC_LANGS = ['de', 'en'];

function sic_json($data, $status = 200)
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_FORCE_OBJECT);
    exit;
}

function sic_config()
{
    $file = __DIR__ . '/config.php';
    if (!is_file($file)) {
        return null;
    }
    $cfg = require $file;
    return (is_array($cfg) && !empty($cfg['hash']) && !empty($cfg['salt']) && !empty($cfg['secret'])) ? $cfg : null;
}

function sic_data_dir()
{
    $dir = __DIR__ . '/data';
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
    if (!is_dir($dir . '/backups')) {
        @mkdir($dir . '/backups', 0755, true);
    }
    if (!is_file($dir . '/.htaccess')) {
        @file_put_contents($dir . '/.htaccess', "Require all denied\n<IfModule !mod_authz_core.c>\nOrder deny,allow\nDeny from all\n</IfModule>\n");
    }
    if (!is_file($dir . '/index.html')) {
        @file_put_contents($dir . '/index.html', '');
    }
    if (!is_writable($dir)) {
        sic_json(['error' => 'data_not_writable'], 500);
    }
    return $dir;
}

function sic_https()
{
    return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https');
}

// ---------- autenticazione (cookie firmato, senza sessioni PHP) ----------

function sic_make_token($cfg)
{
    $exp = time() + SIC_SESSION_TTL;
    $nonce = bin2hex(random_bytes(8));
    $payload = $exp . '.' . $nonce;
    return $payload . '.' . hash_hmac('sha256', $payload, $cfg['secret']);
}

function sic_set_cookie($value, $expires)
{
    setcookie('sic_auth', $value, [
        'expires' => $expires,
        'path' => '/api/',
        'secure' => sic_https(),
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
}

function sic_is_authed()
{
    $cfg = sic_config();
    if (!$cfg || empty($_COOKIE['sic_auth'])) {
        return false;
    }
    $parts = explode('.', (string) $_COOKIE['sic_auth']);
    if (count($parts) !== 3) {
        return false;
    }
    list($exp, $nonce, $sig) = $parts;
    if (!ctype_digit($exp) || (int) $exp < time()) {
        return false;
    }
    $expected = hash_hmac('sha256', $exp . '.' . $nonce, $cfg['secret']);
    return hash_equals($expected, $sig);
}

function sic_require_auth()
{
    if (!sic_is_authed()) {
        sic_json(['error' => 'unauthorized'], 401);
    }
}

function sic_verify_password($password, $cfg)
{
    $iterations = isset($cfg['iterations']) ? (int) $cfg['iterations'] : 200000;
    $calc = hash_pbkdf2('sha256', (string) $password, hex2bin($cfg['salt']), $iterations, 64, false);
    return hash_equals($cfg['hash'], $calc);
}

// ---------- richieste POST ----------

function sic_read_json_post()
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        sic_json(['error' => 'method_not_allowed'], 405);
    }
    // difesa CSRF: header personalizzato + JSON + stessa origine
    if (($_SERVER['HTTP_X_SIC'] ?? '') !== '1') {
        sic_json(['error' => 'bad_request'], 400);
    }
    $type = $_SERVER['CONTENT_TYPE'] ?? '';
    if (stripos($type, 'application/json') !== 0) {
        sic_json(['error' => 'bad_request'], 400);
    }
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin !== '') {
        $oHost = parse_url($origin, PHP_URL_HOST);
        $host = preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? '');
        if (!$oHost || strcasecmp($oHost, $host) !== 0) {
            sic_json(['error' => 'forbidden'], 403);
        }
    }
    $raw = file_get_contents('php://input', false, null, 0, SIC_MAX_BODY + 1);
    if ($raw === false || strlen($raw) > SIC_MAX_BODY) {
        sic_json(['error' => 'too_large'], 413);
    }
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        sic_json(['error' => 'bad_json'], 400);
    }
    return $data;
}

// ---------- testi ----------

function sic_valid_utf8($s)
{
    return preg_match('//u', $s) === 1;
}

/** Restituisce ['de'=>[...], 'en'=>[...]] pulito, oppure null se non valido. */
function sic_validate_texts($input)
{
    if (!is_array($input)) {
        return null;
    }
    $out = [];
    foreach (SIC_LANGS as $lang) {
        $out[$lang] = [];
        if (!isset($input[$lang])) {
            continue;
        }
        if (!is_array($input[$lang]) || count($input[$lang]) > SIC_MAX_ENTRIES) {
            return null;
        }
        foreach ($input[$lang] as $k => $v) {
            $k = (string) $k; // le chiavi numeriche ("200") diventano int in PHP
            if (!is_string($v) || strlen($k) > SIC_MAX_KEY || strlen($v) > SIC_MAX_VALUE) {
                return null;
            }
            if (!sic_valid_utf8($k) || !sic_valid_utf8($v)) {
                return null;
            }
            $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $v);
            $out[$lang][$k] = $v;
        }
    }
    return $out;
}

function sic_read_texts($dir)
{
    $file = $dir . '/texts.json';
    if (is_file($file)) {
        $data = json_decode((string) file_get_contents($file), true);
        $clean = sic_validate_texts(is_array($data) ? $data : []);
        if ($clean !== null) {
            return $clean;
        }
    }
    return ['de' => [], 'en' => []];
}

function sic_lock($dir)
{
    $h = fopen($dir . '/.lock', 'c');
    if ($h) {
        flock($h, LOCK_EX);
    }
    return $h;
}

function sic_unlock($h)
{
    if ($h) {
        flock($h, LOCK_UN);
        fclose($h);
    }
}

/** Salva i testi in modo atomico, dopo aver copiato la versione precedente nei backup. */
function sic_write_texts($dir, $texts)
{
    $file = $dir . '/texts.json';
    if (is_file($file) && filesize($file) > 0) {
        $name = 'texts-' . date('Ymd-His');
        $n = 0;
        while (is_file($dir . '/backups/' . $name . '.json')) {
            $n++;
            $name = 'texts-' . date('Ymd-His') . '-' . $n;
        }
        @copy($file, $dir . '/backups/' . $name . '.json');
    }
    $json = json_encode($texts, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_FORCE_OBJECT | JSON_PRETTY_PRINT);
    $tmp = $dir . '/texts.json.tmp';
    if (file_put_contents($tmp, $json) === false || !rename($tmp, $file)) {
        @unlink($tmp);
        sic_json(['error' => 'write_failed'], 500);
    }
    // pulizia vecchi backup
    $files = glob($dir . '/backups/texts-*.json') ?: [];
    sort($files);
    while (count($files) > SIC_BACKUPS_KEEP) {
        @unlink(array_shift($files));
    }
}

function sic_count($texts)
{
    $n = 0;
    foreach (SIC_LANGS as $lang) {
        $n += count($texts[$lang] ?? []);
    }
    return $n;
}
