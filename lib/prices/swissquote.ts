import "server-only";
import { OUNCE_GRAMS } from "./calculator";
import type { MetalId, PriceSnapshot, PriceTable } from "./types";

/**
 * Live purchase prices from the public Swissquote quote feed (no API key).
 * Port of gold-scraper/price_scraper.php:
 *   USD per troy ounce → EUR per ounce → EUR per gram → × fineness → minus margin.
 *
 * MARGIN_PERCENT: start values taken over from price_scraper.php, where they are
 * marked as back-calculated from another dealer. Replace with Gold Sohn's own margins.
 */
const MARGIN_PERCENT = {
  feingold: 0.43,
  gold: 0.71,
  zahngold: 0.46,
  silber: 6.5,
  platin: 7.0,
  palladium: 7.0,
} as const;

const FEED_URL = "https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/";

type Spot = "gold" | "silver" | "platinum" | "palladium";
const PAIRS: Record<Spot, string> = {
  gold: "XAU/USD",
  silver: "XAG/USD",
  platinum: "XPT/USD",
  palladium: "XPD/USD",
};

type Margin = keyof typeof MARGIN_PERCENT;
type Alloy = [purity: string, label: string, fineness: number, margin: Margin];

const TABLES: { metal: MetalId; label: string; symbol: string; spot: Spot; rows: Alloy[] }[] = [
  {
    metal: "gold",
    label: "Gold",
    symbol: "Au",
    spot: "gold",
    rows: [
      ["999", "999er Feingold", 0.999, "feingold"],
      ["986", "986er Gold", 0.986, "gold"],
      ["916", "916er Gold", 0.916, "gold"],
      ["900", "900er Gold", 0.9, "gold"],
      ["750", "750er Gold", 0.75, "gold"],
      ["585", "585er Gold", 0.585, "gold"],
      ["375", "375er Gold", 0.375, "gold"],
      ["333", "333er Gold", 0.333, "gold"],
    ],
  },
  {
    metal: "zahngold",
    label: "Zahngold",
    symbol: "Au",
    spot: "gold",
    rows: [
      ["750", "750er Zahngold", 0.75, "zahngold"],
      ["600", "600er Zahngold", 0.6, "zahngold"],
      ["500", "500er Zahngold", 0.5, "zahngold"],
      ["400", "400er Zahngold", 0.4, "zahngold"],
      ["300", "300er Zahngold", 0.3, "zahngold"],
      ["200", "200er Zahngold", 0.2, "zahngold"],
      ["150", "150er Zahngold", 0.15, "zahngold"],
      ["100", "100er Zahngold", 0.1, "zahngold"],
    ],
  },
  {
    metal: "silber",
    label: "Silber",
    symbol: "Ag",
    spot: "silver",
    rows: [
      ["999", "999er Silber", 0.999, "silber"],
      ["925", "925er Silber", 0.925, "silber"],
      ["900", "900er Silber", 0.9, "silber"],
      ["835", "835er Silber", 0.835, "silber"],
      ["800", "800er Silber", 0.8, "silber"],
      ["700", "700er Silber", 0.7, "silber"],
      ["625", "625er Silber", 0.625, "silber"],
      ["500", "500er Silber", 0.5, "silber"],
    ],
  },
  {
    metal: "platin",
    label: "Platin",
    symbol: "Pt",
    spot: "platinum",
    rows: [
      ["999", "999er Platin", 0.999, "platin"],
      ["950", "950er Platin", 0.95, "platin"],
      ["750", "750er Platin", 0.75, "platin"],
    ],
  },
  {
    metal: "palladium",
    label: "Palladium",
    symbol: "Pd",
    spot: "palladium",
    rows: [
      ["999", "999er Palladium", 0.999, "palladium"],
      ["950", "950er Palladium", 0.95, "palladium"],
      ["500", "500er Palladium", 0.5, "palladium"],
    ],
  },
];

