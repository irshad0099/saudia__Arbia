/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#080e1f",
        blue: "#1847d4",
        "blue-mid": "#2563eb",
        "blue-light": "#3b82f6",
        cyan: "#00c4e0",
        indigo: "#4f46e5",
        gold: "#d4a017",
        "gold-light": "#f0c040",
        gray50: "#f7f9fc",
        gray100: "#eef1f7",
        gray200: "#dde2ef",
        gray400: "#8994ad",
        gray600: "#4a5568",
        gray800: "#1a2035",
      },
      fontFamily: {
        "display-ar": ["var(--font-cairo)", "sans-serif"],
        "body-ar": ["var(--font-tajawal)", "sans-serif"],
        "display-en": ["var(--font-syne)", "sans-serif"],
        "body-en": ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "grad-main": "linear-gradient(135deg, #1847d4 0%, #00c4e0 100%)",
        "grad-gold": "linear-gradient(135deg, #d4a017 0%, #f0c040 100%)",
        "grad-hero": "linear-gradient(160deg, #f0f5ff 0%, #e6f4ff 45%, #f0fbff 100%)",
        "grad-dark": "linear-gradient(135deg, #080e1f 0%, #0d1a3a 100%)",
      },
      boxShadow: {
        sm2: "0 1px 4px rgba(0,0,0,.06)",
        md2: "0 6px 24px rgba(0,0,0,.09)",
        lg2: "0 20px 60px rgba(0,0,0,.12)",
        xl2: "0 32px 80px rgba(0,0,0,.16)",
        blueGlow: "0 10px 40px rgba(24,71,212,.3)",
        cyanGlow: "0 0 60px rgba(0,196,224,.25)",
      },
      borderRadius: {
        DEFAULT: "18px",
        sm2: "10px",
        lg2: "28px",
        xl2: "36px",
      },
    },
  },
  plugins: [],
};
