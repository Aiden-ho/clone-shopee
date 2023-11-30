import { User } from 'src/types/User.type'

// API dùng để tạo 1 event target object
export const localStorageEvenTarget = new EventTarget()

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
  // Tạo event mới, với type là string dùng để định danh
  const eventClearLS = new Event('clearLS')
  // Sau đó dispath event mới tạo bằng event target object.
  // Khi gọi đến func xóa localstorage thì đồng thời event này sẽ được gọi, để nơi khác có thể lắng nghe và đồng bộ hành động
  localStorageEvenTarget.dispatchEvent(eventClearLS)
}