/** Upstream is asked at most once per TTL per server instance. */
const TTL_MS = 60 * 1000;
/** A larger move against the last good run counts as a feed error (like MAX_SPRUNG). */
const MAX_JUMP = 0.15;

let lastGood: { at: number; spot: Record<Spot, number>; snapshot: PriceSnapshot } | undefined;

interface FeedEntry {
  spreadProfilePrices?: { bid?: number; ask?: number }[];
}

/** Mid price of the offer with the tightest spread – closest to the real market price. */
async function fetchQuote(pair: string): Promise<number> {
  const res = await fetch(FEED_URL + pair, {
    headers: { Accept: "application/json", "User-Agent": "Mozilla/5.0" },
    cache: "no-store",
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) throw new Error(`Swissquote responded ${res.status} for ${pair}`);
  const json: unknown = await res.json();
  if (!Array.isArray(json)) throw new Error(`Unexpected Swissquote response for ${pair}`);

  let best: number | undefined;
  let mid: number | undefined;
  for (const entry of json as FeedEntry[]) {
    for (const { bid, ask } of entry.spreadProfilePrices ?? []) {
      if (typeof bid !== "number" || typeof ask !== "number" || bid <= 0 || ask < bid) continue;
      if (best === undefined || ask - bid < best) {
        best = ask - bid;
        mid = (bid + ask) / 2;
      }
    }
  }
  if (mid === undefined) throw new Error(`No valid quote for ${pair}`);
  return mid;
}

/** EUR per gram of pure metal. */
async function fetchSpot(): Promise<Record<Spot, number>> {
  const spots = Object.keys(PAIRS) as Spot[];
  const [eurUsd, ...usdPerOunce] = await Promise.all([fetchQuote("EUR/USD"), ...spots.map((s) => fetchQuote(PAIRS[s]))]);
  if (eurUsd <= 0.5 || eurUsd >= 2) throw new Error(`EUR/USD implausible: ${eurUsd}`);
  return Object.fromEntries(spots.map((s, i) => [s, usdPerOunce[i] / eurUsd / OUNCE_GRAMS])) as Record<Spot, number>;
}

const timeFormatter = new Intl.DateTimeFormat("de-DE", { timeZone: "Europe/Berlin", dateStyle: "medium", timeStyle: "short" });

function buildSnapshot(spot: Record<Spot, number>, at: Date): PriceSnapshot {
  const tables: PriceTable[] = TABLES.map((t) => ({
    metal: t.metal,
    label: t.label,
    symbol: t.symbol,
    rows: t.rows.map(([purity, label, fineness, margin]) => ({
      purity,
      label,
      eurPerGram: Math.round(spot[t.spot] * fineness * (1 - MARGIN_PERCENT[margin] / 100) * 100) / 100,
    })),
  }));
  return {
    source: "live",
    asOf: at.toISOString(),
    note: `Ankaufspreise auf Basis aktueller Börsenkurse · Stand ${timeFormatter.format(at)} Uhr`,
    tables,
  };
}

export async function getSwissquoteSnapshot(): Promise<PriceSnapshot> {
  const now = Date.now();
  if (lastGood && now - lastGood.at < TTL_MS) return lastGood.snapshot;

  const spot = await fetchSpot();
  if (lastGood) {
    for (const s of Object.keys(spot) as Spot[]) {
      const jump = Math.abs(spot[s] - lastGood.spot[s]) / lastGood.spot[s];
      if (jump > MAX_JUMP) throw new Error(`Price jump for ${s}: ${(jump * 100).toFixed(1)} %`);
    }
  }
  lastGood = { at: now, spot, snapshot: buildSnapshot(spot, new Date(now)) };
  return lastGood.snapshot;
}

/** Last successful snapshot of this server instance, if any (used when the feed fails). */
export const lastSwissquoteSnapshot = () => lastGood?.snapshot;
