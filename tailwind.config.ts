import type { Config } from "tailwindcss";
const plugin = require('tailwindcss/plugin');
import { PluginAPI } from 'tailwindcss/types/config';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{css,scss}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryGrey: "var(--primaryGrey)",
        primaryGreyRgb: "rgb(var(--primaryGrey-rgb))",
        secoundaryGrey: "var(--secoundaryGrey)",
        primaryTeal: "var(--primaryTeal)",
        primaryOrange: "var(--primaryOrange)",
        primaryRed: "var(--primaryRed)",
        salad: "var(--salad)",
      },
    },
  },
  plugins: [
    plugin(function({ addComponents }: PluginAPI) {
      addComponents({
        '.ricks-text': {
          '@apply transition-all ease-in-out duration-300': {},
          color: 'var(--primaryTeal)',
          '&:hover': {
            'text-shadow': 'var(--ricksTextHover)',
          },
          '&.active': {
            'text-shadow': 'var(--ricksTextHover)',
          },
          '&.nh':{
            'text-shadow': 'none',
          },
        },
        '.mortys-text': {
          '@apply transition-all ease-in-out duration-300': {},
          color: 'var(--salad)',
          '&:hover': {
            'text-shadow': 'var(--mortysTextHover)',
          },
          '&.active': {
            'text-shadow': '5px 5px 4px var(--primaryGreen)',
          },
        },
      });
    }),
  ],
} satisfies Config;
