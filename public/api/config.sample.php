<?php
// Esempio. Il vero config.php si crea con:  npm run editor:password
// (non va committato: è nel .gitignore)
return [
    'salt' => '',        // esadecimale
    'hash' => '',        // PBKDF2-SHA256 della password
    'iterations' => 200000,
    'secret' => '',      // chiave per firmare il cookie di login
];
