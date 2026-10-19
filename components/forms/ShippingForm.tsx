"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";
import { InputField, TextareaField } from "./FormField";
import { SubmitNotice, postForm, type SubmitState } from "./SubmitNotice";
import { flattenErrors, shippingMethodLabels, shippingMethods, shippingRequestSchema, type ShippingMethod } from "@/lib/forms/schemas";

const methodText: Record<ShippingMethod, string> = {
  versandtasche: "Wir senden Ihnen eine kostenlose, versicherte Versandtasche zu.",
  selbstversand: "Sie versenden selbst, zum Beispiel per Einschreiben.",
  abholung: "Sie fragen eine Abholung Ihrer Edelmetalle an.",
};

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
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative overflow-hidden rounded-[24px] bg-white p-5 shadow-[0_50px_100px_-60px_rgba(100,75,35,.55),inset_0_0_0_1px_rgba(197,160,100,.32)] sm:rounded-[32px] sm:p-10">
      <div className="mb-6 flex items-center gap-4 sm:mb-8">
        <span className="whitespace-nowrap text-xs uppercase tracking-[0.18em] text-ink-2">Schritt {step} von 3</span>
        <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-pearl" aria-hidden>
          <motion.div className="h-full rounded-full bg-gold" animate={{ width: `${(step / 3) * 100}%` }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
        </div>
      </div>

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
                  return (
                    <label
                      key={m}
                      className={`relative flex cursor-pointer flex-col gap-1.5 rounded-[18px] p-4 sm:gap-2 sm:rounded-[20px] sm:p-5 transition-[box-shadow,background,translate] duration-500 hover:-translate-y-0.5 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold-ink ${
                        checked ? "bg-white shadow-[inset_0_0_0_1.5px_#C5A064,0_16px_30px_-20px_rgba(140,104,48,.6)]" : "bg-cream"
                      }`}
                    >
                      <input type="radio" name="method" value={m} checked={checked} onChange={() => set("method", m)} className="sr-only" />
                      <b className="font-serif text-[20px] font-normal text-ink-strong">{shippingMethodLabels[m]}</b>
                      <small className="text-[13px] leading-snug text-ink-2">{methodText[m]}</small>
                    </label>
                  );
                })}
              </div>
              <label className="flex items-start gap-3 text-sm leading-relaxed text-ink-2">
                <input type="checkbox" name="premium" checked={v.premium} onChange={(e) => set("premium", e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-gold-deep" />
                Ich benötige ein Premium-Paket, da meine Edelmetalle einen Wert über 500 € haben.
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
                    className="mt-0.5 size-5 shrink-0 accent-gold-deep"
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
                  {submit.status === "sending" ? "Wird gesendet …" : "Anfrage senden"}
                </button>
              </div>
            </>
          ) : null}
        </motion.div>
      </AnimatePresence>

      <div className="mt-6">
        <SubmitNotice state={submit} />
      </div>
    </form>
  );
}
