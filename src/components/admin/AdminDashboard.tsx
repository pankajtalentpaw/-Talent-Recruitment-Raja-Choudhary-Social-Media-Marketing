"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/common/Button";
import { Input, Select } from "@/components/common/FormFields";
import type { Applicant, AppSettings } from "@/types";
import { exportApplicantsCsv } from "@/utils/exportCsv";
import { classNames } from "@/utils/classNames";
import { ApplicantTable } from "./ApplicantTable";
import { SettingsPanel } from "./SettingsPanel";
import { StatsCard } from "./StatsCard";

interface AdminDashboardProps {
  visible: boolean;
  applicants: Applicant[];
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
  onDeleteApplicant: (id: string) => void;
  onClearApplicants: () => void;
  onRefreshApplicants: () => Promise<void>;
}

export function AdminDashboard({
  visible,
  applicants,
  settings,
  onUpdateSettings,
  onDeleteApplicant,
  onClearApplicants,
  onRefreshApplicants,
}: AdminDashboardProps) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const stats = useMemo(
    () => ({
      total: applicants.length,
      influencers: applicants.filter((a) => a.role === "influencer").length,
      creators: applicants.filter((a) => a.role === "content-creator").length,
      interns: applicants.filter((a) => a.role === "intern").length,
    }),
    [applicants],
  );

  const filteredApplicants = useMemo(() => {
    const query = search.toLowerCase();
    return applicants.filter((applicant) => {
      const matchesQuery =
        !query ||
        [
          applicant.name,
          applicant.phone,
          applicant.email,
          applicant.niche,
          applicant.city,
          applicant.instagram,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesRole = !roleFilter || applicant.role === roleFilter;
      return matchesQuery && matchesRole;
    });
  }, [applicants, roleFilter, search]);

  function deleteApplicant(id: string) {
    if (!confirm("Delete this applicant?")) return;
    onDeleteApplicant(id);
  }

  function clearAll() {
    if (!confirm("Delete ALL registrations? This cannot be undone.")) return;
    onClearApplicants();
  }

  async function refresh() {
    setRefreshing(true);
    try {
      await onRefreshApplicants();
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <div
      className={classNames(
        "flex-col gap-[20px] px-[24px] py-[24px] max-sm:px-[16px]",
        visible ? "flex" : "hidden",
      )}
    >
      {/* Page title + count */}
      <div className="flex flex-wrap items-center justify-between gap-[12px]">
        <div>
          <div className="text-[8.5px] font-semibold uppercase tracking-[2.5px] text-muted">
            Overview
          </div>
          <h2 className="mt-[4px] font-serif text-[clamp(24px,3vw,32px)] leading-none text-text">
            Applicants
          </h2>
        </div>
        <div className="flex items-center gap-[8px] rounded-[8px] border border-border bg-card px-[14px] py-[9px] text-[12px]">
          <span className="font-semibold text-text">{filteredApplicants.length}</span>
          <span className="text-muted">of</span>
          <span className="font-semibold text-gold">{stats.total}</span>
          <span className="text-muted">shown</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-[12px] xl:grid-cols-4">
        <StatsCard
          label="Total"
          value={stats.total}
          description="All registrations"
          icon={<UsersIcon />}
          color="gold"
        />
        <StatsCard
          label="Influencers"
          value={stats.influencers}
          description="Brand collaboration"
          icon={<StarIcon />}
          color="blue"
        />
        <StatsCard
          label="Creators"
          value={stats.creators}
          description="Content portfolio"
          icon={<CameraIcon />}
          color="purple"
        />
        <StatsCard
          label="Interns"
          value={stats.interns}
          description="Growth support"
          icon={<RocketIcon />}
          color="green"
        />
      </div>

      {/* Table section */}
      <div className="overflow-hidden rounded-[14px] border border-border bg-[rgba(13,13,24,0.8)] [border-width:0.5px]">
        {/* Toolbar */}
        <div className="border-b border-border px-[16px] py-[14px] [border-bottom-width:0.5px]">
          <div className="flex flex-col gap-[10px] lg:flex-row lg:items-center">
            {/* Search */}
            <div className="relative min-w-[220px] flex-1">
              <SearchIcon />
              <Input
                aria-label="Search applicants"
                value={search}
                placeholder="Search name, email, niche, city…"
                className="h-[40px] w-full rounded-[8px] border border-border bg-card py-[9px] pl-[38px] pr-[12px] font-outfit text-[13px] text-white outline-none transition-all duration-200 placeholder:text-muted focus:border-gold focus:shadow-input-focus"
                onChange={(event) => setSearch(event.target.value)}
              />
              {search && (
                <button
                  aria-label="Clear search"
                  className="absolute right-[10px] top-1/2 -translate-y-1/2 text-muted hover:text-text"
                  onClick={() => setSearch("")}
                >
                  <ClearIcon />
                </button>
              )}
            </div>

            {/* Role filter */}
            <Select
              aria-label="Filter by role"
              value={roleFilter}
              className="h-[40px] min-w-[150px] cursor-pointer rounded-[8px] border border-border bg-card px-[12px] font-outfit text-[13px] text-white outline-none transition-all duration-200 focus:border-gold"
              onChange={(event) => setRoleFilter(event.target.value)}
            >
              <option value="">All Roles</option>
              <option value="influencer">Influencer</option>
              <option value="content-creator">Content Creator</option>
              <option value="intern">Intern</option>
              <option value="multiple">Multiple</option>
            </Select>

            {/* Actions */}
            <div className="flex flex-wrap gap-[6px]">
              <ToolbarButton
                title="Refresh"
                disabled={refreshing}
                onClick={() => void refresh()}
                icon={<RefreshIcon spin={refreshing} />}
              />
              <ToolbarButton
                title="Settings"
                active={settingsOpen}
                onClick={() => setSettingsOpen((o) => !o)}
                icon={<SettingsIcon />}
              />
              <ToolbarButton
                title="Export CSV"
                variant="gold"
                onClick={() => exportApplicantsCsv(applicants)}
                icon={<DownloadIcon />}
              />
              <ToolbarButton
                title="Clear All"
                variant="red"
                onClick={clearAll}
                icon={<TrashIcon />}
              />
            </div>
          </div>
        </div>

        {/* Settings panel */}
        <SettingsPanel
          open={settingsOpen}
          settings={settings}
          onUpdateSettings={onUpdateSettings}
        />

        {/* Table */}
        <ApplicantTable
          applicants={filteredApplicants}
          settings={settings}
          onDelete={deleteApplicant}
        />
      </div>
    </div>
  );
}

interface ToolbarButtonProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  variant?: "default" | "gold" | "red";
}

