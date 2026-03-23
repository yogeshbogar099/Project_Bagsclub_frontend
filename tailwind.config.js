/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyan': '#00FFFF',
        'magenta': '#FF00FF',
        'yellow': '#FFFF33',
        'dark-bg': '#FFFFFF',
        'primary-blue': '#2957A4',
        primary: {
          DEFAULT: '#0d47a1',
          light: '#90caf9',
          dark: '#0d47a1'
        },
        secondary: '#f57c00',
      },
      fontFamily: {
        'lato': ['Lato', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'serif': ['PT Serif', 'serif'],
        body: ['Lato', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
