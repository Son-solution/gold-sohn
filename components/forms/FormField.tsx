"use client";

import { AnimatePresence, motion } from "motion/react";
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

interface ShellProps {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

function FieldShell({ id, label, error, className = "", children }: ShellProps) {
  return (
    <div className={`flex min-w-0 flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {children}
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
      <input id={id} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} className="field-input" {...rest} />
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
      <textarea id={id} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} className="field-input" {...rest} />
    </FieldShell>
  );
}
