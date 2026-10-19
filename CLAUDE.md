# Gold Sohn – Projektregeln für Claude Code

@AGENTS.md

## Projekt
Website für Gold Sohn (Goldankauf & Edelmetallankauf im Versand, Wiesbaden). Next.js 16 App Router, TypeScript, Tailwind 4, GSAP + ScrollTrigger, Motion for React, lucide-react, zod. Sprache der Website: **Deutsch**.

## Harte Regeln
- **Kein Dark Mode, keine schwarzen Hintergründe.** Farben nur aus den Tokens in `app/globals.css`: Weiß `#FFFFFF`, Creme `#F6F1E8`, Perlgrau `#E6E3DF`, Champagnergold `#C5A064`, Text `#333333` (+ abgeleitete `gold-ink`, `ink-strong`, `ink-2`).
- **Keine erfundenen Fakten:** keine Adressen, Bewertungen, Zertifikate, Versicherungszusagen, Gründungsjahre oder Preise erfinden. Geprüfte Firmendaten stehen in `lib/site.ts`. Fehlendes als `[Platzhalter: …]` kennzeichnen.
- **Preise:** nie als Live-Kurs darstellen, solange `source === "demo"`. Live-Daten nur über `lib/prices/provider.ts`.
- **Formulare:** nie Erfolg anzeigen ohne bestätigte Zustellung (`lib/forms/delivery.ts`).
- **Logo, Video und Fotos** sind Originale des Kunden – nicht verändern, nicht durch generierte Bilder ersetzen. Neue Bilder über `lib/images.ts` einbinden.
- **URLs:** bestehende URLs nicht ändern (`trailingSlash: true`, Städte unter `/goldankauf-<slug>/`). Neue Weiterleitungen in `next.config.ts`; vorher `docs/SEO-MIGRATION.md` lesen und aktualisieren.
- Nichts deployen, keine Domains/DNS anfassen, ohne ausdrückliche Anweisung.

## Konventionen
- Server Components standardmäßig; `"use client"` nur für Interaktion/Animation.
- Scroll-Animationen: GSAP über `useGSAP` + `gsap.matchMedia(MOTION_OK)` aus `lib/gsap.ts` (reduzierte Bewegung respektieren). Bausteine in `components/motion/`.
- Interaktions-Animationen (Menüs, Akkordeon, Formular-Schritte, Auswahl): Motion (`motion/react`).
- Elemente, die GSAP per `transform` animiert, dürfen kein CSS-`transition: transform` haben (Hover über `translate`/`scale`-Properties lösen).
- Cache Components ist aktiv: in Server Components kein `Date.now()`/`Math.random()` im Render; dynamische Daten in `<Suspense>` oder `use cache`.
- Grids immer mit expliziter Mobil-Spalte (`grid-cols-1 lg:grid-cols-[…]`), sonst sprengen Inputs das Layout.

## Prüfen (vor jeder Übergabe)
```
npm run lint
npm run typecheck
npm run build
```
oder `npm run check`.
