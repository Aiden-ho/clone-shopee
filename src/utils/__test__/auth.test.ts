import { describe, it, expect } from 'vitest'
import {
  clearLS,
  getAccessTokenToLS,
  getProfileToLS,
  getRefreshTokenToLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from '../auth'

// Do làm đúng logic thì rất cầu kì nên sẽ làm theo cách đơn giản hơn là set và get nếu được thì chứng tỏ func ok

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDFmZTg0YjExNDAwODkzZGY2ZjYxZCIsImVtYWlsIjoiazAxQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMTItMTVUMTY6NDE6MjMuNTk5WiIsImlhdCI6MTcwMjY1ODQ4MywiZXhwIjoxNzAyNzQ0ODgzfQ.Grgj5RPtHVG22J0muIecObv5w3UP67XvqPkiYOV0qWU'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDFmZTg0YjExNDAwODkzZGY2ZjYxZCIsImVtYWlsIjoiazAxQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMTItMTVUMTY6NDE6MjMuNTk5WiIsImlhdCI6MTcwMjY1ODQ4MywiZXhwIjoxNzE2NDgyNDgzfQ.mP6He-Q7wOS0NwWlzdYtJpZyWjla1QlMCjPW98-TnFc'

const profile =
  '{"_id":"6541fe84b11400893df6f61d","roles":["User"],"email":"k01@gmail.com","createdAt":"2023-11-01T07:30:12.736Z","updatedAt":"2023-12-14T15:25:27.229Z","__v":0,"address":"Việt Nam","name":"Kiet Ho ","phone":"04511414","avatar":"ac06ed5b-374d-457f-b7a4-bd970a70893e.jpg","date_of_birth":"1995-06-16T17:00:00.000Z"}'

describe('access_token', () => {
  it('access_token được set vào localstorage', () => {
    setAccessTokenToLS(access_token)
    expect(getAccessTokenToLS()).toBe(access_token)
  })
})

describe('refresh_token', () => {
  it('refresh_token được set vào localstorage', () => {
    setRefreshTokenToLS(refresh_token)
    expect(getRefreshTokenToLS()).toBe(refresh_token)
  })
})

describe('profile', () => {
  it('profile được set vào localstorage', () => {
    const json_profile = JSON.parse(profile)
    setProfileToLS(json_profile)
    expect(getProfileToLS()).toEqual(json_profile)
  })
})

describe('clear localStorage', () => {
  it('refresh_token được set vào localstorage', () => {
    setAccessTokenToLS(access_token)
    setRefreshTokenToLS(refresh_token)
    const json_profile = JSON.parse(profile)
    setProfileToLS(json_profile)
    clearLS()
    expect(getAccessTokenToLS()).toBe('')
    expect(getRefreshTokenToLS()).toBe('')
    expect(getProfileToLS()).toBe(null)
  })
})
