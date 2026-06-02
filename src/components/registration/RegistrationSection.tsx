"use client";

import { useState } from "react";
import type { ApplicantInput } from "@/types";
import { RegistrationForm } from "./RegistrationForm";
import { SuccessScreen } from "./SuccessScreen";

interface RegistrationSectionProps {
  onSubmitApplicant: (applicant: ApplicantInput) => Promise<void>;
}

export function RegistrationSection({
  onSubmitApplicant,
}: RegistrationSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function submitApplicant(applicant: ApplicantInput) {
    setSubmitting(true);

    try {
      await onSubmitApplicant(applicant);
      setSubmitted(true);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Unable to save your application. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="register"
      className="mx-auto max-w-[700px] px-[24px] py-[72px] text-center"
    >
      <h2 className="mb-[8px] font-serif text-[36px] font-bold">
        Register to Apply
      </h2>
      <p className="mb-[36px] text-[14px] text-muted">
        Fill in all required fields. Raja will contact you within 2–3 days.
      </p>
      <div className="relative overflow-hidden rounded-[18px] border border-border bg-card p-[40px] text-left [border-width:0.5px] before:absolute before:left-0 before:right-0 before:top-0 before:h-[2px] before:bg-form-accent before:content-[''] max-sm:px-[18px] max-sm:py-[28px]">
        {submitted ? (
          <SuccessScreen />
        ) : (
          <RegistrationForm
            submitting={submitting}
            onSubmitApplicant={submitApplicant}
          />
        )}
      </div>
    </section>
  );
}
