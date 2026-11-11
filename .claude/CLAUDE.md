# CLAUDE.md – WEBGUARDS Help & Wiki (öffentliche Hilfeseite)

## Zweck des Repos

Öffentliche Hilfe- und FAQ-Seite für Kunden: Dokumentation, Best Practices, Integrationen, Business-Tools, Troubleshooting und Support-Formular. Statische Seite auf GitHub Pages. Art des Repos: Web-Repo mit statischem HTML und einem kleinen Node-Build für die FAQ.

## Ordnerstruktur

- `index.html` – Startseite der Hilfeseite.
- `faq/questions/` – Quelle der FAQ: eine Markdown-Datei je Frage (`01-integration.md` bis `06-timeline.md`).
- `faq/index.html` – generiert aus `faq/questions/`. Nicht von Hand bearbeiten.
- `scripts/build-faq.js` – Generator für `faq/index.html`.
- `support/`, `docs/`, `best-practices/`, `integrations/`, `businesstools/`, `troubleshooting/` – Inhaltsseiten.
- `assets/`, `assets_webguards/` – CSS, JS, Logos und Icons (Font Awesome gebündelt, nicht bearbeiten).
- `.github/workflows/` – `build-faq.yml` (baut FAQ bei Push auf `main`), `pages.yml` (deployt die Seite).

Einstieg für Inhalte: `faq/questions/`.

## Konventionen

- Sprache: Deutsch, Du-Anrede gegenüber Kunden.
- FAQ-Dateien: Frontmatter mit `order`, `emoji`, `category`. Die erste H1 ist der Fragetitel. Die Antwort folgt danach als Fließtext.
- Kategorien laut Generator: `Integration`, `Hosting`, `Pricing`, `Datenschutz`, `Sonstiges`. Andere Werte landen am Ende.
- Dateinamen: `NN-kurztitel.md` mit zweistelliger Nummer.

## Schreibregeln

- Verständlich, ohne Fachjargon, konkret.
- Öffentlicher Text: keine internen Preise, keine Mitarbeiternamen, keine Zugangsdaten, keine Verweise auf interne Repos außer dem im README genannten Backend.

## Pflegeregeln

- `faq/index.html` nicht von Hand ändern. Änderungen an `faq/questions/` vornehmen und den Generator laufen lassen.
- Neue FAQ-Datei mit eindeutiger `order` anlegen.

## Quelle der Wahrheit

- Antworten: `faq/questions/*.md`.
- Technik: `README.md` verweist auf das Backend-Repo `WEBGUARDS-DE/customer` (`SYSTEM.md`, `HELPDESK_FRONTEND.md`).

## Grenzen

- Nicht manuell ändern: `.git/`, `faq/index.html`, `assets/fontawesome/`, `assets_webguards/fontawesome/`.
- Keine Zugangsdaten, Tokens oder interne URLs in Dateien.

## Workflows

- Basisbranch: `main`. Pushes auf `main` deployen die Seite über `pages.yml`.
- `build-faq.yml` läuft bei Änderungen an `faq/questions/**`, `build-faq.js` oder `package.json` und committet das Ergebnis direkt auf `main`. Das umgeht den PR-Prozess.
- Commit-Format und PR-Vorlage: ungeprüft.

## Umgebung

- Node.js: Workflow nutzt 18, lokal getestet mit 22.
- Abhängigkeiten: `gray-matter`, `marked` (`npm install`). `package-lock.json` ist ignoriert, Installation daher nicht reproduzierbar.

## Stolperfallen

- Der FAQ-Build schlägt fehl. `scripts/build-faq.js` sucht `faq/questions` relativ zu `scripts/` (`__dirname`), nicht zum Repo-Wurzelverzeichnis. Lokal geprüft: `npm run build:faq` bricht mit ENOENT ab. Folge: `faq/index.html` wird nicht aktualisiert, und der Workflow `build-faq.yml` führt denselben Befehl aus und schlägt daher vermutlich ebenfalls fehl (CI-Lauf nicht geprüft). Fix wäre `path.join(__dirname, '..', 'faq', …)` in beiden Pfaden. Nicht geändert.
- Der Workflow committet direkt auf `main` mit dem `GITHUB_TOKEN`. Damit ist ein Review-Schritt für generierte Änderungen umgangen.
- `README.md` nennt „Last Updated: 2026-07-21“ und Links auf `help.webguards.de`. Stand vor Verwendung prüfen.
- `build-faq.js` setzt die Kategorie unescaped in HTML-Attribute (`data-category="${q.category}"`). Kategorien aus eigenen Dateien vertrauen, nicht aus Eingaben Dritter.
