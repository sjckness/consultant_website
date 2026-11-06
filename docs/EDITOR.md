# Editor testi (`/editor`)

Permette a Gustavo di modificare i testi del sito direttamente online (DE e EN),
senza toccare il codice e senza ricostruire il sito. Il sito resta un export statico:
l'unico pezzo dinamico è una piccola cartella PHP (`api/`) che salva un file JSON.

```
visitatore ──► sito statico ──► (dopo il caricamento) GET /api/texts.php ──► sostituisce i testi
Gustavo    ──► /editor/ (login) ──► iframe del sito in modalità modifica ──► POST /api/save.php
```

## Come funziona (in breve)

- Ogni testo è identificato da **lingua + testo originale** (spazi normalizzati).
  `texts.json` contiene `{ "de": { "testo originale": "testo nuovo" }, "en": { … } }`.
- Dopo l'hydration, `src/components/TextOverrides.tsx` scarica `/api/texts.php` e
  sostituisce i nodi di testo corrispondenti (`src/lib/textOverrides.ts`). Se l'API
  non c'è o è vuota, il sito si comporta esattamente come prima.
- `/editor/` mostra il sito in un iframe: lì `src/lib/textEditMode.ts` (caricato
  solo nell'editor) rende i testi modificabili. Le modifiche stanno in una bozza
  finché non si preme **Speichern**.
- Ogni salvataggio copia la versione precedente in `api/data/backups/` (ultime 40),
  ripristinabili da **Frühere Versionen**.

## Messa in funzione

1. Imposta la password (crea `public/api/config.php`, ignorato da git):
   ```bash
   npm run editor:password
   ```
2. Build come al solito (`npm run build`): `out/` contiene anche `api/` ed `editor/`.
3. Carica **tutto `out/`** su METANET come sempre.
4. Controlla:
   - `https://steffensinfraport.ch/api/texts.php` → `{"texts":{"de":{},"en":{}}}`
   - `https://steffensinfraport.ch/api/lib.php` → **403**
   - dopo il primo salvataggio: `https://steffensinfraport.ch/api/data/texts.json` → **403**
     (se desse 200 l'`.htaccess` non viene letto: scrivimi, i testi non sono segreti ma
     va sistemato)
   - `https://steffensinfraport.ch/editor/` → login.

Requisiti server: PHP ≥ 7.3 con scrittura nella cartella `api/` (METANET: ok di default).

## ⚠️ Deploy successivi

- **Non cancellare** `api/data/` e `api/config.php` sul server. Il deploy normale
  (caricare `out/` sopra) non li tocca perché `data/` non è nel repo.
- Se si usa una sincronizzazione FTP "con cancellazione", escludi `api/data/**`.
- `config.php` si genera in locale: chi fa il build deve averlo in `public/api/`,
  altrimenti non finisce in `out/` (sul server resta comunque quello vecchio).
- `editor.js` / `editor.css` hanno cache lunga (regola `.htaccess`): se li modifichi,
  aumenta `?v=` in `public/editor/index.html`.

## Cosa si può e non si può modificare

| Sì | No (per ora) |
|---|---|
| Tutti i testi visibili delle pagine Home, About, Services, References, Industries, Blog (overview), Contact; menu e footer; frasi rotanti dell'hero; slide del carosello | Immagini, titoli per i motori di ricerca (`<title>`, meta), attributi come `placeholder`/`aria-label`, articoli del blog (restano in Sanity) |

Limiti noti:

- Se **cambi un testo nel codice**, la modifica salvata per il vecchio testo non si
  applica più (la chiave è il testo originale). Basta rifarla nell'editor, oppure
  spostarla nel codice.
- Testi **identici** compaiono ovunque insieme (es. "Kontakt" in menu e footer):
  è voluto e l'editor lo dice nell'aiuto.
- Per un attimo, al primo caricamento, si può vedere il testo originale prima della
  sostituzione (il file viene letto dopo l'hydration).
- Un testo non può essere svuotato del tutto né contenere a-capo (sono bloccati).

## Sicurezza

- Password con PBKDF2-SHA256 (200k iterazioni); login limitato a 5 errori / 15 min per IP.
- Cookie di sessione firmato (HMAC), `HttpOnly`, `SameSite=Strict`, `Secure` su HTTPS, 8 h.
- Le scritture richiedono header personalizzato + JSON + stessa origine; i testi sono
  validati (solo stringhe, limiti di dimensione) e inseriti nel DOM come testo, mai HTML.
- Cambiare password: rilancia `npm run editor:password` e carica il nuovo `config.php`
  (invalida anche le sessioni aperte).
