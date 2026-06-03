"use client";

import { useRouter } from "next/navigation";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { useApplicants } from "@/hooks/useApplicants";
import { useSettings } from "@/hooks/useSettings";

export default function AdminPage() {
  const router = useRouter();
  const {
    applicants,
    clearApplicants,
    deleteApplicant,
    refreshApplicants,
  } = useApplicants();
  const { settings, updateSettings } = useSettings();

  return (
    <AdminPanel
      open
      settings={settings}
      applicants={applicants}
      onClose={() => router.push("/")}
      onUpdateSettings={updateSettings}
      onDeleteApplicant={deleteApplicant}
      onClearApplicants={clearApplicants}
      onRefreshApplicants={refreshApplicants}
    />
  );
}
