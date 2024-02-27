/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
    // {
    //   pattern: /(bg|text)-(indigo|sky|slate)-(50|[1-9]00|950)/,
    //   variants: ['hover', 'focus'],
    // },
  ],
  theme: {
    extend: {
      colors: {
        "white" : "FFFFFF",
        "black" : "000000",
        "primary" : "91BD14",
        "warning" : "FF0D0D",
        "alert" : "FF5D47",
        "gray_100" : "FAFAFB",
        "gray_150" : "F0F0F1",
        "gray_200" : "D9D9DA",
        "gray_300" : "FAFAFB",
        "gray_400" : "3C3C43",
        "gray_500" : "3C3C43",
        "gray_700" : "575758"
      },
      backgroundImage: {
        "add-icon" : "url('/src/assets/icons/add.svg')",
        "add-fill-icon" : "url('/src/assets/icons/addFill.svg')",
        "arrow-big-icon" : "url('/src/assets/icons/arrowBig.svg')",
        "arrow-small-icon" : "url('/src/assets/icons/arrowSmall.svg')",
        "bell-icon" : "url('/src/assets/icons/bell.svg')",
        "bookmark-icon" : "url('/src/assets/icons/bookmark.svg')",
        "bookmark-fill-icon" : "url('/src/assets/icons/bookmarkFill.svg')",
        "bulb-icon" : "url('/src/assets/icons/bulb.svg')",
        "camera-fill-icon" : "url('/src/assets/icons/cameraFill.svg')",
        "check-circle-icon" : "url('/src/assets/icons/checkCircle.svg')",
        "close-icon" : "url('/src/assets/icons/close.svg')",
        "done-icon" : "url('/src/assets/icons/done.svg')",
        "edit-square-icon" : "url('/src/assets/icons/editSqaure.svg')",
        "error-fill-icon" : "url('/src/assets/icons/errorFill.svg')",
        "home-icon" : "url('/src/assets/icons/home.svg')",
        "home-fill-icon" : "url('/src/assets/icons/homeFill.svg')",
        "move-icon" : "url('/src/assets/icons/move.svg')",
        "person-icon" : "url('/src/assets/icons/person.svg')",
        "person-fill-icon" : "url('/src/assets/icons/personFill.svg')",
        "search-icon" : "url('/src/assets/icons/search.svg')",
        "search-fill-icon" : "url('/src/assets/icons/searchFill.svg')",
      }
    },
  },
  plugins: [],
};
