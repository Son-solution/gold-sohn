import type { MetalId, PriceSnapshot, PriceTable } from "./types";

export const OUNCE_GRAMS = 31.1034768;

export function findTable(snapshot: PriceSnapshot, metal: MetalId): PriceTable | undefined {
  return snapshot.tables.find((t) => t.metal === metal);
}

export function pricePerGram(snapshot: PriceSnapshot, metal: MetalId, purity: string): number | undefined {
  return findTable(snapshot, metal)?.rows.find((r) => r.purity === purity)?.eurPerGram;
}

export interface Estimate {
  perGram: number;
  total: number;
  /** Pure metal content in grams */
  fineGrams: number;
  fineness: number;
}

/** Indicative value: weight × purchase price per gram for the chosen fineness. */
export function estimate(snapshot: PriceSnapshot, metal: MetalId, purity: string, grams: number): Estimate | undefined {
  const perGram = pricePerGram(snapshot, metal, purity);
  if (perGram === undefined || !Number.isFinite(grams) || grams < 0) return undefined;
  const fineness = Number(purity) / 1000;
  return {
    perGram,
    total: Math.round(perGram * grams * 100) / 100,
    fineGrams: Math.round(grams * fineness * 1000) / 1000,
    fineness,
  };
}

const eurFormatter = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
const numFormatter = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 3 });

export const formatEur = (value: number) => eurFormatter.format(value);
export const formatNumber = (value: number) => numFormatter.format(value);
