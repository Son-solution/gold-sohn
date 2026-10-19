import { deliver } from "@/lib/forms/delivery";
import { clientKey, rateLimit } from "@/lib/forms/rate-limit";
import { contactSchema, flattenErrors, type FormApiResult } from "@/lib/forms/schemas";

/** POST /api/kontakt/ – contact form. */
export async function POST(request: Request) {
  const json = (body: FormApiResult, status: number) => Response.json(body, { status });

  if (!rateLimit(`kontakt:${clientKey(request)}`)) return json({ ok: false, reason: "rate_limited" }, 429);

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, reason: "bad_request" }, 400);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) return json({ ok: false, reason: "validation", fieldErrors: flattenErrors(parsed.error) }, 422);
  const d = parsed.data;
  if (d.website) return json({ ok: false, reason: "bad_request" }, 400);

  const result = await deliver({
    kind: "kontakt",
    subject: `Kontaktanfrage: ${d.subject}`,
    replyTo: d.email,
    text: [`Name: ${d.firstName} ${d.lastName}`, `E-Mail: ${d.email}`, `Betreff: ${d.subject}`, "", d.message].join("\n"),
    data: { ...d, website: undefined },
  });

  if (result === "sent") return json({ ok: true }, 200);
  if (result === "not_configured") return json({ ok: false, reason: "not_configured" }, 503);
  return json({ ok: false, reason: "delivery_failed" }, 502);
}
