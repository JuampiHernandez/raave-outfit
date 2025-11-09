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
        'sol-red': '#FF4444',
        'sol-orange': '#FF8C00',
        'sol-yellow': '#FFD700',
        'sol-purple': '#9B59B6',
      },
      backgroundImage: {
        'gradient-sol': 'linear-gradient(135deg, #FF4444 0%, #FF8C00 25%, #FFD700 50%, #9B59B6 100%)',
      },
    },
  },
  plugins: [],
};
export default config;

