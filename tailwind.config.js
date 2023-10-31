/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: '#ee4d2d'
      },
      backgroundImage: {
        register_bg: "url('https://down-vn.img.susercontent.com/file/sg-11134004-7rbnd-ln2u4n7zfkag0a')"
      }
    }
  },
  plugins: []
}
