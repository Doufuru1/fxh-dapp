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
          DEFAULT: '#fc5b23',
          light: '#ff8c42',
          glow: 'rgba(252,91,35,0.2)'
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
