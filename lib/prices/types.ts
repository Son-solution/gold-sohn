import { z } from "zod";

export const metalIds = ["gold", "zahngold", "silber", "platin", "palladium"] as const;
export type MetalId = (typeof metalIds)[number];

export const priceRowSchema = z.object({
  /** Fineness in thousandths, e.g. "585" */
  purity: z.string().regex(/^\d{2,4}$/),
  label: z.string().min(1),
  /** Purchase price (Ankaufspreis) in EUR per gram */
  eurPerGram: z.number().nonnegative(),
});

export const priceTableSchema = z.object({
  metal: z.enum(metalIds),
  label: z.string(),
  symbol: z.string(),
  rows: z.array(priceRowSchema).min(1),
});

export const priceSnapshotSchema = z.object({
  source: z.enum(["demo", "live"]),
  /** ISO date or date-time of the price data */
  asOf: z.string(),
  note: z.string(),
  tables: z.array(priceTableSchema).min(1),
});

export type PriceRow = z.infer<typeof priceRowSchema>;
export type PriceTable = z.infer<typeof priceTableSchema>;
export type PriceSnapshot = z.infer<typeof priceSnapshotSchema>;
