/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      margin: {
        '-6': '-6px'
      },
      maxWidth: {
        120: '30rem'
      }
    },
    safelist: [
      {
        pattern: /grid-cols-./
      }
    ],
    variants: {
      extend: {
        gridColumnStart: ['responsive', 'hover', 'focus']
      }
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif']
    },
    colors: {
      secondary: {
        50: '#FAF9FA',
        100: '#F0EAF8',
        200: '#CBB6E5',
        500: '#761BE4'
      },
      primary: {
        800: '#000853'
      },
      gray: {
        200: '#898DA9'
      },
      white: '#fff',
      error: {
        100: '#FEECEC',
        200: '#ED4545'
      }
    }
  },
  plugins: []
}
