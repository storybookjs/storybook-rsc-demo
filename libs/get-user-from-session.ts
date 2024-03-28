import { cookies } from 'next/headers'
import { getUser, userCookieKey } from '#libs/session'

export function getUserFromSession() {
  const cookieStore = cookies()
  const userCookie = cookieStore.get(userCookieKey)
  return getUser(userCookie?.value)
}
