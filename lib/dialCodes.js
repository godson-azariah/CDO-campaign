/**
 * Country dial codes for the phone field.
 *
 * ISO code rather than a flag emoji on purpose: Windows renders flag emoji as
 * two plain letters, so "IN" is what a lot of visitors would see anyway — this
 * way it looks deliberate and stays legible everywhere.
 */
export const DIAL_CODES = [
  { iso: "US", name: "United States", dial: "+1", min: 10, max: 10 },
  { iso: "GB", name: "United Kingdom", dial: "+44", min: 9, max: 10 },
  { iso: "IN", name: "India", dial: "+91", min: 10, max: 10 },
  { iso: "SE", name: "Sweden", dial: "+46", min: 7, max: 10 },
  { iso: "CR", name: "Costa Rica", dial: "+506", min: 8, max: 8 },
  { iso: "AE", name: "United Arab Emirates", dial: "+971", min: 8, max: 9 },
  { iso: "AR", name: "Argentina", dial: "+54", min: 10, max: 11 },
  { iso: "AT", name: "Austria", dial: "+43", min: 9, max: 13 },
  { iso: "AU", name: "Australia", dial: "+61", min: 9, max: 9 },
  { iso: "BD", name: "Bangladesh", dial: "+880", min: 10, max: 10 },
  { iso: "BE", name: "Belgium", dial: "+32", min: 8, max: 9 },
  { iso: "BR", name: "Brazil", dial: "+55", min: 10, max: 11 },
  { iso: "CA", name: "Canada", dial: "+1", min: 10, max: 10 },
  { iso: "CH", name: "Switzerland", dial: "+41", min: 9, max: 9 },
  { iso: "CL", name: "Chile", dial: "+56", min: 8, max: 9 },
  { iso: "CN", name: "China", dial: "+86", min: 10, max: 11 },
  { iso: "CO", name: "Colombia", dial: "+57", min: 10, max: 10 },
  { iso: "CZ", name: "Czechia", dial: "+420", min: 9, max: 9 },
  { iso: "DE", name: "Germany", dial: "+49", min: 6, max: 12 },
  { iso: "DK", name: "Denmark", dial: "+45", min: 8, max: 8 },
  { iso: "EG", name: "Egypt", dial: "+20", min: 10, max: 10 },
  { iso: "ES", name: "Spain", dial: "+34", min: 9, max: 9 },
  { iso: "FI", name: "Finland", dial: "+358", min: 8, max: 11 },
  { iso: "FR", name: "France", dial: "+33", min: 9, max: 9 },
  { iso: "GR", name: "Greece", dial: "+30", min: 10, max: 10 },
  { iso: "HK", name: "Hong Kong", dial: "+852", min: 8, max: 8 },
  { iso: "HU", name: "Hungary", dial: "+36", min: 8, max: 9 },
  { iso: "ID", name: "Indonesia", dial: "+62", min: 9, max: 12 },
  { iso: "IE", name: "Ireland", dial: "+353", min: 9, max: 9 },
  { iso: "IL", name: "Israel", dial: "+972", min: 9, max: 9 },
  { iso: "IT", name: "Italy", dial: "+39", min: 9, max: 11 },
  { iso: "JP", name: "Japan", dial: "+81", min: 9, max: 10 },
  { iso: "KE", name: "Kenya", dial: "+254", min: 9, max: 9 },
  { iso: "KR", name: "South Korea", dial: "+82", min: 9, max: 10 },
  { iso: "LK", name: "Sri Lanka", dial: "+94", min: 9, max: 9 },
  { iso: "MA", name: "Morocco", dial: "+212", min: 9, max: 9 },
  { iso: "MX", name: "Mexico", dial: "+52", min: 10, max: 10 },
  { iso: "MY", name: "Malaysia", dial: "+60", min: 9, max: 10 },
  { iso: "NG", name: "Nigeria", dial: "+234", min: 10, max: 10 },
  { iso: "NL", name: "Netherlands", dial: "+31", min: 9, max: 9 },
  { iso: "NO", name: "Norway", dial: "+47", min: 8, max: 8 },
  { iso: "NP", name: "Nepal", dial: "+977", min: 10, max: 10 },
  { iso: "NZ", name: "New Zealand", dial: "+64", min: 8, max: 10 },
  { iso: "PH", name: "Philippines", dial: "+63", min: 10, max: 10 },
  { iso: "PK", name: "Pakistan", dial: "+92", min: 10, max: 10 },
  { iso: "PL", name: "Poland", dial: "+48", min: 9, max: 9 },
  { iso: "PT", name: "Portugal", dial: "+351", min: 9, max: 9 },
  { iso: "QA", name: "Qatar", dial: "+974", min: 8, max: 8 },
  { iso: "RO", name: "Romania", dial: "+40", min: 9, max: 9 },
  { iso: "RU", name: "Russia", dial: "+7", min: 10, max: 10 },
  { iso: "SA", name: "Saudi Arabia", dial: "+966", min: 9, max: 9 },
  { iso: "SG", name: "Singapore", dial: "+65", min: 8, max: 8 },
  { iso: "TH", name: "Thailand", dial: "+66", min: 9, max: 9 },
  { iso: "TR", name: "Turkey", dial: "+90", min: 10, max: 10 },
  { iso: "TW", name: "Taiwan", dial: "+886", min: 9, max: 9 },
  { iso: "UA", name: "Ukraine", dial: "+380", min: 9, max: 9 },
  { iso: "VN", name: "Vietnam", dial: "+84", min: 9, max: 10 },
  { iso: "ZA", name: "South Africa", dial: "+27", min: 9, max: 9 },
];

/** Longest dial code first, so +971 wins over +97 when matching typed input. */
const BY_LENGTH = [...DIAL_CODES].sort((a, b) => b.dial.length - a.dial.length);

export function matchDialCode(value) {
  const cleaned = value.replace(/[^\d+]/g, "");
  if (!cleaned.startsWith("+")) return null;
  return BY_LENGTH.find((entry) => cleaned.startsWith(entry.dial)) ?? null;
}

export const DEFAULT_DIAL = DIAL_CODES[0];

/**
 * Checks the national part against the selected country's numbering plan.
 * Returns an error message, or null when it looks fine.
 *
 * The ranges are intentionally forgiving: the job is to catch a mistyped or
 * nonsense number, not to reject a real one on a technicality.
 */
export function phoneError(country, national) {
  const digits = String(national).replace(/\D/g, "");
  if (!digits) return "Phone number is required";

  const { min, max, name, dial } = country;

  if (digits.length < min) {
    const need = min === max ? `${min}` : `at least ${min}`;
    return `${name} numbers (${dial}) are ${need} digits — you have ${digits.length}`;
  }

  if (digits.length > max) {
    const allow = min === max ? `${max}` : `at most ${max}`;
    return `${name} numbers (${dial}) are ${allow} digits — you have ${digits.length}`;
  }

  return null;
}

/** Same check, starting from a stored "+91 9876543210" string. */
export function phoneErrorFor(value) {
  const country = matchDialCode(value);
  if (!country) return null; // no recognisable code — the generic rule handles it
  const national = String(value)
    .replace(/[^\d+]/g, "")
    .slice(country.dial.length);
  return phoneError(country, national);
}
