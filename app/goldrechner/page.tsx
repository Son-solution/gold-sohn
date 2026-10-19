import { GoldCalculator } from "@/components/calculator/GoldCalculator";
import { Reveal } from "@/components/motion/Reveal";
import { PriceBoard } from "@/components/prices/PriceBoard";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Goldrechner – Wert von Gold, Silber & Platin berechnen | Gold Sohn",
  description: "Berechnen Sie mit dem Goldrechner von Gold Sohn den ungefähren Wert Ihres Goldes, Zahngoldes, Silbers, Platins oder Palladiums nach Feingehalt und Gewicht.",
  path: "/goldrechner/",
});

export default function GoldrechnerPage() {
  return (
    <>
      <PageHero
        eyebrow="Goldrechner"
        title={["Was ist Ihr Gold ", { em: "wert?" }]}
        lead="Wählen Sie Metall, Feingehalt und Gewicht. Der Wert ergibt sich aus Gewicht × Ankaufspreis je Gramm für den gewählten Feingehalt – 585er Gold enthält zum Beispiel 58,5 % Feingold."
        crumbs={[{ name: "Goldrechner", path: "/goldrechner/" }]}
        cta={null}
      />
      <section className="section bg-white" aria-label="Rechner">
        <div className="container-luxe">
          <Reveal>
            <GoldCalculator />
          </Reveal>
        </div>
      </section>
      <section className="section bg-cream" aria-label="Preise">
        <div className="container-luxe">
          <SectionHeader eyebrow="Preise" title={["Preise je ", { em: "Feingehalt" }]} />
          <PriceBoard />
        </div>
      </section>
    </>
  );
}
