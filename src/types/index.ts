export interface ChatMessage {
  self: boolean
  content: string
  loading?: boolean
}

export interface PluginOptions {
  apiKey: string
  serverUrl?: string
  UserAvatar?: string
  AgentAvatar?: string
  loadingText?: string
  emptyText?: string
  theme?: {
    padding?: number
    borderRadius?: number
    bgColor?: string
    primary?: string
    textColor?: string
  }
}
