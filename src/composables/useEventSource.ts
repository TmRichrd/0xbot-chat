import { ref, onUnmounted } from 'vue'
import { useStorage } from './useStorage'
import { Auth } from '../api/types'

export const useEventStream = () => {
  const error = ref<Error | null>(null)
  const readerRef = ref<ReadableStreamDefaultReader | null>(null)
  const loading = ref(true)

  const connect = async (
    data: any,
    SERVER_URL: string,
    onMessage: (message: any) => void // 新增回调函数参数
  ): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { getStorage } = useStorage()
        const auth = await getStorage<Auth>('auth')
        const response = await fetch(SERVER_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: auth?.token || '',
          },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`)
        }

        const reader = response.body?.getReader()
        if (!reader) {
          throw new Error('Failed to get response reader')
        }

        readerRef.value = reader
        const decoder = new TextDecoder()
        let buffer = ''

        const readStream = async () => {
          try {
            while (true) {
              const { done, value } = await reader.read()
              if (done) {
                loading.value = false
                resolve() // 流结束时解析Promise
                break
              }

              buffer += decoder.decode(value, { stream: true })

              // 处理可能的多条消息（按换行分割）
              const lines = buffer.split('\n')
              buffer = lines.pop() || '' // 保留未完成的行

              for (const line of lines) {
                try {
                  if (line.startsWith('data:')) {
                    const jsonStr = line.substring(5).trim()
                    if (jsonStr) {
                      const message = JSON.parse(jsonStr)
                      onMessage(message) // 实时回调每个消息
                    }
                  }
                } catch (e) {
                  console.error('Error parsing message:', e)
                  // 继续处理下一条消息
                }
              }
            }
          } catch (e) {
            reject(e)
          }
        }

        readStream()
      } catch (err) {
        error.value = err as Error
        reject(err)
      }
    })
  }

  const close = () => {
    if (readerRef.value) {
      readerRef.value.cancel()
      readerRef.value = null
    }
  }

  onUnmounted(() => {
    close()
  })

  return {
    loading,
    error,
    connect,
    close,
  }
}