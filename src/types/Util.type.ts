export interface SuccessRespone<Data> {
  message: string
  data: Data
}
export interface ErrorRespone<Data> {
  message: string
  data?: Data
}

// '-?' sẽ loại bỏ phần undefined ở type data của các keyOptional
export type NoUndefinedFiled<T> = {
  [P in keyof T]-?: NoUndefinedFiled<NonNullable<T[P]>>
}
