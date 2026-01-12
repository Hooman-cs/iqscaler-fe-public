/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // This tells Tailwind to scan all JS, TS, JSX, and TSX files in the src/ directory
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

