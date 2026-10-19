"use client";

import { useRef, type ElementType } from "react";
import { EASE, MOTION_OK, gsap, replay, useGSAP } from "@/lib/gsap";

/** Heading content: plain strings and `{ em: "…" }` parts rendered in gold italic. */
export type HeadingPart = string | { em: string };

interface SplitHeadingProps {
  parts: HeadingPart[];
  as?: ElementType;
  className?: string;
  /** "scroll" (default) reveals on scroll, "load" plays immediately. */
  trigger?: "scroll" | "load";
  delay?: number;
  id?: string;
}

function toWords(parts: HeadingPart[]) {
  const words: { text: string; em: boolean }[] = [];
  for (const part of parts) {
    const em = typeof part !== "string";
    const text = typeof part === "string" ? part : part.em;
    for (const w of text.split(/\s+/).filter(Boolean)) words.push({ text: w, em });
  }
  return words;
}

export function headingText(parts: HeadingPart[]) {
  return parts.map((p) => (typeof p === "string" ? p : p.em)).join("").replace(/\s+/g, " ").trim();
}

/** Word-by-word masked reveal – the signature typographic motion of the site. */
export function SplitHeading({ parts, as: Tag = "h2", className, trigger = "scroll", delay = 0, id }: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const words = toWords(parts);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(el.querySelectorAll("[data-word]"), {
          yPercent: 115,
          rotate: 4,
          duration: 1.35,
          ease: EASE,
          stagger: 0.06,
          delay,
          scrollTrigger: trigger === "scroll" ? replay(el) : undefined,
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} aria-label={headingText(parts)} id={id}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-top">
            <span data-word className="inline-block will-change-transform">
              {w.em ? <em>{w.text}</em> : w.text}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
