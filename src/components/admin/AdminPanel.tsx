"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import { Modal } from "@/components/common/Modal";
import type { Applicant, AppSettings } from "@/types";
import { AdminDashboard } from "./AdminDashboard";
import { AdminLogin } from "./AdminLogin";

interface AdminPanelProps {
  open: boolean;
  settings: AppSettings;
  applicants: Applicant[];
  onClose: () => void;
  onUpdateSettings: (settings: AppSettings) => void;
  onDeleteApplicant: (id: string) => void;
  onClearApplicants: () => void;
  onRefreshApplicants: () => Promise<void>;
}

export function AdminPanel({
  open,
  settings,
  applicants,
  onClose,
  onUpdateSettings,
  onDeleteApplicant,
  onClearApplicants,
  onRefreshApplicants,
}: AdminPanelProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  async function refreshApplicants() {
    try {
      await onRefreshApplicants();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Unable to load applicants.",
      );
    }
  }

  useEffect(() => {
    if (!open) {
      return;
    }

    let cancelled = false;

    async function restoreSession() {
      try {
        const response = await fetch("/api/admin/session", {
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const body = (await response.json()) as { authenticated?: boolean };

        if (cancelled) {
          return;
        }

        setAuthenticated(Boolean(body.authenticated));
        if (body.authenticated) {
          await refreshApplicants();
        }
      } catch {
        setAuthenticated(false);
      }
    }

    void restoreSession();

    return () => {
      cancelled = true;
    };
  }, [onRefreshApplicants, open]);

  async function login() {
    try {
      const response = await fetch("/api/admin/session", {
        body: JSON.stringify({ password }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (!response.ok) {
        setLoginError(true);
        return;
      }

      setLoginError(false);
      setAuthenticated(true);
      await refreshApplicants();
    } catch {
      setLoginError(true);
    }
  }

  async function logout() {
    try {
      await fetch("/api/admin/session", { method: "DELETE" });
    } finally {
      setAuthenticated(false);
      setPassword("");
      await refreshApplicants();
    }
  }

  return (
    <Modal open={open} onBackdropClick={onClose}>
      <aside className="fixed right-0 top-0 z-[1001] flex h-screen w-[min(820px,100vw)] flex-col overflow-hidden border-l border-border bg-[#080810]">
        <header className="flex shrink-0 items-center justify-between border-b border-border bg-surface px-[24px] py-[18px] [border-bottom-width:0.5px]">
          <div>
            <h2 className="font-serif text-[20px] text-gold">
              Admin Dashboard
            </h2>
            <p className="mt-[2px] text-[11px] text-muted">
              Registered applicants — visible only to you
            </p>
          </div>
          <div className="flex items-center gap-[8px]">
            {authenticated ? (
              <Button
                className="border-0 bg-transparent px-[8px] py-[4px] text-[11px] text-muted transition-colors duration-200 hover:text-white"
                onClick={() => void logout()}
              >
                Logout
              </Button>
            ) : null}
            <Button
              className="border-0 bg-transparent px-[8px] py-[4px] text-[20px] text-muted transition-colors duration-200 hover:text-white"
              onClick={onClose}
            >
              ✕
            </Button>
          </div>
        </header>

        <AdminLogin
          visible={!authenticated}
          password={password}
          hasError={loginError}
          onPasswordChange={setPassword}
          onLogin={() => void login()}
        />
        <AdminDashboard
          visible={authenticated}
          applicants={applicants}
          settings={settings}
          onUpdateSettings={onUpdateSettings}
          onDeleteApplicant={onDeleteApplicant}
          onClearApplicants={onClearApplicants}
        />
      </aside>
    </Modal>
  );
}
