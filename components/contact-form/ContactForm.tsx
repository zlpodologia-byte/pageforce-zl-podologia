"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  BudgetField,
  ErrorBanner,
  MessageField,
  ServicesField,
  SuccessPanel,
  TextInputField,
} from "./ContactFormFields";
import {
  CONTACT_SERVICE_OPTIONS,
  EMPTY_CONTACT_FORM_VALUES,
  getFirstContactErrorField,
  validateContactPayload,
  type ContactFieldErrors,
  type ContactFieldName,
  type ContactFormValues,
  type ContactServiceOption,
} from "./contactForm.shared";

type FormStatus = "idle" | "submitting" | "success" | "error";

function hasFieldErrors(value: unknown): value is { fields: ContactFieldErrors } {
  if (typeof value !== "object" || value === null || !("fields" in value)) {
    return false;
  }

  return typeof value.fields === "object" && value.fields !== null;
}

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_CONTACT_FORM_VALUES);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [bannerMessage, setBannerMessage] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const budgetRef = useRef<HTMLSelectElement>(null);
  const firstServiceRef = useRef<HTMLButtonElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  const isSubmitting = status === "submitting";

  useEffect(() => {
    if (status === "success") {
      successHeadingRef.current?.focus();
    }
  }, [status]);

  const clearFieldError = (field: ContactFieldName) => {
    setFieldErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const clearBanner = () => {
    if (status === "error") {
      setStatus("idle");
    }

    setBannerMessage("");
  };

  const focusField = (field: ContactFieldName | null) => {
    if (field === "name") return void nameRef.current?.focus();
    if (field === "email") return void emailRef.current?.focus();
    if (field === "budget") return void budgetRef.current?.focus();
    if (field === "services") return void firstServiceRef.current?.focus();
    if (field === "message") return void messageRef.current?.focus();
  };

  const updateValue = <K extends keyof ContactFormValues>(field: K, value: ContactFormValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));

    if (field === "name" || field === "email" || field === "budget" || field === "message") {
      clearFieldError(field);
    }

    clearBanner();
  };

  const handleServiceToggle = (service: ContactServiceOption) => {
    setValues((current) => {
      const nextServices = current.services.includes(service)
        ? current.services.filter((item) => item !== service)
        : CONTACT_SERVICE_OPTIONS.filter((item) =>
            item === service || current.services.includes(item),
          );

      return { ...current, services: nextServices };
    });

    clearFieldError("services");
    clearBanner();
  };

  const handleReset = () => {
    setValues(EMPTY_CONTACT_FORM_VALUES);
    setFieldErrors({});
    setStatus("idle");
    setBannerMessage("");

    requestAnimationFrame(() => {
      nameRef.current?.focus();
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { values: nextValues, fieldErrors: nextFieldErrors } = validateContactPayload(values);
    setValues(nextValues);
    setFieldErrors(nextFieldErrors);
    setBannerMessage("");

    const firstInvalidField = getFirstContactErrorField(nextFieldErrors);
    if (firstInvalidField) {
      setStatus("idle");
      focusField(firstInvalidField);
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nextValues),
      });

      const payload: unknown = await response.json().catch(() => null);

      if (response.ok) {
        setFieldErrors({});
        setValues(EMPTY_CONTACT_FORM_VALUES);
        setStatus("success");
        return;
      }

      if (response.status === 422 && hasFieldErrors(payload)) {
        setFieldErrors(payload.fields);
        setStatus("idle");
        focusField(getFirstContactErrorField(payload.fields));
        return;
      }

      setStatus("error");
      setBannerMessage("Algo deu errado. Tente novamente ou escreva para hello@pageforce.studio.");
    } catch {
      setStatus("error");
      setBannerMessage("Falha de rede. Tente novamente ou escreva para hello@pageforce.studio.");
    }
  };

  if (status === "success") {
    return <SuccessPanel headingRef={successHeadingRef} onReset={handleReset} />;
  }

  return (
    <form className="max-w-[44rem]" noValidate onSubmit={handleSubmit}>
      <input
        type="text"
        name="hp"
        id="contact-hp"
        hidden
        autoComplete="off"
        value={values.hp}
        onChange={(event) => updateValue("hp", event.target.value)}
      />

      <div className="grid gap-8 md:grid-cols-2">
        <TextInputField
          id="contact-name"
          label="Name"
          name="name"
          value={values.name}
          required
          autoComplete="name"
          error={fieldErrors.name}
          inputRef={nameRef}
          onChange={(value) => updateValue("name", value)}
        />
        <TextInputField
          id="contact-email"
          label="Email"
          name="email"
          value={values.email}
          type="email"
          required
          autoComplete="email"
          error={fieldErrors.email}
          inputRef={emailRef}
          onChange={(value) => updateValue("email", value)}
        />
        <TextInputField
          id="contact-company"
          label="Company"
          name="company"
          value={values.company}
          autoComplete="organization"
          onChange={(value) => updateValue("company", value)}
        />
        <BudgetField
          value={values.budget}
          error={fieldErrors.budget}
          selectRef={budgetRef}
          onChange={(value) => updateValue("budget", value)}
        />
        <ServicesField
          values={values.services}
          error={fieldErrors.services}
          buttonRef={firstServiceRef}
          onToggle={handleServiceToggle}
        />
        <MessageField
          value={values.message}
          error={fieldErrors.message}
          textareaRef={messageRef}
          onChange={(value) => updateValue("message", value)}
        />
      </div>

      <div className="mt-10 flex flex-col items-start gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex min-h-11 items-center gap-3 rounded-full bg-[var(--color-ink)] px-6 py-3 text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-canvas)] transition-[transform,opacity] duration-300 disabled:cursor-not-allowed disabled:opacity-60"
          data-cursor-target
          data-cursor-label="Send"
        >
          <span>{isSubmitting ? "Sending..." : "Send message"}</span>
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </button>

        <ErrorBanner message={bannerMessage} onDismiss={clearBanner} />
      </div>
    </form>
  );
}
