import type { AppSettings, ApplicantRole } from "@/types";

export const SETTINGS_STORE_KEY = "raja_settings_v1";
export const GATE_SESSION_KEY = "raja_gate";

export const DEFAULT_SETTINGS: AppSettings = {
  infMin: 5000,
  ccMin: 1000,
  intMin: 0,
  highlight: 10000,
  privateMode: "off",
  privateToken: "clapstick2025",
};

export const OPEN_POSITIONS = [
  {
    number: "Position 01",
    title: "Influencer",
    description:
      "Brand collabs, sponsored content & promotions. Min. 1K followers preferred.",
  },
  {
    number: "Position 02",
    title: "Content Creator",
    description:
      "Reels, posts, stories & creative campaigns. Portfolio required.",
  },
  {
    number: "Position 03",
    title: "Intern",
    description:
      "Marketing strategy & brand growth support. Open to freshers.",
  },
];

export const PERKS = [
  { icon: "🎬", label: "Real Shoots" },
  { icon: "📈", label: "Brand Growth" },
  { icon: "💰", label: "Paid Work" },
  { icon: "🤝", label: "Collabs" },
  { icon: "🏆", label: "Portfolio" },
  { icon: "📍", label: "Ahmedabad" },
];

export const ROLE_OPTIONS: Array<{ value: ApplicantRole; label: string }> = [
  { value: "influencer", label: "Influencer" },
  { value: "content-creator", label: "Content Creator" },
  { value: "intern", label: "Intern (Marketing)" },
  { value: "multiple", label: "Multiple Roles" },
];

export const NICHE_OPTIONS = [
  { value: "fashion", label: "Fashion & Lifestyle" },
  { value: "food", label: "Food & Restaurants" },
  { value: "travel", label: "Travel & Places" },
  { value: "fitness", label: "Fitness & Health" },
  { value: "tech", label: "Tech & Gadgets" },
  { value: "beauty", label: "Beauty & Skincare" },
  { value: "comedy", label: "Comedy & Entertainment" },
  { value: "business", label: "Business & Motivation" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
];

export const ROLE_LABELS: Record<ApplicantRole, string> = {
  influencer: "Influencer",
  "content-creator": "Creator",
  intern: "Intern",
  multiple: "Multiple",
};
