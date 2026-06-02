import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gold: "#D4A843",
        "gold-light": "#E8C56A",
        "gold-dim": "rgba(212,168,67,0.15)",
        bg: "#07070D",
        surface: "#0D0D18",
        card: "#13131F",
        card2: "#18182A",
        text: "#F0EEE8",
        muted: "#6E6E8A",
        border: "#1E1E30",
        border2: "#2A2A42",
        green: "#2ECC7A",
        red: "#E05555",
        accent: "#7B68EE",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        serif: ["Cormorant Garamond", "serif"],
      },
      backgroundImage: {
        "body-glow":
          "radial-gradient(ellipse 60% 40% at 20% 0%, rgba(212,168,67,0.06) 0%, transparent 60%), radial-gradient(ellipse 50% 35% at 80% 100%, rgba(123,104,238,0.05) 0%, transparent 60%)",
        "hero-glow":
          "radial-gradient(circle, rgba(212,168,67,0.08) 0%, transparent 65%)",
        "topbar-gradient":
          "linear-gradient(90deg, #D4A843, #E8C56A)",
        "role-accent":
          "linear-gradient(90deg, #D4A843, transparent)",
        "form-accent":
          "linear-gradient(90deg, transparent, #D4A843, transparent)",
      },
      boxShadow: {
        "gold-soft": "0 8px 24px rgba(212,168,67,0.25)",
        "gold-strong": "0 8px 24px rgba(212,168,67,0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
