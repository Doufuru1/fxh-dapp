/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#12121a',
          card: '#1a1a24',
          hover: '#22222e',
          surface: '#252530'
        },
        accent: {
          DEFAULT: '#6366f1',
          light: '#818cf8',
          glow: 'rgba(99,102,241,0.2)'
        },
        text: {
          DEFAULT: '#f0f0f5',
          secondary: '#a0a0b0',
          muted: '#707080'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
