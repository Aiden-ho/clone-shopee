import { getBaseURL } from 'src/utils/utilsTest'
import { HttpResponse, http } from 'msw'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { URL_LOGIN, URL_REFRESH_TOKEN } from 'src/apis/auth.api'

export const access_token_10s =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDlmMjY0YjExNDAwODkzZGY2Zjk4ZSIsImVtYWlsIjoiazAzQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMTItMThUMTU6MDU6MTkuOTUwWiIsImlhdCI6MTcwMjkxMTkxOSwiZXhwIjoxNzAyOTExOTI5fQ.KqvS3d2XfbeQ0Ht-9c4wpZAp-dLaBPVEcuhcgRM3qIw'
export const refresh_token_1000day =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDlmMjY0YjExNDAwODkzZGY2Zjk4ZSIsImVtYWlsIjoiazAzQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMTItMThUMTU6MDU6MTkuOTUwWiIsImlhdCI6MTcwMjkxMTkxOSwiZXhwIjoxNzExNTUxOTE5fQ.5ZZWXnfZTUhP-oxk8KZmbxsp7G1pATGqGI9PBuYpqRw'

const access_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDlmMjY0YjExNDAwODkzZGY2Zjk4ZSIsImVtYWlsIjoiazAzQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMTItMjRUMDQ6NTA6MTkuMDc0WiIsImlhdCI6MTcwMzM5MzQxOSwiZXhwIjoxODAzMzkzNDE4fQ.g_cEi40Qaz2NQih5_ue7JAJvlibChbhSDecBDXKxhzw'

const loginRes = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDlmMjY0YjExNDAwODkzZGY2Zjk4ZSIsImVtYWlsIjoiazAzQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMTItMjRUMDQ6NTA6MTkuMDc0WiIsImlhdCI6MTcwMzM5MzQxOSwiZXhwIjoxODAzMzkzNDE4fQ.g_cEi40Qaz2NQih5_ue7JAJvlibChbhSDecBDXKxhzw',
    expires: 99999999,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDlmMjY0YjExNDAwODkzZGY2Zjk4ZSIsImVtYWlsIjoiazAzQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMTItMjRUMDQ6NTA6MTkuMDc0WiIsImlhdCI6MTcwMzM5MzQxOSwiZXhwIjoxNzEyMDMzNDE5fQ.wAWL62ZF8Rit5HcZ8U6_J1oeNXfh_yyfQcnJSdJ_rOI',
    expires_refresh_token: 8640000,
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

const loginRequest = http.post(getBaseURL(URL_LOGIN), () => {
  return HttpResponse.json(loginRes, { status: HttpStatusCode.Ok })
})

const refreshTokenRequest = http.post(getBaseURL(URL_REFRESH_TOKEN), () => {
  return HttpResponse.json(
    {
      message: 'Refresh Token thành công',
      data: {
        access_token
      }
    },
    { status: HttpStatusCode.Ok }
  )
})

const authRequests = [loginRequest, refreshTokenRequest]

export default authRequests
