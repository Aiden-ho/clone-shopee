import axios, { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

//check xem phải lỗi axios không và ráng lại type cho error
// Nếu dùng  type predicated  thủ công thì không cần isAxiosError cũng được
export function checkAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

// Check xem có phải lỗi của axios không và có phải là lỗi 422 không
export function isUnprocessableEntityError<ErrorFrom>(error: unknown): error is AxiosError<ErrorFrom> {
  return checkAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
