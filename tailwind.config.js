/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a1a3c',
        brand: {
          50: '#eef4ff',
          100: '#dbe8ff',
          200: '#bcd3ff',
          300: '#8db4ff',
          400: '#5a8dff',
          500: '#2f6bff',
          600: '#1b52e6',
          700: '#1640b8',
          800: '#133592',
          900: '#0e275f',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'Inter', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        marqueeRight: { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
      },
      animation: { marquee: 'marquee 24s linear infinite', marqueeRight: 'marqueeRight 60s linear infinite', float: 'float 6s ease-in-out infinite' },
    },
  },
  plugins: [],
}
