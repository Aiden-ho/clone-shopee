/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

// tuy dùng js nhưng khi để type gần thì sẽ hiểu là type của phần bên dưới
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    // Ẩn đi container default được tạo
    container: false
  },
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
  plugins: [
    //function plugin để mở rộng cấu hình, plugin là 1 func nhận vào 1 callback, trả về các tùy chỉnh func
    // Tạo 1 container custom với plugin
    plugin(function ({ addComponents, theme }) {
      // Tạo mới component
      addComponents({
        '.container': {
          maxWidth: theme('columns.7xl'), // theme cho phép dùng lại base core của tailwind
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        }
      })
    })
  ]
}
