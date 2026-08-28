/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* Light "white" theme — used as the page background and lighter
           tints for alternating sections. */
        ink: {
          DEFAULT: '#FFFFFF',
          950: '#F2F6FB',
          900: '#EDF2FA',
          800: '#E4ECF7',
          700: '#D3E2F2',
        },
        obsidian: '#EDF2FA',
        /* Deep royal-blue text (the "blue" of the palette). */
        ivory: {
          DEFAULT: '#0E2A6E',
          soft: '#1B3A85',
          dim: '#5B6E9E',
        },
        sand: '#C9D8EF',
        /* Sunny yellow accent (the "yellow" of the palette). */
        champagne: {
          DEFAULT: '#F5B800',
          light: '#FFC93C',
          dark: '#D29D00',
        },
        /* Vivid blue accent. */
        azure: {
          DEFAULT: '#1D4ED8',
          pale: '#EAF0FE',
          royal: '#0E2A6E',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Manrope"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        lux: '0.32em',
        wide2: '0.22em',
      },
      transitionTimingFunction: {
        lux: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '30%': { transform: 'translate(3%, -15%)' },
          '50%': { transform: 'translate(-8%, 5%)' },
          '70%': { transform: 'translate(6%, 8%)' },
          '90%': { transform: 'translate(-3%, 12%)' },
        },
        'line-grow': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      animation: {
        grain: 'grain 8s steps(10) infinite',
      },
    },
  },
  plugins: [],
}