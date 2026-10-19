import type { PriceSnapshot } from "./types";

/**
 * DEMONSTRATION DATA – not a live market price.
 * Values copied from https://gold-sohn.de/preise/ on 18.10.2026 so the layout and the
 * calculator can be reviewed with realistic numbers. Replace by configuring a live
 * price adapter (PRICE_API_URL, see lib/prices/provider.ts and README).
 */
export const demoSnapshot: PriceSnapshot = {
  source: "demo",
  asOf: "2026-10-18",
  note: "Demowerte (Stand 18.10.2026, übernommen von gold-sohn.de/preise) – keine Live-Kurse.",
  tables: [
    {
      metal: "gold",
      label: "Gold",
      symbol: "Au",
      rows: [
        { purity: "999", label: "999er Feingold", eurPerGram: 118.92 },
        { purity: "986", label: "986er Gold", eurPerGram: 117.05 },
        { purity: "916", label: "916er Gold", eurPerGram: 108.74 },
        { purity: "900", label: "900er Gold", eurPerGram: 106.84 },
        { purity: "750", label: "750er Gold", eurPerGram: 89.03 },
        { purity: "585", label: "585er Gold", eurPerGram: 69.44 },
        { purity: "375", label: "375er Gold", eurPerGram: 44.52 },
        { purity: "333", label: "333er Gold", eurPerGram: 39.53 },
      ],
    },
    {
      metal: "zahngold",
      label: "Zahngold",
      symbol: "Au",
      rows: [
        { purity: "750", label: "750er Zahngold", eurPerGram: 89.25 },
        { purity: "600", label: "600er Zahngold", eurPerGram: 71.4 },
        { purity: "500", label: "500er Zahngold", eurPerGram: 59.5 },
        { purity: "400", label: "400er Zahngold", eurPerGram: 47.6 },
        { purity: "300", label: "300er Zahngold", eurPerGram: 35.7 },
        { purity: "200", label: "200er Zahngold", eurPerGram: 23.8 },
        { purity: "150", label: "150er Zahngold", eurPerGram: 17.85 },
        { purity: "100", label: "100er Zahngold", eurPerGram: 11.9 },
      ],
    },
    {
      metal: "silber",
      label: "Silber",
      symbol: "Ag",
      rows: [
        { purity: "999", label: "999er Silber", eurPerGram: 1.54 },
        { purity: "925", label: "925er Silber", eurPerGram: 1.43 },
        { purity: "900", label: "900er Silber", eurPerGram: 1.39 },
        { purity: "835", label: "835er Silber", eurPerGram: 1.29 },
        { purity: "800", label: "800er Silber", eurPerGram: 1.23 },
        { purity: "700", label: "700er Silber", eurPerGram: 1.08 },
        { purity: "625", label: "625er Silber", eurPerGram: 0.96 },
        { purity: "500", label: "500er Silber", eurPerGram: 0.77 },
      ],
    },
    {
      metal: "platin",
      label: "Platin",
      symbol: "Pt",
      rows: [
        { purity: "999", label: "999er Platin", eurPerGram: 43.74 },
        { purity: "950", label: "950er Platin", eurPerGram: 41.6 },
        { purity: "750", label: "750er Platin", eurPerGram: 32.84 },
      ],
    },
    {
      metal: "palladium",
      label: "Palladium",
      symbol: "Pd",
      rows: [
        { purity: "999", label: "999er Palladium", eurPerGram: 29.98 },
        { purity: "950", label: "950er Palladium", eurPerGram: 28.51 },
        { purity: "500", label: "500er Palladium", eurPerGram: 15.0 },
      ],
    },
  ],
};
