import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        puki: {
          DEFAULT: "#7cb518",
          dark: "#5f8a12",
          darker: "#4a6d0e",
          light: "#eef7df",
          light2: "#f4f9ea",
        },
        ink: {
          DEFAULT: "#1f2530",
          800: "#232a38",
          700: "#2c3547",
        },
        muted: "#8a94a6",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,30,50,.04), 0 6px 20px rgba(20,30,50,.05)",
        soft: "0 10px 30px rgba(95,138,18,.18)",
        lift: "0 2px 4px rgba(20,30,50,.04), 0 18px 40px rgba(20,30,50,.10)",
        glow: "0 0 0 1px rgba(124,181,24,.15), 0 20px 50px rgba(124,181,24,.20)",
      },
      borderRadius: {
        xl2: "16px",
        xl3: "24px",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        fadeup: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        fadeup: "fadeup .6s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
