# 0xBot Chat Library

A Vue 3 chat component library with API key support.

## Installation

```bash
npm install @0xbot/chat
```

## Usage

### Global Installation

```javascript
import { createApp } from 'vue'
import ChatLibrary from '@0xbot/chat'
import "@0xbot/chat/dist/style.css"
import Avatar from "your-avatar-address"
const app = createApp(App)

app.use(ChatLibrary, {
  apiKey: 'your-api-key-here', // required
  serverUrl: 'http://localhost:3000', // not required
  AgentAvatar: 'https://example.com/agent-avatar.png', // required or local image
  UserAvatar: Avatar // required
})

app.mount('#app')
```
```css

/* 外部容器盒子 */
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

/* 发送按钮hover */
.chat-bar-send:hover {
  background-color: var(--primary-color);
  color: white !important;
}

/* 聊天框不包含底部栏 */
.chat-container {
  flex: 1;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

/* 滚动条隐藏 */
.chat-container::-webkit-scrollbar {
  display: none;
}

/* 聊天框列表 */
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
/*  */
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
/* 气泡背景 */
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
```

### In your components

```vue
<template>
  <ChatLibrary />
</template>
```

## Options

| Option      | Type   | Required | Default | Description                     |
|-------------|--------|----------|---------|---------------------------------|
| apiKey      | string | Yes      | -       | Your API key for the chat service |
| AgentAvatar | string | Yes      | null     | The avatar of the agent            |
| UserAvatar | string | Yes      | null     | The avatar of the user            |
| serverUrl | string | No      |      | The server url of the chat service |
## License

MIT