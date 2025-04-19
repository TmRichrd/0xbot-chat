import { post } from '../utils/request'
import {
  loginWithDeviceProps,
  conversationHistoryProps,
  authProps,
  AuthDataRes,
  upsertConversationProps,
} from './types'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { useStorage } from '../composables/useStorage'

export const login_with_device = (data: loginWithDeviceProps) => {
  return post<AuthDataRes>('/auth/login_with_device', data)
}

export const sdk_sdk_get_token = (data: authProps) => {
  const { setStorage } = useStorage()
  if (!data.unique_id) {
    FingerprintJS.load()
      .then((fp) => fp.get())
      .then((result) => {
        const visitorId = result.visitorId
        data.unique_id = visitorId
        setStorage('visitorId', visitorId)
      })
  }
  return post('/sdk/sdk_get_token', data)
}

export const app_conversation_history = (data: conversationHistoryProps) => {
  return post('/app/conversation_history', data)
}

export const app_upsert_conversation = (data: upsertConversationProps) => {
  return post('/app/upsert_conversation', data)
}

export const app_delete_one_conversation_history = (id: string) => {
  return post('/app/delete_one_conversation_history', { id })
}
