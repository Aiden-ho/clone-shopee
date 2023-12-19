import { describe, it, expect, beforeEach } from 'vitest'
import { Http } from '../http'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { setAccessTokenToLS, setRefreshTokenToLS } from '../auth'

// Như đã nói thì test nên sử dụng độp lập tài nguyên
// Nên nếu được thì nên có account mới để test
// tạo instance HTTP mới thay vì dùng http

describe('axios', () => {
  let http = new Http().instance
  beforeEach(() => {
    localStorage.clear()
    http = new Http().instance
  })
  const access_token_10s =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDlmMjY0YjExNDAwODkzZGY2Zjk4ZSIsImVtYWlsIjoiazAzQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMTItMThUMTU6MDU6MTkuOTUwWiIsImlhdCI6MTcwMjkxMTkxOSwiZXhwIjoxNzAyOTExOTI5fQ.KqvS3d2XfbeQ0Ht-9c4wpZAp-dLaBPVEcuhcgRM3qIw'
  const refresh_token_1000day =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDlmMjY0YjExNDAwODkzZGY2Zjk4ZSIsImVtYWlsIjoiazAzQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMTItMThUMTU6MDU6MTkuOTUwWiIsImlhdCI6MTcwMjkxMTkxOSwiZXhwIjoxNzExNTUxOTE5fQ.5ZZWXnfZTUhP-oxk8KZmbxsp7G1pATGqGI9PBuYpqRw'

  it('get api', async () => {
    const res = await http.get('/products')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('Auth request', async () => {
    //Test xem acccess_token có được lấy ko
    await http.post('/login', {
      email: 'k03@gmail.com',
      password: '123123'
    })
    const res = await http.get('/me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('refresh token', async () => {
    setAccessTokenToLS(access_token_10s)
    setRefreshTokenToLS(refresh_token_1000day)
    const http_new = new Http().instance
    const res = await http_new.get('/me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
