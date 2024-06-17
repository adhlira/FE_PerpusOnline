/** @type {import('tailwindcss').Config} */
export default {
  content: ["src/**/*.{html,jsx}", "src/Layout/*.{html,jsx}", "index.html"],
  theme: {
    colors: {
      button1: "#166534",
      button1hover: "#15803d",
      button2: "#2563eb",
      button2hover: "#3b82f6",
      putih: "#ffffff",
      bar: "#451a03",
      kuning: "#facc15",
      kuninghover: "#fde047",
      hover: "#78350f",
      merah: "#b91c1c",
      merahhover: "#dc2626",
    },
    extend: {},
  },
  plugins: ["@tailwindcss/forms"],
};
