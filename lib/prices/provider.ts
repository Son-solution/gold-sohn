import "server-only";
import { demoSnapshot } from "./demo";
import { priceSnapshotSchema, type PriceSnapshot } from "./types";

/**
 * Price adapter.
 *
 * Without configuration the site uses clearly labelled demo data.
 * To show real purchase prices, point PRICE_API_URL at an endpoint that returns
 * JSON in the PriceSnapshot shape (see lib/prices/types.ts):
 *
 *   { "asOf": "2026-10-18T10:50:06+02:00", "note": "...",
 *     "tables": [ { "metal": "gold", "label": "Gold", "symbol": "Au",
 *                   "rows": [ { "purity": "999", "label": "999er Feingold", "eurPerGram": 118.92 } ] } ] }
 *
 * Typical sources: the price feed that powers the current WordPress site, or a small
 * serverless function that converts a market data API (spot price) into Gold Sohn
 * purchase prices using the company's own margins. The key is sent as a Bearer token.
 * Nothing in the browser ever sees PRICE_API_KEY.
 */
export async function getPriceSnapshot(): Promise<PriceSnapshot> {
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
    return {
      ...demoSnapshot,
      note: "Live-Kurse sind derzeit nicht erreichbar. Angezeigt werden Demowerte – keine Live-Kurse.",
    };
  }
}
