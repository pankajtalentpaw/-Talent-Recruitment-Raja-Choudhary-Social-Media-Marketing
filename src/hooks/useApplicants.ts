"use client";

import { useCallback, useState } from "react";
import type { Applicant, ApplicantInput } from "@/types";

interface ApplicantsResponse {
  applicants: Applicant[];
}

interface ApplicantResponse {
  applicant: Applicant;
}

async function readError(response: Response, fallback: string) {
  try {
    const body = (await response.json()) as { error?: unknown };
    return typeof body.error === "string" ? body.error : fallback;
  } catch {
    return fallback;
  }
}

export function useApplicants() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  const refreshApplicants = useCallback(async () => {
    const response = await fetch("/api/applicants", { cache: "no-store" });

    if (response.status === 401) {
      setApplicants([]);
      return;
    }
    if (!response.ok) {
      throw new Error(await readError(response, "Unable to load applicants."));
    }

    const body = (await response.json()) as ApplicantsResponse;
    setApplicants(body.applicants);
  }, []);

  const addApplicant = useCallback(async (applicant: ApplicantInput) => {
    const response = await fetch("/api/applicants", {
      body: JSON.stringify(applicant),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(
        await readError(response, "Unable to save your application."),
      );
    }

    const body = (await response.json()) as ApplicantResponse;
    setApplicants((current) => [body.applicant, ...current]);
  }, []);

  const deleteApplicant = useCallback(async (id: string) => {
    const response = await fetch(`/api/applicants?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert(await readError(response, "Unable to delete this applicant."));
      return;
    }

    setApplicants((current) =>
      current.filter((applicant) => applicant.id !== id),
    );
  }, []);

  const clearApplicants = useCallback(async () => {
    const response = await fetch("/api/applicants", { method: "DELETE" });

    if (!response.ok) {
      alert(await readError(response, "Unable to clear applicants."));
      return;
    }

    setApplicants([]);
  }, []);

  return {
    applicants,
    addApplicant,
    clearApplicants,
    deleteApplicant,
    refreshApplicants,
  };
}
