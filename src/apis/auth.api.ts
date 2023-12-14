import { AuthResponse } from 'src/types/Auth.type'
import http from 'src/utils/http'

export const URL_LOGIN = '/login'
export const URL_REGISTER = '/register'
export const URL_LOGOUT = '/logout'
export const URL_REFRESH_TOKEN = '/refresh-access-token'

const AuthApi = {
  registerApi: (body: { email: string; password: string }) => {
    return http.post<AuthResponse>('/register', body)
  },
  loginApi: (body: { email: string; password: string }) => {
    return http.post<AuthResponse>('/login', body)
  },
  logoutApi: () => {
    return http.post<AuthResponse>('/logout')
  }
}

export default AuthApi
