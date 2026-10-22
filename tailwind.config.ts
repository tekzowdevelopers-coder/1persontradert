import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#182036",
        brand: {
          green: "#00A651",
          greenDark: "#008440",
          greenHover: "#009347",
          greenLight: "#EBF8F1",
          greenBorder: "#B9E8CF",
          navy: "#182036",
          navyDark: "#0D1424",
          navyLight: "#263353",
          navyMuted: "#334155",
          dark: "#182036",
          subtle: "#475569",
          muted: "#64748B",
          border: "#E2E8F0",
          card: "#FFFFFF",
          cardBg: "#F8FAFC",
          cardHover: "#F1F5F9",
          red: "#E53935",
          redDark: "#C62828",
          redLight: "#FFEBEE",
          redBorder: "#FFCDD2",
        },
      },
      fontFamily: {
        sans: [
          "'Plus Jakarta Sans'",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        heading: [
          "'Plus Jakarta Sans'",
          "Inter",
          "sans-serif",
        ],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(24, 32, 54, 0.05), 0 1px 2px 0 rgba(24, 32, 54, 0.03)",
        card: "0 10px 25px -5px rgba(24, 32, 54, 0.06), 0 8px 10px -6px rgba(24, 32, 54, 0.04)",
        glowGreen: "0 0 25px -3px rgba(0, 166, 81, 0.35)",
        glowNavy: "0 10px 30px -5px rgba(24, 32, 54, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
