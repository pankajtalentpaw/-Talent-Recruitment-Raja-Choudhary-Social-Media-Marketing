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
    if (event.key === "Enter") {
      onLogin();
    }
  }

  return (
    <div
      className={`${visible ? "flex" : "hidden"} flex-col gap-[14px] px-[36px] py-[52px]`}
    >
      <h3 className="mb-[2px] font-serif text-[22px] text-white">
        Admin Login
      </h3>
      <p className="mb-[6px] text-[13px] text-muted">
        Enter your password to view all registrations.
      </p>
      <Input
        type="password"
        value={password}
        placeholder="Enter admin password"
        className="w-full rounded-[10px] border border-border bg-card px-[16px] py-[13px] font-outfit text-[14px] text-white outline-none transition-colors duration-200 focus:border-gold"
        onChange={(event) => onPasswordChange(event.target.value)}
        onKeyDown={loginOnEnter}
      />
      {hasError ? (
        <div className="text-[12px] text-red">Incorrect password. Try again.</div>
      ) : null}
      <Button
        className="rounded-[10px] border-0 bg-gold p-[13px] text-[14px] font-semibold text-bg transition-colors duration-200 hover:bg-gold-light"
        onClick={onLogin}
      >
        Login →
      </Button>
    </div>
  );
}
