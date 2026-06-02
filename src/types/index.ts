export type ApplicantRole =
  | "influencer"
  | "content-creator"
  | "intern"
  | "multiple";

export type PrivateMode = "off" | "url" | "code";

export type SettingsTab = "criteria" | "private";

export interface ApplicantInput {
  name: string;
  phone: string;
  email: string;
  city: string;
  role: ApplicantRole;
  instagram: string;
  followers: string;
  niche: string;
  bio: string;
}

export interface Applicant extends ApplicantInput {
  id: string;
  date: string;
}

export interface RegistrationValues {
  name: string;
  phone: string;
  email: string;
  city: string;
  role: ApplicantRole | "";
  instagram: string;
  followers: string;
  niche: string;
  bio: string;
}

export interface AppSettings {
  infMin: number;
  ccMin: number;
  intMin: number;
  highlight: number;
  privateMode: PrivateMode;
  privateToken: string;
}
