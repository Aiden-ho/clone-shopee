import { AuthResponse } from 'src/types/Auth.type'
import http from 'src/utils/http'

export const registerApi = (body: { email: string; password: string }) => {
  return http.post<AuthResponse>('/register', body)
}

export const loginApi = (body: { email: string; password: string }) => {
  return http.post<AuthResponse>('/login', body)
}
