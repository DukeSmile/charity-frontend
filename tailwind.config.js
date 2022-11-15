/** @type {import('tailwindcss').Config} */
function range(start, end, increment = 1) {
  const count = Math.floor((end - start + 1) / increment);
  return Array(count).fill(0).map((_, idx) => start + idx * increment);
}

const minFontSize = 5;
const maxFontSize = 140;

const minSpacingPixel = 0;
const maxSpacingPixel = 1000;
const spacingPixelIncrement = 5;

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      spacing: {
        0: '0px',
        ...range(minSpacingPixel, maxSpacingPixel, spacingPixelIncrement).reduce((merged, f) => ({ ...merged, [f]: `${f}px` }), {})
      },
      fontFamily: {
        poppins: "'Poppins', sans-serif",
      },
      fontSize: {
        ...range(minFontSize, maxFontSize).reduce((merged, f) => ({ ...merged, [f]: `${f}px`}), {}),
        ...range(1, 50).reduce((merged, f) => ({ ...merged, [`${f*0.1}em`]: `${f*0.1}em`}), {}),
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      letterSpacing: {
        '4': '4px',
        ...range(1, 100).reduce((merged, f) => ({ ...merged, [`${f}p`]: `${f*0.01}em`}), {}),
      },
      lineHeight:{
        ...range(1, 50).reduce((merged, f) => ({ ...merged, [`${f*0.1}em`]: `${f*0.1}em`}), {}),
      },
      borderRadius: {
        none: '0px',
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
        ...range(1, 10).reduce((merged, f) => ({ ...merged, [f]: `${f}px`}), {}),
      },
      borderWidth: {
        1: '1px',
        0: '0px',
        2: '2px',
        3: '3px',
        4: '4px',
        8: '8px',
      },
      padding: {
        0: '0px',
        ...range(minSpacingPixel, maxSpacingPixel).reduce((merged, f) => ({ ...merged, [f]: `${f}px` }), {})
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        brown: '#512C29',
        green: '#07931C',
        iron: '#D6D6D6',
        lightgrey: '#D9D9D9',
        alabaster: '#FAFAFA',

      },
      boxShadow: {
        default: '5px 10px 40px -5px rgba(0, 0, 0, 0.08)'
      },
      margin: (theme, { negative }) => ({
        auto: 'auto',
        ...range(minSpacingPixel, maxSpacingPixel).reduce((merged, f) => ({ ...merged, [f]: `${f}px` }), {})
      }),
      screens: {
        'msm': '320px',
        'mmd': '375px',
        'mlg': '425px',
        'lap': '890px',
        sm: '600px',
        md: '960px',
        lg: '1280px',
        xl: '1920px',
      },
      maxWidth: {
        ...range(minSpacingPixel, maxSpacingPixel, spacingPixelIncrement).reduce((merged, f) => ({ ...merged, [f]: `${f}px` }), {})
      },
      backgroundImage: {
        'home' : "url('./assets/images/home.png')"
      }
    },
  },
  plugins: [],
}
