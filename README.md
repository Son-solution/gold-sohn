# Gold Sohn – Website (Next.js)

Neue Website für **Gold Sohn – Goldankauf & Edelmetallankauf**. Light-Luxury-Design (Weiß, Creme, Perlgrau, Champagnergold), cinematic Animationen mit GSAP/ScrollTrigger und Motion, alle Original-Bilder, das Original-Logo und das Original-Erklärvideo.

> **Status:** lokale Entwicklung. Nichts davon ist auf gold-sohn.de veröffentlicht. DNS und die bestehende Website bleiben unverändert. Suchmaschinen werden ausgesperrt, solange `NEXT_PUBLIC_SITE_ENV` nicht `production` ist.

---

## Inhalt

1. [Schnellstart unter Windows](#schnellstart-unter-windows)
2. [Mit Claude Code weiterarbeiten](#mit-claude-code-weiterarbeiten)
3. [Auf GitHub sichern](#auf-github-sichern)
4. [Vorschau auf Vercel (später)](#vorschau-auf-vercel-später)
5. [Technik & Projektstruktur](#technik--projektstruktur)
6. [Preise, Formulare & Zugangsdaten](#preise-formulare--zugangsdaten)
7. [Animationen](#animationen)
8. [Offene Punkte vor dem Livegang](#offene-punkte-vor-dem-livegang)

Weitere Dokumente: [`docs/SEO-MIGRATION.md`](docs/SEO-MIGRATION.md) · [`docs/ASSETS.md`](docs/ASSETS.md) · [`CLAUDE.md`](CLAUDE.md)

---

## Schnellstart unter Windows

**Voraussetzungen (einmalig):**

- **Node.js 20.9 oder neuer** (empfohlen: aktuelle LTS, 22.x) – <https://nodejs.org> → „LTS“ herunterladen und installieren. Prüfen in PowerShell: `node -v`
- **Visual Studio Code** – <https://code.visualstudio.com>
- **Git** (für GitHub) – <https://git-scm.com/download/win>

**1. ZIP entpacken**
Rechtsklick auf `gold-sohn-nextjs.zip` → „Alle extrahieren…“ → z. B. nach `C:\Projekte\`. Danach gibt es den Ordner `C:\Projekte\gold-sohn-nextjs`.
Tipp: Nicht in einen OneDrive-synchronisierten Ordner entpacken – `node_modules` mit tausenden Dateien bremst die Synchronisation.

**2. In VS Code öffnen**
VS Code starten → „Datei“ → „Ordner öffnen…“ → `C:\Projekte\gold-sohn-nextjs` wählen → „Ja, ich vertraue den Autoren“.

**3. Abhängigkeiten installieren**
In VS Code das Terminal öffnen („Terminal“ → „Neues Terminal“, PowerShell) und ausführen:

```powershell
npm install
```

Falls PowerShell meldet, dass Skripte deaktiviert sind (`npm.ps1 cannot be loaded`): einmalig
`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` ausführen und mit „J“ bestätigen – oder im Terminal-Dropdown „Command Prompt“ statt PowerShell wählen.

**4. Optional: Umgebungsvariablen**

```powershell
Copy-Item .env.example .env.local
```

Ohne `.env.local` läuft alles – mit klar gekennzeichneten Demo-Preisen und ehrlichen Formular-Hinweisen.

**5. Entwicklungsserver starten**

```powershell
npm run dev
```

**6. Im Browser öffnen:** <http://localhost:3000>
Änderungen an Dateien erscheinen sofort im Browser. Beenden mit `Strg + C`.

**Prüfen & Produktions-Build (wie vor jeder Abgabe):**

```powershell
npm run lint
npm run typecheck   # = next typegen && tsc --noEmit
npm run build
npm run start       # Produktionsversion lokal auf http://localhost:3000
```

`npm run check` führt Lint, Typprüfung und Build nacheinander aus.
Hinweis: `npx tsc --noEmit` allein braucht die von Next.js erzeugten Routentypen. Diese entstehen bei `npm run dev`, `npm run build` oder `npx next typegen` – deshalb gibt es `npm run typecheck`.

---

## Mit Claude Code weiterarbeiten

1. Claude Code installieren (Anleitung: <https://docs.claude.com/en/docs/claude-code>).
2. Im VS-Code-Terminal im Projektordner `claude` starten.
3. Claude Code liest automatisch [`CLAUDE.md`](CLAUDE.md) (Projektregeln: Farben, Ton, „keine erfundenen Fakten“, Prüfbefehle) und [`AGENTS.md`](AGENTS.md) (Hinweis von Next.js: Dokumentation der installierten Version liegt in `node_modules/next/dist/docs/`).
4. Beispiel-Aufträge:
   - „Ersetze den Platzhalter in `app/datenschutz/page.tsx` durch den Text aus `datenschutz.txt`.“
   - „Migriere die Blogbeiträge aus `docs/SEO-MIGRATION.md` als MDX-Seiten.“
   - „Binde unsere Preis-API an: Sie liefert JSON unter https://… .“

Nach jeder größeren Änderung `npm run check` ausführen lassen.

---

## Auf GitHub sichern

```powershell
git init
git add .
git commit -m "Gold Sohn: Next.js Website – Ausgangsstand"
```

Auf <https://github.com/new> ein **privates** Repository anlegen (z. B. `gold-sohn-website`, ohne README), dann:

```powershell
git branch -M main
git remote add origin https://github.com/<IHR-KONTO>/gold-sohn-website.git
git push -u origin main
```

`.env.local`, `node_modules` und `.next` werden durch `.gitignore` nicht hochgeladen. Zugangsdaten gehören nie ins Repository.

---

## Vorschau auf Vercel (später)

1. Auf <https://vercel.com> mit GitHub anmelden → „Add New… → Project“ → Repository importieren. Framework „Next.js“ wird erkannt.
2. Unter „Environment Variables“ die Werte aus `.env.example` eintragen.
   - `NEXT_PUBLIC_SITE_URL` = die Vorschau-Adresse (z. B. `https://gold-sohn-website.vercel.app`)
   - `NEXT_PUBLIC_SITE_ENV` **leer lassen** → Vorschau wird nicht von Google indexiert.
3. „Deploy“. Sie erhalten eine `*.vercel.app`-Adresse zum Testen.

**Nicht tun, bevor die SEO-Checkliste abgeschlossen ist:** keine eigene Domain in Vercel hinzufügen, kein DNS ändern. Der Umzug von gold-sohn.de ist ein eigener Schritt (siehe `docs/SEO-MIGRATION.md`).

Hinweis Formulare auf Vercel: Der eingebaute Spam-Schutz (Rate-Limit) speichert im Arbeitsspeicher einer Instanz. Für Produktion einen gemeinsamen Speicher (z. B. Upstash Redis) in `lib/forms/rate-limit.ts` anbinden.

---

## Technik & Projektstruktur

| Bereich | Technik |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, Cache Components, `trailingSlash: true`) |
| Sprache | TypeScript 5 (strict) |
| Styling | Tailwind CSS 4 + Design-Tokens in `app/globals.css` |
| Scroll-Animationen | GSAP 3 + ScrollTrigger (`@gsap/react` → `useGSAP`) |
| Interaktions-Animationen | Motion for React (`motion/react`) |
| Icons | lucide-react |
| Validierung | zod (gemeinsam für Browser und Server) |
| Schriften | Bodoni Moda + Jost, selbst gehostet (OFL), kein Google-Request |

```
app/                     Routen (eine Ordner = eine URL, mit Schrägstrich am Ende)
  page.tsx               Startseite
  goldankauf/ …          8 Ankauf-Seiten (bestehende URLs + /luxusuhren-ankauf/)
  standorte/[city]/      228 Städteseiten, erreichbar unter /goldankauf-<stadt>/
  preise/ goldrechner/ versandtasche/ selbstversand/ so-funktionierts/
  about/ contact/ faq/ blog/ impressum/ datenschutz/ agb/
  api/preise|anfrage|kontakt/   Server-Endpunkte (Adapter, s. u.)
  sitemap.ts robots.ts icon.png
components/
  home/ sections/ templates/   Seitenbausteine
  motion/                Reveal, SplitHeading, ParallaxMedia, CountUp (GSAP)
  calculator/ prices/ forms/ faq/ process/   interaktive Komponenten
  layout/                Header (Dropdown, Mobile-Menü), Footer
hooks/usePrices.ts       Preise im Browser (Demo → Live, wenn konfiguriert)
lib/
  site.ts                geprüfte Firmendaten (Telefon, E-Mail, Adresse …)
  content/               Texte: services, faq, cities, blog
  prices/                Typen, Demo-Daten, Live-Adapter, Rechner
  forms/                 zod-Schemas, Versand-Adapter, Rate-Limit
  seo.ts                 Metadaten, JSON-LD
public/
  brand/  video/  images/uploads/ (Originale)  images/derived/ (Zuschnitte)  images/hero/
docs/                    SEO-Migration, Asset-Zuordnung
proxy.ts                 /FAQ/ → /faq/ (exakte Schreibweise)
```

**Warum kein Three.js / React Three Fiber?** Vorgabe war: 3D nur, wenn es wirklich hochwertig ist. Fotografie wirkt bei Gold deutlich glaubwürdiger als Echtzeit-3D, deshalb setzt die Seite auf Ihre Fotos, ein fotorealistisch gerendertes Hero-Bild und Licht-/Kamerabewegung per GSAP. Das hält die Seite auch auf Smartphones schnell. R3F kann jederzeit ergänzt werden (`npm install three @react-three/fiber`), z. B. für ein künftiges hochwertiges 3D-Modell.

---

## Preise, Formulare & Zugangsdaten

Alle Zugangsdaten stehen nur auf dem Server (`.env.local` bzw. Vercel). Nichts davon gelangt in den Browser.

### Preise – `lib/prices/provider.ts`

- **Ohne Konfiguration:** Demowerte aus `lib/prices/demo.ts` (Stand 18.10.2026, übernommen von gold-sohn.de/preise). Überall steht sichtbar „Demowerte – keine Live-Kurse“.
- **Live über Swissquote:** `PRICE_SOURCE=swissquote` setzen. Der Server rechnet den öffentlichen Swissquote-Börsenkurs (kein API-Key) mit den Margen aus `MARGIN_PERCENT` in `lib/prices/swissquote.ts` in Ankaufspreise um – höchstens eine Abfrage pro Minute, der Browser aktualisiert jede Minute. Bei Ausfall oder einem Sprung über 15 % bleiben die letzten gültigen Preise stehen. **Die Margen dort sind Startwerte – vor dem Livegang durch die eigenen ersetzen.**
- **Live über eigenen Endpunkt:** `PRICE_API_URL` (+ optional `PRICE_API_KEY`) setzen. Der Endpunkt muss Ankaufspreise je Gramm im `PriceSnapshot`-Format liefern (Beispiel im Kommentar der Datei). Fällt die API aus, zeigt die Seite wieder Demowerte mit Hinweis – es werden nie Fantasiepreise als echt dargestellt.
- Quelle für Live-Preise: der Preis-Feed der aktuellen WordPress-Seite oder ein kleiner Dienst, der einen Börsenkurs mit den Gold-Sohn-Margen in Ankaufspreise umrechnet.

### Formulare – `lib/forms/delivery.ts`

`/api/anfrage/` (Versandtasche / Selbstversand / Abholung) und `/api/kontakt/` prüfen alle Eingaben serverseitig (zod), haben Honeypot und Rate-Limit.

| Variante | Variablen |
| --- | --- |
| E-Mail über Resend | `RESEND_API_KEY`, `FORM_MAIL_FROM` (verifizierte Absenderadresse), `FORM_MAIL_TO` |
| Webhook (Make, Zapier, n8n, CRM) | `FORM_WEBHOOK_URL`, optional `FORM_WEBHOOK_SECRET` |

Ohne Konfiguration antwortet der Server `503 not_configured`. Das Formular zeigt dann: „Online-Versand noch nicht eingerichtet … bitte telefonisch oder per E-Mail“. **Es wird nie ein Versand vorgetäuscht.**

---

## Animationen

Alle Animationen respektieren „Bewegung reduzieren“ (`prefers-reduced-motion`): Dann ist jeder Inhalt sofort sichtbar.

| Bereich | Umsetzung |
| --- | --- |
| Hero | Maskierte Bildöffnung, Wort-für-Wort-Headline, Kamerafahrt, wanderndes Fensterlicht (Überblendung zweier Lichtstände), Maus-Parallaxe mit weichem Licht, magnetische Buttons, Scroll-Übergang |
| Navigation | Glas-Header beim Scrollen, versteckt beim Runterscrollen; animiertes Ankauf-Dropdown; Mobile-Menü mit gestaffelten Links |
| Vorteile | Zähler, gestaffelte Karten, Icons zeichnen sich selbst |
| Präzisions-Band | Bild weitet sich mit dem Scrollen, Parallaxe |
| Preise | Karten-Einflug, animierte Zahlenwechsel beim Einheitenwechsel |
| Rechner | gleitende Auswahl (Shared Layout), weiche Ergebnis-Animation, Feingehalt-Balken |
| Ankauf-Kacheln | Bild-Maske von unten, Zoom-out, Hover-Zoom & Text |
| Ablauf | Goldlinie zeichnet sich mit dem Scrollen, Schritte leuchten auf; Videoöffnung |
| Formular | Schrittwechsel, Fortschrittsbalken, animierte Fehlermeldungen |
| FAQ | Höhen- und Icon-Animation |
| Footer | Aufsteigender Abschluss, großer Schriftzug |

---

## Offene Punkte vor dem Livegang

Siehe ausführlich `docs/SEO-MIGRATION.md`. Kurzfassung:

- [ ] **Datenschutz und AGB** 1:1 von der aktuellen Seite übernehmen (bewusst nicht neu formuliert) und um neue Dienste ergänzen.
- [ ] **Impressum** mit der aktuellen Fassung abgleichen.
- [ ] **12 Blogbeiträge** migrieren oder weiterleiten (URLs liegen im Stammverzeichnis).
- [ ] FAQ-Antworten mit den Originalen abgleichen (bei der Migration gekürzt).
- [ ] Widerspruch klären: „reiner Onlinehandel“ vs. „vor Ort / Büro / bar auszahlen“ auf der alten Seite und im Video.
- [ ] Rücksende-Bedingungen bei abgelehntem Angebot ergänzen.
- [ ] Versandadresse für Selbstversand ergänzen.
- [ ] Preis-API und Formularversand anbinden.
- [ ] Hero-Bild: Studio-Rendering behalten oder durch ein Foto ersetzen (`lib/images.ts`).
- [ ] Zahngold-Kachel: eigenes Foto liefern (aktuell Gold-Geflecht).
