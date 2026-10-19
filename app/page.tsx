import Link from "next/link";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { Hero } from "@/components/home/Hero";
import { GoldCalculator } from "@/components/calculator/GoldCalculator";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Reveal } from "@/components/motion/Reveal";
import { PriceBoard } from "@/components/prices/PriceBoard";
import { AboutSection } from "@/components/sections/AboutSection";
import { FeatureBand } from "@/components/sections/FeatureBand";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ShippingSection } from "@/components/sections/ShippingSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { homeFaq } from "@/lib/content/faq";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

// Title and description kept from the live homepage (18.10.2026).
export const metadata = pageMetadata({
  title: "Gold Sohn | Goldankauf Wiesbaden",
  description:
    "Gold Sohn Wiesbaden – sicher & fair Gold, Silber, Platin & Luxusuhren verkaufen. Top-Preise, sofortige Auszahlung & transparente Abwicklung.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustSection overlap />
      <FeatureBand />

      <section id="preise" aria-label="Edelmetallpreise" className="section bg-cream">
        <div className="container-luxe">
          <SectionHeader eyebrow="Edelmetallpreise" title={["Der Wert Ihrer Metalle, ", { em: "klar" }, " beziffert."]} />
          <PriceBoard />
          <Reveal className="mt-8">
            <Link href="/preise/" className="btn btn-line">
              Alle Preise nach Feingehalt
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="rechner" aria-label="Goldrechner" className="section bg-white">
        <div className="container-luxe">
          <SectionHeader
            eyebrow="Goldrechner"
            title={["Was ist Ihr Gold ", { em: "wert?" }]}
            lead="Wählen Sie Metall, Feingehalt und Gewicht. Der Rechner zeigt Ihnen eine erste Orientierung."
          />
          <Reveal>
            <GoldCalculator />
          </Reveal>
        </div>
      </section>

      <section id="ankauf" aria-label="Ankauf" className="section bg-cream">
        <div className="container-luxe">
          <SectionHeader
            eyebrow="Ankauf"
            title={["Was wir ", { em: "ankaufen." }]}
            lead="Von Barren bis Bruchgold, von Münzen bis zur Luxusuhr – wir bewerten jedes Stück mit Sorgfalt."
          />
          <CategoryGrid />
        </div>
      </section>

      <ProcessSection />
      <ShippingSection />
      <AboutSection />

      <section id="faq" aria-label="Häufige Fragen" className="section bg-cream">
        <div className="container-luxe grid grid-cols-1 items-start gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <SectionHeader eyebrow="FAQ" title={["Häufige ", { em: "Fragen." }]} lead={`Sie haben eine andere Frage? Rufen Sie uns an (${site.phone}) oder schreiben Sie an ${site.email}.`}>
            <Reveal>
              <Link href="/faq/" className="btn btn-line">
                Alle Fragen &amp; Antworten
              </Link>
            </Reveal>
          </SectionHeader>
          <FaqAccordion items={homeFaq} />
        </div>
      </section>
      <JsonLd data={faqJsonLd(homeFaq.filter((f) => !f.a.includes("[")))} />
    </>
  );
}
