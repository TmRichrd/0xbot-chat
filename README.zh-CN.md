# 0xBot 聊天组件库

一个支持 API 密钥的 Vue 3 聊天组件库。

## 语言

- [English](https://github.com/TmRichrd/0xbot-chat/blob/main/README.md)
- [中文](https://github.com/TmRichrd/0xbot-chat/blob/main/README.zh-CN.md)

## 安装

```bash
npm install @0xbot/chat
```

## 使用方法

### 全局安装

```javascript
import { createApp } from 'vue'
import ChatLibrary from '@0xbot/chat'
import "@0xbot/chat/dist/style.css"
import Avatar from "your-avatar-address"
const app = createApp(App)

app.use(ChatLibrary, {
  apiKey: 'your-api-key-here', // 必填
  serverUrl: 'http://localhost:3000', // 选填
  AgentAvatar: 'https://example.com/agent-avatar.png', // 必填，可以是本地图片
  UserAvatar: Avatar, // 必填
  loadingText: 'AI is thinking...', // 选填，自定义加载文本
  emptyText: 'No messages yet' // 选填，自定义空消息文本
})

app.mount('#app')
```

## 配置选项

| 选项        | 类型   | 是否必填 | 默认值  | 描述                     |
|-------------|--------|----------|---------|--------------------------|
| apiKey      | string | 是       | -       | 聊天服务的 API 密钥      |
| AgentAvatar | string | 是       | null    | AI 助手的头像           |
| UserAvatar  | string | 是       | null    | 用户的头像              |
| serverUrl   | string | 否       | -       | 聊天服务的服务器地址     |
| loadingText | string | 否       | 'AI is thinking...' | AI 处理时的自定义文本 |
| emptyText   | string | 否       | 'No messages yet' | 空消息时的自定义文本 |

## 功能特性

- 实时 AI 聊天
- 支持 Markdown 消息
- 可自定义加载状态
- 空消息状态处理
- 响应式设计
- 可自定义主题
- 消息历史管理

## 更新日志

查看 [CHANGELOG.zh-CN.md]([CHANGELOG.zh-CN.md](https://github.com/TmRichrd/0xbot-chat/blob/main/CHANGELOG.zh-CN.md)) 获取完整的更新记录。

## 样式

```css
/* 主容器 */
.chat-library {
  box-sizing: border-box;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
}

/* 底部栏 */
.chat-bar {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* 输入框 */
.chat-bar-input {
  flex: 1;
  height: 44px;
  outline: none;
  border-radius: 99999px;
  border: 1px solid #ccc;
  background-color: transparent;
  color: #fff;
  padding: 0 16px;
  min-width: 0;
}

/* 发送按钮 */
.chat-bar-send {
  flex: none;
  width: auto;
  border: 1px solid;
  height: 48px;
  padding: 0 32px;
  border-radius: 99999px;
  cursor: pointer;
  background-color: transparent;
  transition: all 0.2s ease-in-out;
}

/* 发送按钮悬停效果 */
.chat-bar-send:hover {
  background-color: var(--primary-color);
  color: white !important;
}

/* 聊天容器（不包含底部栏） */
.chat-container {
  flex: 1;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

/* 隐藏滚动条 */
.chat-container::-webkit-scrollbar {
  display: none;
}

/* 聊天消息列表 */
.chat-container-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 消息气泡 */
.message-bubble {
  padding: 12px 16px;
  border-radius: 8px;
  max-width: 90%;
  font-size: 14px;
  word-break: break-all;
  line-height: 24px;
}

@media (min-width: 768px) {
  .message-bubble {
    max-width: 70%;
    font-size: 13px;
  }
}

/* 头像 */
.chat-avatar {
  width: 44px;
  height: 44px;
  max-width:44px;
  max-height:44px;
  min-width: 44px;
  min-height: 44px;
  border-radius: 8px;
}

/* 消息气泡背景 */
.chat-message {
  background-color: rgba(255, 255, 255, 0.1)
}

/* 消息容器 */
.message-container {
  display: flex;
}

/* 删除按钮 */
.chat-bar-trash {
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  color: #fff;
  cursor: pointer;
}

/* 加载状态 */
.message-loading {
  color: #fff;
  font-style: italic;
}

/* 空消息状态 */
.message-empty {
  color: #fff;
  font-style: italic;
  text-align: center;
}
```

## 许可证

MIT