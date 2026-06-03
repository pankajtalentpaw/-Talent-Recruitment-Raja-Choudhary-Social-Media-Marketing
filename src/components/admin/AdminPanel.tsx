"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import { ClapstickMediaMark } from "@/components/layout/ClapstickMediaMark";
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
        error instanceof Error ? error.message : "Unable to load applicants.",
      );
    }
  }

  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    async function restoreSession() {
      try {
        const response = await fetch("/api/admin/session", {
          cache: "no-store",
        });
        if (!response.ok) return;
        const body = (await response.json()) as { authenticated?: boolean };
        if (cancelled) return;
        setAuthenticated(Boolean(body.authenticated));
        if (body.authenticated) await refreshApplicants();
      } catch {
        setAuthenticated(false);
      }
    }

    void restoreSession();
    return () => { cancelled = true; };
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

  if (!open) return null;

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Top accent bar */}
      <div className="h-[3px] bg-topbar-gradient" />

      <div className="mx-auto flex min-h-[calc(100vh-3px)] w-full max-w-[1700px]">
        {/* Sidebar */}
        <aside className="hidden w-[260px] shrink-0 flex-col border-r border-border bg-sidebar-gradient lg:flex [border-right-width:0.5px]">
          {/* Sidebar brand */}
          <div className="border-b border-border px-[24px] py-[22px] [border-bottom-width:0.5px]">
            <ClapstickMediaMark />
          </div>

          {/* Sidebar identity */}
          <div className="border-b border-border px-[24px] py-[20px] [border-bottom-width:0.5px]">
            <div className="flex items-center gap-[12px]">
              <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[10px] border border-[rgba(212,168,67,0.2)] bg-gold-dim font-serif text-[16px] font-bold text-gold">
                RC
              </div>
              <div>
                <div className="text-[13px] font-semibold text-text">
                  Raja Choudhary
                </div>
                <div className="mt-[2px] text-[9px] uppercase tracking-[1.8px] text-muted">
                  Social Media Manager
                </div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-[14px] py-[16px]">
            <div className="mb-[6px] px-[10px] text-[8.5px] font-semibold uppercase tracking-[2.5px] text-muted">
              Navigation
            </div>
            <SidebarNavItem icon={<DashboardIcon />} label="Dashboard" active />
          </nav>

          {/* Sidebar footer */}
          <div className="border-t border-border px-[14px] py-[16px] [border-top-width:0.5px]">
            {/* Session badge */}
            <div className="mb-[10px] flex items-center justify-between rounded-[8px] border border-border bg-card px-[12px] py-[10px]">
              <span className="text-[10px] uppercase tracking-[1.5px] text-muted">
                Session
              </span>
              <span
                className={`rounded-full px-[8px] py-[3px] text-[9px] font-semibold uppercase tracking-[0.8px] ${
                  authenticated
                    ? "border border-[rgba(46,204,122,0.3)] bg-green-dim text-green"
                    : "border border-[rgba(224,85,85,0.3)] bg-red-dim text-red"
                }`}
              >
                {authenticated ? "Active" : "Locked"}
              </span>
            </div>

            <Button
              className="flex w-full items-center justify-center gap-[8px] rounded-[8px] border border-border2 bg-transparent px-[12px] py-[10px] text-[12px] text-muted transition-all duration-200 hover:border-gold hover:text-gold"
              onClick={onClose}
            >
              <BackIcon />
              Back to Site
            </Button>
          </div>
        </aside>

        {/* Main content */}
        <section className="flex min-w-0 flex-1 flex-col">
          {/* Top header */}
          <header className="sticky top-0 z-40 border-b border-border bg-[rgba(7,7,13,0.95)] px-[24px] py-[0] backdrop-blur-[16px] [border-bottom-width:0.5px] max-sm:px-[16px]">
            <div className="flex min-h-[64px] items-center justify-between gap-[16px]">
              {/* Left: breadcrumb */}
              <div className="flex min-w-0 items-center gap-[12px]">
                <div className="lg:hidden">
                  <ClapstickMediaMark />
                </div>
                <div className="hidden h-[20px] w-px bg-border2 lg:block" />
                <div className="min-w-0">
                  <div className="flex items-center gap-[6px] text-[9px] font-medium uppercase tracking-[2px] text-muted">
                    <span>Admin</span>
                    <span className="text-border2">/</span>
                    <span className="text-gold">Dashboard</span>
                  </div>
                  <h1 className="mt-[2px] truncate font-serif text-[20px] leading-none text-text sm:text-[24px]">
                    Talent Recruitment
                  </h1>
                </div>
              </div>

              {/* Right: actions */}
              <div className="flex shrink-0 items-center gap-[8px]">
                {authenticated && (
                  <Button
                    className="flex items-center gap-[6px] rounded-[8px] border border-border2 bg-transparent px-[12px] py-[8px] text-[11px] text-muted transition-all duration-200 hover:border-gold hover:text-gold"
                    onClick={() => void logout()}
                  >
                    <LogoutIcon />
                    <span className="hidden sm:inline">Logout</span>
                  </Button>
                )}
                <Button
                  aria-label="Back to site"
                  className="flex items-center gap-[6px] rounded-[8px] border border-border2 bg-card px-[12px] py-[8px] text-[11px] text-muted transition-all duration-200 hover:border-gold hover:text-gold lg:hidden"
                  onClick={onClose}
                >
                  <BackIcon />
                  <span className="hidden sm:inline">Site</span>
                </Button>
              </div>
            </div>
          </header>

          {/* Page content */}
          <div className="flex-1">
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
              onRefreshApplicants={refreshApplicants}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function SidebarNavItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-[10px] rounded-[8px] px-[10px] py-[10px] text-[12px] font-medium transition-all duration-200 ${
        active
          ? "border border-[rgba(212,168,67,0.2)] bg-gold-dim text-gold"
          : "text-muted hover:bg-card hover:text-text"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

function DashboardIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[15px] w-[15px]"
      fill="none"
      viewBox="0 0 24 24"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[14px] w-[14px]"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[13px] w-[13px]"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M19 12H5M12 5l-7 7 7 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}
