# SEO-Migration gold-sohn.de → Next.js

Stand: 18.10.2026 · Grundlage: `page-sitemap.xml`, `post-sitemap.xml`, Hauptmenü und Seiten von gold-sohn.de.

**Ziel:** Alle bestehenden URLs bleiben erreichbar (gleiche Adresse, gleicher Schrägstrich am Ende), Titel und Beschreibungen der rankenden Seiten bleiben erhalten, nichts wird vor dem Abschluss dieser Liste live geschaltet.

## 1. Grundregeln im Code

- `trailingSlash: true` (wie WordPress). Aufrufe ohne Schrägstrich werden per 308 auf die Variante mit Schrägstrich umgeleitet.
- Kanonische URLs, Open Graph und Sitemap nutzen `NEXT_PUBLIC_SITE_URL`.
- `robots.txt` sperrt alles und jede Seite trägt `noindex`, **solange `NEXT_PUBLIC_SITE_ENV` nicht `production` ist** – Vorschauen landen nicht im Google-Index.
- Sitemap: `/sitemap.xml` (alle Seiten inkl. 228 Städte). In der Search Console nach dem Umzug neu einreichen. Die alte Yoast-Struktur (`/sitemap_index.xml`, `/page-sitemap.xml` …) per 301 auf `/sitemap.xml` umleiten (siehe 6.).
- Strukturierte Daten: Organization (alle Seiten), BreadcrumbList (Unterseiten), FAQPage (Startseite, FAQ, Ankaufseiten).

## 2. Hauptseiten

| Alte URL | Neue Route | Status | Title (übernommen) |
| --- | --- | --- | --- |
| `/` | `app/page.tsx` | 1:1 | Gold Sohn \| Goldankauf Wiesbaden |
| `/goldankauf/` | `app/goldankauf` | 1:1 | Gold verkaufen in Wiesbaden \| Goldankauf Gold Sohn |
| `/silberankauf/` | `app/silberankauf` | 1:1 | Silber verkaufen in Wiesbaden \| Silberankauf Gold Sohn |
| `/platin-ankauf/` | `app/platin-ankauf` | 1:1 | Platin verkaufen \| Platinankauf Gold Sohn |
| `/palladium-ankauf/` | `app/palladium-ankauf` | 1:1 | Palladium verkaufen \| Ankauf zum Tagespreis – Gold Sohn |
| `/zahngold-ankauf/` | `app/zahngold-ankauf` | 1:1 | Zahngold verkaufen in Wiesbaden \| Gold Sohn |
| `/schmuck-ankauf/` | `app/schmuck-ankauf` | 1:1 | Goldschmuck verkaufen \| Schmuckankauf Gold Sohn |
| `/munzen-barren-ankauf/` | `app/munzen-barren-ankauf` | 1:1 | Goldmünzen & Barren verkaufen \| Gold Sohn |
| `/preise/` | `app/preise` | 1:1 | Aktuelle Gold, Silber \| Gold Sohn |
| `/about/` | `app/about` | 1:1 | Über Gold Sohn \| Ihr zuverlässiger Edelmetall-Partner |
| `/contact/` | `app/contact` | 1:1 | Kontakt Gold Sohn \| Goldankauf Wiesbaden |
| `/faq/` | `app/faq` | 1:1 (alle 129 Fragen) | FAQ Gold Sohn \| Goldankauf Wiesbaden |
| `/FAQ/` (alter Menülink) | `proxy.ts` | 308 → `/faq/` | – |
| `/goldrechner/` | `app/goldrechner` | im Menü verlinkt, nicht in Sitemap → neu aufgebaut | neu |
| `/blog/` | `app/blog` | Übersicht, Beiträge noch nicht migriert | neu |
| `/impressum/` `/datenschutz/` `/agb/` | `app/…` | URL 1:1, **Texte müssen 1:1 übernommen werden** | übernommen bzw. neu |

**Neue Seiten:** `/luxusuhren-ankauf/`, `/versandtasche/`, `/selbstversand/`, `/so-funktionierts/`, `/standorte/` (Übersicht).
**Aliase (301/308):** `/kontakt/` → `/contact/`, `/ueber-uns/` → `/about/`, `/edelmetallpreise/` → `/preise/`.

Meta-Descriptions der übernommenen Seiten stehen unverändert in `lib/content/services.ts` bzw. in der jeweiligen `page.tsx`.

### Inhaltliche Änderungen (bewusst)

