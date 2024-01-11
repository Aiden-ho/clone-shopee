import axios, { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { ErrorRespone } from 'src/types/Util.type'
import { getProfileToLS } from './auth'

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

//Check xem có phải lỗi axios không và có phải lỗi 401 không
export function isUnauthorizedError<ErrorUnauthorized>(error: unknown): error is AxiosError<ErrorUnauthorized> {
  return checkAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

//Check xem 401 có phải rơi vào trường hợp token expire không
export function isTokenExpireError<ErrorUnauthorized>(error: unknown): error is AxiosError<ErrorUnauthorized> {
  return (
    isUnauthorizedError<ErrorRespone<{ message: string; name: string }>>(error) &&
    error.response?.data.data?.name === 'EXPIRED_TOKEN'
  )
}

//Check xem 401 có phải đã logout hay không
export function isLoggedOutError<ErrorUnauthorized>(error: unknown): error is AxiosError<ErrorUnauthorized> {
  return isUnauthorizedError<ErrorRespone<{ message: string; name: string }>>(error) && getProfileToLS() === null
}
