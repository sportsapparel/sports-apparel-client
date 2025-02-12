import flowbite from "flowbite-react/tailwind";
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./screens/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      filter: {
        green: "invert(1) hue-rotate(90deg)",
      },
      screens: {
        "md-to-xs": { min: "3.125rem", max: "61.9375rem" },
        "sm-to-xs": { min: "3.125rem", max: "47.9375rem" },
        xs: { min: "3.125rem", max: "36rem" },
        sm: { min: "36rem", max: "47.9375rem" },
        md: { min: "48rem", max: "61.9375rem" },
        lg: { min: "62rem", max: "75rem" },
        "1xl": { min: "75rem", max: "95.9375rem" },
        "2xl": { min: "624.9375rem" },
      },
      colors: {
        btnColor: "#AD6343",
        btnHoverColor: "#5D6956",
        textColor: "#30362C",
        backgroundColor: "#FFFFFF",
      },
    },
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        h1: {
          fontSize: theme("fontSize.5xl"),
          // color: theme('colors.color') // Adjust color as needed
        },
        h2: {
          fontSize: theme("fontSize.4xl"),
          // color: theme('colors.color') // Adjust color as needed
        },
        h3: {
          fontSize: theme("fontSize.3xl"),
          // color: theme('colors.color') // Adjust color as needed
        },
        h4: {
          fontSize: theme("fontSize.2xl"),
          // color: theme('colors.color') // Adjust color as needed
        },
        h5: {
          fontSize: theme("fontSize.xl"),
          // color: theme('colors.color') // Adjust color as needed
        },
        h6: {
          fontSize: theme("fontSize.lg"),
          // color: theme('colors.color') // Adjust color as needed
        },
      });
      flowbite.plugin();
    }),
  ],
} as const;

export default config;
