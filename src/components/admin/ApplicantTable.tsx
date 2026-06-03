"use client";

import { Button } from "@/components/common/Button";
import { ROLE_LABELS } from "@/constants/app";
import type { Applicant, ApplicantRole, AppSettings } from "@/types";
import { rawFollowers } from "@/utils/applicants";
import { classNames } from "@/utils/classNames";
import { EmptyState } from "./EmptyState";

const BADGE_CLASSES: Record<ApplicantRole, string> = {
  influencer:
    "border-[rgba(96,165,250,0.3)] bg-[rgba(96,165,250,0.1)] text-[#60A5FA]",
  "content-creator":
    "border-[rgba(192,132,252,0.3)] bg-[rgba(192,132,252,0.1)] text-[#C084FC]",
  intern:
    "border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.1)] text-[#4ADE80]",
  multiple:
    "border-[rgba(251,146,60,0.3)] bg-[rgba(251,146,60,0.1)] text-[#FB923C]",
};

const TH_CLASS =
  "sticky top-0 z-10 border-b border-border bg-[rgba(9,9,20,0.98)] px-[14px] py-[11px] text-left text-[8.5px] font-semibold uppercase tracking-[1.8px] text-muted [border-bottom-width:0.5px]";

const TD_CLASS =
  "border-b border-border px-[14px] py-[13px] align-middle text-[12.5px] [border-bottom-width:0.5px]";

const COLUMNS = ["#", "Name", "Phone", "Email", "Role", "Instagram", "Followers", "Niche", "City", "Date", ""];

interface ApplicantTableProps {
  applicants: Applicant[];
  settings: AppSettings;
  onDelete: (id: string) => void;
}

export function ApplicantTable({
  applicants,
  settings,
  onDelete,
}: ApplicantTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1200px] border-collapse">
        <thead>
          <tr>
            {COLUMNS.map((heading) => (
              <th key={heading || "actions"} className={TH_CLASS}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {applicants.length ? (
            applicants.map((applicant, index) => {
              const followerCount = rawFollowers(applicant.followers);
              const minimums: Record<ApplicantRole, number> = {
                influencer: settings.infMin,
                "content-creator": settings.ccMin,
                intern: settings.intMin,
                multiple: 0,
              };
              const meetsMinimum = followerCount >= minimums[applicant.role];
              const isHighlight = followerCount >= settings.highlight;

              return (
                <tr
                  key={applicant.id}
                  className={classNames(
                    "group transition-colors duration-150 hover:bg-card2",
                    isHighlight && "bg-[rgba(212,168,67,0.03)]",
                  )}
                >
                  {/* # */}
                  <td className={`${TD_CLASS} w-[42px] text-center font-medium text-muted`}>
                    {index + 1}
                  </td>

                  {/* Name */}
                  <td className={`${TD_CLASS} whitespace-nowrap`}>
                    <div className="font-semibold text-text">{applicant.name}</div>
                  </td>

                  {/* Phone */}
                  <td className={`${TD_CLASS} whitespace-nowrap`}>
                    <a
                      href={`tel:${applicant.phone}`}
                      className="font-medium text-blue no-underline hover:text-[#93C5FD] hover:underline"
                    >
                      {applicant.phone}
                    </a>
                  </td>

                  {/* Email */}
                  <td className={TD_CLASS}>
                    <div className="max-w-[200px] truncate text-[11.5px] text-muted">
                      {applicant.email}
                    </div>
                  </td>

                  {/* Role */}
                  <td className={TD_CLASS}>
                    <span
                      className={classNames(
                        "inline-flex rounded-[5px] border px-[8px] py-[3.5px] text-[9px] font-semibold uppercase tracking-[0.8px]",
                        BADGE_CLASSES[applicant.role] ?? BADGE_CLASSES.multiple,
                      )}
                    >
                      {ROLE_LABELS[applicant.role] ?? applicant.role}
                    </span>
                  </td>

                  {/* Instagram */}
                  <td className={`${TD_CLASS} max-w-[140px]`}>
                    <div className="truncate text-purple">
                      {applicant.instagram || (
                        <span className="text-muted">—</span>
                      )}
                    </div>
                  </td>

                  {/* Followers */}
                  <td className={TD_CLASS}>
                    <FollowerValue
                      value={applicant.followers}
                      isHighlight={isHighlight}
                      meetsMinimum={meetsMinimum}
                      isMultiple={applicant.role === "multiple"}
                    />
                  </td>

                  {/* Niche */}
                  <td className={TD_CLASS}>
                    <div className="max-w-[140px] truncate text-[11.5px] text-muted">
                      {applicant.niche || <span>—</span>}
                    </div>
                  </td>

                  {/* City */}
                  <td className={`${TD_CLASS} whitespace-nowrap text-[11.5px] text-muted`}>
                    {applicant.city}
                  </td>

                  {/* Date */}
                  <td className={`${TD_CLASS} whitespace-nowrap text-[11.5px] text-muted`}>
                    {applicant.date}
                  </td>

                  {/* Delete */}
                  <td className={`${TD_CLASS} w-[50px] text-right`}>
                    <Button
                      aria-label={`Delete ${applicant.name}`}
                      title="Delete applicant"
                      className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-[7px] border border-transparent bg-transparent text-muted opacity-0 transition-all duration-200 hover:border-[rgba(224,85,85,0.35)] hover:bg-red-dim hover:text-red group-hover:opacity-100"
                      onClick={() => onDelete(applicant.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={11}>
                <EmptyState />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function FollowerValue({
  value,
  isHighlight,
  meetsMinimum,
  isMultiple,
}: {
  value: string;
  isHighlight: boolean;
  meetsMinimum: boolean;
  isMultiple: boolean;
}) {
  if (!value) return <span className="text-muted">—</span>;

  if (isHighlight) {
    return (
      <span className="inline-flex items-center gap-[5px] whitespace-nowrap rounded-[5px] border border-[rgba(212,168,67,0.28)] bg-gold-dim px-[8px] py-[4px] text-[11px] font-semibold text-gold">
        {value}
        <span className="rounded-[3px] bg-[rgba(212,168,67,0.2)] px-[4px] py-[1px] text-[8.5px] uppercase tracking-[0.8px]">
          High
        </span>
      </span>
    );
  }

  if (!meetsMinimum && !isMultiple) {
    return (
      <span className="inline-flex items-center gap-[5px] whitespace-nowrap rounded-[5px] border border-[rgba(224,85,85,0.25)] bg-red-dim px-[8px] py-[4px] text-[11px] text-red">
        {value}
        <span className="rounded-[3px] bg-[rgba(224,85,85,0.15)] px-[4px] py-[1px] text-[8.5px] uppercase tracking-[0.8px]">
          Low
        </span>
      </span>
    );
  }

  return <span className="whitespace-nowrap text-[11.5px] text-muted">{value}</span>;
}

function DeleteIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[13px] w-[13px]"
      fill="none"
      viewBox="0 0 24 24"
    >
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
