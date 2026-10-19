import { z } from "zod";

const name = z.string({ required_error: "Bitte ausfüllen." }).trim().min(1, "Bitte ausfüllen.").max(80, "Bitte kürzer fassen.");
const email = z.string({ required_error: "Bitte geben Sie Ihre E-Mail-Adresse ein." }).trim().email("Bitte geben Sie eine gültige E-Mail-Adresse ein, z. B. name@beispiel.de.").max(160);
const phone = z
  .string()
  .trim()
  .max(40)
  .regex(/^[+\d\s()/-]*$/, "Bitte nur Ziffern, Leerzeichen und + ( ) / - verwenden.")
  .optional()
  .or(z.literal(""));

export const shippingMethods = ["versandtasche", "selbstversand", "abholung"] as const;
export type ShippingMethod = (typeof shippingMethods)[number];

export const shippingMethodLabels: Record<ShippingMethod, string> = {
  versandtasche: "Versandtasche anfordern",
  selbstversand: "Selbst versenden",
  abholung: "Abholung anfragen",
};

export const shippingRequestSchema = z.object({
  method: z.enum(shippingMethods, { errorMap: () => ({ message: "Bitte wählen Sie eine Versandart." }) }),
  premium: z.boolean().default(false),
  firstName: name,
  lastName: name,
  email,
  phone,
  street: z.string({ required_error: "Bitte Straße und Hausnummer angeben." }).trim().min(4, "Bitte Straße und Hausnummer angeben.").max(120),
  zip: z.string({ required_error: "Bitte eine fünfstellige Postleitzahl angeben." }).trim().regex(/^\d{5}$/, "Bitte eine fünfstellige Postleitzahl angeben."),
  city: z.string({ required_error: "Bitte Ort angeben." }).trim().min(2, "Bitte Ort angeben.").max(80),
  message: z.string().trim().max(2000, "Maximal 2000 Zeichen.").optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Bitte stimmen Sie den AGB und der Datenschutzerklärung zu." }) }),
  /** Honeypot – must stay empty. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export const contactSchema = z.object({
  firstName: name,
  lastName: name,
  email,
  subject: z.string({ required_error: "Bitte geben Sie einen Betreff an." }).trim().min(2, "Bitte geben Sie einen Betreff an.").max(140),
  message: z.string({ required_error: "Bitte schreiben Sie uns eine Nachricht." }).trim().min(10, "Bitte schreiben Sie mindestens 10 Zeichen.").max(4000),
  consent: z.literal(true, { errorMap: () => ({ message: "Bitte stimmen Sie der Datenschutzerklärung zu." }) }),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ShippingRequest = z.infer<typeof shippingRequestSchema>;
export type ContactRequest = z.infer<typeof contactSchema>;

/** Shape returned by the form API routes. */
export type FormApiResult =
  | { ok: true }
  | { ok: false; reason: "validation"; fieldErrors: Record<string, string> }
  | { ok: false; reason: "not_configured" | "rate_limited" | "delivery_failed" | "bad_request" };

export function flattenErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
