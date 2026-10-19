import localFont from "next/font/local";

/** Self-hosted (OFL) – no request to Google at build or run time. */
export const bodoni = localFont({
  src: [
    { path: "./fonts/bodoni-moda-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/bodoni-moda-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/bodoni-moda-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-bodoni",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const jost = localFont({
  src: [
    { path: "./fonts/jost-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "./fonts/jost-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jost-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-jost",
  display: "swap",
  fallback: ["Century Gothic", "sans-serif"],
});
