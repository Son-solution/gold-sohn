import { getPriceSnapshot } from "@/lib/prices/provider";

/**
 * GET /api/preise/ – current price snapshot.
 * Without PRICE_API_URL this returns the labelled demo snapshot (source: "demo")
 * and is prerendered at build time. With PRICE_API_URL it runs per request.
 */
export async function GET() {
  const snapshot = await getPriceSnapshot();
  return Response.json(snapshot, {
    headers: { "Cache-Control": snapshot.source === "live" ? "public, max-age=60, stale-while-revalidate=240" : "public, max-age=300" },
  });
}
