import Link from "next/link";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { homeFaq } from "@/lib/content/faq";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "So funktioniert der Goldankauf | Gold Sohn",
  description: "In vier Schritten Gold verkaufen: Versandtasche anfordern, Edelmetalle einsenden, Prüfung und Angebot, sofortige Auszahlung. Mit Erklärvideo.",
  path: "/so-funktionierts/",
});

export default function SoFunktioniertsPage() {
  return (
    <>
      <PageHero
        eyebrow="So funktioniert’s"
        title={["In vier Schritten zu ", { em: "Ihrem Angebot" }]}
        lead="Versandtasche anfordern, einsenden, prüfen lassen, Angebot erhalten. Sie entscheiden selbst."
        crumbs={[{ name: "So funktioniert’s", path: "/so-funktionierts/" }]}
      />
      <ProcessSection />
      <TrustSection />
      <section className="section bg-cream" aria-label="Fragen zum Ablauf">
        <div className="container-luxe grid grid-cols-1 items-start gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <SectionHeader eyebrow="FAQ" title={["Fragen zum ", { em: "Ablauf" }]}>
            <Reveal>
              <Link href="/versandtasche/" className="btn btn-gold">
                Versandtasche anfordern
              </Link>
            </Reveal>
          </SectionHeader>
          <FaqAccordion items={homeFaq} />
        </div>
      </section>
    </>
  );
}
