import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ShippingSection } from "@/components/sections/ShippingSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Edelmetalle selbst versenden | Gold Sohn",
  description: "Gold, Silber, Platin oder Palladium selbst an Gold Sohn versenden – zum Beispiel per Einschreiben. So melden Sie Ihre Sendung an.",
  path: "/selbstversand/",
});

const tips = [
  "Melden Sie Ihre Sendung vorab über das Formular an, damit wir sie zuordnen können.",
  "Versenden Sie versichert, zum Beispiel per Einschreiben, und bewahren Sie den Beleg auf.",
  "Verpacken Sie Ihre Wertgegenstände sicher und unauffällig.",
  "Bei Edelmetallen mit einem Wert über 500 € empfehlen wir unser Premium-Paket.",
];

export default function SelbstversandPage() {
  return (
    <>
      <PageHero
        eyebrow="Selbstversand"
        title={["Selbst ", { em: "versenden" }]}
        lead="Sie möchten Ihre Edelmetalle selbst an uns senden? Melden Sie Ihre Sendung an – nach der Prüfung erhalten Sie Ihr Angebot."
        crumbs={[{ name: "Selbstversand", path: "/selbstversand/" }]}
        image={images.argorHeraeus}
        imageAlt="Goldbarren und Platinbarren"
        cta={{ label: "Sendung anmelden", href: "#versandtasche" }}
      />
      <section className="section bg-white" aria-label="Hinweise zum Versand">
        <div className="container-luxe">
          <SectionHeader eyebrow="Hinweise" title={["So versenden Sie ", { em: "sicher" }]} />
          <Reveal stagger={0.08} className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
            {tips.map((t) => (
              <div key={t} className="flex items-start gap-3.5 rounded-[20px] bg-cream p-5 text-[15px] leading-relaxed text-ink-strong sm:gap-4 sm:rounded-[22px] sm:p-6 sm:text-base">
                <Check aria-hidden strokeWidth={1.5} className="mt-1 size-5 shrink-0 text-gold-ink" />
                {t}
              </div>
            ))}
          </Reveal>
          <p className="mt-8 rounded-xl border border-dashed border-gold/70 bg-cream px-4 py-3 text-sm text-gold-ink">
            [Bitte ergänzen: Versandadresse für den Selbstversand und Hinweise zur Versicherung – diese Angaben stehen auf der aktuellen Website nicht.]
          </p>
        </div>
      </section>
      <ShippingSection method="selbstversand" title={["Sendung ", { em: "anmelden." }]} lead="Wählen Sie „Selbst versenden“ und hinterlassen Sie Ihre Kontaktdaten." />
    </>
  );
}
