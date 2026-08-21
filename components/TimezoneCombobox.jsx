"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PRIORITY_ZONES, TIMEZONES } from "@/lib/timezones";
import { zoneMatches } from "@/lib/timezoneSearch";
import { CONTROL_HEIGHT, ErrorText } from "./FormField";

export default function TimezoneCombobox({ id, label, value, onChange, error, className = "" }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const selected = TIMEZONES.find((z) => z.value === value);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    // Unsearched, lead with Ignitho's markets — 418 zones alphabetically is a
    // wall, and most visitors are in one of eight of them.
    if (!q) {
      const priority = PRIORITY_ZONES.map((id) =>
        TIMEZONES.find((z) => z.value === id),
      ).filter(Boolean);
      const rest = TIMEZONES.filter((z) => !PRIORITY_ZONES.includes(z.value));
      return [...priority, ...rest];
    }
    return TIMEZONES.filter((z) => zoneMatches(z, q));
  }, [query]);

  // Keep the highlighted row scrolled into view as the user arrows through.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  function commit(zone) {
    onChange(zone.value);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (matches.length ? (i + step + matches.length) % matches.length : 0));
      return;
    }

    if (event.key === "Enter" && open) {
      event.preventDefault();
      if (matches[active]) commit(matches[active]);
      return;
    }

    if (event.key === "Escape") {
      setQuery("");
      setOpen(false);
    }
  }

  const floated = open || Boolean(selected);
  const shown = open ? query : (selected?.label ?? "");

  return (
    <div className={className}>
      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          name="timezone"
          type="text"
          role="combobox"
          autoComplete="off"
          aria-expanded={open}
          aria-controls={`${id}-listbox`}
          aria-autocomplete="list"
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          value={shown}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
            if (!open) setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            setQuery("");
            setOpen(false);
          }}
          onKeyDown={handleKeyDown}
          className={`peer ${CONTROL_HEIGHT} w-full rounded-[9px] border bg-white px-[15px] pt-[23px] pr-[38px] pb-[7px] text-[15px] text-heading outline-none transition-colors duration-150 ${
            error
              ? "border-[#e11d48] focus:border-[#e11d48]"
              : "border-line hover:border-[#c9b6e8] focus:border-violet"
          }`}
        />

        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-[16px] transition-all duration-150 ${
            floated
              ? "top-[8px] text-[10.5px] leading-[13px] font-bold uppercase tracking-[0.07em] text-muted"
              : "top-[18px] text-[15px] leading-[20px] text-placeholder"
          } peer-focus:top-[8px] peer-focus:text-[10.5px] peer-focus:leading-[13px] peer-focus:font-bold peer-focus:tracking-[0.07em] peer-focus:text-violet peer-focus:uppercase`}
        >
          {label}
          <span className="ml-[3px] text-[#e11d48]">*</span>
        </label>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-[14px] h-4 w-4 -translate-y-1/2 text-muted"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.2-3.2" />
        </svg>

        {open && (
          <ul
            id={`${id}-listbox`}
            ref={listRef}
            role="listbox"
            onMouseDown={(event) => event.preventDefault()}
            className="absolute z-30 mt-1 max-h-[248px] w-full overflow-y-auto rounded-[9px] border border-line bg-white py-1 shadow-[0_12px_30px_rgba(74,18,184,0.14)]"
          >
            {matches.length === 0 && (
              <li className="px-[15px] py-[10px] text-[13.5px] text-muted">
                No time zone matches &ldquo;{query}&rdquo;
              </li>
            )}

            {matches.map((zone, index) => {
              const isActive = index === active;
              return (
                <li
                  key={zone.value}
                  role="option"
                  aria-selected={zone.value === value}
                  data-active={isActive}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => commit(zone)}
                  className={`cursor-pointer px-[15px] py-[8px] text-[13.5px] leading-[20px] ${
                    isActive ? "bg-[#f4ecff] text-violet" : "text-body"
                  } ${zone.value === value ? "font-semibold" : ""}`}
                >
                  {zone.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <ErrorText id={`${id}-error`} message={error} />
    </div>
  );
}
