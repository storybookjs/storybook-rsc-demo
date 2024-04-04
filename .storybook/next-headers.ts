import { fn } from '@storybook/test'
import { action } from '@storybook/addon-actions'

const getCookieStore = () => {
  const store = new Map()

  return {
    mockRestore() {
      store.clear()
    },
    set: fn((key: string, value: any) => {
      store.set(key, { value })
      action('[cookies] set')({ key, value })
    }).mockName('cookies().set'),

    delete(key: string) {
      if (Array.isArray(key)) {
        key.forEach((k) => {
          store.delete(k)
          action('[cookies] delete')(key)
        })
      } else {
        store.delete(key)
        action('[cookies] delete')(key)
      }
    },

    get(key: string) {
      if (Array.isArray(key)) {
        const value = key.reduce((acc, k) => {
          const cookie = store.get(k)
          if (cookie) {
            acc[k] = cookie.value
          }
          return acc
        }, {})

        action('[cookies] get')({ key, value })
        return value
      } else {
        const value = store.get(key)
        action('[cookies] get')({ key, value })
        return value
      }
    },

    getAll() {
      const allCookies = {}
      store.forEach((value, key) => {
        allCookies[key] = value.value
      })
      action('[cookies] getAll')(allCookies)
      return allCookies
    },

    has(key: string) {
      const value = store.has(key)
      action('[cookies] has')({ key, value })
      return value
    },

    get size() {
      const value = store.size
      action('[cookies] size')({ value })
      return value
    },
  }
}

let store: any

export const cookies = () => {
  if (store) {
    return store
  }
  store = getCookieStore()

  return store
}