- Fließtexte der Ankaufseiten wurden neu und kürzer geschrieben. Die H1 und die wichtigsten H2-Themen („Was ist Gold?“, „Wofür wird … verwendet?“, „Welche …-Artikel kaufen wir an?“, „Aktuelle Preise“) bleiben erhalten.
- Die alte H2 „Gold vor Ort oder online verkaufen“ wurde nicht übernommen, weil sie dem Hinweis „reiner Onlinehandel“ widerspricht. Stattdessen: Ablauf per Versandtasche / Selbstversand.
- Mehrfach vorkommende H2 („Aktuelle Preise“ doppelt, „Gold Rechner / Zahngold Rechner / …“ je Seite) wurden zu einem Preis- und einem Rechner-Abschnitt zusammengefasst.
- Auf `/platin-ankauf/` und `/palladium-ankauf/` stand „So läuft der **Silber**ankauf …“ – korrigiert.

### FAQ

Fragen wörtlich übernommen, **Antworten bei der Migration gekürzt** (`lib/content/faq.ts`). Vor dem Livegang mit den Originalantworten abgleichen. Einige Antworten der alten Seite beschreiben einen Verkauf „vor Ort“ (Wiegung vor den Augen, 10–20 Minuten, Barauszahlung); das widerspricht „reiner Onlinehandel ohne Standort“. Drei Antworten wurden deshalb an den Versandankauf angepasst („Gold online verkaufen oder vor Ort?“, „Kann ich Gold per Post verkaufen?“, „Ist Versand sicher?“). Bitte klären, welche Aussage gilt.

## 3. Städteseiten (228)

Technik: Jede bekannte Stadt-URL wird in `next.config.ts` per Rewrite auf `app/standorte/[city]` abgebildet. Die öffentliche URL bleibt **exakt** `/goldankauf-<slug>/`. Unbekannte Slugs liefern einen echten 404 (kein Soft-404). Direkte Aufrufe von `/standorte/<slug>/` werden per 308 auf die kanonische URL umgeleitet.

- Title-Muster (von der Live-Seite, z. B. Kassel): `Goldankauf <Stadt> – Gold & Silber verkaufen | Gold Sohn`
- Description-Muster: `Ihr Goldankauf für <Stadt>: Wir kaufen Altgold, Münzen & Edelmetalle zu fairen Preisen. …`
- H1 neu: `Goldankauf <Stadt>` (alt teils „Wir kaufen Ihr Gold an“ bzw. „Verkaufen Sie Ihr Gold in <Stadt> mit Vertrauen“).
- Der Pflichthinweis „Bitte beachten Sie, dass wir als reiner Onlinehandel tätig sind …“ steht auf jeder Städteseite.
- Korrekturen gegenüber dem alten Menü: Eimsbüttel nur unter Hamburg (stand auch unter Bayern), Kempten und Wadgassen je einmal, Gruppe „Eckernförde“ → Thüringen. Slug `nuruppine` (Neuruppin) unverändert übernommen, damit die URL gleich bleibt.
- **Prüfen:** Nur 30 Städte stehen in der Live-Sitemap, die übrigen sind nur im Menü verlinkt. Vor dem Umzug mit einem Crawler (z. B. Screaming Frog) prüfen, welche davon wirklich `200` liefern bzw. Rankings haben.

