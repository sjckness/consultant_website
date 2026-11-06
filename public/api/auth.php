<?php
// ?a=status (GET) · ?a=login (POST {password}) · ?a=logout (POST)
define('SIC_API', 1);
require __DIR__ . '/lib.php';

$action = $_GET['a'] ?? 'status';
$cfg = sic_config();

if ($action === 'status') {
    sic_json(['configured' => $cfg !== null, 'authed' => sic_is_authed()]);
}

if ($action === 'logout') {
    sic_read_json_post();
    sic_set_cookie('', time() - 3600);
    sic_json(['ok' => true]);
}

if ($action === 'login') {
    if (!$cfg) {
        sic_json(['error' => 'not_configured'], 503);
    }
    $body = sic_read_json_post();
    $dir = sic_data_dir();

    // Limite tentativi: 5 errori ogni 15 minuti per IP
    $ip = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . $cfg['secret']);
    $lock = sic_lock($dir);
    $file = $dir . '/attempts.json';
    $all = is_file($file) ? (json_decode((string) file_get_contents($file), true) ?: []) : [];
    $now = time();
    foreach ($all as $k => $list) {
        $all[$k] = array_values(array_filter($list, function ($t) use ($now) { return $t > $now - 900; }));
        if (!$all[$k]) {
            unset($all[$k]);
        }
    }
    $mine = $all[$ip] ?? [];
    if (count($mine) >= 5) {
        file_put_contents($file, json_encode($all));
        sic_unlock($lock);
        sic_json(['error' => 'too_many_attempts', 'retryAfter' => max(1, $mine[0] + 900 - $now)], 429);
    }

    $password = isset($body['password']) && is_string($body['password']) ? $body['password'] : '';
    if ($password !== '' && strlen($password) <= 200 && sic_verify_password($password, $cfg)) {
        unset($all[$ip]);
        file_put_contents($file, json_encode($all));
        sic_unlock($lock);
        sic_set_cookie(sic_make_token($cfg), time() + SIC_SESSION_TTL);
        sic_json(['ok' => true]);
    }

    $mine[] = $now;
    $all[$ip] = $mine;
    file_put_contents($file, json_encode($all));
    sic_unlock($lock);
    sleep(1);
    sic_json(['error' => 'wrong_password'], 401);
}

sic_json(['error' => 'not_found'], 404);
