/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        rgbPulseFast: 'rgbPulse 2s ease-in-out infinite',
        rgbPulseMedium: 'rgbPulse 3s ease-in-out infinite',
        rgbPulseSlow: 'rgbPulse 4s ease-in-out infinite',
      },
      keyframes: {
        rgbPulse: {
          '0%, 100%': { 
            'background-color': 'rgba(255, 255, 255, 0.1)',
            'opacity': '0.8' 
          },
          '25%': { 
            'background-color': 'rgba(255, 0, 0, 0.3)',
            'opacity': '0.9' 
          },
          '50%': { 
            'background-color': 'rgba(0, 255, 0, 0.3)',
            'opacity': '1' 
          },
          '75%': { 
            'background-color': 'rgba(0, 0, 255, 0.3)',
            'opacity': '0.9' 
          },
        }
      }
    },
  },
  plugins: [],
}