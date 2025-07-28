/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#d34585',  // pink color used in buttons
          text: '#f6e7ea',     // light pink text
        },
        accent: {
          DEFAULT: '#caa810',  // gold color
          muted: '#83676d',    // muted text color
        }
      },
      fontFamily: {
        'sans': ['Noto Sans', 'sans-serif'],
        'serif': ['Noto Serif', 'serif'],
      },
      gridTemplateColumns: {
        'auto-fit-card': 'repeat(auto-fit, minmax(158px, 1fr))',
      }
    },
  },
  plugins: [],
} 