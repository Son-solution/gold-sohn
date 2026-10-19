import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { FooterRise } from "./FooterRise";
import { images } from "@/lib/images";
import { companyNav, legalNav, serviceNav } from "@/lib/navigation";
import { services } from "@/lib/content/services";
import { copyrightYear, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-pearl" aria-labelledby="footer-cta">
      <FooterRise>
        <div className="container-luxe pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-16 sm:pt-24 lg:pt-28">
          <div className="m-center flex flex-col gap-8 border-b border-ink/15 pb-12 sm:pb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <SplitHeading id="footer-cta" parts={["Bereit, Ihr Gold ", { em: "zu verkaufen?" }]} className="text-[clamp(1.9rem,1.2rem+4.2vw,5rem)] leading-none" />
            <Reveal className="btn-row gap-3 lg:shrink-0">
              <Link href="/versandtasche/" className="btn btn-gold">
                Versandtasche anfordern <ArrowRight aria-hidden />
              </Link>
              <Link href="/goldrechner/" className="btn btn-line">
                Zum Goldrechner
              </Link>
            </Reveal>
          </div>

          <Reveal stagger={0.08} className="m-center grid grid-cols-2 gap-x-6 gap-y-10 py-12 sm:py-14 md:grid-cols-4 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-x-8">
            <div className="col-span-2 flex flex-col gap-4 max-sm:items-center md:col-span-4 lg:col-span-1">
              <Image src={images.logo} alt="Gold Sohn" className="h-7 w-auto self-start max-sm:self-center sm:h-8" />
              <p className="max-w-xs text-[14px] leading-relaxed text-ink-2 sm:text-[15px]">
                Goldankauf &amp; Edelmetallankauf im Versand – sicher, transparent und zu fairen Preisen.
              </p>
            </div>
            <FooterCol title="Ankauf" links={services.map((s) => ({ label: s.navLabel, href: s.path }))} />
            <FooterCol title="Service" links={serviceNav} />
            <FooterCol title="Gold Sohn" links={companyNav} />
            <div className="flex min-w-0 flex-col gap-2.5 max-sm:items-center">
              <h2 className="mb-2 font-sans text-xs font-medium uppercase tracking-[0.22em] text-ink-2">Kontakt</h2>
              <a href={site.phoneHref} className="link-underline w-fit py-0.5 text-[15px] text-ink-strong">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="link-underline w-fit break-all py-0.5 text-[14px] text-ink-strong sm:text-[15px]">
                {site.email}
              </a>
              <p className="text-[15px] text-ink-2">{site.city}</p>
            </div>
          </Reveal>

          <div className="flex flex-col-reverse items-center gap-4 border-t border-ink/15 pt-7 text-center text-[13px] text-ink-2 sm:flex-row sm:justify-between sm:text-left">
            <span>
              © {copyrightYear} {site.name}
            </span>
            <nav aria-label="Rechtliches" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {legalNav.map((l) => (
                <Link key={l.href} href={l.href} className="link-underline hover:text-ink-strong">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div aria-hidden="true" data-footer-mark className="select-none whitespace-nowrap pt-6 text-center font-serif text-[clamp(4.5rem,17vw,17rem)] leading-[0.8] tracking-[-0.04em] text-gold/20">
          Gold Sohn
        </div>
      </FooterRise>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="flex min-w-0 flex-col gap-2.5 max-sm:items-center">
      <h2 className="mb-2 font-sans text-xs font-medium uppercase tracking-[0.22em] text-ink-2">{title}</h2>
      {links.map((l) => (
        <Link key={l.href + l.label} href={l.href} className="link-underline w-fit py-0.5 text-[14px] text-ink-strong sm:text-[15px]">
          {l.label}
        </Link>
      ))}
    </div>
  );
}
