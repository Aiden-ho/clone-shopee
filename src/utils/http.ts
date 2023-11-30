import axios, { type AxiosInstance, AxiosError } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { getAccessTokenToLS, clearLS, setAccessTokenToLS, setProfileToLS } from './auth'
import { AuthResponse } from 'src/types/Auth.type'
import path from 'src/constants/path.constants'

class Http {
  instance: AxiosInstance
  // Khai báo access_token trong này để tăng tốc độ truy xuất
  private access_token: string
  constructor() {
    this.access_token = getAccessTokenToLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com',
      timeout: 1000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.access_token && config.headers) {
          config.headers.Authorization = this.access_token
        }
        return config
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        if (response.config.url === path.login || response.config.url === path.register) {
          const data = response.data as AuthResponse
          this.access_token = data.data.access_token
          setProfileToLS(data.data.user)
          setAccessTokenToLS(this.access_token)
        } else if (response.config.url === path.logout) {
          this.access_token = ''
          clearLS()
        }
        return response
      },

      function (error: AxiosError) {
        // xử lý các lỗi khác 422 khi nhận được response
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          // Hiện message trên toast
          toast.error(message)
          if (error.response?.status === HttpStatusCode.Unauthorized) {
            clearLS()
          }
        }

        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
