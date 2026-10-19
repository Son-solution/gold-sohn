"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { EASE, MOTION_OK, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";
import { services } from "@/lib/content/services";

/** Ankauf categories: masked image reveal, image zoom-out and staggered captions. */
export function CategoryGrid({ exclude }: { exclude?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const list = services.filter((s) => s.slug !== exclude);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-cat]", el);
        const tls = new Map<Element, gsap.core.Timeline>();
        cards.forEach((card) => {
          const tl = gsap
            .timeline({ paused: true })
            .fromTo(card.querySelector("[data-mask]"), { clipPath: "inset(100% 0% 0% 0% round 26px)" }, { clipPath: "inset(0% 0% 0% 0% round 26px)", duration: 1.5, ease: "expo.inOut" })
            .from(card.querySelector("[data-img]"), { scale: 1.35, duration: 2, ease: EASE }, 0)
            .from(card.querySelectorAll("[data-text] > *"), { y: 24, autoAlpha: 0, duration: 1.1, ease: EASE, stagger: 0.08 }, 0.5);
          tls.set(card, tl);
        });
        // Replays in both scroll directions
        const show = (batch: Element[]) => batch.forEach((c, i) => tls.get(c)?.delay(i * 0.1).restart(true));
        const hide = (batch: Element[]) => batch.forEach((c) => tls.get(c)?.reverse());
        ScrollTrigger.batch(cards, { start: "top 90%", end: "bottom 10%", onEnter: show, onEnterBack: show, onLeave: hide, onLeaveBack: hide });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {list.map((s) => (
        <Link key={s.slug} href={s.path} data-cat className="group flex min-w-0 flex-col gap-3 text-ink-strong sm:gap-4">
          <div data-mask className="relative aspect-[4/5] overflow-hidden rounded-[18px] sm:rounded-[26px] bg-pearl shadow-[0_30px_60px_-44px_rgba(60,40,10,.6)]">
            <div data-img className="absolute inset-0 will-change-transform">
              <Image
                src={s.image}
                alt={s.imageAlt}
                fill
                sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                placeholder="blur"
                className="object-cover transition-[scale] duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.07]"
              />
            </div>
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(246,241,232,0)_55%,rgba(246,241,232,.92)_100%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            <span className="absolute inset-x-5 bottom-4 z-10 hidden sm:flex translate-y-4 items-center justify-between text-xs font-medium uppercase tracking-[0.2em] opacity-0 transition-[translate,opacity] duration-700 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              Mehr erfahren
              <span className="flex size-10 items-center justify-center rounded-full bg-gold">
                <ArrowRight aria-hidden className="size-4" />
              </span>
            </span>
          </div>
          <div data-text className="flex flex-col gap-1 px-0.5 text-center sm:gap-1.5 sm:px-1 sm:text-left">
            <h3 className="flex flex-col items-center gap-0.5 text-[17px] leading-tight min-[400px]:text-[19px] sm:items-stretch sm:flex-row sm:justify-between sm:gap-3 sm:text-[23px] lg:text-[25px]">
              {s.navLabel}
              <small className="shrink-0 font-sans text-[10px] tracking-[0.16em] text-gold-ink sm:pt-2 sm:text-xs">{s.symbol}</small>
            </h3>
            <p className="text-[12.5px] leading-snug text-ink-2 sm:text-[15px] sm:leading-normal">{s.teaser}</p>
          </div>
          <div aria-hidden className="relative h-px overflow-hidden bg-pearl after:absolute after:inset-0 after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-[900ms] group-hover:after:scale-x-100" />
        </Link>
      ))}
    </div>
  );
}
