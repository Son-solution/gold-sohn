/**
 * Existing blog posts (post-sitemap.xml, 18.10.2026). Their content still has to be
 * migrated (e.g. to MDX). Until then these URLs are NOT served by the new app –
 * see docs/SEO-MIGRATION.md before any go-live. Titles are derived from the slugs.
 */
export interface LegacyPost {
  slug: string;
  title: string;
  date?: string;
}

export const legacyPosts: LegacyPost[] = [
  { slug: "goldpreis-aktuell-warum-gold-heute-niedriger-08-07-2026", title: "Goldpreis aktuell: Warum Gold heute niedriger ist", date: "08.07.2026" },
  { slug: "goldpreis-heute-warum-kurs-nicht-stabilisiert-09-07-2026", title: "Goldpreis heute: Warum sich der Kurs nicht stabilisiert", date: "09.07.2026" },
  { slug: "gold-edelmetalle-aktuell-14-07-2026-preise-fallen", title: "Gold & Edelmetalle aktuell: Preise fallen", date: "14.07.2026" },
  { slug: "goldpreis-heute-ruecksetzer-15-07-2026", title: "Goldpreis heute: Rücksetzer", date: "15.07.2026" },
  { slug: "gold-silber-heute-divergenz-21-07-2026", title: "Gold & Silber heute: Divergenz", date: "21.07.2026" },
  { slug: "edelmetalle-steigen-gold-silber-platin-palladium-23-07-2026", title: "Edelmetalle steigen: Gold, Silber, Platin, Palladium", date: "23.07.2026" },
  { slug: "gold-silber-fed-sitzung-28-07-2026", title: "Gold & Silber vor der Fed-Sitzung", date: "28.07.2026" },
  { slug: "goldpreis-seitwaerts-silber-marke-29-07-2026", title: "Goldpreis seitwärts, Silber an wichtiger Marke", date: "29.07.2026" },
  { slug: "silberpreis-heute-rueckgang-erwartungen-31-07-2026", title: "Silberpreis heute: Rückgang und Erwartungen", date: "31.07.2026" },
  { slug: "goldpreis-stagniert-fed-zinserhoehung-04-08-2026", title: "Goldpreis stagniert: Fed und Zinserhöhung", date: "04.08.2026" },
  { slug: "silberpreis-prognose-naechste-monate-erwartungen-boerse", title: "Silberpreis-Prognose: Erwartungen für die nächsten Monate" },
  { slug: "gold-und-silber-warum-die-edelmetallpreise-gemeinsam-steigen-und-fallen", title: "Gold und Silber: Warum die Edelmetallpreise gemeinsam steigen und fallen" },
];
