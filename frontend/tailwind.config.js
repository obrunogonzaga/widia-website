/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'bgdark': '#0d0d0d',
        'neon-green': '#00ff9a',
        'neon-blue': '#15d6ff',
        'glass': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'neon-green': '0 0 10px rgba(0, 255, 154, 0.5), 0 0 20px rgba(0, 255, 154, 0.3)',
        'neon-blue': '0 0 10px rgba(21, 214, 255, 0.5), 0 0 20px rgba(21, 214, 255, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.2)',
      },
      backgroundImage: {
        'gradient-neon': 'linear-gradient(135deg, #00ff9a 0%, #15d6ff 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      borderRadius: {
        'custom': '4px',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};