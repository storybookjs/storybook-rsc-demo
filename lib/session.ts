import { sign, unsign } from 'cookie-signature-edge'
import { cookies } from 'next/headers'

export const userCookieKey = '_un'
export const cookieSep = '^)&_*($'

const password = process.env.SESSION_KEY || 'session-key'

const pwUtf8 = encode(password)

function encode(value: string) {
  return new TextEncoder().encode(value)
}

// Encrypt
export function createEncrypt() {
  return async function (data: string) {
    return sign(data, pwUtf8.toString())
  }
}

export async function decrypt(data: string) {
  const decrypted = unsign(data, pwUtf8.toString())
  if (decrypted) return decrypted
  throw new Error('Invalid signature')
}

export function getSession(userCookie = '') {
  const none = [null, null] as const
  const value = decodeURIComponent(userCookie)
  if (!value) return none
  const index = value.indexOf(cookieSep)
  if (index === -1) return none
  const user = value.slice(0, index)
  const session = value.slice(index + cookieSep.length, value.indexOf(';'))
  return [user, session]
}

export async function getUser(userCookie?: string) {
  const [user, encryptedUser] = getSession(userCookie)
  if (user && encryptedUser) {
    try {
      const decryptedUser = await decrypt(encryptedUser)
      if (decryptedUser === user) {
        return user
      }
      return null
    } catch (e) {
      return null
    }
  }
  return user
}

export async function createUserCookie(token: string) {
  const encrypt = createEncrypt()
  return `${token}${cookieSep}${await encrypt(token)}`
}

export function getUserFromSession() {
  const cookieStore = cookies()
  const userCookie = cookieStore.get(userCookieKey)
  return getUser(userCookie?.value)
}
