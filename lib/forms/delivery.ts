import "server-only";

/**
 * Form delivery adapter. Configure ONE of the following in .env.local / Vercel:
 *
 * 1) Resend (transactional e-mail, https://resend.com)
 *    RESEND_API_KEY, FORM_MAIL_FROM (verified sender), FORM_MAIL_TO (inbox)
 *
 * 2) Webhook (e.g. Make, Zapier, n8n, CRM, own backend)
 *    FORM_WEBHOOK_URL and optional FORM_WEBHOOK_SECRET (sent as X-Webhook-Secret)
 *
 * Without configuration the API answers "not_configured" and the UI tells the visitor
 * honestly that online sending is not active yet – nothing is ever faked.
 */
export type DeliveryResult = "sent" | "not_configured" | "failed";

export interface FormMessage {
  kind: "versandanfrage" | "kontakt";
  subject: string;
  replyTo: string;
  text: string;
  data: Record<string, unknown>;
}

export function deliveryConfigured(): boolean {
  return Boolean(
    (process.env.RESEND_API_KEY && process.env.FORM_MAIL_FROM && process.env.FORM_MAIL_TO) ||
      process.env.FORM_WEBHOOK_URL,
  );
}

export async function deliver(message: FormMessage): Promise<DeliveryResult> {
  const { RESEND_API_KEY, FORM_MAIL_FROM, FORM_MAIL_TO, FORM_WEBHOOK_URL, FORM_WEBHOOK_SECRET } = process.env;

  try {
    if (RESEND_API_KEY && FORM_MAIL_FROM && FORM_MAIL_TO) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: FORM_MAIL_FROM,
          to: FORM_MAIL_TO.split(",").map((s) => s.trim()),
          reply_to: message.replyTo,
          subject: message.subject,
          text: message.text,
        }),
        signal: AbortSignal.timeout(10000),
      });
      return res.ok ? "sent" : "failed";
    }

    if (FORM_WEBHOOK_URL) {
      const res = await fetch(FORM_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(FORM_WEBHOOK_SECRET ? { "X-Webhook-Secret": FORM_WEBHOOK_SECRET } : {}),
        },
        body: JSON.stringify({ kind: message.kind, subject: message.subject, data: message.data }),
        signal: AbortSignal.timeout(10000),
      });
      return res.ok ? "sent" : "failed";
    }

    return "not_configured";
  } catch (error) {
    console.error("[forms] delivery failed", error);
    return "failed";
  }
}
