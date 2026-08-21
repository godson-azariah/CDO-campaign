import { ChevronDownIcon } from "./icons";

/*
 * Floating-label fields.
 *
 * The label sits inside the control and lifts to the top when the field is
 * focused or filled, so there is no separate label row and every control is the
 * same height. Text inputs drive this purely in CSS via :placeholder-shown —
 * which is why they all carry placeholder=" " (a single space).
 *
 * Controls that always render something of their own (select, date, time) can't
 * use that trick, so they pass alwaysFloat and we compute it in JS instead.
 */

export const CONTROL_HEIGHT = "h-[58px]";

const base = [
  "peer w-full rounded-[9px] border bg-white text-[15px] text-heading",
  "px-[15px] pt-[23px] pb-[7px] outline-none transition-colors duration-150",
].join(" ");

const borderFor = (error) =>
  error
    ? "border-[#e11d48] focus:border-[#e11d48]"
    : "border-line hover:border-[#c9b6e8] focus:border-violet";

const LABEL_COMMON =
  "pointer-events-none absolute left-[16px] transition-all duration-150";

const LABEL_REST = "top-[18px] text-[15px] leading-[20px] text-placeholder";

const LABEL_FLOATED =
  "top-[8px] text-[10.5px] leading-[13px] font-bold tracking-[0.07em] uppercase text-muted";

/** Never emit both: equal-specificity utilities would fight over stylesheet order. */
const labelClass = (floated, extra = "") =>
  [LABEL_COMMON, floated ? LABEL_FLOATED : LABEL_REST, extra].join(" ");

// Applied when the input itself is focused or non-empty.
const LABEL_PEER = [
  "peer-focus:top-[8px] peer-focus:text-[10.5px] peer-focus:leading-[13px]",
  "peer-focus:font-bold peer-focus:tracking-[0.07em] peer-focus:uppercase",
  "peer-focus:text-violet",
  "peer-[&:not(:placeholder-shown)]:top-[8px] peer-[&:not(:placeholder-shown)]:text-[10.5px]",
  "peer-[&:not(:placeholder-shown)]:leading-[13px] peer-[&:not(:placeholder-shown)]:font-bold",
  "peer-[&:not(:placeholder-shown)]:tracking-[0.07em] peer-[&:not(:placeholder-shown)]:uppercase",
].join(" ");

function Asterisk({ show }) {
  if (!show) return null;
  return <span className="ml-[3px] text-[#e11d48]">*</span>;
}

export function ErrorText({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-[6px] text-[12px] leading-[16px] font-medium text-[#e11d48]">
      {message}
    </p>
  );
}

export function Field({
  id,
  label,
  error,
  required = true,
  className = "",
  alwaysFloat = false,
  ...props
}) {
  return (
    <div className={className}>
      <div className="relative">
        <input
          id={id}
          name={id}
          placeholder=" "
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${base} ${CONTROL_HEIGHT} ${borderFor(error)}`}
          {...props}
        />
        <label
          htmlFor={id}
          className={
            alwaysFloat
              ? labelClass(true)
              : `${labelClass(false)} ${LABEL_PEER}`
          }
        >
          {label}
          <Asterisk show={required} />
        </label>
      </div>
      <ErrorText id={`${id}-error`} message={error} />
    </div>
  );
}

export function SelectField({ id, label, error, children, className = "", ...props }) {
  const floated = Boolean(props.value);

  return (
    <div className={className}>
      <div className="relative">
        <select
          id={id}
          name={id}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${base} ${CONTROL_HEIGHT} ${borderFor(error)} cursor-pointer appearance-none pr-[38px]`}
          {...props}
        >
          {children}
        </select>
        <label
          htmlFor={id}
          className={`${labelClass(floated)} peer-focus:top-[8px] peer-focus:text-[10.5px] peer-focus:leading-[13px] peer-focus:font-bold peer-focus:tracking-[0.07em] peer-focus:text-violet peer-focus:uppercase`}
        >
          {label}
          <Asterisk show />
        </label>
        <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-[14px] h-4 w-4 -translate-y-1/2 text-muted" />
      </div>
      <ErrorText id={`${id}-error`} message={error} />
    </div>
  );
}

export function TextareaField({
  id,
  label,
  hint,
  error,
  required = false,
  maxLength = 300,
  rows = 3,
  value = "",
  showCounter = true,
  className = "",
  ...props
}) {
  return (
    <div className={className}>
      <div className="relative">
        <textarea
          id={id}
          name={id}
          rows={rows}
          value={value}
          maxLength={maxLength}
          placeholder=" "
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${base} ${borderFor(error)} resize-y leading-[24px] ${
            showCounter ? "pb-[28px]" : "pb-[12px]"
          }`}
          {...props}
        />
        <label
          htmlFor={id}
          className={`${labelClass(false)} ${LABEL_PEER} bg-white pr-2`}
        >
          {label}
          <Asterisk show={required} />
          {hint && <span className="ml-[4px] font-normal normal-case">{hint}</span>}
        </label>
        {showCounter && (
          <span className="pointer-events-none absolute right-[14px] bottom-[9px] text-[11px] font-medium tabular-nums text-muted">
            {value.length} / {maxLength}
          </span>
        )}
      </div>
      <ErrorText id={`${id}-error`} message={error} />
    </div>
  );
}

/** Wrapper for controls that manage their own input, e.g. the phone and time zone fields. */
export function FieldShell({ id, label, error, floated, className = "", children }) {
  return (
    <div className={className}>
      <div className="relative">
        {children}
        <label
          htmlFor={id}
          className={labelClass(floated)}
        >
          {label}
          <Asterisk show />
        </label>
      </div>
      <ErrorText id={`${id}-error`} message={error} />
    </div>
  );
}

export { base as CONTROL_BASE, borderFor as CONTROL_BORDER };
