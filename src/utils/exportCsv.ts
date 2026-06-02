import type { Applicant } from "@/types";

export function exportApplicantsCsv(applicants: Applicant[]) {
  if (!applicants.length) {
    alert("No data to export.");
    return;
  }

  const headers = [
    "Name",
    "Phone",
    "Email",
    "Role",
    "Instagram",
    "Followers",
    "Niche",
    "City",
    "Bio",
    "Date",
  ];
  const rows = applicants.map((applicant) =>
    [
      applicant.name,
      applicant.phone,
      applicant.email,
      applicant.role,
      applicant.instagram,
      applicant.followers,
      applicant.niche,
      applicant.city,
      (applicant.bio || "").replace(/,/g, " "),
      applicant.date,
    ]
      .map((value) => `"${value}"`)
      .join(","),
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  link.download = "clapstick_applicants.csv";
  link.click();
}
