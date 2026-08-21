import { z } from "zod";
import { phoneErrorFor } from "./dialCodes";

const FREE_MAIL = ["gmail.", "yahoo.", "hotmail.", "outlook.", "icloud.", "proton."];

// Blocks gmail/yahoo/outlook in the Work Email field. Set REQUIRE_WORK_EMAIL
// to false while testing so you can submit with a personal address.
const requireWorkEmail = process.env.REQUIRE_WORK_EMAIL !== "false";

const required = (field, max = 200) =>
  z.string().trim().min(1, `${field} is required`).max(max);

export const leadSchema = z.object({
  firstName: required("First name", 80),
  lastName: required("Last name", 80),
  workEmail: required("Work email", 160)
    .email("Enter a valid email address")
    .refine(
      (value) => !requireWorkEmail || !FREE_MAIL.some((d) => value.toLowerCase().includes(d)),
      "Please use your work email address",
    ),
  phone: required("Phone number", 40)
    .refine((value) => value.replace(/\D/g, "").length >= 7, "Enter a valid phone number")
    // Checks the digits against the dial code's numbering plan, so
    // "+1 4351435435345345" is rejected rather than emailed on.
    .superRefine((value, ctx) => {
      const problem = phoneErrorFor(value);
      if (problem) ctx.addIssue({ code: "custom", message: problem });
    }),
  company: required("Company name", 160),
  jobTitle: required("Job title", 120),

  address: required("Address", 300),
  city: required("City", 120),
  state: required("State / province", 120),
  zip: required("ZIP / postal code", 32),
  country: required("Country", 80),


  additionalInfo: z.string().trim().max(1000).optional().default(""),
});

/**
 * Missing keys otherwise produce "expected string, received undefined" instead
 * of a readable message, so the route spreads this underneath the payload.
 */
export const EMPTY_LEAD = Object.fromEntries(
  Object.keys(leadSchema.shape).map((key) => [key, ""]),
);
