import Image from "next/image";
import { Check } from "lucide-react";
import { ShippingForm } from "@/components/forms/ShippingForm";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { images } from "@/lib/images";
import type { ShippingMethod } from "@/lib/forms/schemas";

const points = [
  ["Kostenlos & unverbindlich", "Keine Kosten für Versandtasche und Bewertung."],
  ["Versicherter Versand", "Ihre Sendung reist sicher zu uns."],
  ["Premium-Paket ab 500 €", "Für Edelmetalle mit einem Wert über 500 €."],
];

const thumbs = [
  { src: images.altgold, alt: "Altgold: Ringe, Ketten und Münzen", label: "Altgold" },
  { src: images.goldringe, alt: "Zwei goldene Ringe in einer Schatulle", label: "Ringe" },
  { src: images.goldschmuckSchale, alt: "Goldschmuck in einer Schale", label: "Schmuck" },
  { src: images.goldbarrenMuenzen, alt: "Goldbarren und Münzen", label: "Münzen" },
];

interface ShippingSectionProps {
  as?: "h1" | "h2";
  method?: ShippingMethod;
  title?: Parameters<typeof SectionHeader>[0]["title"];
  lead?: string;
}

export function ShippingSection({
  as = "h2",
  method = "versandtasche",
  title = ["Ihre Versandtasche, ", { em: "kostenfrei" }, " zu Ihnen."],
  lead = "Fordern Sie Ihre Versandtasche an. Sie entscheiden erst, wenn Ihr Angebot vorliegt.",
}: ShippingSectionProps) {
  return (
    <section id="versandtasche" aria-label="Versandtasche anfordern" className="section bg-cream">
      <div className="container-luxe grid grid-cols-1 items-start gap-10 sm:gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-12 xl:gap-[72px]">
        <div className="flex min-w-0 flex-col">
          <SectionHeader as={as} eyebrow="Versandtasche" title={title} lead={lead} className="!mb-8" />
          <Reveal stagger={0.08} className="mb-8 flex flex-col border-t border-[rgba(197,160,100,.32)]">
            {points.map(([t, d]) => (
              <div key={t} className="flex items-start gap-3.5 border-b border-[rgba(197,160,100,.24)] py-4 text-[15px] leading-relaxed text-ink-2 sm:gap-4 sm:text-base">
                <Check aria-hidden strokeWidth={1.4} className="mt-1 size-5 shrink-0 text-gold-ink" />
                <span>
                  <b className="block font-medium text-ink-strong">{t}</b>
                  {d}
                </span>
              </div>
            ))}
          </Reveal>
          <Reveal stagger={0.08} className="grid grid-cols-4 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
            {thumbs.map((t) => (
              <figure key={t.label} className="m-0 flex min-w-0 flex-col gap-2">
                <Image src={t.src} alt={t.alt} sizes="(min-width:640px) 112px, 25vw" className="aspect-square w-full rounded-[14px] object-cover shadow-[0_18px_30px_-20px_rgba(60,40,10,.6)] sm:size-28 sm:rounded-[18px]" />
                <figcaption className="truncate text-[10px] uppercase tracking-[0.1em] text-ink-2 sm:text-xs sm:tracking-[0.12em]">{t.label}</figcaption>
              </figure>
            ))}
          </Reveal>
        </div>
        <Reveal>
          <ShippingForm initialMethod={method} />
        </Reveal>
      </div>
    </section>
  );
}
