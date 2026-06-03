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
      "Brand collabs, sponsored content & promotions. Build lasting partnerships with top local and national brands.",
    icon: "⭐",
    tags: ["Brand Deals", "Paid Collab", "1K+ Followers"],
  },
  {
    number: "Position 02",
    title: "Content Creator",
    description:
      "Reels, posts, stories & creative campaigns. Bring your visual storytelling skills and grow your portfolio.",
    icon: "🎬",
    tags: ["Reels & Posts", "Portfolio", "Creative"],
  },
  {
    number: "Position 03",
    title: "Intern",
    description:
      "Marketing strategy & brand growth support. Open to freshers eager to learn the industry from the inside.",
    icon: "🚀",
    tags: ["Marketing", "Strategy", "Fresher OK"],
  },
];

export const PERKS = [
  { icon: "🎬", label: "Real Shoots", description: "Hands-on production experience" },
  { icon: "📈", label: "Brand Growth", description: "Grow your personal brand fast" },
  { icon: "💰", label: "Paid Work", description: "Earn while you create" },
  { icon: "🤝", label: "Collabs", description: "Network with top creators" },
  { icon: "🏆", label: "Portfolio", description: "Build a standout portfolio" },
  { icon: "📍", label: "Ahmedabad", description: "Local community, global reach" },
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
