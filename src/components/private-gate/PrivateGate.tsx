"use client";

import { useState, type KeyboardEvent } from "react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/FormFields";
import { usePrivateGate } from "@/hooks/usePrivateGate";

export function PrivateGate() {
  const { mode, hasError, checkCode } = usePrivateGate();
  const [value, setValue] = useState("");

  if (mode === "hidden") {
    return null;
  }

  const isUrlOnly = mode === "url";

  function submitOnEnter(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") checkCode(value);
  }

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg p-[24px]">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,168,67,0.07)_0%,transparent_65%)]" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-[400px] overflow-hidden rounded-[20px] border border-border bg-card shadow-panel [border-width:0.5px]">
        <div className="h-[3px] bg-topbar-gradient" />

        <div className="p-[36px] text-center max-sm:p-[24px]">
          {/* Icon */}
          <div className="mx-auto mb-[20px] flex h-[60px] w-[60px] items-center justify-center rounded-[14px] border border-[rgba(212,168,67,0.25)] bg-gold-dim">
            <LockIcon />
          </div>

          {/* Branding */}
          <div className="mb-[4px] text-[8.5px] font-semibold uppercase tracking-[3px] text-muted">
            Clapstick Media
          </div>
          <div className="mb-[4px] font-serif text-[20px] font-bold text-gold">
            Raja Choudhary
          </div>
          <h2 className="mb-[10px] font-serif text-[28px] font-bold text-text">
            Private Page
          </h2>

          <p className="mx-auto mb-[24px] max-w-[300px] text-[13px] leading-[1.7] text-muted">
            {isUrlOnly
              ? "This page requires a valid private link. Please request it from Raja Choudhary."
              : "This registration page is private. Enter the access code to continue."}
          </p>

          {!isUrlOnly && (
            <>
              <Input
                type="password"
                value={value}
                placeholder="Enter access code"
                className={`mb-[10px] h-[48px] w-full rounded-[10px] border px-[16px] font-outfit text-[14px] text-white outline-none transition-all duration-200 placeholder:text-muted focus:shadow-input-focus ${
                  hasError
                    ? "border-red bg-red-dim"
                    : "border-border bg-[#0A0A16] focus:border-gold"
                }`}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={submitOnEnter}
              />
              {hasError && (
                <div className="mb-[10px] text-[12px] text-red">
                  Incorrect access code. Try again.
                </div>
              )}
              <Button
                className="flex h-[48px] w-full items-center justify-center gap-[8px] rounded-[10px] border-0 bg-gold text-[14px] font-semibold text-bg transition-all duration-200 hover:-translate-y-[1px] hover:bg-gold-light hover:shadow-gold-soft"
                onClick={() => checkCode(value)}
              >
                Continue
                <svg
                  aria-hidden="true"
                  className="h-[14px] w-[14px]"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7 17 17 7m-7 0h7v7"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function LockIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[24px] w-[24px] text-gold"
      fill="none"
      viewBox="0 0 24 24"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M7 11V7a5 5 0 0 1 10 0v4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}
