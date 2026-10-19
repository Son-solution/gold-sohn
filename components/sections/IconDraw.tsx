"use client";

import { useRef, type ReactNode } from "react";
import { EASE, MOTION_OK, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

/** Staggered card reveal; the line icons inside draw themselves (stroke-dashoffset). */
export function IconDraw({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-benefit]", el);
        const tls = new Map<Element, gsap.core.Timeline>();
        cards.forEach((card) => {
          const tl = gsap.timeline({ paused: true }).from(card, { y: 60, autoAlpha: 0, duration: 1.2, ease: EASE });
          card.querySelectorAll<SVGGeometryElement>("svg path, svg circle, svg rect, svg line, svg polyline").forEach((p) => {
            const len = typeof p.getTotalLength === "function" ? p.getTotalLength() : 60;
            tl.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 0.25);
          });
          tls.set(card, tl);
        });
        // Replays in both scroll directions
        const show = (batch: Element[]) => batch.forEach((c, i) => tls.get(c)?.delay(i * 0.1).restart(true));
        const hide = (batch: Element[]) => batch.forEach((c) => tls.get(c)?.reverse());
        ScrollTrigger.batch(cards, { start: "top 88%", end: "bottom 12%", onEnter: show, onEnterBack: show, onLeave: hide, onLeaveBack: hide });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
