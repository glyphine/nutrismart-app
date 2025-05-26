/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
   presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#F4F2EF",
        primary: "#102338",
        secondary: "#2D639E",
        yellow: "#F4E99A",
        red: "#CC2727",
        white: "#FFFFFF",
        gray: "#898988",
      },
      fontFamily: {
        "lexend-bold": ["Lexend-Bold"],
        "lexend-extrabold": ["Lexend-ExtraBold"],
        noto: ["NotoSans-Regular"],
        "NotoSans-Bold": ["Poppins_700Bold"],
      },
    },
  },
  plugins: [],
};
