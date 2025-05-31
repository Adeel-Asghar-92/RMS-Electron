/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "2xl": { max: "1535px" },
        // => @media (max-width: 1535px) { ... }
        XL: { max: "1350px" },
        // => @media (max-width: 1279px) { ... }
        xl: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        lg: { max: "992px" },
        // => @media (max-width: 992px) { ... }

        md: { max: "767px" },
        // => @media (max-width: 767px) { ... }

        sm: { max: "639px" },
        // => @media (max-width: 639px) { ... }

        xsm: { max: "500px" },
        // => @media (max-width: 639px) { ... }

        sj: { max: "1512px" },
        // => @media (max-width: 1535px) { ... }
      },
      colors: {
        rose: "#FD4960", // Primary color
        secondary: "#6c757d", // Secondary color
        accent: "#494949", // Accent color
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        ".hide-after::after": {
          display: "none",
        },
      };

      addUtilities(newUtilities, {
        variants: ["responsive"], // Ensure the utility is responsive
      });
    },
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          /* Hide scrollbar for Webkit-based browsers */
          "-webkit-overflow-scrolling": "touch",
          "-ms-overflow-style": "none",
          "scrollbar-width": "none" /* For Firefox */,
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none" /* For Chrome, Safari, and Edge */,
        },
      });
    },
  ],
};


