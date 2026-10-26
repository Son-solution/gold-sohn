"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { InputField, TextareaField } from "./FormField";
import { SubmitNotice, postForm, type SubmitState } from "./SubmitNotice";
import { flattenErrors, shippingMethodLabels, shippingMethods, shippingRequestSchema, type ShippingMethod } from "@/lib/forms/schemas";

/** Short labels for the segmented switch; the long ones label the submit button. */
const tabLabels: Record<ShippingMethod, string> = {
  versandtasche: "Versandtasche",
  selbstversand: "Selbst versenden",
  abholung: "Abholung",
};

const benefits = ["Kostenlos & unverbindlich", "Versicherter Versand", "Premium-Paket ab 500 €"];

type Values = {
  method: ShippingMethod;
  premium: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  zip: string;
  city: string;
  message: string;
  consent: boolean;
  website: string;
};

/** Single-sheet shipping request. Server-validated; success is shown only after confirmed delivery. */
export function ShippingForm({ initialMethod = "versandtasche" }: { initialMethod?: ShippingMethod }) {
  const uid = useId();
  const reduce = useReducedMotion();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submit, setSubmit] = useState<SubmitState>({ status: "idle" });
  const [v, setV] = useState<Values>({
    method: initialMethod,
    premium: false,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    zip: "",
    city: "",
    message: "",
    consent: false,
    website: "",
  });

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setV((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(({ [key]: _omit, ...rest }) => (void _omit, rest));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = shippingRequestSchema.safeParse(v);
    if (!res.success) {
      const errs = flattenErrors(res.error);
      setErrors(errs);
      e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setSubmit({ status: "sending" });
    const result = await postForm("/api/anfrage/", v);
    if (!result.ok && result.reason === "validation") setErrors(result.fieldErrors);
    setSubmit({ status: "done", result });
  };

  const field = (name: keyof Values) => ({
    id: `${uid}-${name}`,
    name,
    error: errors[name],
  });

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby={`${uid}-title`} className="form-luxe form-direct flex flex-col p-6 sm:p-11">
      <h3 id={`${uid}-title`} className="text-[34px] leading-none sm:text-[44px]">
        Jetzt <em className="text-gold-ink">verkaufen</em>
      </h3>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-ink-2">
        {benefits.map((b) => (
          <li key={b} className="flex items-center gap-2">
            <Check aria-hidden strokeWidth={2} className="size-3.5 text-gold-deep" /> {b}
          </li>
        ))}
      </ul>

      <div role="radiogroup" aria-label="Versandart" className="mt-7 grid grid-cols-3 rounded-[16px] bg-cream p-1 shadow-[inset_0_0_0_1px_rgba(197,160,100,.28)]">
        {shippingMethods.map((m) => {
          const checked = v.method === m;
          return (
            <label
              key={m}
              className={`relative flex cursor-pointer items-center justify-center rounded-[12px] px-1.5 py-3.5 text-center text-[13px] font-semibold leading-tight transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold-ink ${
                checked ? "text-[#241f19]" : "text-ink-2 hover:text-gold-ink"
              }`}
            >
              {checked ? (
                <motion.span
                  layoutId={`${uid}-pill`}
                  aria-hidden
                  className="absolute inset-0 rounded-[12px] bg-gold shadow-[0_10px_26px_-12px_rgba(140,104,48,.75)]"
                  transition={reduce ? { duration: 0 } : { duration: 0.55, ease: [0.7, 0, 0.2, 1] }}
                />
              ) : null}
              <input type="radio" name="method" value={m} checked={checked} onChange={() => set("method", m)} className="sr-only" />
              <span className="relative">{tabLabels[m]}</span>
            </label>
          );
        })}
      </div>

      {/* Honeypot – hidden from people, filled by bots */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <InputField {...field("firstName")} label="Vorname" autoComplete="given-name" value={v.firstName} onChange={(e) => set("firstName", e.target.value)} />
        <InputField {...field("lastName")} label="Nachname" autoComplete="family-name" value={v.lastName} onChange={(e) => set("lastName", e.target.value)} />
        <InputField {...field("street")} className="sm:col-span-2" label="Straße & Hausnummer" autoComplete="street-address" value={v.street} onChange={(e) => set("street", e.target.value)} />
        <InputField {...field("zip")} label="PLZ" inputMode="numeric" autoComplete="postal-code" value={v.zip} onChange={(e) => set("zip", e.target.value)} />
        <InputField {...field("city")} label="Ort" autoComplete="address-level2" value={v.city} onChange={(e) => set("city", e.target.value)} />
        <InputField {...field("email")} label="E-Mail" type="email" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} />
        <InputField {...field("phone")} label="Telefon (optional)" type="tel" autoComplete="tel" value={v.phone} onChange={(e) => set("phone", e.target.value)} />
        <TextareaField {...field("message")} className="sm:col-span-2" label="Bemerkung (optional)" rows={3} value={v.message} onChange={(e) => set("message", e.target.value)} />
      </div>

      <div className="mt-5 flex flex-col gap-3.5">
        <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-ink-2">
          <input type="checkbox" name="premium" checked={v.premium} onChange={(e) => set("premium", e.target.checked)} className="check-luxe" />
          <span>Ich benötige ein Premium-Paket, da meine Edelmetalle einen Wert über 500 € haben.</span>
        </label>
        <div className="flex flex-col gap-1.5">
          <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-ink-2">
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
              Ich stimme den{" "}
              <a href="/agb/" className="underline">
                AGB
              </a>{" "}
              zu, habe die{" "}
              <a href="/datenschutz/" className="underline">
                Datenschutzerklärung
              </a>{" "}
              gelesen und bin mit der Verwendung meiner Angaben für diese Anfrage einverstanden.
            </span>
          </label>
          {errors.consent ? (
            <span id={`${uid}-consent-error`} className="field-error">
              {errors.consent}
            </span>
          ) : null}
        </div>
      </div>

      <button type="submit" className="btn btn-gold btn-block mt-6" disabled={submit.status === "sending"}>
        {submit.status === "sending" ? (
          <>
            Wird gesendet <Loader2 aria-hidden className="animate-spin" />
          </>
        ) : (
          <>
            {shippingMethodLabels[v.method]} <ArrowRight aria-hidden />
          </>
        )}
      </button>
      <p className="mt-3 text-center text-[12px] text-ink-2/80">SSL-verschlüsselt · Kostenlos & unverbindlich</p>

      <div className="mt-5 empty:hidden">
        <SubmitNotice state={submit} />
      </div>
    </form>
  );
}
