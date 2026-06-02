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
  "w-full appearance-none rounded-[10px] border border-border bg-[#0A0A15] px-[16px] py-[13px] font-outfit text-[14px] text-white outline-none transition-[border-color,background] duration-200 placeholder:text-[#3A3A55] focus:border-gold focus:bg-[#0D0D1C] [&>option]:bg-[#111]";

const LABEL_CLASS =
  "mb-[7px] flex items-center gap-[5px] text-[11px] font-medium uppercase tracking-[1px] text-muted";

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
      <FormSectionLabel>Personal Info</FormSectionLabel>

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
            placeholder="10-digit mobile number"
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

      <FormSectionLabel>Role & Social</FormSectionLabel>

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
              className={`${FIELD_CLASS} pr-[80px]`}
              name="followers"
              type="number"
              min="0"
              value={values.followers}
              placeholder="e.g. 5400"
              onChange={updateValue}
            />
            <span className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 text-[11px] font-medium tracking-[1px] text-muted">
              FOLLOWERS
            </span>
          </div>
          <div className="mt-[5px] text-[11px] text-[#3A3A55]">
            Enter your exact follower count
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
          className={`${FIELD_CLASS} min-h-[90px] resize-y`}
          name="bio"
          value={values.bio}
          placeholder="Your experience, skills, past collaborations…"
          onChange={updateValue}
        />
      </FormGroup>

      <div className="mb-[26px] mt-[22px] rounded-[10px] border border-[rgba(46,204,122,0.15)] bg-[rgba(46,204,122,0.05)] px-[18px] py-[14px]">
        <p className="text-[12px] leading-[1.7] text-[#5A8F70]">
          🔒 <strong className="text-green">Your data is 100% private.</strong>{" "}
          This information is only visible to Raja Choudhary and is used solely
          to contact you about this opportunity. We do not share, sell, or
          display your data publicly. You can request deletion anytime.
        </p>
      </div>

      <Button
        disabled={submitting}
        type="submit"
        className="w-full rounded-[10px] border-0 bg-gold p-[15px] text-[15px] font-semibold tracking-[0.3px] text-bg transition-[background,transform,box-shadow] duration-200 hover:-translate-y-px hover:bg-gold-light hover:shadow-gold-strong active:translate-y-0 disabled:cursor-wait disabled:opacity-70"
      >
        {submitting ? "Submitting..." : "Submit Application ✦"}
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
    <div className="mb-[22px]">
      <label className={LABEL_CLASS}>
        {label}
        {required ? <span className="text-[10px] text-gold">✦</span> : null}
      </label>
      {children}
    </div>
  );
}

function FormSectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-[18px] mt-[28px] flex items-center gap-[10px] border-b border-border pb-[8px] text-[9px] uppercase tracking-[3px] text-muted [border-bottom-width:0.5px] first:mt-0 after:h-px after:flex-1 after:scale-y-50 after:bg-border after:content-['']">
      {children}
    </div>
  );
}
