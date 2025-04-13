export interface ChatMessage {
  self: boolean
  content: string
}

export interface PluginOptions {
  apiKey: string
  theme?: {
    padding: number // 边距
    borderRadius: number // 圆角
    textColor: string // 文字颜色
    bgColor: string // 背景色
    primary?: string //主题色
  }
  AgentAvatar: string // agent头像
  UserAvatar: string // 用户头像
}
