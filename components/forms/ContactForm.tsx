"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { FormTrust, InputField, TextareaField } from "./FormField";
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
    <form onSubmit={onSubmit} noValidate aria-labelledby={`${uid}-title`} className="form-luxe flex flex-col gap-6 p-6 sm:p-11">
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set("website", e.target.value)} />
      </div>
      <div className="flex flex-col gap-3">
        <span className="eyebrow">Kontaktformular</span>
        <h2 id={`${uid}-title`} className="text-[26px] leading-tight sm:text-[34px]">
          Schreiben Sie <em className="text-gold-ink">uns</em>
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InputField {...f("firstName")} label="Vorname" autoComplete="given-name" value={v.firstName} onChange={(e) => set("firstName", e.target.value)} />
        <InputField {...f("lastName")} label="Nachname" autoComplete="family-name" value={v.lastName} onChange={(e) => set("lastName", e.target.value)} />
        <InputField {...f("email")} className="sm:col-span-2" label="E-Mail" type="email" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} />
        <InputField {...f("subject")} className="sm:col-span-2" label="Betreff" value={v.subject} onChange={(e) => set("subject", e.target.value)} />
        <TextareaField {...f("message")} className="sm:col-span-2" label="Ihre Nachricht" rows={5} value={v.message} onChange={(e) => set("message", e.target.value)} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="flex cursor-pointer items-start gap-3.5 text-sm leading-relaxed text-ink-2">
          <input
            type="checkbox"
            name="consent"
            checked={v.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${uid}-consent-error` : undefined}
            className="check-luxe"
          />
          <span>
            Ich habe die{" "}
            <a href="/datenschutz/" className="underline">
              Datenschutzerklärung
            </a>{" "}
            gelesen und bin mit der Verarbeitung meiner Angaben zur Beantwortung meiner Anfrage einverstanden.
          </span>
        </label>
        {errors.consent ? (
          <span id={`${uid}-consent-error`} className="field-error">
            {errors.consent}
          </span>
        ) : null}
      </div>
      <button type="submit" className="btn btn-gold sm:self-start" disabled={submit.status === "sending"}>
        {submit.status === "sending" ? (
          <>
            Wird gesendet <Loader2 aria-hidden className="animate-spin" />
          </>
        ) : (
          <>
            Nachricht senden <ArrowRight aria-hidden />
          </>
        )}
      </button>
      <SubmitNotice state={submit} />
      <FormTrust items={["Kostenlos & unverbindlich"]} />
    </form>
  );
}
