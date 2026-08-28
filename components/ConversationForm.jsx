"use client";

import { useEffect, useRef, useState } from "react";
import { COUNTRIES, PRIORITY_COUNTRIES } from "@/lib/countries";
import { ErrorText, Field, SelectField, TextareaField } from "./FormField";
import PhoneField from "./PhoneField";
import { phoneErrorFor } from "@/lib/dialCodes";
import RecaptchaBox from "./RecaptchaBox";

const EMPTY = {
  firstName: "",
  lastName: "",
  workEmail: "",
  phone: "",
  company: "",
  jobTitle: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  additionalInfo: "",
};

// Everything is mandatory except additionalInfo.
const REQUIRED_LABELS = {
  firstName: "First name is required",
  lastName: "Last name is required",
  workEmail: "Work email is required",
  phone: "Phone number is required",
  company: "Company name is required",
  jobTitle: "Job title is required",
  address: "Address is required",
  city: "City is required",
  state: "State / province is required",
  zip: "ZIP / postal code is required",
  country: "Please select your country",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values, verified) {
  const errors = {};

  for (const [key, message] of Object.entries(REQUIRED_LABELS)) {
    if (!values[key].trim()) errors[key] = message;
  }

  const email = values.workEmail.trim();
  // The work-email rule lives on the server only, so there is one setting to
  // change rather than two; its message comes back and lands on this field.
  if (email && !EMAIL_RE.test(email)) {
    errors.workEmail = "Enter a valid email address";
  }

  if (values.phone.trim()) {
    // Checks the digits against the selected country's numbering plan, so a
    // US number of 16 digits is caught rather than accepted.
    const phoneProblem = phoneErrorFor(values.phone);
    const digits = values.phone.replace(/\D/g, "");
    if (phoneProblem) errors.phone = phoneProblem;
    else if (digits.length < 7) errors.phone = "Enter a valid phone number";
  }

  if (!verified) errors.robot = "Please confirm you are not a robot";

  return errors;
}

/** Runs the full ruleset but keeps only the message for one field. */
function validateField(key, values, verified) {
  return validate(values, verified)[key];
}

