/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050816",
        surface: "rgba(15,23,42,0.65)",
        border: {
          DEFAULT: "rgba(255,255,255,0.08)",
        },
        glow: {
          primary: "#2563EB",
          secondary: "#7C3AED",
          accent: "#A855F7",
        },
        status: {
          success: "#22C55E",
          warning: "#F59E0B",
          danger: "#EF4444",
        },
        ink: {
          DEFAULT: "#FFFFFF",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "cebula-gradient": "linear-gradient(135deg, #2563EB 0%, #7C3AED 50%, #A855F7 100%)",
        "cebula-radial": "radial-gradient(circle at 50% 0%, rgba(124,58,237,0.25), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(124,58,237,0.35)",
        "glow-sm": "0 0 20px rgba(37,99,235,0.25)",
        "glow-lg": "0 0 80px rgba(168,85,247,0.3)",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "ribbon-drift": "ribbonDrift 18s linear infinite",
        "orb-spin": "orbSpin 12s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        ribbonDrift: {
          "0%": { transform: "translateX(-10%) rotate(0deg)" },
          "100%": { transform: "translateX(10%) rotate(2deg)" },
        },
        orbSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      backdropBlur: {
        glass: "20px",
      },
    },
  },
  plugins: [],
};
