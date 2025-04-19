# 0xBot Chat Library

A Vue 3 chat component library with API key support.

## Language

- [README.md](https://github.com/TmRichrd/0xbot-chat/blob/main/README.md)
- [README.zh-CN.md](https://github.com/TmRichrd/0xbot-chat/blob/main/README.zh-CN.md)

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
  UserAvatar: Avatar, // required
  loadingText: 'AI is thinking...', // optional, customize loading text
  emptyText: 'No messages yet' // optional, customize empty message text
})

app.mount('#app')
```

## Options

| Option      | Type   | Required | Default | Description                     |
|-------------|--------|----------|---------|---------------------------------|
| apiKey      | string | Yes      | -       | Your API key for the chat service |
| AgentAvatar | string | Yes      | null    | The avatar of the agent         |
| UserAvatar  | string | Yes      | null    | The avatar of the user          |
| serverUrl   | string | No       | -       | The server url of the chat service |
| loadingText | string | No       | 'AI is thinking...' | Custom text to show when AI is processing |
| emptyText   | string | No       | 'No messages yet' | Custom text to show when there are no messages |

## Features

- Real-time chat with AI
- Markdown support for messages
- Customizable loading states
- Empty state handling
- Responsive design
- Customizable themes
- Message history management

## Changelog

See [CHANGELOG.md](https://github.com/TmRichrd/0xbot-chat/blob/main/README.md) for the complete list of changes.

## Styling

```css
/* Main container */
.chat-library {
  box-sizing: border-box;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
}

/* Bottom bar */
.chat-bar {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Input field */
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

/* Send button */
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

/* Send button hover */
.chat-bar-send:hover {
  background-color: var(--primary-color);
  color: white !important;
}

/* Chat container (excluding bottom bar) */
.chat-container {
  flex: 1;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

/* Hide scrollbar */
.chat-container::-webkit-scrollbar {
  display: none;
}

/* Chat message list */
.chat-container-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Message bubble */
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

/* Avatar */
.chat-avatar {
  width: 44px;
  height: 44px;
  max-width:44px;
  max-height:44px;
  min-width: 44px;
  min-height: 44px;
  border-radius: 8px;
}

/* Message bubble background */
.chat-message {
  background-color: rgba(255, 255, 255, 0.1)
}

/* Message container */
.message-container {
  display: flex;
}

/* Delete button */
.chat-bar-trash {
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  color: #fff;
  cursor: pointer;
}

/* Loading state */
.message-loading {
  color: #fff;
  font-style: italic;
}

/* Empty message state */
.message-empty {
  color: #fff;
  font-style: italic;
  text-align: center;
}
```

## License

MIT