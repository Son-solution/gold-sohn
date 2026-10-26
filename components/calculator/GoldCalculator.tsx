"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { useId, useState } from "react";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { usePrices } from "@/hooks/usePrices";
import { estimate, findTable, formatEur, formatNumber } from "@/lib/prices/calculator";
import type { MetalId } from "@/lib/prices/types";

const metalOrder: MetalId[] = ["gold", "zahngold", "silber", "platin", "palladium"];
const swatch: Record<MetalId, string> = {
  gold: "radial-gradient(circle at 30% 30%,#F5DFA6,#C5A064)",
  zahngold: "radial-gradient(circle at 30% 30%,#F1DCA8,#B9965A)",
  silber: "radial-gradient(circle at 30% 30%,#FFFFFF,#BDBDBD)",
  platin: "radial-gradient(circle at 30% 30%,#F2F4F6,#AEB4BA)",
  palladium: "radial-gradient(circle at 30% 30%,#F4F0EA,#B8AFA3)",
};
const spring = { type: "spring", stiffness: 380, damping: 34 } as const;
/** Most common fineness per metal (e.g. 585er Gold, 925er Sterlingsilber). */
const defaultPurity: Record<MetalId, string> = { gold: "585", zahngold: "750", silber: "925", platin: "950", palladium: "999" };

interface GoldCalculatorProps {
  initialMetal?: MetalId;
  initialPurity?: string;
  initialGrams?: number;
}

