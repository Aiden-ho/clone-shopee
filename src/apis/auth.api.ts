import { AuthResponse } from 'src/types/Auth.type'
import http from 'src/utils/http'

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
