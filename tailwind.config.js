/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  important: true,
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        hd: {
          Text: 'var(--hd-text)',
          HoverText: 'var(--hd-hover-text)',
          Color: 'var(--hd-color)',
          HoverColor: 'var(--hd-hover-color)',
          ClickColor: 'var(--hd-click-color)',
          Yellow: 'var(--hd-yellow)',
          Bg: 'var(--hd-bg)',
          'Bg-1': 'var(--hd-bg-1)',
        },
      },
      animation: {
        move: 'svgMove 5s ',
      },
      keyframes: {
        svgMove: {
          '0%': { strokeDasharray: '0, 600px' },
          '100%': { strokeDasharray: '600px, 0' },
        },
      },
    },
  },
  plugins: [],
}
