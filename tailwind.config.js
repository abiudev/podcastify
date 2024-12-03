/** @type {import('tailwindcss').Config} */
import { Config } from "tailwindcss";
import { mtConfig } from "@material-tailwind/react";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "roboto-condensed": ["Roboto Condensed", "sans-serif"],
        mukta: ["Mukta", "sans-serif"],
      },
    },
  },
  plugins: [],
};
