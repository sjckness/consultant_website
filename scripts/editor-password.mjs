// Imposta la password dell'editor testi: crea public/api/config.php
// Uso:  npm run editor:password        (chiede la password senza mostrarla)
//       EDITOR_PASSWORD=... npm run editor:password   (non interattivo)
import { pbkdf2Sync, randomBytes } from "node:crypto";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const target = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "api",
  "config.php",
);

function ask(question) {
  return new Promise((resolve) => {
    process.stdout.write(question);
    const stdin = process.stdin;
    if (!stdin.isTTY) {
      let data = "";
      stdin.on("data", (c) => {
        data += c;
      });
      stdin.on("end", () => resolve(data.split("\n")[0]));
      return;
    }
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    let value = "";
    stdin.on("data", function onData(ch) {
      for (const c of ch) {
        if (c === "\r" || c === "\n") {
          stdin.setRawMode(false);
          stdin.pause();
          stdin.removeListener("data", onData);
          process.stdout.write("\n");
          return resolve(value);
        }
        if (c === "\u0003") process.exit(1);
        if (c === "\u007f") value = value.slice(0, -1);
        else value += c;
      }
    });
  });
}

let password = process.env.EDITOR_PASSWORD;
if (!password) {
  password = await ask("Neues Passwort für den Texteditor (min. 10 Zeichen): ");
  const again = await ask("Passwort wiederholen: ");
  if (password !== again) {
    console.error("Die Passwörter stimmen nicht überein.");
    process.exit(1);
  }
}
if (password.length < 10) {
  console.error("Passwort zu kurz (mindestens 10 Zeichen).");
  process.exit(1);
}

const iterations = 200000;
const salt = randomBytes(16);
const hash = pbkdf2Sync(password, salt, iterations, 32, "sha256").toString(
  "hex",
);
const secret = randomBytes(32).toString("hex");

writeFileSync(
  target,
  `<?php
// Generato da scripts/editor-password.mjs — NON committare.
return [
    'salt' => '${salt.toString("hex")}',
    'hash' => '${hash}',
    'iterations' => ${iterations},
    'secret' => '${secret}',
];
`,
);
console.log(
  `Fatto: ${target}\nCaricalo su METANET insieme al resto della cartella api/.`,
);
