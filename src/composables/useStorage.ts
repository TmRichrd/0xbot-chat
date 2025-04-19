import localforage from 'localforage'
import { ref, watchEffect } from 'vue'

interface UseStorageOptions {
  prefix?: string
}

export function useStorage(options: UseStorageOptions = {}) {
  const { prefix = '0xbot-chat' } = options

  // 为键名添加前缀
  const prefixKey = (key: string): string => {
    return prefix ? `${prefix}_${key}` : key
  }

  // 初始化 localforage
  const store = localforage.createInstance({
    name: prefix,
    storeName: prefix,
    driver: [
      localforage.INDEXEDDB,
      localforage.LOCALSTORAGE,
      localforage.WEBSQL
    ]
  })

  const getStorage = async <T>(key: string): Promise<T | null> => {
    try {
      const prefixedKey = prefixKey(key)
      const value = await store.getItem(prefixedKey)
      if (value === null) return null
      
      // 尝试解析 JSON 字符串
      try {
        return JSON.parse(value as string) as T
      } catch {
        // 如果不是 JSON 字符串，直接返回原始值
        return value as T
      }
    } catch (error) {
      console.error('Error getting value from storage:', error)
      return null
    }
  }

  const setStorage = async <T>(key: string, value: T): Promise<void> => {
    try {
      const prefixedKey = prefixKey(key)
      // 将值转换为字符串存储
      const valueToStore = typeof value === 'string' ? value : JSON.stringify(value)
      await store.setItem(prefixedKey, valueToStore)
    } catch (error) {
      console.error('Error setting value in storage:', error)
    }
  }

  const removeStorage = async (key: string): Promise<void> => {
    try {
      const prefixedKey = prefixKey(key)
      await store.removeItem(prefixedKey)
    } catch (error) {
      console.error('Error removing value from storage:', error)
    }
  }

  const clearStorage = async (): Promise<void> => {
    try {
      await store.clear()
    } catch (error) {
      console.error('Error clearing storage:', error)
    }
  }

  const storageRef = <T>(key: string, defaultValue: T) => {
    const value = ref<T>(defaultValue)
    
    // 初始化时从存储中读取值
    getStorage<T>(key).then(cached => {
      if (cached !== null) {
        value.value = cached
      }
    })

    // 监听值的变化并保存到存储中
    watchEffect(() => {
      setStorage(key, value.value)
    })

    return value
  }

  return {
    getStorage,
    setStorage,
    removeStorage,
    clearStorage,
    storageRef
  }
} 