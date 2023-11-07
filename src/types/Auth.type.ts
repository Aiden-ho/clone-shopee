import { User } from './User.type'
import { SuccessRespone } from './Util.type'

export type AuthResponse = SuccessRespone<{
  access_token: string
  expires: string
  user: User
}>
