"use client";

import { useRef } from "react";
import { MOTION_OK, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
}

/** Counts to `to` when scrolled into view. The final value is rendered on the server. */
export function CountUp({ to, from = 0, duration = 2.2, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = new Intl.NumberFormat("de-DE");

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const state = { v: from };
        const count = gsap.to(state, {
          v: to,
          duration,
          ease: "power3.out",
          paused: true,
          onUpdate: () => {
            el.textContent = fmt.format(Math.round(state.v));
          },
        });
        // Counts again every time it scrolls into view (down or up)
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          end: "bottom 10%",
          onEnter: () => count.restart(),
          onEnterBack: () => count.restart(),
        });
        el.textContent = fmt.format(from);
        return () => {
          st.kill();
          el.textContent = fmt.format(to);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {fmt.format(to)}
    </span>
  );
}
