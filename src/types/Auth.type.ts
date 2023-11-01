import { User } from './User.type'
import { ResponseApi } from './Util.type'

export type AuthResponse = ResponseApi<{
  access_token: string
  expires: string
  user: User
}>