function ToolbarButton({
  title,
  icon,
  onClick,
  disabled,
  active,
  variant = "default",
}: ToolbarButtonProps) {
  const base =
    "flex h-[40px] items-center gap-[6px] rounded-[8px] border px-[12px] text-[11px] font-medium transition-all duration-200 disabled:cursor-wait disabled:opacity-50";

  const styles = {
    default: active
      ? "border-gold bg-gold-dim text-gold"
      : "border-border bg-transparent text-muted hover:border-border2 hover:text-text",
    gold: "border-gold bg-transparent text-gold hover:bg-gold hover:text-bg",
    red: "border-[rgba(224,85,85,0.3)] bg-transparent text-red hover:border-red hover:bg-red-dim",
  };

  return (
    <Button
      title={title}
      aria-pressed={active}
      className={`${base} ${styles[variant]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
      <span className="hidden sm:inline">{title}</span>
    </Button>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute left-[12px] top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-muted"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="m20 20-4.2-4.2M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg aria-hidden="true" className="h-[13px] w-[13px]" fill="none" viewBox="0 0 24 24">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function RefreshIcon({ spin }: { spin: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={classNames("h-[14px] w-[14px]", spin && "animate-spin")}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M20 11a8 8 0 0 0-14.7-4.4L4 8m0 0V3m0 5h5M4 13a8 8 0 0 0 14.7 4.4L20 16m0 0v5m0-5h-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg aria-hidden="true" className="h-[14px] w-[14px]" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M19 13.4v-2.8l-2-.7a7.2 7.2 0 0 0-.8-1.9l.9-1.9-2-2-1.9.9a7.2 7.2 0 0 0-1.9-.8L10.6 2H7.8l-.7 2a7.2 7.2 0 0 0-1.9.8l-1.9-.9-2 2 .9 1.9a7.2 7.2 0 0 0-.8 1.9l-2 .7v2.8l2 .7c.2.7.5 1.3.8 1.9l-.9 1.9 2 2 1.9-.9c.6.4 1.2.6 1.9.8l.7 2h2.8l.7-2c.7-.2 1.3-.5 1.9-.8l1.9.9 2-2-.9-1.9c.4-.6.6-1.2.8-1.9l2-.7Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.3"
        transform="translate(1 1) scale(.91)"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg aria-hidden="true" className="h-[14px] w-[14px]" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 3v11m0 0 4-4m-4 4-4-4M5 20h14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg aria-hidden="true" className="h-[14px] w-[14px]" fill="none" viewBox="0 0 24 24">
      <path
        d="M6 7h12M10 11v6m4-6v6M8 7l.6 12h6.8L16 7M10 7l.5-2h3l.5 2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg aria-hidden="true" className="h-[16px] w-[16px]" fill="none" viewBox="0 0 24 24">
      <path
        d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3Zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg aria-hidden="true" className="h-[16px] w-[16px]" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg aria-hidden="true" className="h-[16px] w-[16px]" fill="none" viewBox="0 0 24 24">
      <path
        d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg aria-hidden="true" className="h-[16px] w-[16px]" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm-1-13h2v6h-2zm0 8h2v2h-2z"
        fill="currentColor"
      />
    </svg>
  );
}
