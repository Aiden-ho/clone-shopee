import { getBaseURL } from 'src/utils/utilsTest'
import { HttpResponse, http } from 'msw'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { URL_PROFILE } from 'src/apis/user.api'
import { access_token_10s } from './Auth.msw'

const profile = {
  message: 'Lấy người dùng thành công',
  data: {
    user: {
      _id: '6549f264b11400893df6f98e',
      roles: ['User'],
      email: 'k03@gmail.com',
      createdAt: '2023-11-07T08:16:36.697Z',
      updatedAt: '2023-11-07T08:16:36.697Z',
      __v: 0
    }
  }
}

const error_401 = {
  message: 'Lỗi',
  data: {
    message: 'Token hết hạn',
    name: 'EXPIRED_TOKEN'
  }
}

const loginRequest = http.get(getBaseURL(URL_PROFILE), ({ request }) => {
  const access_token = request.headers.get('authorization')
  let json: object
  let status: number
  if (access_token === access_token_10s) {
    json = error_401
    status = HttpStatusCode.Unauthorized
  } else {
    json = profile
    status = HttpStatusCode.Ok
  }

  return HttpResponse.json(json, { status })
})

const userRequests = [loginRequest]

export default userRequests
