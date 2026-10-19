"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import type { FaqItem } from "@/lib/content/faq";

interface FaqAccordionProps {
  items: FaqItem[];
  defaultOpen?: number;
}

/** One-open-at-a-time accordion with height and icon transitions (Motion). */
export function FaqAccordion({ items, defaultOpen = 0 }: FaqAccordionProps) {
  const [open, setOpen] = useState<number>(defaultOpen);
  const reduce = useReducedMotion();
  const uid = useId();

  return (
    <div className="border-t border-[rgba(197,160,100,.45)]">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${uid}-b${i}`;
        const panelId = `${uid}-p${i}`;
        return (
          <motion.div
            key={item.q}
            className="border-b border-[rgba(197,160,100,.45)]"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-5%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: Math.min(i, 6) * 0.05 }}
          >
            <h3 className="m-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex min-h-[72px] w-full items-center justify-between gap-4 py-4 text-left font-serif text-[18.5px] leading-snug text-ink-strong transition-colors hover:text-gold-ink sm:min-h-[80px] sm:gap-6 sm:py-5 sm:text-[22px] lg:text-[23px]"
              >
                {item.q}
                <span
                  aria-hidden
                  className={`relative size-10 shrink-0 rounded-full sm:size-11 transition-[background,box-shadow] duration-500 ${isOpen ? "bg-gold" : "shadow-[inset_0_0_0_1px_rgba(197,160,100,.7)]"}`}
                >
                  <span className={`absolute left-1/2 top-1/2 h-[1.5px] w-3.5 -translate-x-1/2 -translate-y-1/2 ${isOpen ? "bg-[#241F19]" : "bg-gold-ink"}`} />
                  <motion.span
                    className={`absolute left-1/2 top-1/2 h-[1.5px] w-3.5 -translate-x-1/2 -translate-y-1/2 ${isOpen ? "bg-[#241F19]" : "bg-gold-ink"}`}
                    animate={{ rotate: isOpen ? 0 : 90 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  key="panel"
                  className="overflow-hidden"
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.p
                    className="pb-6 pr-1 text-[15px] leading-[1.75] text-ink-2 sm:pb-7 sm:pr-16 sm:text-base"
                    initial={reduce ? false : { y: 14 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                  >
                    {item.a}
                  </motion.p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
