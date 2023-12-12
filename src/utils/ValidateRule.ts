// chỉ import type từ react-hook-form
import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
//import để dùng yup
import * as yup from 'yup'

// type rule được tạo bằng index signature
type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

// Để lấy được value từ password và so sánh với confirmpass word thì hàm getRule nhận vào đối số là function getValues của hook form
// getValues có type và generic được bê y xì từ hook form
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRule = (getValues?: UseFormGetValues<any>): Rules => ({
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

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent as { price_min: string; price_max: string }
  // Nếu có cả hai min và max
  if (price_max !== '' && price_min !== '') {
    //thì max phải lớn hơn hoặc bằng min
    return Number(price_max) >= Number(price_min)
  }
  //Nếu không thì phải có 1 trong 2 khi submit
  return price_max !== '' || price_min !== ''
}

const generateRuleConfirmPass = (targetRef: string, mess: string) => {
  return yup
    .string()
    .required('Vui lòng nhập lại password')
    .min(5, 'password tối thiểu 5 kí tự')
    .max(160, 'password tối đa 160 kí tự')
    .oneOf([yup.ref(targetRef)], mess)
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Vui lòng nhập email')
    .email('Email không đúng định dạng')
    .min(5, 'Email tối thiểu 5 kí tự')
    .max(160, 'Email tối đa 160 kí tự'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .min(5, 'Mật khẩu tối thiểu 5 kí tự')
    .max(160, 'Mật khẩu tối đa 160 kí tự'),
  new_password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .min(5, 'Mật khẩu tối thiểu 5 kí tự')
    .max(160, 'Mật khẩu tối đa 160 kí tự'),
  confirm_password: generateRuleConfirmPass('password', 'Nhập lại mật khẩu không khớp'),
  confirm_new_password: generateRuleConfirmPass('new_password', 'Nhập lại mật khẩu mới không khớp'),
  name: yup.string().max(160, 'Tên tối đa 160 kí tự'),
  phone: yup.string().max(20, 'Số điện thoại tối đa 20 kí tự'),
  address: yup.string().max(160, 'Địa chỉ tối đa 160 kí tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn ngày trong quá khứ'),
  avatar: yup.string().max(160, 'Tên file có độ dài tối đa là 160'),
  price_min: yup.string().test({
    name: 'price_not_allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price_not_allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  product_name: yup.string().trim().required('Vui lòng nhập tên sản phẩm')
})

//Type from shcema
type YupSchema = yup.InferType<typeof schema>
export type RegisterFormDataType = Pick<YupSchema, 'email' | 'password' | 'confirm_password'>
export type LoginFormDataType = Pick<YupSchema, 'email' | 'password'>
export type PriceRangeFormDataType = Pick<YupSchema, 'price_min' | 'price_max'>
export type profileFormDataType = Pick<YupSchema, 'name' | 'phone' | 'address' | 'date_of_birth' | 'avatar'>
export type changePasswordFormDataType = Pick<YupSchema, 'password' | 'new_password' | 'confirm_new_password'>

//Schema
export const registerSchema = schema.pick(['email', 'password', 'confirm_password'])
export const loginSchema = schema.pick(['email', 'password'])
export const priceRangeSchema = schema.pick(['price_min', 'price_max'])
export const productSearchSchema = schema.pick(['product_name'])
export const profileSchema = schema.pick(['name', 'phone', 'address', 'date_of_birth', 'avatar'])
export const changePasswordSchema = schema.pick(['password', 'new_password', 'confirm_new_password'])
