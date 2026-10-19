/**
 * Verified company facts. Source: current gold-sohn.de (Impressum, Kontakt, Startseite),
 * checked 18.10.2026. Only change these values when the company confirms them.
 */
export const site = {
  name: "Gold Sohn",
  legalName: "Gold Sohn",
  owner: "Abjar Hanna",
  legalForm: "Einzelunternehmen",
  street: "Hermann-Brill-Straße 14",
  zip: "65197",
  city: "Wiesbaden",
  country: "Deutschland",
  phone: "+49 15561 058180",
  phoneHref: "tel:+4915561058180",
  email: "info@gold-sohn.de",
  /** Statement used on the live site; keep it visible on city pages. */
  onlineNotice:
    "Bitte beachten Sie, dass wir als reiner Onlinehandel tätig sind und in dieser Stadt keinen eigenen Standort haben.",
  premiumThresholdEur: 500,
  videoDurationLabel: "1:44 Min",
} as const;

/** Absolute base URL. Set NEXT_PUBLIC_SITE_URL for previews (see .env.example). */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://gold-sohn.de").replace(/\/$/, "");

/** Search engines may only index the production deployment. */
export const isIndexable = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export const copyrightYear = 2026;
