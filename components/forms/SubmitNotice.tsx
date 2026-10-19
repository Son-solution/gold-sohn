"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { site } from "@/lib/site";
import type { FormApiResult } from "@/lib/forms/schemas";

export type SubmitState = { status: "idle" | "sending" } | { status: "done"; result: FormApiResult };

/** Honest outcome messages – success is only shown when the server confirms delivery. */
export function SubmitNotice({ state }: { state: SubmitState }) {
  if (state.status !== "done") return null;
  const r = state.result;
  let icon = <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-gold-ink" />;
  let text: ReactNode;

  if (r.ok) {
    icon = <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-success" />;
    text = <>Vielen Dank! Ihre Anfrage wurde übermittelt. Wir melden uns schnellstmöglich bei Ihnen.</>;
  } else if (r.reason === "not_configured") {
    text = (
      <>
        <b className="font-medium">Online-Versand noch nicht eingerichtet.</b> Ihre Angaben wurden geprüft, aber nicht übermittelt. Bitte kontaktieren Sie uns telefonisch unter{" "}
        <a className="underline" href={site.phoneHref}>
          {site.phone}
        </a>{" "}
        oder per E-Mail an{" "}
        <a className="underline" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        .
      </>
    );
  } else if (r.reason === "rate_limited") {
    icon = <TriangleAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-danger" />;
    text = <>Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es in einigen Minuten erneut.</>;
  } else if (r.reason === "validation") {
    icon = <TriangleAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-danger" />;
    text = <>Bitte prüfen Sie die markierten Felder.</>;
  } else {
    icon = <TriangleAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-danger" />;
    text = (
      <>
        Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie an{" "}
        <a className="underline" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        .
      </>
    );
  }

  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-3.5 rounded-[18px] bg-cream p-5 text-[15px] leading-relaxed text-ink-strong shadow-[inset_0_0_0_1px_rgba(197,160,100,.32)]"
    >
      {icon}
      <p>{text}</p>
    </motion.div>
  );
}

export async function postForm(url: string, body: unknown): Promise<FormApiResult> {
  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const json = (await res.json()) as FormApiResult;
    return json;
  } catch {
    return { ok: false, reason: "delivery_failed" };
  }
}
