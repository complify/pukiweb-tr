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
          light: "#eef7df",
          light2: "#f4f9ea",
        },
        ink: "#1f2530",
        muted: "#8a94a6",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,30,50,.04), 0 6px 20px rgba(20,30,50,.05)",
        soft: "0 10px 30px rgba(95,138,18,.18)",
      },
      borderRadius: {
        xl2: "16px",
      },
    },
  },
  plugins: [],
};
export default config;
