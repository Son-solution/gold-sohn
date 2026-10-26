import "server-only";

/**
 * Form delivery adapter. Configure ONE of the following in .env.local / Vercel:
 *
 * 1) Resend (transactional e-mail, https://resend.com)
 *    RESEND_API_KEY, FORM_MAIL_FROM (verified sender), FORM_MAIL_TO (inbox)
 *    The customer additionally receives a confirmation; their replies go to FORM_MAIL_TO.
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
  html?: string;
  data: Record<string, unknown>;
  /** Receipt for the customer. Only sent once the inbox mail was accepted; its failure never fails the request. */
  confirmation?: { to: string; subject: string; text: string; html: string };
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
      const inbox = FORM_MAIL_TO.split(",").map((s) => s.trim());
      const send = (mail: Record<string, unknown>) =>
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({ from: FORM_MAIL_FROM, ...mail }),
          signal: AbortSignal.timeout(10000),
        });

      const res = await send({ to: inbox, reply_to: message.replyTo, subject: message.subject, text: message.text, html: message.html });
      if (!res.ok) return "failed";

      if (message.confirmation) {
        const { to, ...rest } = message.confirmation;
        try {
          const ack = await send({ to: [to], reply_to: inbox[0], ...rest });
          if (!ack.ok) console.error("[forms] confirmation rejected", ack.status, await ack.text());
        } catch (error) {
          console.error("[forms] confirmation failed", error);
        }
      }
      return "sent";
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