export default function ConversationForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [verified, setVerified] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  // The server tells us whether it sent a confirmation, so the browser needs
  // no copy of that setting.
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [submitError, setSubmitError] = useState("");
  // A field only starts nagging once it has been left, or once submit has run —
  // complaining "invalid email" while someone is still on the third character is
  // just noise.
  const [touched, setTouched] = useState({});
  const formRef = useRef(null);
  const honeypotRef = useRef(null);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const update = (key) => (event) => {
    const value = event.target.value;

    setValues((prev) => {
      const next = { ...prev, [key]: value };

      setErrors((current) => {
        if (!touched[key]) {
          // Untouched: never introduce an error mid-typing, only clear a stale one.
          return current[key] ? { ...current, [key]: undefined } : current;
        }
        return { ...current, [key]: validateField(key, next, verified) };
      });

      return next;
    });
  };

  const markTouched = (key) => () => {
    setTouched((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
    setErrors((current) => ({
      ...current,
      [key]: validateField(key, values, verified),
    }));
  };

  const field = (id, label, extra = {}) => ({
    id,
    label,
    error: errors[id],
    value: values[id],
    onChange: update(id),
    onBlur: markTouched(id),
    ...extra,
  });

  // Enter inside a single-line field would otherwise trigger an implicit
  // submit. Textareas (address, additional information) keep native behaviour
  // so Enter starts a new line, and real buttons still activate.
  function handleKeyDown(event) {
    if (event.key !== "Enter") return;
    const el = event.target;
    if (el.tagName === "TEXTAREA" || el.tagName === "BUTTON") return;
    event.preventDefault();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = { ...values };
    const found = validate(payload, verified);
    setErrors(found);
    setTouched(
      Object.fromEntries(Object.keys(EMPTY).map((key) => [key, true])),
    );

    const firstError = Object.keys(found)[0];
    if (firstError) {
      formRef.current?.querySelector('[name="' + firstError + '"]')?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          // Bot signals the server checks: an untouched honeypot and a
          // fill time no human could beat.
          companyWebsite: honeypotRef.current?.value ?? "",
          elapsedMs: Date.now() - startedAt.current,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
          const firstServerError = Object.keys(result.errors)[0];
          formRef.current
            ?.querySelector('[name="' + firstServerError + '"]')
            ?.focus();
        }
        setSubmitError(
          result.message || "Something went wrong, please try again",
        );
        return;
      }

      setConfirmationSent(Boolean(result.confirmationSent));
      setDone(true);
    } catch {
      setSubmitError(
        "We could not reach the server, check your connection and try again",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="flex h-full flex-col justify-center rounded-[14px] border border-green-line bg-white p-[30px] text-center shadow-card">
        <span className="mx-auto flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#eaf7f1] text-green">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-[30px] w-[30px]"
          >
            <path d="m4 12.5 5 5L20 6.5" />
          </svg>
        </span>

        <h3 className="mt-[22px] text-[26px] leading-[1.3] font-extrabold text-heading">
          Your conversation is requested
        </h3>
        <p className="mx-auto mt-[10px] max-w-[420px] text-[16px] leading-[26px] text-body">
          Thanks, {values.firstName || "there"},{" "}
          {confirmationSent ? (
            <>
              a confirmation is on its way to{" "}
              <span className="font-semibold text-heading">
                {values.workEmail}
              </span>
            </>
          ) : (
            <>our team has your request and will be in touch shortly</>
          )}
        </p>

        <p className="mx-auto mt-[22px] max-w-[420px] text-[14px] leading-[22px] text-muted">
          Roney will be in touch by email within one business day to arrange a
          time
        </p>
      </div>
    );
  }

  return (
    <form
      id="conversation-form"
      ref={formRef}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      noValidate
      className="flex h-full scroll-mt-[124px] flex-col rounded-[14px] border border-green-line bg-white p-[20px] shadow-[0_18px_50px_-18px_rgba(74,18,184,0.22)] sm:p-[30px]"
    >
      {/* honeypot — hidden from humans, irresistible to bots */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="companyWebsite">Company website</label>
        <input
          ref={honeypotRef}
          id="companyWebsite"
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Mirrors the heading treatment on the Why Book This Call panel, so the
          two columns read as a matched pair rather than a title and a form. */}
      <div className="mb-[26px] flex items-center gap-[14px]">
        <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-green text-white">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-[26px] w-[26px]"
          >
            <rect x="3" y="5" width="18" height="16" rx="3" />
            <path d="M3 10h18M8 3v4M16 3v4" />
            <circle
              cx="12"
              cy="15.5"
              r="1.4"
              fill="currentColor"
              stroke="none"
            />
          </svg>
        </span>

        <h2 className="text-[24px] leading-[1.2] font-extrabold tracking-[-0.02em] text-heading sm:text-[28px] lg:text-[30px]">
          Book Your 30-Minute Conversation
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-x-[22px] gap-y-[20px] sm:grid-cols-6 lg:grid-cols-12">
        <Field
          {...field("firstName", "First Name")}
          className="sm:col-span-3 lg:col-span-4"
          autoComplete="given-name"
        />
        <Field
          {...field("lastName", "Last Name")}
          className="sm:col-span-3 lg:col-span-4"
          autoComplete="family-name"
        />
        <Field
          {...field("workEmail", "Work Email")}
          className="sm:col-span-6 lg:col-span-4"
          type="email"
          inputMode="email"
          autoComplete="email"
        />
        <PhoneField
          id="phone"
          label="Phone Number"
          className="sm:col-span-3 lg:col-span-4"
          error={errors.phone}
          onChange={(next) => {
            setValues((prev) => ({ ...prev, phone: next }));
            setErrors((prev) =>
              prev.phone ? { ...prev, phone: undefined } : prev,
            );
          }}
        />
        <Field
          {...field("company", "Company Name")}
          className="sm:col-span-3 lg:col-span-4"
          autoComplete="organization"
        />
        <Field
          {...field("jobTitle", "Job Title")}
          className="sm:col-span-6 lg:col-span-4"
          autoComplete="organization-title"
        />

        <TextareaField
          id="address"
          label="Address"
          required
          rows={3}
          maxLength={300}
          showCounter={false}
          className="sm:col-span-6 lg:col-span-12"
          value={values.address}
          error={errors.address}
          onChange={update("address")}
          autoComplete="street-address"
        />

        <Field
          {...field("city", "City")}
          className="sm:col-span-2 lg:col-span-3"
          autoComplete="address-level2"
        />
        <Field
          {...field("state", "State / Province")}
          className="sm:col-span-2 lg:col-span-3"
          autoComplete="address-level1"
        />
        <Field
          {...field("zip", "ZIP / Postal Code")}
          className="sm:col-span-2 lg:col-span-3"
          autoComplete="postal-code"
        />
        <SelectField
          {...field("country", "Country")}
          className="sm:col-span-6 lg:col-span-3"
          autoComplete="country-name"
        >
          <option value="" disabled />
          <optgroup label="Ignitho markets">
            {PRIORITY_COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </optgroup>
          <optgroup label="All countries">
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </optgroup>
        </SelectField>

        <TextareaField
          id="additionalInfo"
          label="Additional Information"
          maxLength={1000}
          hint="(Optional)"
          className="sm:col-span-6 lg:col-span-12"
          value={values.additionalInfo}
          onChange={update("additionalInfo")}
        />
      </div>

      <RecaptchaBox
        error={errors.robot}
        onChange={(next) => {
          setVerified(next);
          setErrors((prev) =>
            prev.robot ? { ...prev, robot: undefined } : prev,
          );
        }}
      />
      <ErrorText id="robot-error" message={errors.robot} />

      {submitError && (
        <p
          role="alert"
          className="mt-[18px] rounded-[9px] border border-[#f3c2cb] bg-[#fdf2f4] px-[16px] py-[12px] text-[13.5px] leading-[21px] text-[#b3123a]"
        >
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-[22px] flex w-full items-center justify-center gap-2 rounded-[9px] bg-green py-[13px] text-[15px] font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? (
          <>
            <span className="h-[15px] w-[15px] animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Booking your slot
          </>
        ) : (
          <>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-[15px] w-[15px]"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 10h18M8 3v4M16 3v4" />
            </svg>
            Schedule My 30-Minute Conversation
          </>
        )}
      </button>
    </form>
  );
}
