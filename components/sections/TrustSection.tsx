import { Banknote, Package, Scale, ShieldCheck, TrendingUp, UserCheck } from "lucide-react";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IconDraw } from "./IconDraw";

const benefits = [
  { icon: Scale, title: "Kostenlose Bewertung", text: "Ihre Wertgegenstände werden professionell geprüft und bewertet – ohne Kosten und unverbindlich." },
  { icon: Package, title: "Versicherte Versandtasche", text: "Fordern Sie Ihre kostenlose Versandtasche online an und senden Sie bequem von zu Hause." },
  { icon: Banknote, title: "Sofortige Auszahlung", text: "Stimmen Sie unserem Preisvorschlag zu, erfolgt die Auszahlung sofort." },
  { icon: TrendingUp, title: "Transparente Preise", text: "Ihr Angebot entsteht auf Basis des aktuellen Edelmetallkurses und unserer hauseigenen Prüfung." },
  { icon: ShieldCheck, title: "Diskrete Abwicklung", text: "Vom Versand bis zur Auszahlung behandeln wir Ihren Auftrag vertraulich und nachvollziehbar." },
  { icon: UserCheck, title: "Sie entscheiden selbst", text: "Ihr Angebot erhalten Sie per E-Mail oder telefonisch – ganz nach Ihrem Wunsch." },
];

const counters = [
  { to: 0, from: 250, unit: "€", text: "Kosten für Bewertung und Versandtasche" },
  { to: 4, from: 0, unit: "Schritte", text: "Von der Versandtasche bis zur Auszahlung" },
  { to: 500, from: 0, unit: "€", text: "Ab diesem Warenwert gibt es das Premium-Paket" },
];

export function TrustSection({ overlap = false }: { overlap?: boolean }) {
  return (
    <section
      aria-labelledby="vorteile-titel"
      className={`section relative z-[3] bg-white ${overlap ? "-mt-8 rounded-t-[32px] lg:-mt-11 lg:rounded-t-[44px]" : ""}`}
    >
      <div className="container-luxe">
        <SectionHeader eyebrow="Warum Gold Sohn" title={["Vertrauen, das man ", { em: "wiegen" }, " kann."]} />
        <span id="vorteile-titel" className="sr-only">
          Vorteile
        </span>
        <Reveal stagger={0.12} className="mb-14 grid grid-cols-1 border-y border-pearl sm:mb-20 md:grid-cols-3 lg:mb-24">
          {counters.map((c, i) => (
            <div key={c.text} className={`flex flex-col items-center gap-2 py-6 text-center md:items-start md:gap-2.5 md:text-left md:py-9 lg:py-10 ${i ? "border-t border-pearl md:border-l md:border-t-0 md:pl-6 lg:pl-10" : "md:pr-6 lg:pr-9"}`}>
              <div className="font-serif text-[clamp(2.5rem,1.4rem+4.8vw,5.4rem)] leading-none tracking-[-0.03em] text-ink-strong tabular-nums">
                <CountUp to={c.to} from={c.from} />
                <small className="ml-1.5 text-[0.42em] text-gold-ink">{c.unit}</small>
              </div>
              <p className="max-w-[280px] text-[15px] text-ink-2 sm:text-base">{c.text}</p>
            </div>
          ))}
        </Reveal>
        <IconDraw className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }) => (
            <article key={title} data-benefit className="card-cream group flex flex-col items-center gap-3 p-6 text-center sm:items-start sm:gap-3.5 sm:text-left sm:p-8 lg:p-9">
              <span className="mb-1 flex size-12 items-center sm:mb-2 sm:size-14 justify-center rounded-full bg-white text-gold-ink shadow-[inset_0_0_0_1px_rgba(197,160,100,.5)] transition-[rotate,scale] duration-700 group-hover:-rotate-[8deg] group-hover:scale-105">
                <Icon aria-hidden strokeWidth={1.3} className="size-6" />
              </span>
              <h3 className="text-[20px] leading-tight sm:text-[24px] lg:text-[26px]">{title}</h3>
              <p className="text-[14.5px] text-ink-2 sm:text-base">{text}</p>
            </article>
          ))}
        </IconDraw>
      </div>
    </section>
  );
}
