import { fn } from '@storybook/test'
import { action } from '@storybook/addon-actions'

const getCookieStore = () => {
  const store = new Map()

  return {
    mockRestore: () => {
      store.clear()
    },

    set: fn((key: string, value: any) => {
      store.set(key, { value })
      action('[cookies] set')({ key, value })
    }).mockName('cookies().set'),

    delete: fn((key: string | string[]) => {
      if (Array.isArray(key)) {
        key.forEach((k) => {
          store.delete(k)
          action('[cookies] delete')(k)
        })
      } else {
        store.delete(key)
        action('[cookies] delete')(key)
      }
    }).mockName('cookies().delete'),

    get: fn((key: string | string[]) => {
      let value
      if (Array.isArray(key)) {
        value = key.reduce(
          (acc, k) => {
            const cookie = store.get(k)
            if (cookie) {
              acc[k] = cookie.value
            }
            return acc
          },
          {} as Record<string, any>,
        )
      } else {
        const cookie = store.get(key)
        value = cookie ? cookie.value : undefined
      }
      action('[cookies] get')({ key, value })
      return value
    }).mockName('cookies().get'),

    getAll: fn(() => {
      const allCookies: Record<string, any> = {}
      store.forEach((value, key) => {
        allCookies[key] = value.value
      })
      action('[cookies] getAll')(allCookies)
      return allCookies
    }).mockName('cookies().getAll'),

    has: fn((key: string) => {
      const exists = store.has(key)
      action('[cookies] has')({ key, value: exists })
      return exists
    }).mockName('cookies().has'),

    size: fn(() => {
      const size = store.size
      action('[cookies] size')({ value: size })
      return size
    }).mockName('cookies().size'),
  }
}

let cookieStore: any

export const cookies = () => {
  if (!cookieStore) {
    cookieStore = getCookieStore()
  }
  return cookieStore
}

const getHeadersStore = () => {
  const store = new Map()

  return {
    mockRestore: () => {
      store.clear()
    },

    set: fn((key: string, value: any) => {
      store.set(key, value)
      action('[headers] set')({ key, value })
    }).mockName('headers().set'),

    entries: fn(() => {
      const entries = Array.from(store.entries())
      action('[headers] entries')(entries)
      return entries
    }).mockName('headers().entries'),

    forEach: fn((callback: (...args: any[]) => void) => {
      store.forEach((value, key) => {
        callback(value, key, store)
      })
    }).mockName('headers().forEach'),

    get: fn((key: string | string[]) => {
      let value
      if (Array.isArray(key)) {
        value = key.reduce(
          (acc, k) => {
            const header = store.get(k)
            if (header) {
              acc[k] = header
            }
            return acc
          },
          {} as Record<string, any>,
        )
      } else {
        value = store.get(key)
      }
      action('[headers] get')({ key, value })
      return value
    }).mockName('headers().get'),

    has: fn((key: string) => {
      const exists = store.has(key)
      action('[headers] has')({ key, value: exists })
      return exists
    }).mockName('headers().has'),

    keys: fn(() => {
      const keys = Array.from(store.keys())
      action('[headers] keys')(keys)
      return keys
    }).mockName('headers().keys'),

    values: fn(() => {
      const values = Array.from(store.values())
      action('[headers] values')(values)
      return values
    }).mockName('headers().values'),
  }
}

let headerStore: any

export const headers = () => {
  if (!headerStore) {
    headerStore = getHeadersStore()
  }
  return headerStore
}
