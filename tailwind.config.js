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
      }
    },
  },
  plugins: [],
};
