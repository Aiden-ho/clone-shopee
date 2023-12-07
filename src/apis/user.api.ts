import { User } from 'src/types/User.type'
import { SuccessRespone } from 'src/types/Util.type'
import http from 'src/utils/http'

interface bodyUpdateUser extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  new_password?: string
}

const UserAPi = {
  getProfile: () => {
    return http.get<SuccessRespone<User>>('/me')
  },
  uploadProfile: (body: bodyUpdateUser) => {
    return http.put<SuccessRespone<User>>('/user', body)
  },
  uploadAvatar: (file: FormData) => {
    return http.post<SuccessRespone<string>>('/user/upload-avatar', file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default UserAPi
