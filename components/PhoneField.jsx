"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_DIAL, DIAL_CODES, matchDialCode } from "@/lib/dialCodes";
import { CONTROL_HEIGHT, ErrorText } from "./FormField";
import { ChevronDownIcon } from "./icons";

/**
 * Phone input with a searchable country code.
 *
 * Typing or pasting a number that starts with a dial code (+91…, +44…) moves
 * that code into the selector automatically, so people who type the full
 * international number get the right country without touching the dropdown.
 *
 * The value handed to the parent is always "<dial> <national>".
 */
export default function PhoneField({ id, label, onChange, error, className = "" }) {
  const [country, setCountry] = useState(DEFAULT_DIAL);
  const [national, setNational] = useState("");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const wrapRef = useRef(null);
  const searchRef = useRef(null);
  const numberRef = useRef(null);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDocMouseDown = (event) => {
      if (!wrapRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [open]);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DIAL_CODES;
    return DIAL_CODES.filter(
      (entry) =>
        entry.name.toLowerCase().includes(q) ||
        entry.iso.toLowerCase().includes(q) ||
        entry.dial.includes(q.startsWith("+") ? q : `+${q}`),
    );
  }, [query]);

  function emit(nextCountry, nextNational) {
    const trimmed = nextNational.trim();
    onChange(trimmed ? `${nextCountry.dial} ${trimmed}` : "");
  }

  function handleNumberChange(event) {
    const raw = event.target.value;

    // Someone typed or pasted a full international number — adopt its code.
    const detected = matchDialCode(raw);
    if (detected) {
      const rest = raw.replace(/[^\d+]/g, "").slice(detected.dial.length);
      setCountry(detected);
      setNational(rest);
      emit(detected, rest);
      return;
    }

    const cleaned = raw.replace(/[^\d\s()-]/g, "");
    setNational(cleaned);
    emit(country, cleaned);
  }

  function selectCountry(entry) {
    setCountry(entry);
    setOpen(false);
    setQuery("");
    emit(entry, national);
    numberRef.current?.focus();
  }

  function handleSearchKeyDown(event) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (matches.length ? (i + step + matches.length) % matches.length : 0));
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      if (matches[active]) selectCountry(matches[active]);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      setQuery("");
    }
  }

  return (
    <div className={className}>
      <div ref={wrapRef} className="relative">
        <div
          className={`flex ${CONTROL_HEIGHT} w-full rounded-[9px] border bg-white transition-colors duration-150 ${
            error
              ? "border-[#e11d48]"
              : "border-line hover:border-[#c9b6e8] focus-within:border-violet"
          }`}
        >
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={`Country code, currently ${country.name} ${country.dial}`}
            className="flex shrink-0 items-center gap-[6px] rounded-l-[9px] border-r border-line pr-[10px] pl-[14px] text-[14px] font-semibold text-heading transition-colors hover:bg-[#faf7ff] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet"
          >
            <span>{country.iso}</span>
            <span className="text-muted tabular-nums">{country.dial}</span>
            <ChevronDownIcon className="h-[14px] w-[14px] text-muted" />
          </button>

          <div className="relative min-w-0 flex-1">
            <input
              ref={numberRef}
              id={id}
              name={id}
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder=" "
              value={national}
              onChange={handleNumberChange}
              aria-invalid={error ? "true" : undefined}
              aria-describedby={error ? `${id}-error` : undefined}
              className="peer h-full w-full rounded-r-[9px] bg-transparent px-[14px] pt-[23px] pb-[7px] text-[15px] text-heading outline-none"
            />
            <label
              htmlFor={id}
              className="pointer-events-none absolute top-[18px] left-[14px] text-[15px] leading-[20px] text-placeholder transition-all duration-150 peer-focus:top-[8px] peer-focus:text-[10.5px] peer-focus:leading-[13px] peer-focus:font-bold peer-focus:tracking-[0.07em] peer-focus:text-violet peer-focus:uppercase peer-[&:not(:placeholder-shown)]:top-[8px] peer-[&:not(:placeholder-shown)]:text-[10.5px] peer-[&:not(:placeholder-shown)]:leading-[13px] peer-[&:not(:placeholder-shown)]:font-bold peer-[&:not(:placeholder-shown)]:tracking-[0.07em] peer-[&:not(:placeholder-shown)]:uppercase"
            >
              {label}
              <span className="ml-[3px] text-[#e11d48]">*</span>
            </label>
          </div>
        </div>

        {open && (
          <div className="absolute z-30 mt-1 w-full min-w-[280px] overflow-hidden rounded-[9px] border border-line bg-white shadow-[0_12px_30px_rgba(74,18,184,0.14)]">
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search country or code..."
              className="w-full border-b border-line px-[14px] py-[11px] text-[14px] text-heading placeholder:text-placeholder focus:outline-none"
            />
            <ul role="listbox" className="max-h-[220px] overflow-y-auto py-1">
              {matches.length === 0 && (
                <li className="px-[14px] py-[10px] text-[13.5px] text-muted">
                  No match for &ldquo;{query}&rdquo;
                </li>
              )}
              {matches.map((entry, index) => (
                <li key={`${entry.iso}-${entry.dial}`}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={entry.iso === country.iso}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => selectCountry(entry)}
                    className={`flex w-full items-center gap-[10px] px-[14px] py-[8px] text-left text-[13.5px] ${
                      index === active ? "bg-[#f4ecff] text-violet" : "text-body"
                    }`}
                  >
                    <span className="w-[26px] shrink-0 font-semibold">{entry.iso}</span>
                    <span className="min-w-0 flex-1 truncate">{entry.name}</span>
                    <span className="shrink-0 text-muted tabular-nums">{entry.dial}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <ErrorText id={`${id}-error`} message={error} />
    </div>
  );
}