| URL | Stadt | Bundesland | In Live-Sitemap |
| --- | --- | --- | --- |
| `/goldankauf-wiesbaden/` | Wiesbaden | Hessen | ja |
| `/goldankauf-darmstadt/` | Darmstadt | Hessen | ja |
| `/goldankauf-frankfurt/` | Frankfurt | Hessen | nur Menü – prüfen |
| `/goldankauf-fulda/` | Fulda | Hessen | ja |
| `/goldankauf-geisenheim/` | Geisenheim | Hessen | ja |
| `/goldankauf-giessen/` | Gießen | Hessen | ja |
| `/goldankauf-kassel/` | Kassel | Hessen | ja |
| `/goldankauf-marburg/` | Marburg | Hessen | ja |
| `/goldankauf-oberursel/` | Oberursel | Hessen | ja |
| `/goldankauf-ruedesheim/` | Rüdesheim | Hessen | ja |
| `/goldankauf-bad-homburg/` | Bad Homburg | Hessen | nur Menü – prüfen |
| `/goldankauf-bensheim/` | Bensheim | Hessen | nur Menü – prüfen |
| `/goldankauf-offenbach/` | Offenbach | Hessen | nur Menü – prüfen |
| `/goldankauf-limburg/` | Limburg | Hessen | nur Menü – prüfen |
| `/goldankauf-ruesselsheim/` | Rüsselsheim | Hessen | nur Menü – prüfen |
| `/goldankauf-wetzlar/` | Wetzlar | Hessen | nur Menü – prüfen |
| `/goldankauf-aschaffenburg/` | Aschaffenburg | Bayern | ja |
| `/goldankauf-bamberg/` | Bamberg | Bayern | ja |
| `/goldankauf-bayreuth/` | Bayreuth | Bayern | ja |
| `/goldankauf-erlangen/` | Erlangen | Bayern | ja |
| `/goldankauf-freising/` | Freising | Bayern | nur Menü – prüfen |
| `/goldankauf-kempten/` | Kempten | Bayern | ja |
| `/goldankauf-landshut/` | Landshut | Bayern | ja |
| `/goldankauf-munchen/` | München | Bayern | ja |
| `/goldankauf-nurnberg/` | Nürnberg | Bayern | ja |
| `/goldankauf-passau/` | Passau | Bayern | nur Menü – prüfen |
| `/goldankauf-regensburg/` | Regensburg | Bayern | ja |
| `/goldankauf-rosenheim/` | Rosenheim | Bayern | ja |
| `/goldankauf-schweinfurt/` | Schweinfurt | Bayern | nur Menü – prüfen |
| `/goldankauf-straubing/` | Straubing | Bayern | nur Menü – prüfen |
| `/goldankauf-fuerth/` | Fürth | Bayern | ja |
| `/goldankauf-ingolstadt/` | Ingolstadt | Bayern | ja |
| `/goldankauf-wurzburg/` | Würzburg | Bayern | nur Menü – prüfen |
| `/goldankauf-braunschweig/` | Braunschweig | Niedersachsen | nur Menü – prüfen |
| `/goldankauf-hannover/` | Hannover | Niedersachsen | nur Menü – prüfen |
| `/goldankauf-celle/` | Celle | Niedersachsen | nur Menü – prüfen |
| `/goldankauf-cuxhaven/` | Cuxhaven | Niedersachsen | nur Menü – prüfen |
| `/goldankauf-delmenhorst/` | Delmenhorst | Niedersachsen | nur Menü – prüfen |
| `/goldankauf-hildesheim/` | Hildesheim | Niedersachsen | nur Menü – prüfen |
| `/goldankauf-oldenburg/` | Oldenburg | Niedersachsen | nur Menü – prüfen |
| `/goldankauf-osnabruck/` | Osnabrück | Niedersachsen | nur Menü – prüfen |
| `/goldankauf-salzgitter/` | Salzgitter | Niedersachsen | nur Menü – prüfen |
| `/goldankauf-stade/` | Stade | Niedersachsen | nur Menü – prüfen |
| `/goldankauf-gottingen/` | Göttingen | Niedersachsen | nur Menü – prüfen |
| `/goldankauf-wilhelmshaven/` | Wilhelmshaven | Niedersachsen | nur Menü – prüfen |
| `/goldankauf-hameln/` | Hameln | Niedersachsen | nur Menü – prüfen |
| `/goldankauf-luneburg/` | Lüneburg | Niedersachsen | nur Menü – prüfen |
| `/goldankauf-wolfsburg/` | Wolfsburg | Niedersachsen | nur Menü – prüfen |
| `/goldankauf-berlin-mitte/` | Berlin Mitte | Berlin | nur Menü – prüfen |
| `/goldankauf-charlottenburg/` | Charlottenburg | Berlin | ja |
| `/goldankauf-kopenick/` | Köpenick | Berlin | nur Menü – prüfen |
| `/goldankauf-kreuzberg/` | Kreuzberg | Berlin | ja |
| `/goldankauf-lichtenberg/` | Lichtenberg | Berlin | ja |
| `/goldankauf-hellersdorf/` | Hellersdorf | Berlin | ja |
| `/goldankauf-marzahn/` | Marzahn | Berlin | ja |
| `/goldankauf-tempelhof/` | Tempelhof | Berlin | ja |
| `/goldankauf-spandau/` | Spandau | Berlin | ja |
| `/goldankauf-steglitz/` | Steglitz | Berlin | nur Menü – prüfen |
| `/goldankauf-reinickendorf/` | Reinickendorf | Berlin | nur Menü – prüfen |
| `/goldankauf-neukolln/` | Neukölln | Berlin | ja |
| `/goldankauf-zehlendorf/` | Zehlendorf | Berlin | nur Menü – prüfen |
| `/goldankauf-treptow/` | Treptow | Berlin | nur Menü – prüfen |
| `/goldankauf-pankow/` | Pankow | Berlin | nur Menü – prüfen |
| `/goldankauf-bernau/` | Bernau | Brandenburg | nur Menü – prüfen |
| `/goldankauf-brandenburg-an-der-havel/` | Brandenburg an der Havel | Brandenburg | nur Menü – prüfen |
| `/goldankauf-cottbus/` | Cottbus | Brandenburg | nur Menü – prüfen |
| `/goldankauf-eberswalde/` | Eberswalde | Brandenburg | nur Menü – prüfen |
| `/goldankauf-falkensee/` | Falkensee | Brandenburg | nur Menü – prüfen |
| `/goldankauf-frankfurt-oder/` | Frankfurt (Oder) | Brandenburg | nur Menü – prüfen |
| `/goldankauf-furstenwalde/` | Fürstenwalde | Brandenburg | nur Menü – prüfen |
| `/goldankauf-konigs-wusterhausen/` | Königs Wusterhausen | Brandenburg | nur Menü – prüfen |
| `/goldankauf-luckenwalde/` | Luckenwalde | Brandenburg | nur Menü – prüfen |
| `/goldankauf-nuruppine/` | Neuruppin | Brandenburg | nur Menü – prüfen |
| `/goldankauf-oranienburg/` | Oranienburg | Brandenburg | nur Menü – prüfen |
| `/goldankauf-potsdam/` | Potsdam | Brandenburg | nur Menü – prüfen |
| `/goldankauf-rathenow/` | Rathenow | Brandenburg | nur Menü – prüfen |
| `/goldankauf-schwedt/` | Schwedt | Brandenburg | nur Menü – prüfen |
| `/goldankauf-senftenberg/` | Senftenberg | Brandenburg | nur Menü – prüfen |
| `/goldankauf-blumenthal/` | Blumenthal | Bremen | nur Menü – prüfen |
| `/goldankauf-bremen/` | Bremen | Bremen | ja |
| `/goldankauf-bremerhaven/` | Bremerhaven | Bremen | nur Menü – prüfen |
| `/goldankauf-hemelingen/` | Hemelingen | Bremen | nur Menü – prüfen |
| `/goldankauf-huchting/` | Huchting | Bremen | nur Menü – prüfen |
| `/goldankauf-obervieland/` | Obervieland | Bremen | nur Menü – prüfen |
| `/goldankauf-osterholz/` | Osterholz | Bremen | nur Menü – prüfen |
| `/goldankauf-vahr/` | Vahr | Bremen | nur Menü – prüfen |
| `/goldankauf-vegesack/` | Vegesack | Bremen | nur Menü – prüfen |
| `/goldankauf-borgfeld/` | Borgfeld | Bremen | nur Menü – prüfen |
| `/goldankauf-gropelingen/` | Gröpelingen | Bremen | nur Menü – prüfen |
| `/goldankauf-neustadt/` | Neustadt | Bremen | nur Menü – prüfen |
| `/goldankauf-schwachhausen/` | Schwachhausen | Bremen | nur Menü – prüfen |
| `/goldankauf-findorff/` | Findorff | Bremen | nur Menü – prüfen |
| `/goldankauf-walle/` | Walle | Bremen | nur Menü – prüfen |
| `/goldankauf-stuttgart/` | Stuttgart | Baden-Württemberg | nur Menü – prüfen |
| `/goldankauf-mannheim/` | Mannheim | Baden-Württemberg | nur Menü – prüfen |
| `/goldankauf-karlsruhe/` | Karlsruhe | Baden-Württemberg | nur Menü – prüfen |
| `/goldankauf-freiburg/` | Freiburg | Baden-Württemberg | nur Menü – prüfen |
| `/goldankauf-heidelberg/` | Heidelberg | Baden-Württemberg | nur Menü – prüfen |
| `/goldankauf-heilbronn/` | Heilbronn | Baden-Württemberg | nur Menü – prüfen |
| `/goldankauf-ulm/` | Ulm | Baden-Württemberg | nur Menü – prüfen |
| `/goldankauf-pforzheim/` | Pforzheim | Baden-Württemberg | nur Menü – prüfen |
| `/goldankauf-reutlingen/` | Reutlingen | Baden-Württemberg | nur Menü – prüfen |
| `/goldankauf-esslingen/` | Esslingen | Baden-Württemberg | nur Menü – prüfen |
| `/goldankauf-tubingen/` | Tübingen | Baden-Württemberg | nur Menü – prüfen |
| `/goldankauf-ludwigsburg/` | Ludwigsburg | Baden-Württemberg | nur Menü – prüfen |
| `/goldankauf-konstanz/` | Konstanz | Baden-Württemberg | nur Menü – prüfen |
| `/goldankauf-offenburg/` | Offenburg | Baden-Württemberg | nur Menü – prüfen |
| `/goldankauf-villingen-schwenningen/` | Villingen-Schwenningen | Baden-Württemberg | nur Menü – prüfen |
| `/goldankauf-hamburg-mitte/` | Hamburg-Mitte | Hamburg | nur Menü – prüfen |
| `/goldankauf-eimsbuttel/` | Eimsbüttel | Hamburg | nur Menü – prüfen |
| `/goldankauf-altona/` | Altona | Hamburg | nur Menü – prüfen |
| `/goldankauf-hamburg-nord/` | Hamburg-Nord | Hamburg | nur Menü – prüfen |
| `/goldankauf-wandsbek/` | Wandsbek | Hamburg | nur Menü – prüfen |
| `/goldankauf-bergedorf/` | Bergedorf | Hamburg | nur Menü – prüfen |
| `/goldankauf-harburg/` | Harburg | Hamburg | nur Menü – prüfen |
| `/goldankauf-wilhelmsburg/` | Wilhelmsburg | Hamburg | nur Menü – prüfen |
| `/goldankauf-barmbek/` | Barmbek | Hamburg | nur Menü – prüfen |
| `/goldankauf-winterhude/` | Winterhude | Hamburg | nur Menü – prüfen |
| `/goldankauf-st-pauli/` | St. Pauli | Hamburg | nur Menü – prüfen |
| `/goldankauf-blankenese/` | Blankenese | Hamburg | nur Menü – prüfen |
| `/goldankauf-rahlstedt/` | Rahlstedt | Hamburg | nur Menü – prüfen |
| `/goldankauf-langenhorn/` | Langenhorn | Hamburg | nur Menü – prüfen |
| `/goldankauf-billstedt/` | Billstedt | Hamburg | nur Menü – prüfen |
| `/goldankauf-rostock/` | Rostock | Mecklenburg-Vorpommern | nur Menü – prüfen |
| `/goldankauf-schwerin/` | Schwerin | Mecklenburg-Vorpommern | nur Menü – prüfen |
| `/goldankauf-neubrandenburg/` | Neubrandenburg | Mecklenburg-Vorpommern | nur Menü – prüfen |
| `/goldankauf-stralsund/` | Stralsund | Mecklenburg-Vorpommern | nur Menü – prüfen |
| `/goldankauf-greifswald/` | Greifswald | Mecklenburg-Vorpommern | nur Menü – prüfen |
| `/goldankauf-wismar/` | Wismar | Mecklenburg-Vorpommern | nur Menü – prüfen |
| `/goldankauf-gustrow/` | Güstrow | Mecklenburg-Vorpommern | nur Menü – prüfen |
| `/goldankauf-waren/` | Waren | Mecklenburg-Vorpommern | nur Menü – prüfen |
| `/goldankauf-pasewalk/` | Pasewalk | Mecklenburg-Vorpommern | nur Menü – prüfen |
| `/goldankauf-ribnitz-damgarten/` | Ribnitz-Damgarten | Mecklenburg-Vorpommern | nur Menü – prüfen |
| `/goldankauf-demmin/` | Demmin | Mecklenburg-Vorpommern | nur Menü – prüfen |
| `/goldankauf-anklam/` | Anklam | Mecklenburg-Vorpommern | nur Menü – prüfen |
| `/goldankauf-teterow/` | Teterow | Mecklenburg-Vorpommern | nur Menü – prüfen |
| `/goldankauf-parchim/` | Parchim | Mecklenburg-Vorpommern | nur Menü – prüfen |
| `/goldankauf-malchin/` | Malchin | Mecklenburg-Vorpommern | nur Menü – prüfen |
| `/goldankauf-koln/` | Köln | Nordrhein-Westfalen | nur Menü – prüfen |
| `/goldankauf-dusseldorf/` | Düsseldorf | Nordrhein-Westfalen | nur Menü – prüfen |
| `/goldankauf-dortmund/` | Dortmund | Nordrhein-Westfalen | nur Menü – prüfen |
| `/goldankauf-essen/` | Essen | Nordrhein-Westfalen | nur Menü – prüfen |
| `/goldankauf-duisburg/` | Duisburg | Nordrhein-Westfalen | nur Menü – prüfen |
| `/goldankauf-bochum/` | Bochum | Nordrhein-Westfalen | nur Menü – prüfen |
| `/goldankauf-wuppertal/` | Wuppertal | Nordrhein-Westfalen | nur Menü – prüfen |
| `/goldankauf-bielefeld/` | Bielefeld | Nordrhein-Westfalen | nur Menü – prüfen |
| `/goldankauf-bonn/` | Bonn | Nordrhein-Westfalen | nur Menü – prüfen |
| `/goldankauf-munster/` | Münster | Nordrhein-Westfalen | nur Menü – prüfen |
| `/goldankauf-aachen/` | Aachen | Nordrhein-Westfalen | nur Menü – prüfen |
| `/goldankauf-gelsenkirchen/` | Gelsenkirchen | Nordrhein-Westfalen | nur Menü – prüfen |
| `/goldankauf-monchengladbach/` | Mönchengladbach | Nordrhein-Westfalen | nur Menü – prüfen |
| `/goldankauf-krefeld/` | Krefeld | Nordrhein-Westfalen | nur Menü – prüfen |
| `/goldankauf-oberhausen/` | Oberhausen | Nordrhein-Westfalen | nur Menü – prüfen |
| `/goldankauf-mainz/` | Mainz | Rheinland-Pfalz | nur Menü – prüfen |
| `/goldankauf-ludwigshafen/` | Ludwigshafen | Rheinland-Pfalz | nur Menü – prüfen |
| `/goldankauf-koblenz/` | Koblenz | Rheinland-Pfalz | nur Menü – prüfen |
| `/goldankauf-trier/` | Trier | Rheinland-Pfalz | nur Menü – prüfen |
| `/goldankauf-kaiserslautern/` | Kaiserslautern | Rheinland-Pfalz | nur Menü – prüfen |
| `/goldankauf-worms/` | Worms | Rheinland-Pfalz | nur Menü – prüfen |
| `/goldankauf-speyer/` | Speyer | Rheinland-Pfalz | nur Menü – prüfen |
| `/goldankauf-bad-kreuznach/` | Bad Kreuznach | Rheinland-Pfalz | nur Menü – prüfen |
| `/goldankauf-neustadt-an-der-weinstrase/` | Neustadt an der Weinstraße | Rheinland-Pfalz | nur Menü – prüfen |
| `/goldankauf-landau/` | Landau | Rheinland-Pfalz | nur Menü – prüfen |
| `/goldankauf-pirmasens/` | Pirmasens | Rheinland-Pfalz | nur Menü – prüfen |
| `/goldankauf-zweibrucken/` | Zweibrücken | Rheinland-Pfalz | nur Menü – prüfen |
| `/goldankauf-andernach/` | Andernach | Rheinland-Pfalz | nur Menü – prüfen |
| `/goldankauf-mayen/` | Mayen | Rheinland-Pfalz | nur Menü – prüfen |
| `/goldankauf-bingen/` | Bingen | Rheinland-Pfalz | nur Menü – prüfen |
| `/goldankauf-saarbrucken/` | Saarbrücken | Saarland | nur Menü – prüfen |
| `/goldankauf-neunkirchen/` | Neunkirchen | Saarland | nur Menü – prüfen |
| `/goldankauf-homburg/` | Homburg | Saarland | nur Menü – prüfen |
| `/goldankauf-volklingen/` | Völklingen | Saarland | nur Menü – prüfen |
| `/goldankauf-saarlouis/` | Saarlouis | Saarland | nur Menü – prüfen |
| `/goldankauf-merzig/` | Merzig | Saarland | nur Menü – prüfen |
| `/goldankauf-st-wendel/` | St. Wendel | Saarland | nur Menü – prüfen |
| `/goldankauf-dillingen/` | Dillingen | Saarland | nur Menü – prüfen |
| `/goldankauf-lebach/` | Lebach | Saarland | nur Menü – prüfen |
| `/goldankauf-puttlingen/` | Püttlingen | Saarland | nur Menü – prüfen |
| `/goldankauf-sulzbach/` | Sulzbach | Saarland | nur Menü – prüfen |
| `/goldankauf-bexbach/` | Bexbach | Saarland | nur Menü – prüfen |
| `/goldankauf-blieskastel/` | Blieskastel | Saarland | nur Menü – prüfen |
| `/goldankauf-wadgassen/` | Wadgassen | Saarland | nur Menü – prüfen |
| `/goldankauf-wadern/` | Wadern | Saarland | nur Menü – prüfen |
| `/goldankauf-magdeburg/` | Magdeburg | Sachsen-Anhalt | nur Menü – prüfen |
| `/goldankauf-halle/` | Halle | Sachsen-Anhalt | nur Menü – prüfen |
| `/goldankauf-dessau/` | Dessau | Sachsen-Anhalt | nur Menü – prüfen |
| `/goldankauf-wittenberg/` | Wittenberg | Sachsen-Anhalt | nur Menü – prüfen |
| `/goldankauf-halberstadt/` | Halberstadt | Sachsen-Anhalt | nur Menü – prüfen |
| `/goldankauf-stendal/` | Stendal | Sachsen-Anhalt | nur Menü – prüfen |
| `/goldankauf-merseburg/` | Merseburg | Sachsen-Anhalt | nur Menü – prüfen |
| `/goldankauf-weisenfels/` | Weißenfels | Sachsen-Anhalt | nur Menü – prüfen |
| `/goldankauf-zeitz/` | Zeitz | Sachsen-Anhalt | nur Menü – prüfen |
| `/goldankauf-bernburg/` | Bernburg | Sachsen-Anhalt | nur Menü – prüfen |
| `/goldankauf-kothen/` | Köthen | Sachsen-Anhalt | nur Menü – prüfen |
| `/goldankauf-sangerhausen/` | Sangerhausen | Sachsen-Anhalt | nur Menü – prüfen |
| `/goldankauf-quedlinburg/` | Quedlinburg | Sachsen-Anhalt | nur Menü – prüfen |
| `/goldankauf-aschersleben/` | Aschersleben | Sachsen-Anhalt | nur Menü – prüfen |
| `/goldankauf-bitterfeld/` | Bitterfeld | Sachsen-Anhalt | nur Menü – prüfen |
| `/goldankauf-kiel/` | Kiel | Schleswig-Holstein | nur Menü – prüfen |
| `/goldankauf-lubeck/` | Lübeck | Schleswig-Holstein | nur Menü – prüfen |
| `/goldankauf-flensburg/` | Flensburg | Schleswig-Holstein | nur Menü – prüfen |
| `/goldankauf-neumunster/` | Neumünster | Schleswig-Holstein | nur Menü – prüfen |
| `/goldankauf-norderstedt/` | Norderstedt | Schleswig-Holstein | nur Menü – prüfen |
| `/goldankauf-elmshorn/` | Elmshorn | Schleswig-Holstein | nur Menü – prüfen |
| `/goldankauf-pinneberg/` | Pinneberg | Schleswig-Holstein | nur Menü – prüfen |
| `/goldankauf-itzehoe/` | Itzehoe | Schleswig-Holstein | nur Menü – prüfen |
| `/goldankauf-rendsburg/` | Rendsburg | Schleswig-Holstein | nur Menü – prüfen |
| `/goldankauf-husum/` | Husum | Schleswig-Holstein | nur Menü – prüfen |
| `/goldankauf-ahrensburg/` | Ahrensburg | Schleswig-Holstein | nur Menü – prüfen |
| `/goldankauf-wedel/` | Wedel | Schleswig-Holstein | nur Menü – prüfen |
| `/goldankauf-geesthacht/` | Geesthacht | Schleswig-Holstein | nur Menü – prüfen |
| `/goldankauf-bad-segeberg/` | Bad Segeberg | Schleswig-Holstein | nur Menü – prüfen |
| `/goldankauf-eckernforde/` | Eckernförde | Schleswig-Holstein | nur Menü – prüfen |
| `/goldankauf-jena/` | Jena | Thüringen | nur Menü – prüfen |
| `/goldankauf-erfurt/` | Erfurt | Thüringen | nur Menü – prüfen |
| `/goldankauf-gera/` | Gera | Thüringen | nur Menü – prüfen |
| `/goldankauf-weimar/` | Weimar | Thüringen | nur Menü – prüfen |
| `/goldankauf-gotha/` | Gotha | Thüringen | nur Menü – prüfen |
| `/goldankauf-eisenach/` | Eisenach | Thüringen | nur Menü – prüfen |
| `/goldankauf-nordhausen/` | Nordhausen | Thüringen | nur Menü – prüfen |
| `/goldankauf-muhlhausen/` | Mühlhausen | Thüringen | nur Menü – prüfen |
| `/goldankauf-suhl/` | Suhl | Thüringen | nur Menü – prüfen |
| `/goldankauf-arnstadt/` | Arnstadt | Thüringen | nur Menü – prüfen |
| `/goldankauf-ilmenau/` | Ilmenau | Thüringen | nur Menü – prüfen |
| `/goldankauf-rudolstadt/` | Rudolstadt | Thüringen | nur Menü – prüfen |
| `/goldankauf-sondershausen/` | Sondershausen | Thüringen | nur Menü – prüfen |
| `/goldankauf-meiningen/` | Meiningen | Thüringen | nur Menü – prüfen |
| `/goldankauf-apolda/` | Apolda | Thüringen | nur Menü – prüfen |

