export interface loginWithDeviceProps {
  device_id: string
  location: string
}

export interface conversationHistoryProps {
  page: number
  pagesize: number
  app_id: string
  conversation_id: string
}

export interface authProps {
  api_key: string
  unique_id: string
}
export interface AuthDataRes {
  auth: Auth
  agent: Agent
}

export interface Agent {
  id: string
  name: string
  description: string
  nickname: string
  icon: string
  user_pay_bill: boolean
  conversation_id: string
  app_id: string
  agent_type: string
  visibility: number
  category: string
  base_url: string
  api_key: string
  twitter_cookie: string
  twitter_username: string
  shortcuts: any[]
  user_prompt: string
  opening_text: string
  role_user_id: string
}

export interface Auth {
  token: string
  user_id: string
  invite_code: string
  invite_link: string
  parent_user_id: string
  avatar: string
  phone: string
  email: string
  is_agent: boolean
  name: string
}
export interface upsertConversationProps {
  id: string
  app_id: string
  name: string
}

export interface StramProps {
  q: string
  app_id: string
  conversation_id: string
  is_debug: boolean
  medias: any[]
  tool?: Tool
  knowledge?: Knowledge
}

export interface Knowledge {
  id: string
  type: string
  q: string
}

export interface Tool {
  id: string
  params: Params
  json: Params
}

export interface Params {}
