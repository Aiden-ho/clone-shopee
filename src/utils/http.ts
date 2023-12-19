import axios, { type AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import {
  getAccessTokenToLS,
  getRefreshTokenToLS,
  clearLS,
  setAccessTokenToLS,
  setRefreshTokenToLS,
  setProfileToLS
} from './auth'
import { AuthResponse, RefreshTokenResponse } from 'src/types/Auth.type'
import path from 'src/constants/path.constants'
import config from 'src/constants/config.contants'
import { URL_LOGIN, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis/auth.api'
import { isTokenExpireError, isUnauthorizedError } from './axiosErrorChecker'
import { ErrorRespone } from 'src/types/Util.type'

export class Http {
  instance: AxiosInstance
  // Khai báo access_token trong này để tăng tốc độ truy xuất
  private access_token: string
  // Refresh token được khai báo trong đây vì chỉ trong interceptors dùng
  private refresh_token: string
  // Dùng để tránh gọi lại refresh token nhiều lần do nhiều api trả về 401
  private refreshTokenRquest: Promise<string> | null
  constructor() {
    this.access_token = getAccessTokenToLS()
    this.refresh_token = getRefreshTokenToLS()
    this.refreshTokenRquest = null
    this.instance = axios.create({
      baseURL: config.BaseURL,
      timeout: 2000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': config.expireAccessToken,
        'expire-refresh-token': config.expireRefreshToken
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
        if (response.config.url === URL_LOGIN || response.config.url === URL_REGISTER) {
          const data = response.data as AuthResponse
          this.access_token = data.data.access_token
          this.refresh_token = data.data.refresh_token
          setProfileToLS(data.data.user)
          setAccessTokenToLS(this.access_token)
          setRefreshTokenToLS(this.refresh_token)
        } else if (response.config.url === path.logout) {
          this.access_token = ''
          this.refresh_token = ''
          clearLS()
        }
        return response
      },

      (error: AxiosError) => {
        // xử lý các lỗi khác 422 và 401 khi nhận được response
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error?.message
          // Hiện message trên toast
          toast.error(message)
        }

        // Lỗi Unauthorized (401) có rất nhiều trường hợp
        // - Token không đúng
        // - Không truyền token
        // - Token hết hạn*

        // Nếu là lỗi 401

        //Xử lý lỗi 401
        if (isUnauthorizedError<ErrorRespone<{ message: string; name: string }>>(error)) {
          const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
          const url = config.url
          // Trường hợp Token hết hạn và request đó không phải là của request refresh token
          // thì chúng ta mới tiến hành gọi refresh token
          if (isTokenExpireError(error) && url !== URL_REFRESH_TOKEN) {
            /**
             * Trong trường hợp gọi nhiều hơn 1 api thì error sẽ trả về nhiều lần, làm cho refresh nhiều lần
             * kiểm tra xem đã refresh trước đó hay chưa để chặn việc này
             * Nếu true thì tiếp tục giữa nguyên và chạy tiếp
             * nếu false thì refreshToken và set lại false sau khi hoàn thành để dùng cho những lần sau
             */

            this.refreshTokenRquest = this.refreshTokenRquest
              ? this.refreshTokenRquest
              : this.handleRefreshToken().finally(() =>
                  // Ví dụ : có purchase và Me cu4ng2 401 thì :
                  // Purchase: 1s - 3s
                  // Me: 2s - 5s
                  // Refresh Token cho purchase: 3s -  4s
                  // Gọi lại Purchase: 4s - 6s
                  // Refresh Token mới cho me: 5s - 6s
                  // Gọi lại Me: 6 => Gọi 2 lần vì purchase xong là set về null rồi
                  //  => Giữ refreshTokenRequest trong 10s cho những request liên kế nếu có 401 thì dùng
                  setTimeout(() => {
                    this.refreshTokenRquest = null
                  }, 10000)
                )
            return this.refreshTokenRquest.then((access_token) =>
              // Khi lỗi và chạy lại thì phải return kết quả chạy lại , không thì các nơi gọi api sẽ không get được dù có respone
              this.instance({ ...config, headers: { ...config.headers, Authorization: access_token } })
            )
          }
          clearLS()
          this.access_token = ''
          this.refresh_token = ''
          toast.error(error.response?.data.data?.message || error.response?.data.message)
        }

        return Promise.reject(error)
      }
    )
  }

  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
        refresh_token: this.refresh_token
      })
      .then((res) => {
        const { access_token } = res.data.data
        setAccessTokenToLS(access_token)
        this.access_token = access_token
        return access_token
      })
      .catch((error) => {
        clearLS()
        this.access_token = ''
        this.refresh_token = ''
        throw error
      })
  }
}

const http = new Http().instance

export default http
