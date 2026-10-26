import "server-only";
import { connection } from "next/server";
import { demoSnapshot } from "./demo";
import { getSwissquoteSnapshot, lastSwissquoteSnapshot } from "./swissquote";
import { priceSnapshotSchema, type PriceSnapshot } from "./types";

/**
 * Price adapter.
 *
 * Without configuration the site uses clearly labelled demo data. Two live sources:
 *
 * 1. PRICE_SOURCE=swissquote – purchase prices computed on the server from the public
 *    Swissquote spot feed minus Gold Sohn's margins (see lib/prices/swissquote.ts,
 *    port of the gold-scraper PHP script). No API key needed.
 *
 * 2. PRICE_API_URL – an endpoint that returns JSON in the PriceSnapshot shape
 *    (see lib/prices/types.ts):
 *
 *   { "asOf": "2026-10-18T10:50:06+02:00", "note": "...",
 *     "tables": [ { "metal": "gold", "label": "Gold", "symbol": "Au",
 *                   "rows": [ { "purity": "999", "label": "999er Feingold", "eurPerGram": 118.92 } ] } ] }
 *
 *    The key is sent as a Bearer token. Nothing in the browser ever sees PRICE_API_KEY.
 */
export async function getPriceSnapshot(): Promise<PriceSnapshot> {
  if (process.env.PRICE_SOURCE === "swissquote") return swissquote();

  const url = process.env.PRICE_API_URL;
  if (!url) return demoSnapshot;

  try {
    const headers: Record<string, string> = { Accept: "application/json" };
    if (process.env.PRICE_API_KEY) headers.Authorization = `Bearer ${process.env.PRICE_API_KEY}`;
    const res = await fetch(url, { headers, cache: "no-store", signal: AbortSignal.timeout(6000) });
    if (!res.ok) throw new Error(`Price API responded ${res.status}`);
    const json: unknown = await res.json();
    const parsed = priceSnapshotSchema.omit({ source: true }).safeParse(json);
    if (!parsed.success) throw new Error("Price API returned an unexpected shape");
    return { ...parsed.data, source: "live" };
  } catch (error) {
    console.error("[prices] live price adapter failed, falling back to demo data", error);
    return unavailable;
  }
}

const unavailable: PriceSnapshot = {
  ...demoSnapshot,
  note: "Live-Kurse sind derzeit nicht erreichbar. Angezeigt werden Demowerte – keine Live-Kurse.",
};

async function swissquote(): Promise<PriceSnapshot> {
  // Live market data: render per request, never at build time.
  await connection();
  try {
    return await getSwissquoteSnapshot();
  } catch (error) {
    // Like the PHP script: on any error the last good prices stay in place.
    console.error("[prices] Swissquote feed failed", error);
    return lastSwissquoteSnapshot() ?? unavailable;
  }
}
