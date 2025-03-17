/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: "var(--font-poppins), sans-serif",
        montserrat: "var(--font-montserrat), sans-serif",
        bebas: "var(--font-bebas-neue), sans-serif",
     },
      colors: {
        primary: "#1e2227", // Deep Blue
        secondary: "#9333EA", // Purple
        accent: "#F59E0B", // Amber
        background: "#F3F4F6", // Light Gray
      },
      
    },
  },
  plugins: [],
};

