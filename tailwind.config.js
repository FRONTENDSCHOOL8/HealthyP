/** @type {import('tailwindcss').Config} */
import { range } from 'lodash';

const pxToRem = (px, base = 16) => `${px / base}rem`;

const pxToRemFunc = (start, end) =>
  range(start, end).reduce((acc, px) => {
    acc[`${px}pxr`] = pxToRem(px);
    return acc;
  }, {});

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
    // {
    //   pattern: /(bg|text)-(indigo|sky|slate)-(50|[1-9]00|950)/,
    //   variants: ['hover', 'focus'],
    // },
  ],
  theme: {
    screens: {
      mobile: { min: '320px', max: '429px' },
      // => @media (min-width: 320px and max-width: 429px) { ... }
      others: '430px',
      // => @media (min-width: 430px ) { ... }
    },
    extend: {
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        primary: '#91BD14',
        warning: '#FF0D0D',
        alert: '#FF5D47',
        gray_100: '#FAFAFB',
        gray_150: '#F0F0F1',
        gray_200: '#D9D9DA',
        gray_300: '#FAFAFB',
        gray_400: '#3C3C43',
        gray_500: '#3C3C43',
        gray_700: '#575758',
        tag_color: '#EEEEF0',
      },
      backgroundImage: {
        'star-icon': "url('/src/assets/icons/star.svg')",
        'add-icon': "url('/src/assets/icons/add.svg')",
        'add-fill-icon': "url('/src/assets/icons/addFill.svg')",
        'arrow-big-icon': "url('/src/assets/icons/arrowBig.svg')",
        'arrow-small-icon': "url('/src/assets/icons/arrowSmall.svg')",
        'bell-icon': "url('/src/assets/icons/bell.svg')",
        'bookmark-icon': "url('/src/assets/icons/bookmark.svg')",
        'bookmark-fill-icon': "url('/src/assets/icons/bookmarkFill.svg')",
        'bulb-icon': "url('/src/assets/icons/bulb.svg')",
        'camera-fill-icon': "url('/src/assets/icons/cameraFill.svg')",
        'check-circle-icon': "url('/src/assets/icons/checkCircle.svg')",
        'close-icon': "url('/src/assets/icons/close.svg')",
        'done-icon': "url('/src/assets/icons/done.svg')",
        'edit-square-icon': "url('/src/assets/icons/editSqaure.svg')",
        'error-fill-icon': "url('/src/assets/icons/errorFill.svg')",
        'home-icon': "url('/src/assets/icons/home.svg')",
        'home-fill-icon': "url('/src/assets/icons/homeFill.svg')",
        'move-icon': "url('/src/assets/icons/move.svg')",
        'person-icon': "url('/src/assets/icons/person.svg')",
        'person-fill-icon': "url('/src/assets/icons/personFill.svg')",
        'search-icon': "url('/src/assets/icons/search.svg')",
        'search-fill-icon': "url('/src/assets/icons/searchFill.svg')",
      },
      spacing: { side: '0.875rem', overflow: '12vw', ...pxToRemFunc(0, 1301) }, // px을 rem으로 변환
      inset: {
        ...pxToRemFunc(0, 1000),
      },
      boxShadow: {
        default:
          '0 3px 8px 0 rgba(0, 0, 0 / 0.12), 0 1px 3px 0 rgba(0, 0, 0 / 0.04)',
        small:
          '0 2px 7px 0 rgba(0, 0, 0 / 0.1), 0 1px 2px 0 rgba(0, 0, 0 / 0.04)',
        revert:
          '0 -3px 8px 0 rgba(0, 0, 0 / 0.12), 0 -1px 3px 0 rgba(0, 0, 0 / 0.04)',
      },
      fontSize: {
        'title-1-em': [
          '1.75rem',
          {
            fontWeight: 700,
            letterSpacing: '-0.4px',
            lineHeight: '2.125rem',
          },
        ],
        'title-1': [
          '1.75rem',
          {
            fontWeight: 400,
            letterSpacing: '-0.4px',
            lineHeight: '2.125rem',
          },
        ],
        'title-2-em': [
          '1.375rem',
          {
            fontWeight: 700,
            letterSpacing: '-0.4px',
            lineHeight: '1.75rem',
          },
        ],
        'title-2': [
          '1.375rem',
          {
            fontWeight: 400,
            letterSpacing: '-0.4px',
            lineHeight: '1.75rem',
          },
        ],
        'title-3-em': [
          '1.25rem',
          {
            fontWeight: 600,
            letterSpacing: '-0.4px',
            lineHeight: '1.5625rem',
          },
        ],
        'title-3': [
          '1.25rem',
          {
            fontWeight: 400,
            letterSpacing: '-0.4px',
            lineHeight: '1.5625rem',
          },
        ],
        'body-em': [
          '1.0625rem',
          {
            fontWeight: 600,
            letterSpacing: '-0.4px',
            lineHeight: '1.375rem',
          },
        ],
        body: [
          '1.0625rem',
          {
            fontWeight: 400,
            letterSpacing: '-0.4px',
            lineHeight: '1.375rem',
          },
        ],
        'sub-em': [
          '0.9375rem',
          {
            fontWeight: 600,
            letterSpacing: '-0.4px',
            lineHeight: '1.25rem',
          },
        ],
        sub: [
          '0.9375rem',
          {
            fontWeight: 400,
            letterSpacing: '-0.4px',
            lineHeight: '1.25rem',
          },
        ],
        'foot-em': [
          '0.8125rem',
          {
            fontWeight: 600,
            letterSpacing: '-0.4px',
            lineHeight: '1.125rem',
          },
        ],
        foot: [
          '0.8125rem',
          {
            fontWeight: 400,
            letterSpacing: '-0.4px',
            lineHeight: '1.125rem',
          },
        ],
        'cap-1-em': [
          '0.75rem',
          {
            fontWeight: 600,
            letterSpacing: '-0.4px',
            lineHeight: '1rem',
          },
        ],
        'cap-1': [
          '0.75rem',
          {
            fontWeight: 400,
            letterSpacing: '-0.4px',
            lineHeight: '1rem',
          },
        ],
        'cap-2-em': [
          '0.6875rem',
          {
            fontWeight: 600,
            letterSpacing: '-0.4px',
            lineHeight: '0.9375rem',
          },
        ],
        'cap-2': [
          '0.6875rem',
          {
            fontWeight: 400,
            letterSpacing: '-0.4px',
            lineHeight: '0.9375rem',
          },
        ],
      },
    },
  },
  plugins: [],
};
