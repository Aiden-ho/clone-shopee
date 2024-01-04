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
  const { path, parent } = this
  const { price_min, price_max } = parent as { price_min: string; price_max: string }
  // Nếu có cả hai min và max
  if (price_max !== '' && price_min !== '') {
    //thì max nhỏ hơn min thì sẽ lỗi
    if (Number(price_max) < Number(price_min)) {
      return this.createError({ message: { key: `${path}.not_allow`, values: '' } })
    }
  } else if (price_max === '' && price_min === '') {
    return this.createError({ message: { key: `${path}.not_allow`, values: '' } })
  }

  return true
}

const generateRuleConfirmPass = (targetRef: string) => {
  return yup
    .string()
    .required()
    .min(5)
    .max(160)
    .oneOf([yup.ref(targetRef)])
}

yup.setLocale({
  mixed: {
    required(params) {
      const { path } = params
      return { key: `${path}.required`, values: '' }
    },
    oneOf: ({ path }) => ({ key: `${path}.not_match`, values: '' })
  },
  string: {
    matches: ({ path }) => ({ key: `${path}.wrong_format`, values: '' }),
    min: ({ min, path }) => ({ key: `${path}.too_short`, values: { min } }),
    max: ({ max, path }) => ({ key: `${path}.too_long`, values: { max } })
  },
  date: {
    max: ({ path }) => ({ key: `${path}.wrong_date`, values: '' })
  }
})

export const schema = yup.object({
  email: yup
    .string()
    .required()
    .min(5)
    .max(160)
    // Dùng matches để check email regex vì validate của yup vì build-in ko chính xác
    // Ngoài ra matches còn có thể dùng với setLocale
    // VD: build-in cho rằng "test@gmail" là 1 case pass
    .matches(/^\S+@\S+\.\S+$/),
  password: yup.string().required().min(5).max(160),
  new_password: yup.string().required().min(5).max(160),
  confirm_password: generateRuleConfirmPass('password'),
  confirm_new_password: generateRuleConfirmPass('new_password'),
  name: yup.string().max(160),
  phone: yup.string().max(20),
  address: yup.string().max(160),
  date_of_birth: yup.date().max(new Date()),
  avatar: yup.string().max(160),
  price_min: yup.string().test({
    name: 'price_not_allowed',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price_not_allowed',
    test: testPriceMinMax
  }),
  product_name: yup.string().trim().required()
})

//Type from shcema
type YupSchema = yup.InferType<typeof schema>
export type RegisterFormDataType = Pick<YupSchema, 'email' | 'password' | 'confirm_password'>
export type LoginFormDataType = Pick<YupSchema, 'email' | 'password'>
export type PriceRangeFormDataType = Pick<YupSchema, 'price_min' | 'price_max'>
export type ProductSearchFormDataType = Pick<YupSchema, 'product_name'>
export type profileFormDataType = Pick<YupSchema, 'name' | 'phone' | 'address' | 'date_of_birth' | 'avatar'>
export type changePasswordFormDataType = Pick<YupSchema, 'password' | 'new_password' | 'confirm_new_password'>

//Schema
export const registerSchema = schema.pick(['email', 'password', 'confirm_password'])
export const loginSchema = schema.pick(['email', 'password'])
export const priceRangeSchema = schema.pick(['price_min', 'price_max'])
export const productSearchSchema = schema.pick(['product_name'])
export const profileSchema = schema.pick(['name', 'phone', 'address', 'date_of_birth', 'avatar'])
export const changePasswordSchema = schema.pick(['password', 'new_password', 'confirm_new_password'])