## 4. Blogbeiträge (post-sitemap.xml) – **offen**

Die Beiträge liegen auf Stammebene (`/<slug>/`). Die neue App liefert sie noch **nicht** aus. Vor dem Livegang eine der beiden Varianten umsetzen:

1. Inhalte übernehmen (empfohlen): z. B. als MDX unter `app/(blog)/[slug]/` mit `generateStaticParams` aus `lib/content/blog.ts` – gleiche URL.
2. Oder in `next.config.ts` per 301 auf `/blog/` bzw. die passendste Seite umleiten.

| Alte URL | Status | Aufgabe |
| --- | --- | --- |
| `/goldpreis-aktuell-warum-gold-heute-niedriger-08-07-2026/` | nicht migriert | Inhalt übernehmen (MDX) **oder** 301 → `/blog/` |
| `/goldpreis-heute-warum-kurs-nicht-stabilisiert-09-07-2026/` | nicht migriert | Inhalt übernehmen (MDX) **oder** 301 → `/blog/` |
| `/gold-edelmetalle-aktuell-14-07-2026-preise-fallen/` | nicht migriert | Inhalt übernehmen (MDX) **oder** 301 → `/blog/` |
| `/goldpreis-heute-ruecksetzer-15-07-2026/` | nicht migriert | Inhalt übernehmen (MDX) **oder** 301 → `/blog/` |
| `/gold-silber-heute-divergenz-21-07-2026/` | nicht migriert | Inhalt übernehmen (MDX) **oder** 301 → `/blog/` |
| `/edelmetalle-steigen-gold-silber-platin-palladium-23-07-2026/` | nicht migriert | Inhalt übernehmen (MDX) **oder** 301 → `/blog/` |
| `/gold-silber-fed-sitzung-28-07-2026/` | nicht migriert | Inhalt übernehmen (MDX) **oder** 301 → `/blog/` |
| `/goldpreis-seitwaerts-silber-marke-29-07-2026/` | nicht migriert | Inhalt übernehmen (MDX) **oder** 301 → `/blog/` |
| `/silberpreis-heute-rueckgang-erwartungen-31-07-2026/` | nicht migriert | Inhalt übernehmen (MDX) **oder** 301 → `/blog/` |
| `/goldpreis-stagniert-fed-zinserhoehung-04-08-2026/` | nicht migriert | Inhalt übernehmen (MDX) **oder** 301 → `/blog/` |
| `/silberpreis-prognose-naechste-monate-erwartungen-boerse/` | nicht migriert | Inhalt übernehmen (MDX) **oder** 301 → `/blog/` |
| `/gold-und-silber-warum-die-edelmetallpreise-gemeinsam-steigen-und-fallen/` | nicht migriert | Inhalt übernehmen (MDX) **oder** 301 → `/blog/` |

