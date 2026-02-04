/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        corporate: {
          bg: '#F7F9FC',
          card: '#FFFFFF',
          border: '#E5E7EB',
          text: '#0F172A',
          muted: '#64748B',
          gold: '#2563EB',
          blue: '#14B8A6',
        },
        primary: {
          DEFAULT: '#2563EB',
          light: '#93C5FD',
        },
        secondary: {
          DEFAULT: '#14B8A6',
          dark: '#0D9488',
        },
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(to bottom right, #FFFFFF, #F1F5F9)',
        'gradient-card': 'linear-gradient(to bottom right, #FFFFFF, #F8FAFC)',
      }
    },
  },
  plugins: [],
}
