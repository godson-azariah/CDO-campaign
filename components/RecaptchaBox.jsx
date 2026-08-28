"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Visual stand-in for the reCAPTCHA v2 "I'm not a robot" widget.
 *
 * WARNING: this is presentation only — it verifies nothing and stops no bots.
 * A real bot POSTs straight to the API route and never renders this component.
 * Before launch, swap it for a real challenge (Cloudflare Turnstile is free and
 * unlimited) and verify the token server-side in /api/leads.
 *
 * Mimicked from the real widget: the spinner pause before the tick, and the
 * 2-minute token expiry that unchecks the box and asks the user to redo it.
 */

const SPINNER_MS = 700;
const EXPIRY_MS = 120_000; // real reCAPTCHA tokens live ~120s

export default function RecaptchaBox({ onChange, error }) {
  const [phase, setPhase] = useState("idle"); // idle | checking | checked | expired
  const spinnerTimer = useRef(null);
  const expiryTimer = useRef(null);

  useEffect(
    () => () => {
      clearTimeout(spinnerTimer.current);
      clearTimeout(expiryTimer.current);
    },
    [],
  );

  function toggle() {
    if (phase === "checking") return;

    if (phase === "checked") {
      clearTimeout(expiryTimer.current);
      setPhase("idle");
      onChange(false);
      return;
    }

    setPhase("checking");
    spinnerTimer.current = setTimeout(() => {
      setPhase("checked");
      onChange(true);

      expiryTimer.current = setTimeout(() => {
        setPhase("expired");
        onChange(false);
      }, EXPIRY_MS);
    }, SPINNER_MS);
  }

  const checked = phase === "checked";
  const checking = phase === "checking";
  const expired = phase === "expired";
  const hollow = checked || checking;

  return (
    <div
      className="mt-[20px] w-[304px] max-w-full rounded-[3px] border bg-[#f9f9f9] shadow-[0_0_4px_1px_rgba(0,0,0,0.08)]"
      style={{
        borderColor: error || expired ? "#e11d48" : "#d3d3d3",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <div className="flex h-[74px] items-center pl-[12px]">
        <button
          type="button"
          role="checkbox"
          aria-checked={checked}
          aria-label="I'm not a robot"
          onClick={toggle}
          className="flex h-[28px] w-[28px] shrink-0 cursor-pointer items-center justify-center rounded-[2px]"
          style={{
            border: hollow ? "2px solid transparent" : "2px solid #c1c1c1",
            background: hollow ? "transparent" : "#fff",
          }}
        >
          {checking && (
            <span
              className="h-[26px] w-[26px] animate-spin rounded-full border-[3px] border-[#4285f4]/25"
              style={{ borderTopColor: "#4285f4" }}
            />
          )}

          {checked && (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#009e0f"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-[28px] w-[28px]"
            >
              <path d="m3.5 12.5 5.5 5.5L20.5 6.5" />
            </svg>
          )}
        </button>

        <span
          onClick={toggle}
          className="ml-[12px] cursor-pointer text-[14px] leading-[17px] text-black select-none"
        >
          I&#39;m not a robot
        </span>

        <div className="mt-[2px] mr-[10px] ml-auto flex flex-col items-center">
          <svg
            viewBox="0 0 44 44"
            aria-hidden="true"
            className="h-[32px] w-[32px]"
          >
            <path
              d="M30.5 36.72 A17 17 0 1 1 30.5 7.28"
              fill="none"
              stroke="#1c3aa9"
              strokeWidth="5"
            />
            <polygon
              points="0,-5 0,5 8,0"
              fill="#1c3aa9"
              transform="translate(30.5 7.28) rotate(30)"
            />
            <path
              d="M17.5 14.21 A9 9 0 1 1 17.5 29.79"
              fill="none"
              stroke="#4285f4"
              strokeWidth="5"
            />
            <polygon
              points="0,-4 0,4 6.5,0"
              fill="#4285f4"
              transform="translate(17.5 29.79) rotate(210)"
            />
          </svg>

          <span className="mt-[3px] text-[10px] leading-[10px] text-[#9aa0a6]">
            reCAPTCHA
          </span>
          <span className="mt-[2px] text-[8px] leading-[9px] text-[#9aa0a6]">
            Privacy - Terms
          </span>
        </div>
      </div>

      {expired && (
        <p
          role="status"
          className="px-[12px] pb-[9px] text-[12px] leading-[14px] text-[#d93025]"
        >
          Verification expired, check the checkbox again
        </p>
      )}
    </div>
  );
}
