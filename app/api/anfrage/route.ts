import { deliver } from "@/lib/forms/delivery";
import { confirmationEmail, notificationEmail } from "@/lib/forms/email";
import { clientKey, rateLimit } from "@/lib/forms/rate-limit";
import { flattenErrors, shippingMethodLabels, shippingRequestSchema, type FormApiResult, type ShippingMethod } from "@/lib/forms/schemas";

/** What happens next, shown in the customer's confirmation. */
const nextSteps: Record<ShippingMethod, [string, string][]> = {
  versandtasche: [
    ["Wir prüfen Ihre Anfrage", "und bereiten Ihre Versandtasche vor."],
    ["Sie erhalten Ihre Versandtasche", "per Post und senden uns darin Ihre Edelmetalle."],
    ["Sie erhalten Ihr Angebot", "– Sie entscheiden erst, wenn es vorliegt."],
  ],
  selbstversand: [
    ["Wir prüfen Ihre Anfrage", "und melden uns mit allen Details zum Versand."],
    ["Sie senden uns Ihre Edelmetalle", "– zum Beispiel per Einschreiben."],
    ["Sie erhalten Ihr Angebot", "– Sie entscheiden erst, wenn es vorliegt."],
  ],
  abholung: [
    ["Wir prüfen Ihre Anfrage", "auf Machbarkeit."],
    ["Wir melden uns bei Ihnen", "per E-Mail oder Telefon, um die Abholung abzustimmen."],
    ["Sie erhalten Ihr Angebot", "– Sie entscheiden erst, wenn es vorliegt."],
  ],
};

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

  const rows: [string, string][] = [
    ["Versandart", `${shippingMethodLabels[d.method]}${d.premium ? " · Premium-Paket" : ""}`],
    ["Name", `${d.firstName} ${d.lastName}`],
    ["E-Mail", d.email],
    ["Telefon", d.phone || "–"],
    ["Adresse", `${d.street}\n${d.zip} ${d.city}`],
    ["Bemerkung", d.message || "–"],
  ];
  const intro = "Ihre Anfrage ist bei uns eingegangen. Wir melden uns schnellstmöglich bei Ihnen.";
  const next = nextSteps[d.method];

  const result = await deliver({
    kind: "versandanfrage",
    subject: `Neue Anfrage: ${shippingMethodLabels[d.method]} – ${d.firstName} ${d.lastName}`,
    replyTo: d.email,
    text: lines.join("\n"),
    html: notificationEmail({
      title: `${d.firstName} ${d.lastName}`,
      rows,
      replyTo: d.email,
      replySubject: `Ihre Anfrage bei Gold Sohn: ${shippingMethodLabels[d.method]}`,
    }),
    data: { ...d, website: undefined },
    confirmation: {
      to: d.email,
      subject: "Ihre Anfrage bei Gold Sohn – Eingangsbestätigung",
      text: [`Vielen Dank, ${d.firstName}!`, "", intro, "", ...next.map(([a, b], i) => `${i + 1}. ${a} ${b}`)].join("\n"),
      html: confirmationEmail({ firstName: d.firstName, intro, next, rows }),
    },
  });

  if (result === "sent") return json({ ok: true }, 200);
  if (result === "not_configured") return json({ ok: false, reason: "not_configured" }, 503);
  return json({ ok: false, reason: "delivery_failed" }, 502);
}
