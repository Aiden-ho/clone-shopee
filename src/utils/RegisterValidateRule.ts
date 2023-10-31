// chỉ import type từ react-hook-form
import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'

// type rule được tạo bằng index signature
type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

// Để lấy được value từ password và so sánh với confirmpass word thì hàm getRule nhận vào đối số là function getValues của hook form
// getValues có type và generic được bê y xì từ hook form
const getRule = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Vui lòng nhập email'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    },
    minLength: {
      value: 5,
      message: 'Email tối thiểu 5 kí tự'
    },
    maxLength: {
      value: 160,
      message: 'Email tối đa 160 kí tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Vui lòng nhập password'
    },
    minLength: {
      value: 5,
      message: 'password tối thiểu 5 kí tự'
    },
    maxLength: {
      value: 160,
      message: 'password tối đa 160 kí tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Vui lòng nhập xác minh password'
    },
    minLength: {
      value: 5,
      message: 'password tối thiểu 5 kí tự'
    },
    maxLength: {
      value: 160,
      message: 'password tối đa 160 kí tự'
    },
    // Hàm validate nhận vào 1 object các func hoặc 1 callback
    // Khi trả ra true thì valid , không thì sẽ trả ra message của invalid
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Nhập lại Password không khớp'
        : undefined
  }
})

export default getRule
