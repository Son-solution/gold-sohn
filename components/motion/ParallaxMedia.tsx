"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, type ReactNode } from "react";
import { MOTION_OK, gsap, replay, useGSAP } from "@/lib/gsap";

interface ParallaxMediaProps {
  src: StaticImageData;
  alt: string;
  className?: string;
  sizes?: string;
  /** Mask the image open as it scrolls into view. */
  mask?: "inset" | "arch" | "none";
  /** Parallax travel in % of the image height. */
  travel?: number;
  priority?: boolean;
  objectPosition?: string;
  children?: ReactNode;
}

/** Image with a masked scroll reveal and a soft parallax drift. */
export function ParallaxMedia({
  src,
  alt,
  className = "",
  sizes = "100vw",
  mask = "inset",
  travel = 8,
  priority,
  objectPosition = "50% 50%",
  children,
}: ParallaxMediaProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const img = el.querySelector("[data-parallax]");
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        if (mask === "inset") {
          gsap.fromTo(
            el,
            { clipPath: "inset(10% 8% 10% 8% round 36px)" },
            { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: el, start: "top 95%", end: "top 25%", scrub: 1 } },
          );
        } else if (mask === "arch") {
          gsap.fromTo(
            el,
            { clipPath: "inset(30% 12% 0% 12% round 999px 999px 32px 32px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 999px 999px 32px 32px)",
              duration: 1.8,
              ease: "expo.inOut",
              scrollTrigger: replay(el, "top 85%"),
            },
          );
        }
        if (img && travel) {
          gsap.fromTo(
            img,
            { yPercent: -travel, scale: 1.12 },
            { yPercent: travel, scale: 1.04, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
          );
        }
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div data-parallax className="absolute inset-[-6%] will-change-transform">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} placeholder="blur" className="object-cover" style={{ objectPosition }} />
      </div>
      {children}
    </div>
  );
}
