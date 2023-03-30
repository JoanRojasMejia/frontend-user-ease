import { Cookies } from 'react-cookie'
const cookies = new Cookies()

import { CookieTypes } from './CookieTypes'

export const Cookie = {
  // TOKEN
  setToken(token: string) {
    cookies.set(CookieTypes.KEY_TOKEN, token, {
      maxAge: 720,
      sameSite: 'lax',
      secure: true,
      path: '/'
    })
  },

  getToken() {
    return cookies.get(CookieTypes.KEY_TOKEN)
  },

  deleteCookies() {
    cookies.remove(CookieTypes.KEY_TOKEN, { path: '/' })
  }
}
