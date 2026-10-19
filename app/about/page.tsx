import { CategoryGrid } from "@/components/home/CategoryGrid";
import { AboutSection } from "@/components/sections/AboutSection";
import { PageHero } from "@/components/sections/PageHero";
import { TrustSection } from "@/components/sections/TrustSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { pageMetadata } from "@/lib/seo";

// Title/description kept from the live page (18.10.2026).
export const metadata = pageMetadata({
  title: "Über Gold Sohn | Ihr zuverlässiger Edelmetall-Partner",
  description: "Lernen Sie Gold Sohn kennen – Ihr vertrauensvoller Partner für Goldankauf, Silber, Platin und Luxusuhren in Wiesbaden",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Über uns"
        title={["Über ", { em: "Gold Sohn" }]}
        lead="Vertrauensvoller Goldverkauf – online, sicher und persönlich betreut."
        crumbs={[{ name: "Über uns", path: "/about/" }]}
      />
      <AboutSection withLink={false} />
      <section className="bg-white pb-16">
        <div className="container-luxe">
          <p className="rounded-xl border border-dashed border-gold/70 bg-cream px-4 py-3 text-sm text-gold-ink">
            [Platzhalter: Gründungsgeschichte, Team und Werte – bitte Inhalte und Fotos liefern.]
          </p>
        </div>
      </section>
      <TrustSection />
      <section className="section bg-cream" aria-label="Ankauf">
        <div className="container-luxe">
          <SectionHeader eyebrow="Ankauf" title={["Was wir ", { em: "ankaufen." }]} />
          <CategoryGrid />
        </div>
      </section>
    </>
  );
}