## 5. Weitere Sitemaps der alten Seite – prüfen

`category-sitemap.xml`, `post_tag-sitemap.xml`, `author-sitemap.xml`: Kategorie-, Schlagwort- und Autorenarchive. Mit dem Crawler erfassen und per 301 auf `/blog/` umleiten.

Bilder der alten Seite liegen teils auf `bayern.gold-sohn.de/wp-content/uploads/…`. Wenn diese Subdomain abgeschaltet wird, verlinkte Bilder per 301 erhalten oder bewusst entfallen lassen.

## 6. Umzugs-Checkliste (Go-Live)

1. Alle Punkte aus Abschnitt 2–5 erledigt, Rechtstexte final.
2. Crawl der alten Seite (alle 200-URLs exportieren) → mit `/sitemap.xml` der neuen Seite abgleichen → fehlende URLs als 301 in `next.config.ts` ergänzen.
3. Redirects für Yoast-Sitemaps ergänzen: `/sitemap_index.xml`, `/page-sitemap.xml`, `/post-sitemap.xml` → `/sitemap.xml`.
4. Vercel: `NEXT_PUBLIC_SITE_URL=https://gold-sohn.de`, `NEXT_PUBLIC_SITE_ENV=production`, Preis- und Formular-Variablen setzen.
5. Domain in Vercel hinzufügen, DNS umstellen (erst jetzt!).
6. Search Console: neue Sitemap einreichen, Abdeckung und 404-Berichte 2–4 Wochen beobachten.
