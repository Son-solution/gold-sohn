"use client";

import { useId, useState, type FormEvent } from "react";
import { InputField, TextareaField } from "./FormField";
import { SubmitNotice, postForm, type SubmitState } from "./SubmitNotice";
import { contactSchema, flattenErrors } from "@/lib/forms/schemas";

/** Contact form – same honest delivery handling as the shipping request. */
export function ContactForm() {
  const uid = useId();
  const [v, setV] = useState({ firstName: "", lastName: "", email: "", subject: "", message: "", consent: false, website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submit, setSubmit] = useState<SubmitState>({ status: "idle" });

  const set = (key: keyof typeof v, value: string | boolean) => {
    setV((p) => ({ ...p, [key]: value }));
    if (errors[key]) setErrors(({ [key]: _omit, ...rest }) => (void _omit, rest));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = contactSchema.safeParse(v);
    if (!res.success) {
      const errs = flattenErrors(res.error);
      setErrors(errs);
      e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setSubmit({ status: "sending" });
    const result = await postForm("/api/kontakt/", v);
    if (!result.ok && result.reason === "validation") setErrors(result.fieldErrors);
    setSubmit({ status: "done", result });
  };

  const f = (name: keyof typeof v) => ({ id: `${uid}-${name}`, name, error: errors[name] });

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-5 rounded-[24px] bg-white p-5 shadow-[0_50px_100px_-60px_rgba(100,75,35,.55),inset_0_0_0_1px_rgba(197,160,100,.32)] sm:rounded-[32px] sm:p-10">
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set("website", e.target.value)} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InputField {...f("firstName")} label="Vorname" autoComplete="given-name" value={v.firstName} onChange={(e) => set("firstName", e.target.value)} />
        <InputField {...f("lastName")} label="Nachname" autoComplete="family-name" value={v.lastName} onChange={(e) => set("lastName", e.target.value)} />
        <InputField {...f("email")} className="sm:col-span-2" label="E-Mail" type="email" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} />
        <InputField {...f("subject")} className="sm:col-span-2" label="Betreff" value={v.subject} onChange={(e) => set("subject", e.target.value)} />
        <TextareaField {...f("message")} className="sm:col-span-2" label="Ihre Nachricht" rows={5} value={v.message} onChange={(e) => set("message", e.target.value)} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-ink-2">
          <input type="checkbox" name="consent" checked={v.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-gold-deep" />
          <span>
            Ich habe die{" "}
            <a href="/datenschutz/" className="underline">
              Datenschutzerklärung
            </a>{" "}
            gelesen und bin mit der Verarbeitung meiner Angaben zur Beantwortung meiner Anfrage einverstanden.
          </span>
        </label>
        {errors.consent ? <span className="field-error">{errors.consent}</span> : null}
      </div>
      <button type="submit" className="btn btn-gold self-start" disabled={submit.status === "sending"}>
        {submit.status === "sending" ? "Wird gesendet …" : "Nachricht senden"}
      </button>
      <SubmitNotice state={submit} />
    </form>
  );
}
