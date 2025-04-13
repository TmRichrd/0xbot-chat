import { ref, watchEffect } from 'vue'

interface UseCookiesOptions {
  prefix?: string // 添加前缀配置选项
}

export function useCookies(options: UseCookiesOptions = {}) {
  const { prefix = '0xbot-chat' } = options

  // 为键名添加前缀
  const prefixKey = (key: string): string => {
    return prefix ? `${prefix}_${key}` : key
  }

  const getCookie = (name: string): string | null => {
    const prefixedName = prefixKey(name)
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${prefixedName}=`)
    if (parts.length === 2) return decodeURIComponent(parts.pop()!.split(';').shift()!)
    return null
  }

  const setCookie = (name: string, value: string): void => {
    const prefixedName = prefixKey(name)
    const date = new Date()
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000)
    document.cookie = `${encodeURIComponent(prefixedName)}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/`
  }

  const removeCookie = (name: string): void => {
    const prefixedName = prefixKey(name)
    document.cookie = `${encodeURIComponent(prefixedName)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
  }

  const setCache = <T>(key: string, value: T): void => {
    setCookie(key, JSON.stringify(value))
  }

  const getCache = <T>(key: string): T | null => {
    const value = getCookie(key)
    return value ? JSON.parse(value) : null
  }

  const cachedRef = <T>(key: string, defaultValue: T) => {
    const value = ref<T>(defaultValue)
    
    const cached = getCache<T>(key)
    if (cached !== null) {
      value.value = cached
    }

    watchEffect(() => {
      setCache(key, value.value)
    })

    return value
  }

  return {
    getCache,
    setCache,
    removeCookie,
    cachedRef
  }
}