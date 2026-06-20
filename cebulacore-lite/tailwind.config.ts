import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#050816",
        surface: "rgba(15,23,42,0.65)",
        border: "rgba(255,255,255,0.08)",
        glow: {
          primary: "#2563EB",
          secondary: "#7C3AED",
        },
        accent: "#A855F7",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        muted: "#94A3B8",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "glow-radial": "radial-gradient(circle at center, rgba(37,99,235,0.35), rgba(124,58,237,0.18) 45%, transparent 70%)",
        "ribbon-gradient": "linear-gradient(120deg, #2563EB 0%, #7C3AED 35%, #A855F7 60%, #EC4899 80%, #2563EB 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(37,99,235,0.35), 0 0 80px rgba(124,58,237,0.15)",
        "glow-sm": "0 0 20px rgba(37,99,235,0.25)",
        "glow-accent": "0 0 40px rgba(168,85,247,0.35)",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "float-slow": "float 14s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "spin-slow": "spin 18s linear infinite",
        "spin-slower": "spin 36s linear infinite reverse",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-18px) translateX(10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.06)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "200% 0%" },
        },
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
