"use client";

import { useEffect, useState } from "react";
import { demoSnapshot } from "@/lib/prices/demo";
import { priceSnapshotSchema, type PriceSnapshot } from "@/lib/prices/types";

const REFRESH_MS = 60 * 1000;

/**
 * Prices for client components. Starts with the clearly labelled demo snapshot
 * (so the page is complete on first paint) and switches to live data only when
 * /api/preise/ reports source === "live".
 */
export function usePrices(): PriceSnapshot {
  const [snapshot, setSnapshot] = useState<PriceSnapshot>(demoSnapshot);

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch("/api/preise/", { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : null))
        .then((json: unknown) => {
          const parsed = priceSnapshotSchema.safeParse(json);
          if (alive && parsed.success && parsed.data.source === "live") setSnapshot(parsed.data);
        })
        .catch(() => undefined);
    load();
    const id = window.setInterval(load, REFRESH_MS);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, []);

  return snapshot;
}
