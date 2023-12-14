import { User } from './User.type'
import { SuccessRespone } from './Util.type'

export type AuthResponse = SuccessRespone<{
  access_token: string
  expires: number
  refresh_token: string
  expires_refresh_token: number
  user: User
}>

export type RefreshTokenResponse = SuccessRespone<{
  access_token: string
}>
