export const getToken = (name: string) => {
  const token = window.localStorage.getItem(name)
  if (token) {
    return token
  }
  return null
}

export const setToken = (key: string, token: string) => {
  window.localStorage.setItem(key, token)
}

export const removeToken = (key: string) => {
  window.localStorage.removeItem(key)
}
