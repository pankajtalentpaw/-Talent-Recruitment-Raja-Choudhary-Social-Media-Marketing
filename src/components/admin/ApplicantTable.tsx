"use client";

import { Button } from "@/components/common/Button";
import { ROLE_LABELS } from "@/constants/app";
import type { Applicant, ApplicantRole, AppSettings } from "@/types";
import { rawFollowers } from "@/utils/applicants";
import { classNames } from "@/utils/classNames";
import { EmptyState } from "./EmptyState";

const BADGE_CLASSES: Record<ApplicantRole, string> = {
  influencer: "bg-[rgba(96,165,250,0.1)] text-[#60A5FA]",
  "content-creator": "bg-[rgba(192,132,252,0.1)] text-[#C084FC]",
  intern: "bg-[rgba(74,222,128,0.1)] text-[#4ADE80]",
  multiple: "bg-[rgba(251,146,60,0.1)] text-[#FB923C]",
};

const CELL_CLASS =
  "border-b border-[#11111E] px-[10px] py-[12px] align-top [border-bottom-width:0.5px] group-hover:bg-[#0E0E1C]";

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
    <>
      <table className="mt-[16px] w-full border-collapse text-[12px]">
        <thead>
          <tr>
            {[
              "#",
              "Name",
              "Phone",
              "Email",
              "Role",
              "Instagram",
              "Followers",
              "Niche",
              "City",
              "Date",
              "",
            ].map((heading) => (
              <th
                key={heading || "actions"}
                className="sticky top-0 border-b border-border bg-[#080810] px-[10px] py-[8px] text-left text-[9px] font-medium uppercase tracking-[1.5px] text-muted [border-bottom-width:0.5px]"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant, index) => {
            const followerCount = rawFollowers(applicant.followers);
            const minimums = {
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
                  "group",
                  isHighlight && "bg-[rgba(212,168,67,0.04)]",
                )}
              >
                <td className={`${CELL_CLASS} text-muted`}>{index + 1}</td>
                <td className={`${CELL_CLASS} font-medium`}>
                  {applicant.name}
                </td>
                <td className={CELL_CLASS}>
                  <a
                    href={`tel:${applicant.phone}`}
                    className="text-[#60A5FA] no-underline"
                  >
                    {applicant.phone}
                  </a>
                </td>
                <td className={`${CELL_CLASS} text-[11px] text-muted`}>
                  {applicant.email}
                </td>
                <td className={CELL_CLASS}>
                  <span
                    className={classNames(
                      "inline-block rounded-[4px] px-[10px] py-[3px] text-[9px] font-semibold uppercase tracking-[1px]",
                      BADGE_CLASSES[applicant.role] || BADGE_CLASSES.multiple,
                    )}
                  >
                    {ROLE_LABELS[applicant.role] || applicant.role}
                  </span>
                </td>
                <td className={`${CELL_CLASS} text-[#C084FC]`}>
                  {applicant.instagram || "—"}
                </td>
                <td className={`${CELL_CLASS} text-[12px]`}>
                  {isHighlight ? (
                    <span className="font-semibold text-gold">
                      {applicant.followers || "—"} ★
                    </span>
                  ) : (
                    <span className={meetsMinimum ? "text-muted" : "text-red"}>
                      {applicant.followers || "—"}
                      {!meetsMinimum && applicant.role !== "multiple"
                        ? " ⚠"
                        : ""}
                    </span>
                  )}
                </td>
                <td className={`${CELL_CLASS} text-[11px] text-muted`}>
                  {applicant.niche || "—"}
                </td>
                <td className={`${CELL_CLASS} text-[11px] text-muted`}>
                  {applicant.city}
                </td>
                <td className={`${CELL_CLASS} text-[11px] text-muted`}>
                  {applicant.date}
                </td>
                <td className={CELL_CLASS}>
                  <Button
                    title="Delete"
                    className="border-0 bg-transparent px-[5px] py-[3px] text-[14px] text-[#2A1818] transition-colors duration-200 hover:text-red"
                    onClick={() => onDelete(applicant.id)}
                  >
                    ✕
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {!applicants.length ? <EmptyState /> : null}
    </>
  );
}
