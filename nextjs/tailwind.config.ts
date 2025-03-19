import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "orange-sm": "0px 0px 3px var(--color-orange-light)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        orange: {
          DEFAULT: "var(--color-orange-default)",
          light: "var(--color-orange-light)",
          dark: "var(--color-orange-dark)",
          soft: "var(--color-orange-soft)",
          deep: "var(--color-orange-deep)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
