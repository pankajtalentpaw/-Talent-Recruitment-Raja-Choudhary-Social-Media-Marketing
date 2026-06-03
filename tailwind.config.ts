import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gold: "#D4A843",
        "gold-light": "#E8C56A",
        "gold-dark": "#B8902E",
        "gold-dim": "rgba(212,168,67,0.12)",
        "gold-dim2": "rgba(212,168,67,0.06)",
        bg: "#07070D",
        surface: "#0D0D18",
        card: "#13131F",
        card2: "#18182A",
        card3: "#1C1C2E",
        text: "#F0EEE8",
        "text-dim": "#C8C6C0",
        muted: "#6E6E8A",
        "muted-light": "#8E8EA8",
        border: "#1E1E30",
        border2: "#2A2A42",
        border3: "#363656",
        green: "#2ECC7A",
        "green-dim": "rgba(46,204,122,0.1)",
        red: "#E05555",
        "red-dim": "rgba(224,85,85,0.1)",
        accent: "#7B68EE",
        "accent-dim": "rgba(123,104,238,0.1)",
        blue: "#60A5FA",
        purple: "#C084FC",
        orange: "#FB923C",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        serif: ["Cormorant Garamond", "serif"],
      },
      backgroundImage: {
        "body-glow":
          "radial-gradient(ellipse 80% 50% at 20% 0%, rgba(212,168,67,0.07) 0%, transparent 55%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(123,104,238,0.06) 0%, transparent 60%)",
        "hero-glow":
          "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(212,168,67,0.1) 0%, transparent 65%)",
        "topbar-gradient":
          "linear-gradient(90deg, #B8902E 0%, #D4A843 40%, #E8C56A 60%, #D4A843 80%, #B8902E 100%)",
        "role-accent":
          "linear-gradient(90deg, #D4A843, transparent)",
        "form-accent":
          "linear-gradient(90deg, transparent, #D4A843, transparent)",
        "card-shine":
          "linear-gradient(135deg, rgba(212,168,67,0.04) 0%, transparent 50%)",
        "sidebar-gradient":
          "linear-gradient(180deg, #09091A 0%, #070710 100%)",
        "stats-gradient":
          "linear-gradient(135deg, rgba(212,168,67,0.08) 0%, rgba(212,168,67,0.02) 100%)",
      },
      boxShadow: {
        "gold-soft": "0 8px 24px rgba(212,168,67,0.2)",
        "gold-strong": "0 8px 32px rgba(212,168,67,0.3)",
        "gold-glow": "0 0 20px rgba(212,168,67,0.15), 0 8px 32px rgba(212,168,67,0.2)",
        "card-hover": "0 20px 60px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(212,168,67,0.15)",
        "panel": "0 32px 80px rgba(0,0,0,0.5)",
        "input-focus": "0 0 0 3px rgba(212,168,67,0.12)",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        pulseGold: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionTimingFunction: {
        "bounce-out": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
