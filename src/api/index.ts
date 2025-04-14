import { post } from '../utils/request'
import {
  loginWithDeviceProps,
  conversationHistoryProps,
  authProps,
  AuthDataRes,
  upsertConversationProps,
} from './types'

export const login_with_device = (data: loginWithDeviceProps) => {
  return post<AuthDataRes>('/auth/login_with_device', data)
}
export const sdk_sdk_get_token = (data: authProps) => {
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
