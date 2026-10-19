import Link from "next/link";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { Reveal } from "@/components/motion/Reveal";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { QuoteScrub } from "./QuoteScrub";

export function AboutSection({ as = "h2", withLink = true }: { as?: "h1" | "h2"; withLink?: boolean }) {
  const Heading = as;
  return (
    <section id="ueber-uns" aria-labelledby="about-title" className="section bg-white">
      <div className="container-luxe grid grid-cols-1 items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-[90px]">
        <ParallaxMedia
          src={images.goldschmuckSchale}
          alt="Schale mit Goldschmuck: Ringe, Ketten und Anhänger"
          mask="arch"
          sizes="(min-width:1024px) 45vw, 90vw"
          className="mx-auto aspect-[4/5] w-full max-w-[min(420px,85vw)] rounded-[999px_999px_28px_28px] sm:max-w-[480px] sm:rounded-[999px_999px_32px_32px] shadow-[0_60px_100px_-60px_rgba(60,40,10,.6)] lg:max-w-none"
        />
        <div className="m-center flex min-w-0 flex-col gap-6 sm:gap-7">
          <Reveal>
            <Heading id="about-title" className="eyebrow !font-sans !text-xs !font-medium">
              Über Gold Sohn
            </Heading>
          </Reveal>
          <QuoteScrub text="„Ihr zuverlässiger Partner für den sicheren Edelmetall-Versandankauf.“" className="font-serif text-[clamp(1.4rem,1.05rem+1.9vw,2.6rem)] italic leading-[1.22] text-ink-strong" />
          <Reveal className="flex flex-col gap-5">
            <p className="lead">
              Gold Sohn ist auf den Ankauf von Gold und Edelmetallen spezialisiert – als Online-Versandankauf mit Sitz in {site.city}. Wir kaufen Gold, Silber, Platin, Palladium, Schmuck,
              Zahngold, Münzen, Barren und Luxusuhren an: transparent bewertet, diskret abgewickelt, schnell ausgezahlt.
            </p>
            <p className="lead">
              Entstanden ist Gold Sohn aus dem Wunsch, den Verkauf von Wertgegenständen einfacher zu machen: mit einer Online-Lösung, die Komfort und Sicherheit verbindet –
              und mit Werten wie Vertrauen und Zuverlässigkeit.
            </p>
          </Reveal>
          <Reveal stagger={0.06} className="grid grid-cols-1 border-t border-pearl sm:grid-cols-2">
            {[
              ["Telefon", site.phone],
              ["E-Mail", site.email],
              ["Standort", site.city],
              ["Ankauf", "Online im Versand"],
            ].map(([k, v]) => (
              <div key={k} className="flex min-w-0 flex-col gap-1.5 border-b border-pearl py-4 sm:py-5 sm:odd:pr-5">
                <span className="text-xs uppercase tracking-[0.2em] text-ink-2">{k}</span>
                <b className="select-all break-words font-serif text-[18px] sm:text-[21px] font-normal text-ink-strong">{v}</b>
              </div>
            ))}
          </Reveal>
          {withLink ? (
            <Reveal>
              <Link href="/about/" className="btn btn-line">
                Mehr über Gold Sohn
              </Link>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
