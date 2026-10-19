"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId, useRef, useState } from "react";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { usePrices } from "@/hooks/usePrices";
import { EASE, MOTION_OK, gsap, replay, useGSAP } from "@/lib/gsap";
import { OUNCE_GRAMS, formatEur } from "@/lib/prices/calculator";
import type { MetalId } from "@/lib/prices/types";

type Unit = "g" | "10g" | "oz";
const units: { id: Unit; label: string; factor: number; per: string }[] = [
  { id: "g", label: "Gramm", factor: 1, per: "pro Gramm" },
  { id: "10g", label: "10 g", factor: 10, per: "pro 10 Gramm" },
  { id: "oz", label: "Unze", factor: OUNCE_GRAMS, per: "pro Feinunze" },
];
const featured: MetalId[] = ["gold", "silber", "platin", "palladium"];
const orb: Record<MetalId, string> = {
  gold: "radial-gradient(circle at 30% 30%,#F5DFA6,#C5A064 70%)",
  zahngold: "radial-gradient(circle at 30% 30%,#F1DCA8,#B9965A 70%)",
  silber: "radial-gradient(circle at 30% 30%,#FFFFFF,#C9C9C7 75%)",
  platin: "radial-gradient(circle at 30% 30%,#F6F7F8,#B9BEC3 75%)",
  palladium: "radial-gradient(circle at 30% 30%,#F7F3EE,#BDB4A8 75%)",
};

/** Price cards (highest fineness per metal) + all purity tables when `full`. */
export function PriceBoard({ full = false }: { full?: boolean }) {
  const snapshot = usePrices();
  const reduce = useReducedMotion();
  const uid = useId();
  const [unit, setUnit] = useState<Unit>("g");
  const u = units.find((x) => x.id === unit)!;
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(el.querySelectorAll("[data-card]"), {
          y: 70,
          autoAlpha: 0,
          rotateX: -12,
          transformPerspective: 900,
          duration: 1.3,
          ease: EASE,
          stagger: 0.1,
          scrollTrigger: replay(el, "top 85%"),
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const tables = snapshot.tables;
  const cards = featured.map((m) => tables.find((t) => t.metal === m)).filter((t) => t !== undefined);

  return (
    <div ref={ref}>
      <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <p className="demo-tag">{snapshot.note}</p>
        <div role="group" aria-label="Einheit" className="grid w-full grid-cols-3 rounded-full bg-white p-1.5 shadow-[inset_0_0_0_1px_rgba(51,51,51,.1)] sm:inline-flex sm:w-auto">
          {units.map((x) => (
            <button
              key={x.id}
              type="button"
              aria-pressed={unit === x.id}
              onClick={() => setUnit(x.id)}
              className={`relative min-h-11 rounded-full px-2 text-[13px] sm:px-5 font-medium tracking-[0.1em] transition-colors duration-500 ${unit === x.id ? "text-white" : "text-ink-2"}`}
            >
              {unit === x.id ? (
                <motion.span layoutId={`${uid}-unit`} transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }} className="absolute inset-0 rounded-full bg-ink-strong" />
              ) : null}
              <span className="relative">{x.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
        {cards.map((t) => {
          const top = t.rows[0];
          return (
            <article
              key={t.metal}
              data-card
              className="sheen flex min-w-0 flex-col gap-3 rounded-[24px] bg-white/80 p-6 sm:gap-3.5 sm:rounded-[28px] sm:p-7 shadow-[inset_0_0_0_1px_rgba(197,160,100,.32),0_30px_60px_-46px_rgba(100,75,35,.5)] transition-[translate,box-shadow] duration-700 hover:-translate-y-2 hover:shadow-[inset_0_0_0_1px_rgba(197,160,100,.7),0_46px_80px_-46px_rgba(100,75,35,.6)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-full font-serif text-[17px] text-ink-strong" style={{ background: orb[t.metal] }}>
                  {t.symbol}
                </span>
                <span className="text-xs tracking-[0.18em] text-ink-2">FEINGEHALT {top.purity}</span>
              </div>
              <h3 className="text-[22px] sm:text-[28px]">{t.label}</h3>
              <div className="font-serif text-[31px] leading-none sm:text-[38px] xl:text-[40px] tracking-[-0.02em] text-ink-strong tabular-nums">
                <AnimatedNumber value={top.eurPerGram * u.factor} format={formatEur} />
              </div>
              <div className="text-xs uppercase tracking-[0.14em] text-ink-2">{u.per}</div>
              <ul className="mt-2 flex flex-col border-t border-[rgba(197,160,100,.25)] pt-2 text-[14px]">
                {t.rows.slice(1, 4).map((r) => (
                  <li key={r.purity} className="flex justify-between py-1.5 text-ink-2">
                    <span>{r.purity}</span>
                    <AnimatedNumber value={r.eurPerGram * u.factor} format={formatEur} className="tabular-nums text-ink-strong" />
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      {full ? (
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:gap-6 md:grid-cols-2">
          {tables.map((t) => (
            <section key={t.metal} data-card aria-labelledby={`${uid}-${t.metal}`} className="min-w-0 rounded-[24px] bg-white/80 p-5 shadow-[inset_0_0_0_1px_rgba(197,160,100,.32)] sm:rounded-[28px] sm:p-7">
              <h3 id={`${uid}-${t.metal}`} className="mb-3 text-[22px] sm:text-[26px]">
                {t.label}
              </h3>
              <table className="w-full text-[14px] sm:text-[15px]">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-[0.14em] text-ink-2">
                    <th className="py-2 font-medium">Feingehalt</th>
                    <th className="py-2 text-right font-medium">{u.per}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map((r) => (
                    <tr key={r.purity} className="border-t border-[rgba(197,160,100,.22)]">
                      <td className="py-2.5 text-ink-strong">{r.label}</td>
                      <td className="py-2.5 text-right font-serif text-[18px] tabular-nums text-ink-strong">
                        <AnimatedNumber value={r.eurPerGram * u.factor} format={formatEur} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ))}
        </div>
      ) : null}
    </div>
  );
}
