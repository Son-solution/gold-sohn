import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { cities, cityPath, states } from "@/lib/content/cities";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Goldankauf in ganz Deutschland – Standorte | Gold Sohn",
  description: "Gold, Silber, Platin und Palladium aus ganz Deutschland verkaufen: Gold Sohn kauft per versicherter Versandtasche an. Übersicht aller Regionen.",
  path: "/standorte/",
});

export default function StandortePage() {
  return (
    <>
      <PageHero
        eyebrow="Standorte"
        title={["Goldankauf in ", { em: "ganz Deutschland" }]}
        lead={`${site.onlineNotice} Mit unserer versicherten Versandtasche verkaufen Sie Ihre Edelmetalle bequem von zu Hause.`}
        crumbs={[{ name: "Standorte", path: "/standorte/" }]}
      />
      <section className="section bg-white" aria-label="Regionen">
        <div className="container-luxe grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3">
          {states.map((state) => (
            <Reveal key={state} className="m-center flex min-w-0 flex-col gap-3 sm:gap-4">
              <h2 className="border-b border-pearl pb-3 text-[22px] sm:text-[26px]">{state}</h2>
              <ul className="flex flex-col gap-1.5">
                {cities
                  .filter((c) => c.state === state)
                  .map((c) => (
                    <li key={c.slug}>
                      <Link href={cityPath(c.slug)} className="link-underline text-[15px] text-ink-strong">
                        Goldankauf {c.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
