<?php
// POST {texts:{de:{},en:{}}} — richiede login.
define('SIC_API', 1);
require __DIR__ . '/lib.php';

sic_require_auth();
$body = sic_read_json_post();
$texts = sic_validate_texts($body['texts'] ?? null);
if ($texts === null) {
    sic_json(['error' => 'invalid_texts'], 422);
}

$dir = sic_data_dir();
$lock = sic_lock($dir);
sic_write_texts($dir, $texts);
sic_unlock($lock);

sic_json(['ok' => true, 'entries' => sic_count($texts), 'savedAt' => time()]);
