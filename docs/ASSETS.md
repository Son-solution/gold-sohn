# Assets – Zuordnung

Alle Fotos sind **Original-Uploads von Gold Sohn**, unverändert in `public/images/uploads/`.
`public/images/derived/` enthält nur Zuschnitte dieser Originale (keine Bildbearbeitung).
Bilder werden über `lib/images.ts` eingebunden – Austausch an einer Stelle.

## Marke & Video

| Datei | Herkunft | Verwendung |
| --- | --- | --- |
| `public/brand/logo-gold-sohn-original.png` | Original-Logo (2560 × 605, transparent), unverändert | Referenz / Druck |
| `public/brand/logo-gold-sohn.png` | dasselbe Logo, nur der transparente Rand entfernt (Pixel unverändert) | Header, Mobile-Menü, Footer |
| `public/video/goldsohn-erklaervideo.mp4` | Original-Erklärvideo (1:44 Min, 1920 × 1080), unverändert | „So funktioniert der Goldankauf“ (Startseite, Ankauf-, Städte-, Ablauf-, Versandtaschen-Seite) |
| `public/video/poster-schritt-1.jpg` | Standbild aus dem Video (Sek. 15) | Vorschaubild des Videoplayers |
| `public/video/poster-abschluss.jpg` | Standbild aus dem Video (Sek. 99) | Reserve |
| `app/icon.png`, `app/apple-icon.png` | „GS“-Monogramm aus dem Video (Standbild, freigestellt auf Creme) | Browser-Tab, Home-Bildschirm |

## Fotos

| Datei (`public/images/uploads/`) | Motiv | Verwendung |
| --- | --- | --- |
| `argor-heraeus-gold-platin-barren.jpg` | Argor-Heraeus Gold- und Platinbarren | Selbstversand-Seite; Zuschnitte → Goldankauf, Platinankauf |
| `silber-barren-muenzen.png` | Silberbarren, Münzen, Schmuck | Silberankauf |
| `palladium-barren.jpg` | Palladiumbarren mit Rohpalladium | Palladiumankauf |
| `gold-geflecht-makro.jpg` | Goldgeflecht, Makro | Präzisions-Band „Jedes Gramm zählt“, Zahngoldankauf (vorläufig) |
| `goldschmuck-schale.png` | Schale mit Goldschmuck | Schmuckankauf, „Über Gold Sohn“, Versandtasche (Vorschaubild) |
| `goldbarren-muenzen.jpg` | Goldbarren auf Münzen | Münzen & Barren, Städteseiten, Versandtasche |
| `luxusuhr-gold.jpg` | Goldene Armbanduhr | Luxusuhren |
| `luxusuhr-gold-klein.jpg` | dieselbe Uhr, kleinere Datei | nicht verwendet (Dublette) |
| `altgold-sammlung.jpg` | Altgold, Ringe, Münzen (300 × 200 px) | nur kleines Vorschaubild (Versandtasche) – zu klein für große Flächen |
| `goldringe-schatulle.jpg` | Zwei Ringe in Schatulle (150 × 150 px) | nur kleines Vorschaubild (Versandtasche) – zu klein für große Flächen |

| Zuschnitt (`public/images/derived/`) | Quelle | Verwendung |
| --- | --- | --- |
| `argor-heraeus-goldbarren-ausschnitt.webp` | rechter Teil (Goldbarren) | Goldankauf |
| `argor-heraeus-platinbarren-ausschnitt.webp` | linker Teil (Platinbarren) | Platinankauf |

## Hero

`public/images/hero/hero-goldbarren-kette.jpg` und `…-licht.jpg` sind **keine** Kundenfotos, sondern fotorealistische Studio-Renderings (Blender Cycles) aus der Designphase: derselbe Bildausschnitt in zwei Lichtständen, die im Hero langsam ineinander überblenden („wanderndes Fensterlicht“). Austausch gegen ein eigenes Foto: in `lib/images.ts` `heroA` (und optional `heroB`) ersetzen.

## Wünsche für ein Fotoshooting

1. Zahngold (Kronen/Brücken), aktuell nur ein Platzhalter-Motiv.
2. Hero im Querformat mit ruhiger, heller Fläche links für die Überschrift.
3. Team- bzw. Firmenfotos für „Über uns“.

## Schriften

Bodoni Moda und Jost (SIL Open Font License, Lizenztexte in `app/fonts/`). Selbst gehostet über `next/font/local` – keine Verbindung zu Google Fonts.
