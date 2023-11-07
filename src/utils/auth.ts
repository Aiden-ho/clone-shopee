import { User } from 'src/types/User.type'

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const getAccessTokenToLS = () => {
  return localStorage.getItem('access_token') || ''
}

export const setProfileToLS = (profile: User) => {
  const stringProfile = JSON.stringify(profile)
  localStorage.setItem('profile', stringProfile)
}

export const getProfileToLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}
