import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

// Title/description kept from the live page (18.10.2026).
export const metadata = pageMetadata({
  title: "Kontakt Gold Sohn | Goldankauf Wiesbaden",
  description: "Nehmen Sie Kontakt mit Gold Sohn auf – Ihr Ansprechpartner für Gold, Silber, Platin & Luxusuhren im Rhein-Main-Gebiet.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title={["Wir kümmern uns ", { em: "um Sie." }]}
        lead="Sichern Sie sich Ihre kostenlose und unverbindliche Bewertung – wir beantworten Ihre Fragen gern."
        crumbs={[{ name: "Kontakt", path: "/contact/" }]}
        cta={null}
      />
      <section className="section bg-white" aria-label="Kontaktmöglichkeiten">
        <div className="container-luxe grid grid-cols-1 items-start gap-10 sm:gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-14 xl:gap-20">
          <Reveal stagger={0.08} className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-1">
            {[
              { icon: Phone, k: "Telefon", v: site.phone, href: site.phoneHref },
              { icon: Mail, k: "E-Mail", v: site.email, href: `mailto:${site.email}` },
              { icon: MapPin, k: "Standort", v: site.city, href: undefined },
            ].map(({ icon: Icon, k, v, href }) => (
              <div key={k} className="card-cream flex min-w-0 items-center gap-4 p-5 sm:gap-5 sm:p-6">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-gold-ink shadow-[inset_0_0_0_1px_rgba(197,160,100,.5)]">
                  <Icon aria-hidden strokeWidth={1.4} className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-[0.2em] text-ink-2">{k}</span>
                  {href ? (
                    <a href={href} className="block break-words font-serif text-[19px] text-ink-strong sm:text-[21px]">
                      {v}
                    </a>
                  ) : (
                    <span className="block font-serif text-[19px] text-ink-strong sm:text-[21px]">{v}</span>
                  )}
                </span>
              </div>
            ))}
            <p className="text-sm leading-relaxed text-ink-2 md:col-span-2 lg:col-span-1">{site.onlineNotice}</p>
          </Reveal>
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
