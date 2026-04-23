export const CONTACT_BUDGET_OPTIONS = [
  "Under \u20AC25k",
  "\u20AC25k-\u20AC75k",
  "\u20AC75k-\u20AC150k",
  "\u20AC150k+",
  "Not sure yet",
] as const;

export const CONTACT_BUDGET_LABELS: Record<ContactBudgetOption | "", string> = {
  "": "Select a range",
  "Under \u20AC25k": "Under \u20AC25k",
  "\u20AC25k-\u20AC75k": "\u20AC25k-\u20AC75k",
  "\u20AC75k-\u20AC150k": "\u20AC75k-\u20AC150k",
  "\u20AC150k+": "\u20AC150k+",
  "Not sure yet": "Not sure yet",
};

export const CONTACT_SERVICE_OPTIONS = [
  "Strategy",
  "Brand",
  "Product",
  "Engineering",
  "Motion & 3D",
  "Content",
] as const;

export type ContactBudgetOption = (typeof CONTACT_BUDGET_OPTIONS)[number];
export type ContactServiceOption = (typeof CONTACT_SERVICE_OPTIONS)[number];

export interface ContactFormValues {
  name: string;
  email: string;
  company: string;
  budget: ContactBudgetOption | "";
  services: ContactServiceOption[];
  message: string;
  hp: string;
}

export type ContactFieldName = "name" | "email" | "budget" | "services" | "message";
export type ContactFieldErrors = Partial<Record<ContactFieldName, string>>;

export const CONTACT_FIELD_ORDER: ContactFieldName[] = [
  "name",
  "email",
  "budget",
  "services",
  "message",
];

export const EMPTY_CONTACT_FORM_VALUES: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  budget: "",
  services: [],
  message: "",
  hp: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BUDGET_SET = new Set<ContactBudgetOption>(CONTACT_BUDGET_OPTIONS);
const SERVICE_SET = new Set<ContactServiceOption>(CONTACT_SERVICE_OPTIONS);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeServices(value: unknown): ContactServiceOption[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const seen = new Set<ContactServiceOption>();
  const next: ContactServiceOption[] = [];

  for (const item of value) {
    if (typeof item !== "string") {
      continue;
    }

    if (!SERVICE_SET.has(item as ContactServiceOption)) {
      continue;
    }

    const service = item as ContactServiceOption;
    if (seen.has(service)) {
      continue;
    }

    seen.add(service);
    next.push(service);
  }

  return next;
}

export function normalizeContactPayload(input: unknown): ContactFormValues {
  const source = isRecord(input) ? input : {};
  const rawBudget = readString(source.budget);

  return {
    name: readString(source.name),
    email: readString(source.email),
    company: readString(source.company),
    budget: BUDGET_SET.has(rawBudget as ContactBudgetOption)
      ? (rawBudget as ContactBudgetOption)
      : "",
    services: normalizeServices(source.services),
    message: readString(source.message),
    hp: readString(source.hp),
  };
}

export function validateContactPayload(input: unknown): {
  values: ContactFormValues;
  fieldErrors: ContactFieldErrors;
} {
  const values = normalizeContactPayload(input);
  const source = isRecord(input) ? input : {};
  const rawBudget = readString(source.budget);
  const rawServices = source.services;
  const fieldErrors: ContactFieldErrors = {};

  if (!values.name) {
    fieldErrors.name = "Please enter your name.";
  }

  if (!values.email) {
    fieldErrors.email = "Please enter your email address.";
  } else if (!EMAIL_RE.test(values.email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (rawBudget && !BUDGET_SET.has(rawBudget as ContactBudgetOption)) {
    fieldErrors.budget = "Select a valid budget range.";
  }

  if (
    rawServices !== undefined &&
    rawServices !== null &&
    (!Array.isArray(rawServices) ||
      rawServices.some(
        (item) => typeof item !== "string" || !SERVICE_SET.has(item as ContactServiceOption),
      ))
  ) {
    fieldErrors.services = "Select valid services.";
  }

  if (!values.message) {
    fieldErrors.message = "Please tell us what you're after.";
  } else if (values.message.length < 10) {
    fieldErrors.message = "Tell us a little more (at least 10 characters).";
  }

  return { values, fieldErrors };
}

export function getFirstContactErrorField(
  fieldErrors: ContactFieldErrors,
): ContactFieldName | null {
  for (const field of CONTACT_FIELD_ORDER) {
    if (fieldErrors[field]) {
      return field;
    }
  }

  return null;
}

export function formatContactEmailText(values: ContactFormValues): string {
  return [
    "New Pageforce contact form submission",
    "",
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Company: ${values.company || "Not provided"}`,
    `Budget: ${values.budget || "Not provided"}`,
    `Services: ${values.services.length > 0 ? values.services.join(", ") : "Not provided"}`,
    "",
    "Message:",
    values.message,
  ].join("\n");
}
