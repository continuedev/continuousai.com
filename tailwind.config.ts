import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-green-bg": "#c8ffc3",
        "green-line": "#3dbf44",
      },
      borderRadius: {
        square: "32px",
      },
    },
  },
  plugins: [],
};

export default config;
