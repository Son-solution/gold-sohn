"use client";

import { AnimatePresence, motion } from "motion/react";
import { Lock, ShieldCheck } from "lucide-react";
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

interface ShellProps {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

/** Floating label: controls render with placeholder=" " so CSS can tell when they are filled. */
function FieldShell({ id, label, error, className = "", children }: ShellProps) {
  return (
    <div className={`flex min-w-0 flex-col gap-1.5 ${className}`}>
      <div className="field">
        {children}
        <label htmlFor={id} className="field-label">
          {label}
        </label>
      </div>
      <AnimatePresence>
        {error ? (
          <motion.span
            id={`${id}-error`}
            className="field-error"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {error}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

type InputFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className"> & {
  id: string;
  label: string;
  error?: string;
  className?: string;
};

export function InputField({ id, label, error, className, ...rest }: InputFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} className={className}>
      <input id={id} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} className="field-input" placeholder=" " {...rest} />
    </FieldShell>
  );
}

type TextareaFieldProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "className"> & {
  id: string;
  label: string;
  error?: string;
  className?: string;
};

export function TextareaField({ id, label, error, className, ...rest }: TextareaFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} className={className}>
      <textarea id={id} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} className="field-input" placeholder=" " {...rest} />
    </FieldShell>
  );
}

/** Quiet reassurance line at the foot of a form. */
export function FormTrust({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-[rgba(197,160,100,.25)] pt-5 text-[11px] uppercase tracking-[0.16em] text-ink-2 sm:justify-start">
      <li className="flex items-center gap-2">
        <Lock aria-hidden strokeWidth={1.5} className="size-3.5 text-gold-ink" /> SSL-verschlüsselt
      </li>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-2">
          <ShieldCheck aria-hidden strokeWidth={1.5} className="size-3.5 text-gold-ink" /> {t}
        </li>
      ))}
    </ul>
  );
}
