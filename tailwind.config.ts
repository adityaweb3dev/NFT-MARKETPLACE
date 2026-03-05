import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0B0F19",
        surface: "#111827",
        "surface-2": "#1a2235",
        border: "#1E2D4A",
        "border-glow": "#7C3AED",
        primary: "#7C3AED",
        "primary-dark": "#5B21B6",
        "primary-light": "#A78BFA",
        accent: "#06B6D4",
        "accent-blue": "#3B82F6",
        "neon-purple": "#A855F7",
        "neon-blue": "#60A5FA",
        "neon-cyan": "#22D3EE",
        "text-primary": "#F1F5F9",
        "text-secondary": "#94A3B8",
        "text-muted": "#475569",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient":
          "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(124,58,237,0.3), transparent)",
        "card-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0))",
        "purple-glow":
          "radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%)",
        "blue-glow":
          "radial-gradient(circle, rgba(59,130,246,0.2), transparent 70%)",
        "mesh-gradient":
          "radial-gradient(at 40% 20%, hsla(270,80%,50%,0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(210,80%,60%,0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(280,70%,40%,0.2) 0px, transparent 50%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "gradient-rotate": "gradient-rotate 8s ease infinite",
        shimmer: "shimmer 2s linear infinite",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out forwards",
        "spin-slow": "spin 12s linear infinite",
        ticker: "ticker 20s linear infinite",
        "border-glow": "border-glow 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 20px rgba(124,58,237,0.4)",
          },
          "50%": {
            opacity: "0.8",
            boxShadow: "0 0 40px rgba(124,58,237,0.8)",
          },
        },
        "gradient-rotate": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(124,58,237,0.5)" },
          "50%": { borderColor: "rgba(168,85,247,1)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glow-purple": "0 0 30px rgba(124,58,237,0.4)",
        "glow-blue": "0 0 30px rgba(59,130,246,0.4)",
        "glow-cyan": "0 0 30px rgba(34,211,238,0.4)",
        "card-glow": "0 0 60px rgba(124,58,237,0.15)",
        "inner-glow": "inset 0 0 30px rgba(124,58,237,0.15)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-expo": "cubic-bezier(0.7, 0, 0.84, 0)",
      },
    },
  },
  plugins: [],
};

export default config;
