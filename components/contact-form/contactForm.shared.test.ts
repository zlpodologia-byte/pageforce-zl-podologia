import assert from "node:assert/strict";
import test from "node:test";

const contactFormModulePath = new URL("./contactForm.shared.ts", import.meta.url).href;
const {
  CONTACT_BUDGET_OPTIONS,
  CONTACT_SERVICE_OPTIONS,
  formatContactEmailText,
  getFirstContactErrorField,
  normalizeContactPayload,
  validateContactPayload,
} = (await import(contactFormModulePath)) as typeof import("./contactForm.shared");

test("normalizes a valid payload", () => {
  const values = normalizeContactPayload({
    name: "  Alex Morgan  ",
    email: "  alex@studio.com ",
    company: "  Example Co ",
    budget: CONTACT_BUDGET_OPTIONS[1],
    services: [
      CONTACT_SERVICE_OPTIONS[0],
      CONTACT_SERVICE_OPTIONS[1],
      CONTACT_SERVICE_OPTIONS[0],
    ],
    message: "  Need help with a launch plan.  ",
    hp: "  ",
  });

  assert.deepEqual(values, {
    name: "Alex Morgan",
    email: "alex@studio.com",
    company: "Example Co",
    budget: CONTACT_BUDGET_OPTIONS[1],
    services: [CONTACT_SERVICE_OPTIONS[0], CONTACT_SERVICE_OPTIONS[1]],
    message: "Need help with a launch plan.",
    hp: "",
  });
});

test("returns required field and length errors in form order", () => {
  const { fieldErrors } = validateContactPayload({
    name: "",
    email: "invalid",
    message: "short",
  });

  assert.deepEqual(fieldErrors, {
    name: "Please enter your name.",
    email: "Enter a valid email address.",
    message: "Tell us a little more (at least 10 characters).",
  });
  assert.equal(getFirstContactErrorField(fieldErrors), "name");
});

test("rejects tampered budget and services values", () => {
  const { fieldErrors, values } = validateContactPayload({
    name: "Alex",
    email: "alex@studio.com",
    budget: "Over 1M",
    services: [CONTACT_SERVICE_OPTIONS[0], "Unknown"],
    message: "This message is definitely long enough.",
  });

  assert.equal(values.budget, "");
  assert.deepEqual(values.services, [CONTACT_SERVICE_OPTIONS[0]]);
  assert.deepEqual(fieldErrors, {
    budget: "Select a valid budget range.",
    services: "Select valid services.",
  });
});

test("formats the email body with optional fallbacks", () => {
  const text = formatContactEmailText({
    name: "Alex",
    email: "alex@studio.com",
    company: "",
    budget: "",
    services: [],
    message: "Build a new product page with motion.",
    hp: "",
  });

  assert.match(text, /Name: Alex/);
  assert.match(text, /Budget: Not provided/);
  assert.match(text, /Services: Not provided/);
  assert.match(text, /Build a new product page with motion\./);
});
