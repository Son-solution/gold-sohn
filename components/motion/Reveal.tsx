"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { EASE, MOTION_OK, gsap, replay, useGSAP } from "@/lib/gsap";

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Animate each direct child with a stagger instead of the wrapper. */
  stagger?: number;
  y?: number;
  delay?: number;
  id?: string;
}

/** Scroll-triggered fade-up. Content is fully visible without JS or with reduced motion. */
export function Reveal({ children, className, as: Tag = "div", stagger, y = 44, delay = 0, id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const targets = stagger ? Array.from(el.children) : el;
        gsap.from(targets, {
          y,
          autoAlpha: 0,
          duration: 1.25,
          ease: EASE,
          delay,
          stagger: stagger ?? 0,
          scrollTrigger: replay(el),
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}
