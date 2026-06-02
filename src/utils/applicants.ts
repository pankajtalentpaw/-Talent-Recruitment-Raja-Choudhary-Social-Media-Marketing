import type { ApplicantInput, RegistrationValues } from "@/types";

export function createApplicant(values: RegistrationValues): ApplicantInput {
  return {
    name: values.name.trim(),
    phone: values.phone.trim(),
    email: values.email.trim(),
    city: values.city.trim(),
    role: values.role as ApplicantInput["role"],
    instagram: values.instagram.trim(),
    followers: parseInt(values.followers.trim()).toLocaleString("en-IN"),
    niche: values.niche.trim(),
    bio: values.bio.trim(),
  };
}

export function rawFollowers(followers: string) {
  return parseInt((followers || "0").replace(/,/g, "")) || 0;
}
