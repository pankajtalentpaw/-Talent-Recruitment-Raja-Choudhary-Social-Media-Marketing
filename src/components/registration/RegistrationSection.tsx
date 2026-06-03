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
      className="relative px-[52px] py-[80px] max-lg:px-[28px] max-sm:px-[18px] max-sm:py-[56px]"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(212,168,67,0.04)_0%,transparent_70%)]" />
      </div>

      {/* Section header */}
      <div className="relative mb-[48px] text-center">
        <div className="mb-[10px] flex items-center justify-center gap-[14px]">
          <div className="h-px w-[40px] bg-border max-sm:w-[24px]" />
          <span className="text-[9px] font-semibold uppercase tracking-[4px] text-muted">
            Application Form
          </span>
          <div className="h-px w-[40px] bg-border max-sm:w-[24px]" />
        </div>
        <h2 className="mb-[8px] font-serif text-[clamp(28px,4vw,42px)] font-bold text-text">
          Register to <span className="text-gold">Apply</span>
        </h2>
        <p className="mx-auto max-w-[420px] text-[13px] leading-[1.7] text-muted">
          Fill in all required fields. Raja will contact you within 2–3 days of
          reviewing your application.
        </p>
      </div>

      {/* Form card */}
      <div className="relative mx-auto max-w-[720px] overflow-hidden rounded-[20px] border border-border bg-card shadow-panel [border-width:0.5px]">
        {/* Top accent */}
        <div className="h-[2px] bg-form-accent" />

        <div className="p-[48px] max-sm:p-[24px]">
          {submitted ? <SuccessScreen /> : (
            <RegistrationForm
              submitting={submitting}
              onSubmitApplicant={submitApplicant}
            />
          )}
        </div>
      </div>
    </section>
  );
}
