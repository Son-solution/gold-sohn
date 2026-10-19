import { PageHero } from "@/components/sections/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ShippingSection } from "@/components/sections/ShippingSection";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Versandtasche anfordern – kostenlos & versichert | Gold Sohn",
  description: "Fordern Sie Ihre kostenlose, versicherte Versandtasche an und verkaufen Sie Gold, Silber, Platin und Palladium bequem per Post. Premium-Paket ab 500 € Warenwert.",
  path: "/versandtasche/",
});

export default function VersandtaschePage() {
  return (
    <>
      <PageHero
        eyebrow="Versandtasche"
        title={["Versandtasche ", { em: "anfordern" }]}
        lead="Kostenlos, unverbindlich und versichert. Sie entscheiden erst, wenn Ihr Angebot vorliegt."
        crumbs={[{ name: "Versandtasche", path: "/versandtasche/" }]}
        image={images.goldbarrenMuenzen}
        imageAlt="Goldbarren und Goldmünzen"
        cta={{ label: "Zum Formular", href: "#versandtasche" }}
      />
      <ShippingSection title={["In drei Schritten zur ", { em: "Versandtasche." }]} />
      <ProcessSection />
    </>
  );
}
