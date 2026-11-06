<?php
// GET → elenco versioni precedenti · POST {id} → ripristina (la versione attuale viene a sua volta salvata)
define('SIC_API', 1);
require __DIR__ . '/lib.php';

sic_require_auth();
$dir = sic_data_dir();

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'GET') {
    $files = glob($dir . '/backups/texts-*.json') ?: [];
    rsort($files);
    $list = [];
    foreach ($files as $f) {
        $data = json_decode((string) file_get_contents($f), true);
        $list[] = [
            'id' => basename($f, '.json'),
            'time' => filemtime($f),
            'label' => date('d.m.Y H:i', filemtime($f)),
            'entries' => is_array($data) ? sic_count(sic_validate_texts($data) ?: []) : 0,
        ];
    }
    sic_json(['backups' => array_values($list)]);
}

$body = sic_read_json_post();
$id = isset($body['id']) && is_string($body['id']) ? $body['id'] : '';
if (!preg_match('/^texts-\d{8}-\d{6}(-\d+)?$/', $id)) {
    sic_json(['error' => 'bad_id'], 400);
}
$file = $dir . '/backups/' . $id . '.json';
if (!is_file($file)) {
    sic_json(['error' => 'not_found'], 404);
}
$texts = sic_validate_texts(json_decode((string) file_get_contents($file), true));
if ($texts === null) {
    sic_json(['error' => 'invalid_backup'], 422);
}
$lock = sic_lock($dir);
sic_write_texts($dir, $texts);
sic_unlock($lock);
sic_json(['ok' => true, 'texts' => $texts]);
