import Link from "next/link";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqCategories } from "@/lib/content/faq";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

// Title/description kept from the live page (18.10.2026).
export const metadata = pageMetadata({
  title: "FAQ Gold Sohn | Goldankauf Wiesbaden",
  description: "Gold Sohn Wiesbaden – sicher & fair Gold, Silber, Platin & Luxusuhren verkaufen. Top-Preise, sofortige Auszahlung & transparente Abwicklung",
  path: "/faq/",
});

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title={["Häufige ", { em: "Fragen" }]} lead="Antworten rund um Goldankauf, Silber, Zahngold, Platin, Palladium, Münzen, Barren, Luxusuhren, Ablauf und Versand." crumbs={[{ name: "FAQ", path: "/faq/" }]} cta={null}>
        <nav aria-label="FAQ-Kategorien" className="flex flex-wrap gap-2 max-sm:justify-center">
          {faqCategories.map((c) => (
            <Link key={c.id} href={`#${c.id}`} className="inline-flex min-h-10 items-center rounded-full bg-white px-4 py-2 text-sm text-ink-strong shadow-[inset_0_0_0_1px_rgba(197,160,100,.35)] hover:bg-pearl">
              {c.title}
            </Link>
          ))}
        </nav>
      </PageHero>
      {faqCategories.map((c, i) => (
        <section key={c.id} id={c.id} aria-labelledby={`${c.id}-t`} className={`section ${i % 2 ? "bg-cream" : "bg-white"}`}>
          <div className="container-luxe grid grid-cols-1 items-start gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <Reveal>
              <h2 id={`${c.id}-t`} className="h-display max-sm:text-center lg:sticky lg:top-32">
                {c.title}
              </h2>
            </Reveal>
            <FaqAccordion items={c.items} defaultOpen={-1} />
          </div>
        </section>
      ))}
      <JsonLd data={faqJsonLd(faqCategories.flatMap((c) => c.items))} />
    </>
  );
}
