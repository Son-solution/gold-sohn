import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { GoldCalculator } from "@/components/calculator/GoldCalculator";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { PriceBoard } from "@/components/prices/PriceBoard";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqFor } from "@/lib/content/faq";
import { getService } from "@/lib/content/services";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export function serviceMetadata(slug: string): Metadata {
  const s = getService(slug);
  return pageMetadata({ title: s.meta.title, description: s.meta.description, path: s.path });
}

function splitH1(h1: string) {
  const marker = " bei Gold Sohn";
  return h1.endsWith(marker) ? [h1.slice(0, -marker.length) + " bei ", { em: "Gold Sohn" }] : [h1];
}

export function ServicePage({ slug }: { slug: string }) {
  const s = getService(slug);
  const faqs = faqFor(s.faq).flatMap((c) => c.items).slice(0, 8);

  return (
    <>
      <PageHero eyebrow="Ankauf" title={splitH1(s.h1)} lead={s.lead} crumbs={[{ name: s.navLabel, path: s.path }]} image={s.image} imageAlt={s.imageAlt}>
        <Link href="/goldrechner/" className="btn btn-line">
          Wert berechnen
        </Link>
      </PageHero>

      <section className="section bg-white" aria-label={`${s.navLabel} – Informationen`}>
        <div className="container-luxe grid grid-cols-1 gap-10 sm:gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-16 xl:gap-20">
          <div className="m-center min-w-0 lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <span className="eyebrow">{s.navLabel}</span>
            </Reveal>
            <SplitHeading parts={["Wissenswertes ", { em: "vorab." }]} className="h-display mt-5" />
          </div>
          <div className="flex min-w-0 flex-col gap-10 sm:gap-14">
            {s.sections.map((sec) => (
              <Reveal key={sec.h2} className="flex flex-col gap-4 border-t border-pearl pt-7 sm:gap-5 sm:pt-8">
                <h2 className="text-[clamp(1.35rem,1.05rem+1.6vw,2.3rem)] leading-tight max-sm:text-center">{sec.h2}</h2>
                <div className="prose-luxe">
                  {sec.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {sec.bullets ? (
                  <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                    {sec.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-[15px] text-ink-strong sm:text-base">
                        <Check aria-hidden strokeWidth={1.5} className="mt-1 size-4 shrink-0 text-gold-ink" />
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream" aria-label="Wert berechnen">
        <div className="container-luxe">
          <SectionHeader eyebrow="Rechner" title={["Ihren Wert ", { em: "berechnen" }]} lead="Eine erste Orientierung – das verbindliche Angebot erhalten Sie nach der Prüfung." />
          <Reveal>
            <GoldCalculator initialMetal={s.metal} initialPurity={s.purity} />
          </Reveal>
        </div>
      </section>

      <ProcessSection />

      <section className="section bg-cream" aria-label="Aktuelle Preise">
        <div className="container-luxe">
          <SectionHeader eyebrow="Preise" title={["Aktuelle ", { em: "Preise" }]} />
          <PriceBoard />
        </div>
      </section>

      {faqs.length ? (
        <section className="section bg-white" aria-label="Häufige Fragen">
          <div className="container-luxe grid grid-cols-1 items-start gap-8 sm:gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-16 xl:gap-20">
            <SectionHeader eyebrow="FAQ" title={["Fragen zum ", { em: s.navLabel }]}>
              <Reveal>
                <Link href="/faq/" className="btn btn-line">
                  Alle Fragen
                </Link>
              </Reveal>
            </SectionHeader>
            <FaqAccordion items={faqs} />
          </div>
          <JsonLd data={faqJsonLd(faqs)} />
        </section>
      ) : null}

      <section className="section bg-cream" aria-label="Weitere Ankaufsbereiche">
        <div className="container-luxe">
          <SectionHeader eyebrow="Ankauf" title={["Weitere ", { em: "Bereiche" }]} />
          <CategoryGrid exclude={s.slug} />
        </div>
      </section>
    </>
  );
}
