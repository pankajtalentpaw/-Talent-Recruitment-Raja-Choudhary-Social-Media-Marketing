"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/common/Button";
import { Input, Select, Textarea } from "@/components/common/FormFields";
import { NICHE_OPTIONS, ROLE_OPTIONS } from "@/constants/app";
import type { ApplicantInput, RegistrationValues } from "@/types";
import { createApplicant } from "@/utils/applicants";

const INITIAL_VALUES: RegistrationValues = {
  name: "",
  phone: "",
  email: "",
  city: "",
  role: "",
  instagram: "",
  followers: "",
  niche: "",
  bio: "",
};

const FIELD_CLASS =
  "w-full appearance-none rounded-[10px] border border-border bg-[#0A0A16] px-[16px] py-[13px] font-outfit text-[14px] text-text outline-none transition-all duration-200 placeholder:text-muted focus:border-gold focus:bg-[#0C0C1A] focus:shadow-input-focus [&>option]:bg-[#0D0D1C]";

const LABEL_CLASS =
  "mb-[8px] flex items-center gap-[5px] text-[11px] font-semibold uppercase tracking-[1.2px] text-muted-light";

interface RegistrationFormProps {
  submitting: boolean;
  onSubmitApplicant: (applicant: ApplicantInput) => Promise<void>;
}

