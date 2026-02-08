/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          navy: '#0E1A2B',
          slate: '#1F2937',
          light: '#F5F7FA',
          accent: '#B8A369',
        }
      }
    },
  },
  plugins: [],
}
