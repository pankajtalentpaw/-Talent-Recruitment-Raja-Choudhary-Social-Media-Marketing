"use client";

import type { KeyboardEvent } from "react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/FormFields";

interface AdminLoginProps {
  visible: boolean;
  password: string;
  hasError: boolean;
  onPasswordChange: (password: string) => void;
  onLogin: () => void;
}

export function AdminLogin({
  visible,
  password,
  hasError,
  onPasswordChange,
  onLogin,
}: AdminLoginProps) {
  function loginOnEnter(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") onLogin();
  }

  return (
    <section
      className={`${visible ? "flex" : "hidden"} min-h-[calc(100vh-67px)] flex-col items-center justify-center px-[18px] py-[40px]`}
    >
      {/* Card */}
      <div className="w-full max-w-[420px] overflow-hidden rounded-[20px] border border-border bg-card shadow-panel [border-width:0.5px]">
        {/* Top accent */}
        <div className="h-[3px] bg-topbar-gradient" />

        <div className="px-[36px] py-[36px] max-sm:px-[24px]">
          {/* Icon + Title */}
          <div className="mb-[28px] text-center">
            <div className="mx-auto mb-[16px] flex h-[56px] w-[56px] items-center justify-center rounded-[14px] border border-[rgba(212,168,67,0.25)] bg-gold-dim">
              <LockIcon />
            </div>
            <div className="mb-[4px] text-[8.5px] font-semibold uppercase tracking-[3px] text-muted">
              Secure Area
            </div>
            <h2 className="font-serif text-[28px] font-bold leading-none text-text">
              Admin Login
            </h2>
            <p className="mt-[6px] text-[12px] text-muted">
              Enter your credentials to access the dashboard
            </p>
          </div>

          {/* Password field */}
          <div className="mb-[14px]">
            <label className="mb-[8px] block text-[10px] font-semibold uppercase tracking-[1.5px] text-muted-light">
              Password
            </label>
            <Input
              type="password"
              value={password}
              placeholder="Enter admin password"
              className={`h-[48px] w-full rounded-[10px] border px-[16px] font-outfit text-[14px] text-white outline-none transition-all duration-200 placeholder:text-muted focus:shadow-input-focus ${
                hasError
                  ? "border-red bg-red-dim focus:border-red"
                  : "border-border bg-[#0A0A16] focus:border-gold"
              }`}
              onChange={(event) => onPasswordChange(event.target.value)}
              onKeyDown={loginOnEnter}
            />
          </div>

          {/* Error message */}
          {hasError && (
            <div className="mb-[14px] flex items-center gap-[8px] rounded-[8px] border border-[rgba(224,85,85,0.25)] bg-red-dim px-[14px] py-[10px] text-[12px] text-red">
              <svg
                aria-hidden="true"
                className="h-[14px] w-[14px] shrink-0"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 8v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
              Incorrect password. Please try again.
            </div>
          )}

          {/* Submit */}
          <Button
            className="group flex h-[48px] w-full items-center justify-center gap-[8px] rounded-[10px] border-0 bg-gold text-[14px] font-semibold text-bg transition-all duration-200 hover:-translate-y-[1px] hover:bg-gold-light hover:shadow-gold-soft active:translate-y-0"
            onClick={onLogin}
          >
            Sign In
            <svg
              aria-hidden="true"
              className="h-[14px] w-[14px] transition-transform duration-200 group-hover:translate-x-[2px]"
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
        </div>
      </div>

      {/* Bottom hint */}
      <p className="mt-[16px] text-center text-[11px] text-muted">
        Access restricted to authorized personnel only
      </p>
    </section>
  );
}

function LockIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[22px] w-[22px] text-gold"
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
