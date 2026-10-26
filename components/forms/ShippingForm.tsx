"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Loader2, Package, Send, Truck, type LucideIcon } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";
import { FormTrust, InputField, TextareaField } from "./FormField";
import { SubmitNotice, postForm, type SubmitState } from "./SubmitNotice";
import { flattenErrors, shippingMethodLabels, shippingMethods, shippingRequestSchema, type ShippingMethod } from "@/lib/forms/schemas";

const methodText: Record<ShippingMethod, string> = {
  versandtasche: "Wir senden Ihnen eine kostenlose, versicherte Versandtasche zu.",
  selbstversand: "Sie versenden selbst, zum Beispiel per Einschreiben.",
  abholung: "Sie fragen eine Abholung Ihrer Edelmetalle an.",
};

const methodIcon: Record<ShippingMethod, LucideIcon> = {
  versandtasche: Package,
  selbstversand: Send,
  abholung: Truck,
};

const steps = [
  { numeral: "I", label: "Versandart" },
  { numeral: "II", label: "Kontakt" },
  { numeral: "III", label: "Adresse" },
];

const stepFields = {
  1: ["method", "premium"],
  2: ["firstName", "lastName", "email", "phone"],
  3: ["street", "zip", "city", "message", "consent"],
} as const;

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

/** Multi-step shipping request. Server-validated; success is shown only after confirmed delivery. */
export function ShippingForm({ initialMethod = "versandtasche" }: { initialMethod?: ShippingMethod }) {
  const uid = useId();
  const reduce = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [dir, setDir] = useState(1);
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

  const validate = (s: 1 | 2 | 3) => {
    const pick = Object.fromEntries(stepFields[s].map((k) => [k, true])) as Record<(typeof stepFields)[typeof s][number], true>;
    const res = shippingRequestSchema.pick(pick).safeParse(v);
    if (res.success) return true;
    const errs = flattenErrors(res.error);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus());
    return false;
  };

  const go = (to: 1 | 2 | 3) => {
    setDir(to > step ? 1 : -1);
    setStep(to);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate(3)) return;
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

  const variants = {
    enter: (d: number) => ({ x: reduce ? 0 : d * 40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: reduce ? 0 : d * -40, opacity: 0 }),
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="form-luxe overflow-hidden p-6 sm:p-11">
      <p className="sr-only" aria-live="polite">
        Schritt {step} von 3: {steps[step - 1].label}
      </p>
      <ol aria-hidden className="mb-8 flex items-start sm:mb-10">
        {steps.map((s, i) => {
          const n = i + 1;
          const done = n < step;
          const active = n === step;
          return (
            <li key={s.numeral} className="relative flex flex-1 flex-col items-center gap-2.5">
              {i > 0 ? (
                <span className="absolute right-1/2 top-5 h-px w-[calc(100%-44px)] -translate-x-[22px] bg-pearl">
                  <motion.span className="block h-full bg-gold" initial={false} animate={{ width: n <= step ? "100%" : "0%" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
                </span>
              ) : null}
              <span
                className={`flex size-10 items-center justify-center rounded-full font-serif text-[15px] italic transition-[background,box-shadow,color] duration-500 ${
                  done
                    ? "bg-gold text-[#241f19] shadow-[0_10px_20px_-12px_rgba(140,104,48,.8)]"
                    : active
                      ? "bg-white text-gold-ink shadow-[inset_0_0_0_1.5px_#C5A064,0_0_0_5px_rgba(197,160,100,.14)]"
                      : "bg-white text-soft shadow-[inset_0_0_0_1px_#E6E3DF]"
                }`}
              >
                {done ? <Check strokeWidth={2} className="size-4" /> : s.numeral}
              </span>
              <span className={`text-[10px] uppercase tracking-[0.18em] sm:text-[10.5px] ${active ? "font-medium text-gold-ink" : "text-ink-2"}`}>{s.label}</span>
            </li>
          );
        })}
      </ol>

      {/* Honeypot – hidden from people, filled by bots */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <AnimatePresence mode="wait" custom={dir} initial={false}>
        <motion.div
          key={step}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          {step === 1 ? (
            <>
              <h3 className="text-[24px] leading-tight sm:text-[30px]">Wie möchten Sie versenden?</h3>
              <div role="radiogroup" aria-label="Versandart" className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {shippingMethods.map((m) => {
                  const checked = v.method === m;
                  const Icon = methodIcon[m];
                  return (
                    <label
                      key={m}
                      className={`relative flex cursor-pointer flex-col gap-2 rounded-[18px] p-4 sm:gap-2.5 sm:rounded-[20px] sm:p-5 transition-[box-shadow,background,translate] duration-500 hover:-translate-y-0.5 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold-ink ${
                        checked
                          ? "bg-[linear-gradient(160deg,#fff_0%,#F6F1E8_100%)] shadow-[inset_0_0_0_1.5px_#C5A064,0_18px_34px_-22px_rgba(140,104,48,.65)]"
                          : "bg-white shadow-[inset_0_0_0_1px_rgba(197,160,100,.3)] hover:shadow-[inset_0_0_0_1px_rgba(197,160,100,.7)]"
                      }`}
                    >
                      <input type="radio" name="method" value={m} checked={checked} onChange={() => set("method", m)} className="sr-only" />
                      <span className="mb-1 flex items-center justify-between">
                        <span className={`flex size-10 items-center justify-center rounded-full transition-colors duration-500 ${checked ? "bg-gold text-[#241f19]" : "bg-cream text-gold-ink"}`}>
                          <Icon aria-hidden strokeWidth={1.4} className="size-[18px]" />
                        </span>
                        <span aria-hidden className={`flex size-[18px] items-center justify-center rounded-full transition-shadow duration-500 ${checked ? "shadow-[inset_0_0_0_1.5px_#A8854B]" : "shadow-[inset_0_0_0_1px_#B9B6B0]"}`}>
                          <span className={`size-2 rounded-full bg-gold-deep transition-[scale] duration-500 ${checked ? "scale-100" : "scale-0"}`} />
                        </span>
                      </span>
                      <b className="font-serif text-[20px] font-normal leading-tight text-ink-strong">{shippingMethodLabels[m]}</b>
                      <small className="text-[13px] leading-snug text-ink-2">{methodText[m]}</small>
                    </label>
                  );
                })}
              </div>
              <label className="flex cursor-pointer items-start gap-3.5 rounded-[16px] bg-cream/70 p-4 text-sm leading-relaxed text-ink-2 shadow-[inset_0_0_0_1px_rgba(197,160,100,.22)]">
                <input type="checkbox" name="premium" checked={v.premium} onChange={(e) => set("premium", e.target.checked)} className="check-luxe" />
                <span>
                  <b className="block font-medium text-ink-strong">Premium-Paket</b>
                  Ich benötige ein Premium-Paket, da meine Edelmetalle einen Wert über 500 € haben.
                </span>
              </label>
              <div className="flex justify-end">
                <button type="button" className="btn btn-gold" onClick={() => validate(1) && go(2)}>
                  Weiter <ArrowRight aria-hidden />
                </button>
              </div>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <h3 className="text-[24px] leading-tight sm:text-[30px]">Ihre Kontaktdaten</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField {...field("firstName")} label="Vorname" autoComplete="given-name" value={v.firstName} onChange={(e) => set("firstName", e.target.value)} />
                <InputField {...field("lastName")} label="Nachname" autoComplete="family-name" value={v.lastName} onChange={(e) => set("lastName", e.target.value)} />
                <InputField {...field("email")} label="E-Mail" type="email" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} />
                <InputField {...field("phone")} label="Telefon (optional)" type="tel" autoComplete="tel" value={v.phone} onChange={(e) => set("phone", e.target.value)} />
              </div>
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button type="button" className="btn btn-line" onClick={() => go(1)}>
                  <ArrowLeft aria-hidden /> Zurück
                </button>
                <button type="button" className="btn btn-gold" onClick={() => validate(2) && go(3)}>
                  Weiter <ArrowRight aria-hidden />
                </button>
              </div>
            </>
          ) : null}

          {step === 3 ? (
            <>
              <h3 className="text-[24px] leading-tight sm:text-[30px]">{v.method === "versandtasche" ? "Lieferadresse & Bestätigung" : "Adresse & Bestätigung"}</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField {...field("street")} className="sm:col-span-2" label="Straße & Hausnummer" autoComplete="street-address" value={v.street} onChange={(e) => set("street", e.target.value)} />
                <InputField {...field("zip")} label="PLZ" inputMode="numeric" autoComplete="postal-code" value={v.zip} onChange={(e) => set("zip", e.target.value)} />
                <InputField {...field("city")} label="Ort" autoComplete="address-level2" value={v.city} onChange={(e) => set("city", e.target.value)} />
                <TextareaField {...field("message")} className="sm:col-span-2" label="Bemerkung (optional)" rows={3} value={v.message} onChange={(e) => set("message", e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="flex items-start gap-3 text-sm leading-relaxed text-ink-2">
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
                    zu und habe die{" "}
                    <a href="/datenschutz/" className="underline">
                      Datenschutzerklärung
                    </a>{" "}
                    gelesen.
                  </span>
                </label>
                {errors.consent ? (
                  <span id={`${uid}-consent-error`} className="field-error">
                    {errors.consent}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button type="button" className="btn btn-line" onClick={() => go(2)}>
                  <ArrowLeft aria-hidden /> Zurück
                </button>
                <button type="submit" className="btn btn-gold" disabled={submit.status === "sending"}>
                  {submit.status === "sending" ? (
                    <>
                      Wird gesendet <Loader2 aria-hidden className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Anfrage senden <ArrowRight aria-hidden />
                    </>
                  )}
                </button>
              </div>
            </>
          ) : null}
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex flex-col gap-6">
        <SubmitNotice state={submit} />
        <FormTrust items={["Kostenlos & unverbindlich"]} />
      </div>
    </form>
  );
}
