/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-reverse': 'floatReverse 8s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'gradient': 'gradient 15s ease infinite',
        'move': 'move 20s ease infinite',
        'move-reverse': 'moveReverse 20s ease infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(20px)' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        move: {
          '0%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(10%, 10%)' },
          '50%': { transform: 'translate(0, 20%)' },
          '75%': { transform: 'translate(-10%, 10%)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        moveReverse: {
          '0%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-10%, -10%)' },
          '50%': { transform: 'translate(0, -20%)' },
          '75%': { transform: 'translate(10%, -10%)' },
          '100%': { transform: 'translate(0, 0)' },
        },
      },
    },
  },
  plugins: [],
}