export function RegistrationForm({
  submitting,
  onSubmitApplicant,
}: RegistrationFormProps) {
  const [values, setValues] = useState(INITIAL_VALUES);

  function updateValue(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    setValues((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  function updatePhone(event: ChangeEvent<HTMLInputElement>) {
    setValues((current) => ({
      ...current,
      phone: event.target.value.replace(/\D/g, "").slice(0, 10),
    }));
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value.trim()]),
    ) as unknown as RegistrationValues;

    if (
      !trimmed.name ||
      !trimmed.phone ||
      !trimmed.email ||
      !trimmed.city ||
      !trimmed.role ||
      !trimmed.instagram ||
      !trimmed.followers ||
      !trimmed.niche
    ) {
      alert("Please fill all required fields marked with ✦");
      return;
    }
    if (!/^\d{10}$/.test(trimmed.phone)) {
      alert("Enter a valid 10-digit phone number.");
      return;
    }
    if (!trimmed.email.includes("@") || !trimmed.email.includes(".")) {
      alert("Enter a valid email address.");
      return;
    }
    if (isNaN(Number(trimmed.followers)) || parseInt(trimmed.followers) < 0) {
      alert("Enter a valid follower count.");
      return;
    }

    void onSubmitApplicant(createApplicant(trimmed));
  }

  return (
    <form noValidate onSubmit={submitForm}>
      {/* Personal Info */}
      <FormSectionLabel icon="👤">Personal Info</FormSectionLabel>

      <div className="grid grid-cols-2 gap-[16px] max-sm:grid-cols-1">
        <FormGroup label="Full Name" required>
          <Input
            className={FIELD_CLASS}
            name="name"
            value={values.name}
            placeholder="Your full name"
            onChange={updateValue}
          />
        </FormGroup>
        <FormGroup label="Phone Number" required>
          <Input
            className={FIELD_CLASS}
            name="phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            pattern="[0-9]*"
            value={values.phone}
            placeholder="10-digit mobile"
            onChange={updatePhone}
          />
        </FormGroup>
      </div>

      <div className="grid grid-cols-2 gap-[16px] max-sm:grid-cols-1">
        <FormGroup label="Email Address" required>
          <Input
            className={FIELD_CLASS}
            name="email"
            type="email"
            value={values.email}
            placeholder="your@email.com"
            onChange={updateValue}
          />
        </FormGroup>
        <FormGroup label="City / Area" required>
          <Input
            className={FIELD_CLASS}
            name="city"
            value={values.city}
            placeholder="e.g. Satellite, Ahmedabad"
            onChange={updateValue}
          />
        </FormGroup>
      </div>

      {/* Role & Social */}
      <FormSectionLabel icon="📱">Role &amp; Social</FormSectionLabel>

      <FormGroup label="Applying For" required>
        <Select
          className={FIELD_CLASS}
          name="role"
          value={values.role}
          onChange={updateValue}
        >
          <option value="" disabled>
            Select a position
          </option>
          {ROLE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormGroup>

      <div className="grid grid-cols-2 gap-[16px] max-sm:grid-cols-1">
        <FormGroup label="Instagram Handle" required>
          <Input
            className={FIELD_CLASS}
            name="instagram"
            value={values.instagram}
            placeholder="@yourusername"
            onChange={updateValue}
          />
        </FormGroup>
        <FormGroup label="Instagram Followers" required>
          <div className="relative">
            <Input
              className={`${FIELD_CLASS} pr-[90px]`}
              name="followers"
              type="number"
              min="0"
              value={values.followers}
              placeholder="e.g. 5400"
              onChange={updateValue}
            />
            <span className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 rounded-[4px] bg-surface px-[6px] py-[2px] text-[9px] font-semibold uppercase tracking-[1px] text-muted">
              Followers
            </span>
          </div>
        </FormGroup>
      </div>

      <FormGroup label="Content Niche" required>
        <Select
          className={FIELD_CLASS}
          name="niche"
          value={values.niche}
          onChange={updateValue}
        >
          <option value="" disabled>
            Select your niche
          </option>
          {NICHE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup label="About Yourself">
        <Textarea
          className={`${FIELD_CLASS} min-h-[100px] resize-y`}
          name="bio"
          value={values.bio}
          placeholder="Your experience, skills, past collaborations…"
          onChange={updateValue}
        />
      </FormGroup>

      {/* Privacy notice */}
      <div className="mb-[28px] mt-[8px] flex items-start gap-[12px] rounded-[12px] border border-[rgba(46,204,122,0.15)] bg-[rgba(46,204,122,0.04)] px-[18px] py-[16px]">
        <div className="mt-[1px] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-[rgba(46,204,122,0.3)] bg-green-dim text-[11px]">
          🔒
        </div>
        <p className="text-[12px] leading-[1.7] text-muted">
          <strong className="font-semibold text-green">100% Private.</strong>{" "}
          Your information is only visible to Raja Choudhary and is used solely
          to contact you about this opportunity. We never share, sell, or display
          your data publicly. Request deletion anytime.
        </p>
      </div>

      {/* Submit */}
      <Button
        disabled={submitting}
        type="submit"
        className="group flex h-[52px] w-full items-center justify-center gap-[8px] rounded-[12px] border-0 bg-gold text-[15px] font-semibold tracking-[0.3px] text-bg transition-all duration-200 hover:-translate-y-[2px] hover:bg-gold-light hover:shadow-gold-glow active:translate-y-0 disabled:cursor-wait disabled:opacity-60"
      >
        {submitting ? (
          <>
            <SpinnerIcon />
            Submitting…
          </>
        ) : (
          <>
            Submit Application
            <svg
              aria-hidden="true"
              className="h-[15px] w-[15px] transition-transform duration-200 group-hover:translate-x-[2px]"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M7 17 17 7m-7 0h7v7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
              />
            </svg>
          </>
        )}
      </Button>
    </form>
  );
}

interface FormGroupProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

function FormGroup({ label, required, children }: FormGroupProps) {
  return (
    <div className="mb-[20px]">
      <label className={LABEL_CLASS}>
        {label}
        {required ? (
          <span className="text-[10px] text-gold">✦</span>
        ) : (
          <span className="rounded-[3px] bg-card px-[5px] py-[1px] text-[8px] normal-case tracking-[0.5px] text-muted">
            optional
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function FormSectionLabel({
  icon,
  children,
}: {
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-[20px] mt-[32px] flex items-center gap-[10px] first:mt-0">
      <div className="flex h-[28px] w-[28px] items-center justify-center rounded-[6px] border border-border bg-surface text-[13px]">
        {icon}
      </div>
      <span className="text-[9px] font-semibold uppercase tracking-[3px] text-muted">
        {children}
      </span>
      <div className="h-px flex-1 bg-border [transform:scaleY(0.5)]" />
    </div>
  );
}

function SpinnerIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[16px] w-[16px] animate-spin"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
