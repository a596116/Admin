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
    fontSize: {
      ...defaultTheme.fontSize,
      h1: [
        '2.5rem',
        {
          fontWeight: '500',
          lineHeight: '3rem',
        },
      ],
      h2: [
        '2rem',
        {
          fontWeight: '500',
          lineHeight: '2.375rem',
        },
      ],
      h3: [
        '1.75rem',
        {
          fontWeight: '500',
          lineHeight: '2rem',
        },
      ],
      h4: [
        '1.5rem',
        {
          fontWeight: '500',
          lineHeight: '1.75rem',
        },
      ],
      h5: [
        '1.25rem',
        {
          fontWeight: '500',
          lineHeight: '1.5rem',
        },
      ],
      h6: [
        '1rem',
        {
          fontWeight: '500',
          lineHeight: '1.25rem',
        },
      ],
      body: [
        '1rem',
        {
          fontWeight: '400',
          lineHeight: '1.5rem',
        },
      ],
      small: [
        '0.875rem',
        {
          fontWeight: '400',
          lineHeight: '1.25rem',
        },
      ],
      tiny: [
        '0.75rem',
        {
          fontWeight: '400',
          lineHeight: '1.25rem',
        },
      ],
    },
    extend: {
      colors: {
        hd: {
          primary: 'var(--hd-primary)',
          'primary-hover': 'var(--hd-primary-hover)',
          'primary-active': 'var(--hd-primary-active)',
          secondary: 'var(--hd-secondary)',
          success: 'var(--hd-success)',
          danger: 'var(--hd-danger)',
          warning: 'var(--hd-warning)',
          info: 'var(--hd-info)',
          light: 'var(--hd-light)',
          text: 'var(--hd-text)',
          'text-50': 'var(--hd-text-50)',
          dark: 'var(--hd-dark)',
          'dark-50': 'var(--hd-dark-50)',
          muted: 'var(--hd-muted)',
          white: 'var(--hd-white)',
          'white-50': 'var(--hd-white-50)',
          'black-50': 'var(--hd-black-50)',
          'white-50': 'var(--hd-white-50)',
          disable: 'var(--hd-disable)',
          border: 'var(--hd-border)',
          bg: 'var(--hd-bg)',
          'bg-1': 'var(--hd-bg-1)',
        },
        primary: {
          DEFAULT: '#9eb2e8',
          50: '#90a3d4',
          100: '#8295c4',
          200: '#7b8cba',
          300: '#7585b3',
          400: '#707ea9',
          500: '#8294C4',
          600: '#626f94',
          700: '#566384',
          800: '#4b5774',
          900: '#414b63',
          light: '#a0b6ec',
        },
        'custom-gray': {
          DEFAULT: '#252525',
          50: '#EEFAFF',
          100: '#b7b7b7',
        },
        'custom-green': {
          DEFAULT: '#48B981',
          50: '#7aebb3',
          100: '#70e1a9',
          200: '#66d79f',
          300: '#5ccd95',
          400: '#52c38b',
          500: '#48b981',
          600: '#3eaf77',
          700: '#34a56d',
          800: '#2a9b63',
          900: '#209159',
        },
        'custom-red': {
          DEFAULT: '#F36666',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FDDFDF',
          300: '#FAB8B8',
          400: '#F89292',
          500: '#F56C6C',
          600: '#F13737',
          700: '#E10F0F',
          800: '#AD0C0C',
          900: '#780808',
        },
        'custom-yellow': {
          DEFAULT: '#ffcf73',
          50: '#ffffa5',
          100: '#fff79b',
          200: '#ffed91',
          300: '#ffe387',
          400: '#ffd97d',
          500: '#ffcf73',
          600: '#f5c569',
          700: '#ebbb5f',
          800: '#e1b155',
          900: '#d7a74b',
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
