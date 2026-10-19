import { deliver } from "@/lib/forms/delivery";
import { clientKey, rateLimit } from "@/lib/forms/rate-limit";
import { flattenErrors, shippingMethodLabels, shippingRequestSchema, type FormApiResult } from "@/lib/forms/schemas";

/** POST /api/anfrage/ – shipping bag / self-shipping / pickup request. */
export async function POST(request: Request) {
  const json = (body: FormApiResult, status: number) => Response.json(body, { status });

  if (!rateLimit(`anfrage:${clientKey(request)}`)) return json({ ok: false, reason: "rate_limited" }, 429);

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, reason: "bad_request" }, 400);
  }

  const parsed = shippingRequestSchema.safeParse(payload);
  if (!parsed.success) return json({ ok: false, reason: "validation", fieldErrors: flattenErrors(parsed.error) }, 422);

  const d = parsed.data;
  // Bots fill the honeypot – pretend nothing happened, deliver nothing.
  if (d.website) return json({ ok: false, reason: "bad_request" }, 400);

  const lines = [
    `Versandart: ${shippingMethodLabels[d.method]}${d.premium ? " (Premium-Paket, Wert über 500 €)" : ""}`,
    `Name: ${d.firstName} ${d.lastName}`,
    `E-Mail: ${d.email}`,
    `Telefon: ${d.phone || "–"}`,
    `Adresse: ${d.street}, ${d.zip} ${d.city}`,
    "",
    `Bemerkung: ${d.message || "–"}`,
    "",
    "AGB/Datenschutz bestätigt: ja",
  ];

  const result = await deliver({
    kind: "versandanfrage",
    subject: `Neue Anfrage: ${shippingMethodLabels[d.method]} – ${d.firstName} ${d.lastName}`,
    replyTo: d.email,
    text: lines.join("\n"),
    data: { ...d, website: undefined },
  });

  if (result === "sent") return json({ ok: true }, 200);
  if (result === "not_configured") return json({ ok: false, reason: "not_configured" }, 503);
  return json({ ok: false, reason: "delivery_failed" }, 502);
}
