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
}

export function AdminDashboard({
  visible,
  applicants,
  settings,
  onUpdateSettings,
  onDeleteApplicant,
  onClearApplicants,
}: AdminDashboardProps) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);

  const stats = useMemo(
    () => ({
      total: applicants.length,
      influencers: applicants.filter(
        (applicant) => applicant.role === "influencer",
      ).length,
      creators: applicants.filter(
        (applicant) => applicant.role === "content-creator",
      ).length,
      interns: applicants.filter((applicant) => applicant.role === "intern")
        .length,
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
    if (!confirm("Delete this applicant?")) {
      return;
    }
    onDeleteApplicant(id);
  }

  function clearAll() {
    if (!confirm("Delete ALL registrations? This cannot be undone.")) {
      return;
    }
    onClearApplicants();
  }

  return (
    <div
      className={classNames(
        "h-full flex-col overflow-hidden",
        visible ? "flex" : "hidden",
      )}
    >
      <div className="grid shrink-0 grid-cols-4 gap-[10px] border-b border-border bg-surface px-[20px] py-[16px] [border-bottom-width:0.5px] max-sm:grid-cols-2">
        <StatsCard label="Total" value={stats.total} />
        <StatsCard label="Influencers" value={stats.influencers} />
        <StatsCard label="Creators" value={stats.creators} />
        <StatsCard label="Interns" value={stats.interns} />
      </div>

      <SettingsPanel
        open={settingsOpen}
        settings={settings}
        onUpdateSettings={onUpdateSettings}
      />

      <div className="flex shrink-0 flex-wrap items-center gap-[8px] border-b border-border px-[20px] py-[12px] [border-bottom-width:0.5px]">
        <Input
          value={search}
          placeholder="Search by name, phone, niche…"
          className="min-w-[140px] flex-1 rounded-[7px] border border-border bg-card px-[12px] py-[8px] font-outfit text-[12px] text-white outline-none focus:border-gold"
          onChange={(event) => setSearch(event.target.value)}
        />
        <Select
          value={roleFilter}
          className="cursor-pointer rounded-[7px] border border-border bg-card px-[12px] py-[8px] font-outfit text-[12px] text-white outline-none"
          onChange={(event) => setRoleFilter(event.target.value)}
        >
          <option value="">All Roles</option>
          <option value="influencer">Influencer</option>
          <option value="content-creator">Content Creator</option>
          <option value="intern">Intern</option>
          <option value="multiple">Multiple</option>
        </Select>
        <Button
          className="rounded-[7px] border border-border bg-transparent px-[12px] py-[8px] text-[11px] text-muted transition-all duration-200 hover:border-border2 hover:text-text"
          onClick={() => setSettingsOpen((current) => !current)}
        >
          ⚙ Settings
        </Button>
        <Button
          className="rounded-[7px] border border-gold bg-transparent px-[14px] py-[8px] text-[11px] font-medium text-gold transition-all duration-200 hover:bg-gold hover:text-bg"
          onClick={() => exportApplicantsCsv(applicants)}
        >
          ↓ Export CSV
        </Button>
        <Button
          className="rounded-[7px] border border-[#2A1A1A] bg-transparent px-[12px] py-[8px] text-[11px] text-red transition-all duration-200 hover:border-red"
          onClick={clearAll}
        >
          ✕ Clear All
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-[20px] pb-[20px]">
        <ApplicantTable
          applicants={filteredApplicants}
          settings={settings}
          onDelete={deleteApplicant}
        />
      </div>
    </div>
  );
}