/** Indicative purchase value: weight × price per gram for the chosen fineness. */
export function GoldCalculator({ initialMetal = "gold", initialPurity = "585", initialGrams = 10 }: GoldCalculatorProps) {
  const snapshot = usePrices();
  const reduce = useReducedMotion();
  const uid = useId();
  const [metal, setMetal] = useState<MetalId>(initialMetal);
  const [purity, setPurity] = useState(initialPurity);
  const [gramsInput, setGramsInput] = useState(String(initialGrams));

  const table = findTable(snapshot, metal);
  const rows = table?.rows ?? [];
  const activePurity = rows.some((r) => r.purity === purity) ? purity : (rows[0]?.purity ?? "");
  const grams = Math.max(0, Math.min(100000, Number(gramsInput.replace(",", ".")) || 0));
  const result = estimate(snapshot, metal, activePurity, grams);

  const selectMetal = (m: MetalId) => {
    setMetal(m);
    const t = findTable(snapshot, m);
    if (t) setPurity(t.rows.some((r) => r.purity === defaultPurity[m]) ? defaultPurity[m] : t.rows[0].purity);
  };
  const step = (delta: number) => setGramsInput(String(Math.max(0, Math.round((grams + delta) * 10) / 10)));

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-[26px] bg-cream shadow-[inset_0_0_0_1px_rgba(197,160,100,.32)] sm:rounded-[36px] lg:grid-cols-[1.1fr_.9fr]">
      <div className="flex min-w-0 flex-col gap-7 p-5 sm:gap-8 sm:p-10 lg:p-10 xl:p-12">
        <fieldset className="flex min-w-0 flex-col gap-3.5">
          <legend className="field-label mb-3.5">Metall</legend>
          <div className="grid grid-cols-2 gap-1.5 rounded-[22px] bg-white p-1.5 shadow-[inset_0_0_0_1px_rgba(51,51,51,.1)] sm:grid-cols-3 sm:gap-2 max-sm:[&>*:last-child]:col-span-2">
            {metalOrder.map((m) => {
              const t = findTable(snapshot, m);
              if (!t) return null;
              const active = m === metal;
              return (
                <button
                  key={m}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectMetal(m)}
                  className="relative flex min-h-[52px] min-w-0 items-center justify-center gap-2 rounded-2xl px-2 font-serif text-[16px] text-ink-strong sm:min-h-[56px] sm:gap-2.5 sm:text-[17px] xl:text-[18px]"
                >
                  {active ? (
                    <motion.span
                      layoutId={`${uid}-metal`}
                      transition={reduce ? { duration: 0 } : spring}
                      className="absolute inset-0 rounded-2xl bg-cream shadow-[inset_0_0_0_1.5px_#C5A064,0_12px_24px_-16px_rgba(140,104,48,.7)]"
                    />
                  ) : null}
                  <span className="relative size-3 shrink-0 rounded-full" style={{ background: swatch[m] }} />
                  <span className="relative">{t.label}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-3.5">
          <legend className="field-label mb-3.5">Feingehalt</legend>
          <div className="flex flex-wrap gap-2">
            {rows.map((r, i) => {
              const active = r.purity === activePurity;
              return (
                <motion.button
                  key={`${metal}-${r.purity}`}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setPurity(r.purity)}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.035, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative min-h-[44px] min-w-[64px] rounded-full px-3.5 text-[14px] sm:min-h-[46px] sm:min-w-[74px] sm:px-4 sm:text-[15px] font-medium transition-colors duration-500 ${
                    active ? "text-white" : "bg-white text-ink-strong shadow-[inset_0_0_0_1px_rgba(51,51,51,.12)]"
                  }`}
                >
                  {active ? (
                    <motion.span layoutId={`${uid}-purity`} transition={reduce ? { duration: 0 } : spring} className="absolute inset-0 rounded-full bg-ink-strong" />
                  ) : null}
                  <span className="relative">{r.purity}</span>
                </motion.button>
              );
            })}
          </div>
        </fieldset>

        <div className="flex flex-col gap-3.5">
          <label htmlFor={`${uid}-weight`} className="field-label">
            Gewicht
          </label>
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.button whileTap={{ scale: 0.9 }} type="button" onClick={() => step(-1)} aria-label="Gewicht um 1 Gramm verringern" className="flex size-12 shrink-0 sm:size-14 items-center justify-center rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(51,51,51,.12)] hover:shadow-[inset_0_0_0_1.5px_#C5A064]">
              <Minus aria-hidden className="size-5" />
            </motion.button>
            <div className="flex min-h-[60px] min-w-0 flex-1 items-center gap-2 rounded-[18px] bg-white px-4 sm:min-h-[66px] sm:px-5 shadow-[inset_0_0_0_1px_rgba(51,51,51,.12)] transition-shadow focus-within:shadow-[inset_0_0_0_1.5px_#C5A064,0_0_0_6px_rgba(197,160,100,.15)]">
              <input
                id={`${uid}-weight`}
                size={1}
                inputMode="decimal"
                value={gramsInput}
                onChange={(e) => setGramsInput(e.target.value.replace(/[^\d.,]/g, ""))}
                className="min-w-0 flex-1 bg-transparent font-serif text-[26px] tabular-nums text-ink-strong outline-none sm:text-[30px]"
                aria-describedby={`${uid}-unit`}
              />
              <span id={`${uid}-unit`} className="shrink-0 text-[13px] tracking-[0.16em] text-ink-2">
                <span className="min-[400px]:hidden">G</span>
                <span className="max-[399.98px]:hidden">GRAMM</span>
              </span>
            </div>
            <motion.button whileTap={{ scale: 0.9 }} type="button" onClick={() => step(1)} aria-label="Gewicht um 1 Gramm erhöhen" className="flex size-12 shrink-0 sm:size-14 items-center justify-center rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(51,51,51,.12)] hover:shadow-[inset_0_0_0_1.5px_#C5A064]">
              <Plus aria-hidden className="size-5" />
            </motion.button>
          </div>
          <input
            type="range"
            min={0}
            max={500}
            step={1}
            value={Math.min(500, grams)}
            onChange={(e) => setGramsInput(e.target.value)}
            aria-label="Gewicht in Gramm, Schieberegler"
            className="h-7 w-full accent-gold-deep"
          />
        </div>
      </div>

      <div className="@container relative flex min-w-0 flex-col justify-between gap-7 overflow-hidden border-t border-[rgba(197,160,100,.32)] bg-[linear-gradient(160deg,#fff,rgba(255,255,255,.6)_60%,rgba(230,227,223,.6))] p-5 sm:gap-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-10 xl:p-12" aria-live="polite">
        <span aria-hidden className="absolute -right-44 -top-48 size-[500px] rounded-full border border-gold/35" />
        <span aria-hidden className="absolute -right-28 -top-32 size-[360px] rounded-full border border-gold/20" />
        <div className="relative flex flex-col max-sm:items-center max-sm:text-center">
          <span className="field-label">Geschätzter Ankaufswert</span>
          <div className="mt-3.5 whitespace-nowrap font-serif text-[clamp(2.1rem,14cqi,5.2rem)] leading-none tracking-[-0.03em] text-ink-strong tabular-nums">
            <AnimatedNumber value={result?.total ?? 0} format={formatEur} />
          </div>
          <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-pearl" aria-hidden>
            <motion.div
              className="h-full rounded-full bg-[linear-gradient(90deg,#D9BE85,#A8854B)]"
              initial={false}
              animate={{ width: `${(result?.fineness ?? 0) * 100}%` }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <p className="mt-2.5 text-[13px] text-ink-2">
            Feinanteil: {formatNumber(result?.fineGrams ?? 0)} g von {formatNumber(grams)} g
          </p>
          <p className="demo-tag mt-5">{snapshot.source === "demo" ? "Demowerte – keine Live-Kurse" : snapshot.note}</p>
        </div>
        <dl className="relative border-t border-[rgba(197,160,100,.32)]">
          {[
            ["Metall · Feingehalt", `${table?.label ?? ""} · ${activePurity}`],
            ["Gewicht", `${formatNumber(grams)} g`],
            [snapshot.source === "demo" ? "Demowert je Gramm" : "Ankaufspreis je Gramm", formatEur(result?.perGram ?? 0)],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3 border-b border-[rgba(197,160,100,.2)] py-3 text-[14px] text-ink-2 sm:text-[15px]">
              <dt>{k}</dt>
              <motion.dd key={v} initial={reduce ? false : { y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-medium tabular-nums text-ink-strong">
                {v}
              </motion.dd>
            </div>
          ))}
        </dl>
        <div className="relative flex flex-col gap-3">
          <Link href="/versandtasche/" className="btn btn-gold">
            Angebot anfordern <ArrowRight aria-hidden />
          </Link>
          <p className="text-xs leading-relaxed text-ink-2">
            Unverbindliche Orientierung. Das verbindliche Angebot erhalten Sie nach der Prüfung Ihrer Edelmetalle.
          </p>
        </div>
      </div>
    </div>
  );
}
