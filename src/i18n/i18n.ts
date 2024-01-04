import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
//EN
import COMON_EN from './locales/en/comon.json'
import HOME_EN from './locales/en/home.json'
import PRODUCT_EN from './locales/en/product.json'
import LOGIN_EN from './locales/en/login.json'
import CART_EN from './locales/en/cart.json'
import USER_EN from './locales/en/user.json'
import ERROR_EN from './locales/en/errors.json'
//VI
import COMON_VI from './locales/vi/comon.json'
import HOME_VI from './locales/vi/home.json'
import PRODUCT_VI from './locales/vi/product.json'
import LOGIN_VI from './locales/vi/login.json'
import CART_VI from './locales/vi/cart.json'
import USER_VI from './locales/vi/user.json'
import ERROR_VI from './locales/vi/errors.json'

export const locales = {
  vi: 'Tiếng Việt',
  en: 'English'
} as const

export const resources = {
  en: {
    //namespace
    comon: COMON_EN,
    home: HOME_EN,
    product: PRODUCT_EN,
    login: LOGIN_EN,
    cart: CART_EN,
    user: USER_EN,
    error: ERROR_EN
  },
  vi: {
    //namespace
    comon: COMON_VI,
    home: HOME_VI,
    product: PRODUCT_VI,
    login: LOGIN_VI,
    cart: CART_VI,
    user: USER_VI,
    error: ERROR_VI
  }
} as const

export const defaultNS = 'home'

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  ns: ['comon', 'home', 'product', 'login', 'cart', 'user', 'error'],
  fallbackNS: 'home',
  defaultNS,
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})

export default i18n
