import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { Reveal } from "@/components/motion/Reveal";
import { PriceBoard } from "@/components/prices/PriceBoard";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cities, cityPath, getCity } from "@/lib/content/cities";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ city: string }> };

/** All historic city URLs are prerendered at build time. */
export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const c = getCity(city);
  if (!c) return {};
  // Title/description pattern of the live city pages (e.g. /goldankauf-kassel/).
  return pageMetadata({
    title: `Goldankauf ${c.name} – Gold & Silber verkaufen | Gold Sohn`,
    description: `Ihr Goldankauf für ${c.name}: Wir kaufen Altgold, Münzen & Edelmetalle zu fairen Preisen. Kostenlose Bewertung, versicherte Versandtasche und sofortige Auszahlung.`,
    path: cityPath(c.slug),
  });
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) notFound();
  const nearby = cities.filter((x) => x.state === c.state && x.slug !== c.slug);

  return (
    <>
      <PageHero
        eyebrow={`Goldankauf · ${c.state}`}
        title={["Goldankauf ", { em: c.name }]}
        lead={`Gold, Silber, Platin, Palladium und Luxusuhren aus ${c.name} sicher verkaufen – bequem per versicherter Versandtasche, transparent bewertet und sofort ausgezahlt.`}
        crumbs={[
          { name: "Standorte", path: "/standorte/" },
          { name: c.name, path: cityPath(c.slug) },
        ]}
        image={images.goldbarrenMuenzen}
        imageAlt="Goldbarren und Goldmünzen"
      >
        <Link href="/goldrechner/" className="btn btn-line">
          Wert berechnen
        </Link>
      </PageHero>

      <section className="bg-cream pb-6" aria-label="Hinweis">
        <div className="container-luxe">
          <Reveal className="flex items-start gap-3.5 rounded-[20px] bg-white p-5 text-[15px] sm:gap-4 sm:rounded-[22px] sm:p-6 leading-relaxed text-ink-strong shadow-[inset_0_0_0_1px_rgba(197,160,100,.4)]">
            <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-gold-ink" />
            <p>
              {site.onlineNotice} Kundinnen und Kunden aus {c.name} verkaufen ihre Edelmetalle bequem per Versand.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-cream" aria-label={`Ankauf in ${c.name}`}>
        <div className="container-luxe">
          <SectionHeader
            eyebrow="Dienstleistungen"
            title={["Wir kaufen ", { em: "Ihr Gold" }, " an"]}
            lead={`Ob Altgold, Schmuck, Münzen, Barren oder Zahngold: Aus ${c.name} senden Sie uns Ihre Wertgegenstände sicher zu. Sie erhalten ein transparentes Angebot auf Basis des aktuellen Edelmetallkurses.`}
          />
          <CategoryGrid />
        </div>
      </section>

      <ProcessSection />

      <section className="section bg-cream" aria-label="Aktuelle Preise">
        <div className="container-luxe">
          <SectionHeader eyebrow="Preise" title={["Aktuelle ", { em: "Preise" }]} />
          <PriceBoard />
        </div>
      </section>

      {nearby.length ? (
        <section className="section bg-white" aria-label={`Goldankauf in ${c.state}`}>
          <div className="container-luxe">
            <SectionHeader eyebrow={c.state} title={["Goldankauf in ", { em: c.state }]} />
            <Reveal stagger={0.02} className="flex flex-wrap gap-2.5 max-sm:justify-center">
              {nearby.map((n) => (
                <Link key={n.slug} href={cityPath(n.slug)} className="rounded-full bg-cream px-4 py-2.5 text-sm text-ink-strong transition-colors hover:bg-pearl">
                  Goldankauf {n.name}
                </Link>
              ))}
            </Reveal>
          </div>
        </section>
      ) : null}
    </>
  );
}
