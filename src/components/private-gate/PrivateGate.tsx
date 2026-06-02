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
    if (event.key === "Enter") {
      checkCode(value);
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-[20px] bg-bg p-[24px] text-center">
      <div className="w-full max-w-[380px] rounded-[16px] border border-border2 bg-card p-[32px]">
        <div className="mb-[8px] text-[48px]">🔒</div>
        <div className="mb-[8px] font-serif text-[22px] text-gold">
          Raja Choudhary
        </div>
        <h2 className="mb-[6px] font-serif text-[32px] font-bold">
          Private Page
        </h2>
        <p className="mx-auto mb-[20px] max-w-[340px] text-[14px] text-muted">
          {isUrlOnly
            ? "This page requires a valid private link. Please request it from Raja Choudhary."
            : "This registration page is private. Enter the access code to continue."}
        </p>
        {!isUrlOnly ? (
          <>
            <Input
              type="password"
              value={value}
              placeholder="Enter access code"
              className="mb-[12px] w-full rounded-[10px] border border-border2 bg-[#0E0E1A] px-[16px] py-[13px] font-outfit text-[14px] text-white outline-none transition-colors duration-200 focus:border-gold"
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={submitOnEnter}
            />
            {hasError ? (
              <div className="mt-[8px] text-[12px] text-red">
                Incorrect access code. Please try again.
              </div>
            ) : null}
            <Button
              className="w-full rounded-[10px] border-0 bg-gold p-[13px] text-[14px] font-semibold text-bg transition-colors duration-200 hover:bg-gold-light"
              onClick={() => checkCode(value)}
            >
              Continue →
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
}
