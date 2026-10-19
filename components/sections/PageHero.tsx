import type { StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading, type HeadingPart } from "@/components/motion/SplitHeading";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";

interface PageHeroProps {
  eyebrow: string;
  title: HeadingPart[];
  lead?: ReactNode;
  crumbs: Crumb[];
  image?: StaticImageData;
  imageAlt?: string;
  cta?: { label: string; href: string } | null;
  children?: ReactNode;
}

/** Sub-page hero: editorial headline left, masked parallax photo right. */
export function PageHero({ eyebrow, title, lead, crumbs, image, imageAlt = "", cta = { label: "Versandtasche anfordern", href: "/versandtasche/" }, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-cream pb-14 pt-28 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
      <div className={`container-luxe grid grid-cols-1 items-center gap-10 sm:gap-12 ${image ? "lg:grid-cols-[1.05fr_.95fr] lg:gap-16" : ""}`}>
        <div className="m-center flex min-w-0 flex-col gap-5 sm:gap-7">
          <Reveal>
            <Breadcrumbs items={crumbs} />
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">{eyebrow}</span>
          </Reveal>
          <SplitHeading as="h1" parts={title} trigger="load" delay={0.2} className="h-page" />
          {lead ? (
            <Reveal delay={0.45}>
              <div className="lead">{lead}</div>
            </Reveal>
          ) : null}
          {cta || children ? (
            <Reveal delay={0.6} className="btn-row gap-3">
              {cta ? (
                <Link href={cta.href} className="btn btn-gold">
                  {cta.label} <ArrowRight aria-hidden />
                </Link>
              ) : null}
              {children}
            </Reveal>
          ) : null}
        </div>
        {image ? (
          <ParallaxMedia
            src={image}
            alt={imageAlt}
            priority
            sizes="(min-width:1024px) 45vw, 100vw"
            className="aspect-[4/3] w-full rounded-[24px] shadow-[0_60px_100px_-60px_rgba(60,40,10,.6)] sm:rounded-[32px] md:aspect-[16/10] lg:aspect-[4/5]"
            travel={6}
            mask="none"
          />
        ) : null}
      </div>
    </section>
  );
}
