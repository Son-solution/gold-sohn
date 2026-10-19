"use client";

import { useRef, type ReactNode } from "react";
import { MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

/** Final page transition: the footer content rises out of the page as it is reached. */
export function FooterRise({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(el, { yPercent: -10 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "top 30%", scrub: true } });
        const mark = el.querySelector("[data-footer-mark]");
        if (mark) {
          gsap.fromTo(mark, { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, ease: "none", scrollTrigger: { trigger: mark, start: "top bottom", end: "bottom bottom", scrub: true } });
        }
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
