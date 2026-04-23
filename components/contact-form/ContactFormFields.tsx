import type { RefObject } from "react";
import {
  CONTACT_BUDGET_LABELS,
  CONTACT_BUDGET_OPTIONS,
  CONTACT_SERVICE_OPTIONS,
  type ContactBudgetOption,
  type ContactFieldErrors,
  type ContactServiceOption,
} from "./contactForm.shared";

const LABEL_CLASS_NAME =
  "text-[0.72rem] uppercase tracking-[0.24em] text-[rgba(0,0,0,0.6)]";
const FIELD_CLASS_NAME =
  "mt-3 min-h-11 w-full border-b bg-transparent pb-3 text-[1rem] leading-[1.5] text-[var(--color-ink)] transition-[border-color] duration-300 placeholder:text-[rgba(0,0,0,0.35)] focus-visible:outline-none";
const ERROR_CLASS_NAME = "mt-2 text-[0.76rem] leading-[1.5] text-[#9d3f35]";

function getErrorId(name: string) {
  return `contact-${name}-error`;
}

function getErrorProps(name: string, error?: string) {
  return {
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? getErrorId(name) : undefined,
  };
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) {
    return null;
  }

  return (
    <p id={id} role="alert" className={ERROR_CLASS_NAME}>
      {error}
    </p>
  );
}

interface TextInputFieldProps {
  id: string;
  label: string;
  name: string;
  value: string;
  type?: "text" | "email";
  autoComplete?: string;
  required?: boolean;
  error?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
  onChange: (value: string) => void;
}

export function TextInputField({
  id,
  label,
  name,
  value,
  type = "text",
  autoComplete,
  required,
  error,
  inputRef,
  onChange,
}: TextInputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASS_NAME}>
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${FIELD_CLASS_NAME} ${error ? "border-[#9d3f35]" : "border-[var(--color-line)]"}`}
        data-cursor-ignore
        {...getErrorProps(name, error)}
      />
      <FieldError id={getErrorId(name)} error={error} />
    </div>
  );
}

interface BudgetFieldProps {
  value: ContactBudgetOption | "";
  error?: string;
  selectRef: RefObject<HTMLSelectElement | null>;
  onChange: (value: ContactBudgetOption | "") => void;
}

export function BudgetField({ value, error, selectRef, onChange }: BudgetFieldProps) {
  return (
    <div>
      <label htmlFor="contact-budget" className={LABEL_CLASS_NAME}>
        Budget
      </label>
      <select
        ref={selectRef}
        id="contact-budget"
        name="budget"
        value={value}
        onChange={(event) => onChange(event.target.value as ContactBudgetOption | "")}
        className={`${FIELD_CLASS_NAME} appearance-none ${error ? "border-[#9d3f35]" : "border-[var(--color-line)]"}`}
        data-cursor-ignore
        {...getErrorProps("budget", error)}
      >
        <option value="">{CONTACT_BUDGET_LABELS[""]}</option>
        {CONTACT_BUDGET_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {CONTACT_BUDGET_LABELS[option]}
          </option>
        ))}
      </select>
      <FieldError id={getErrorId("budget")} error={error} />
    </div>
  );
}

interface ServicesFieldProps {
  values: ContactServiceOption[];
  error?: string;
  buttonRef: RefObject<HTMLButtonElement | null>;
  onToggle: (value: ContactServiceOption) => void;
}

export function ServicesField({
  values,
  error,
  buttonRef,
  onToggle,
}: ServicesFieldProps) {
  return (
    <fieldset className="md:col-span-2" aria-describedby={error ? getErrorId("services") : undefined}>
      <legend className={LABEL_CLASS_NAME}>Services</legend>
      <div className="mt-4 flex flex-wrap gap-3">
        {CONTACT_SERVICE_OPTIONS.map((service, index) => {
          const isActive = values.includes(service);

          return (
            <button
              key={service}
              ref={index === 0 ? buttonRef : undefined}
              type="button"
              onClick={() => onToggle(service)}
              aria-pressed={isActive}
              className={`min-h-11 rounded-full border px-4 py-2 text-[0.78rem] uppercase tracking-[0.18em] transition-[background-color,border-color,color] duration-300 ${
                isActive
                  ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-canvas)]"
                  : "border-[var(--color-line)] text-[var(--color-ink)]"
              }`}
              data-cursor-target
              data-cursor-label="Toggle"
            >
              {service}
            </button>
          );
        })}
      </div>
      <FieldError id={getErrorId("services")} error={error} />
    </fieldset>
  );
}

interface MessageFieldProps {
  value: string;
  error?: string;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  onChange: (value: string) => void;
}

export function MessageField({
  value,
  error,
  textareaRef,
  onChange,
}: MessageFieldProps) {
  return (
    <div className="md:col-span-2">
      <label htmlFor="contact-message" className={LABEL_CLASS_NAME}>
        Message
      </label>
      <textarea
        ref={textareaRef}
        id="contact-message"
        name="message"
        required
        rows={7}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${FIELD_CLASS_NAME} resize-none ${error ? "border-[#9d3f35]" : "border-[var(--color-line)]"}`}
        data-cursor-ignore
        {...getErrorProps("message", error)}
      />
      <FieldError id={getErrorId("message")} error={error} />
    </div>
  );
}

export function ErrorBanner({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  if (!message) {
    return null;
  }

  return (
    <div
      className="flex w-full max-w-[34rem] items-start justify-between gap-4 rounded-[1.5rem] border border-[#d6b1aa] bg-[#f7ece9] px-5 py-4 text-[0.86rem] leading-[1.6] text-[#7b3028]"
      role="alert"
    >
      <p>{message}</p>
      <button
        type="button"
        onClick={onDismiss}
        className="min-h-11 shrink-0 text-[0.68rem] uppercase tracking-[0.18em] text-[#7b3028]"
      >
        Dismiss
      </button>
    </div>
  );
}

export function SuccessPanel({
  headingRef,
  onReset,
}: {
  headingRef: RefObject<HTMLHeadingElement | null>;
  onReset: () => void;
}) {
  return (
    <div className="rounded-[2rem] border border-[var(--color-line)] bg-[rgba(247,226,212,0.2)] p-[clamp(1.5rem,3vw,2.4rem)]">
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="text-[clamp(1.8rem,3vw,2.6rem)] leading-[0.96] tracking-[-0.045em] text-[var(--color-ink)]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
      >
        Mensagem recebida.
      </h2>
      <p className="mt-4 max-w-[36ch] text-[0.96rem] leading-[1.7] text-[rgba(0,0,0,0.68)]">
        Um responsável da operação responde em até dois dias úteis. Se for urgente, escreva direto para hello@pageforce.studio.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="group mt-8 inline-flex min-h-11 items-center gap-3 rounded-full border border-[var(--color-ink)] px-5 py-3 text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-ink)] transition-[background-color,color] duration-300 hover:bg-[var(--color-ink)] hover:text-[var(--color-canvas)]"
        data-cursor-target
        data-cursor-label="Reset"
      >
        <span>Enviar outra</span>
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          &rarr;
        </span>
      </button>
    </div>
  );
}
