<?php
// Pubblico: restituisce i testi modificati. Letto dal sito a ogni visita.
define('SIC_API', 1);
require __DIR__ . '/lib.php';

$dir = __DIR__ . '/data';
$texts = is_dir($dir) ? sic_read_texts($dir) : ['de' => [], 'en' => []];
sic_json(['texts' => $texts]);
