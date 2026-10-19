import { GoldCalculator } from "@/components/calculator/GoldCalculator";
import { Reveal } from "@/components/motion/Reveal";
import { PriceBoard } from "@/components/prices/PriceBoard";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { pageMetadata } from "@/lib/seo";

// Title/description kept from the live page (18.10.2026).
export const metadata = pageMetadata({
  title: "Aktuelle Gold, Silber | Gold Sohn",
  description: "Verfolgen Sie die tagesaktuellen Preise für Gold, Silber, Platin & Palladium und verkaufen Sie sicher zu Top-Konditionen.",
  path: "/preise/",
});

export default function PreisePage() {
  return (
    <>
      <PageHero
        eyebrow="Edelmetallpreise"
        title={["Aktuelle ", { em: "Preise" }]}
        lead="Ankaufspreise je Gramm für Gold, Zahngold, Silber, Platin und Palladium – gestaffelt nach Feingehalt. Die endgültige Bewertung erfolgt nach der hauseigenen Prüfung."
        crumbs={[{ name: "Preise", path: "/preise/" }]}
        cta={{ label: "Versandtasche anfordern", href: "/versandtasche/" }}
      />
      <section className="section bg-white" aria-label="Preistabellen">
        <div className="container-luxe">
          <PriceBoard full />
        </div>
      </section>
      <section className="section bg-cream" aria-label="Goldrechner">
        <div className="container-luxe">
          <SectionHeader eyebrow="Goldrechner" title={["Ihren Wert ", { em: "berechnen" }]} />
          <Reveal>
            <GoldCalculator />
          </Reveal>
        </div>
      </section>
    </>
  );
}
