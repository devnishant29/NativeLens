/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins_400Regular"], // ✅ This will be the new default
        poppins: ["Poppins_400Regular"],
        poppinsBold: ["Poppins_700Bold"],
        // ... other weights if needed
      },
      colors: {
        primary: "#030014",
        secondary: "#151312",
        light: {
          100: "#D6C6FF",
          200: "#A8B5DB",
          300: "#9CA4AB",
        },
        dark: {
          100: "#221f3d",
          200: "#0F0d23",
        },
        accent: "#AB8BFF",
      },
    },
  },
  plugins: [],
};
