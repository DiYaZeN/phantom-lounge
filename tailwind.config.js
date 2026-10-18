/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#040406',
          900: '#08080c',
          850: '#0d0f15',
          800: '#13151f',
          700: '#1b1d2c',
        },
        mauri: {
          gold: '#e6af2e',
          amber: '#f59e0b',
          glow: '#ffbe3b',
          pounamu: '#10b981',
          jade: '#059669',
          crimson: '#e11d48',
          smoke: '#818cf8',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'Inter', 'sans-serif'],
        display: ['"Cinzel Decorative"', 'Cinzel', 'serif'],
        title: ['Cinzel', 'serif'],
        body: ['"Plus Jakarta Sans"', 'Outfit', 'Inter', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        drift: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(15px, -20px) scale(1.08)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        breathe: 'breathe 8s ease-in-out infinite',
        shimmer: 'shimmer 4s linear infinite',
        drift: 'drift 12s ease-in-out infinite',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-gold': '0 8px 32px 0 rgba(230, 175, 46, 0.15)',
        'neon-gold': '0 0 25px rgba(230, 175, 46, 0.35)',
        'neon-jade': '0 0 25px rgba(16, 185, 129, 0.35)',
      }
    },
  },
  plugins: [],
}
