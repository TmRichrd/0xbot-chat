<template>
  <div class="chat-library"
    :style="{ backgroundColor: styles.bgColor, color: styles.textColor, borderRadius: styles.borderRadius + 'px', padding: styles.padding + 'px' }">
    <div class="chat-container" ref="chatContainer">
      <div class="chat-container-list">
        <MessageItem :UserAvatar="options.UserAvatar" :AgentAvatar="options.AgentAvatar"
          v-for="(message, index) in messages" :key="index" :self="message.self" :loading="message.loading"
          :loadingText="options.loadingText || 'AI is thinking...'"
          :emptyText="options.emptyText || 'No messages yet'"
          :content="message.content">
          <div v-html="renderMarkdown(message.content)"></div>
        </MessageItem>
        <MessageItem v-if="!messages.length && openingText" :AgentAvatar="options.AgentAvatar" :self="false" :loading="false"
          :content="openingText">
          <div v-html="openingText"></div>
        </MessageItem>
      </div>
    </div>
    <div class="chat-bar">
      <svg @click="handleTrashConversation" class="chat-bar-trash" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
      </svg>
      <input class="chat-bar-input" :disabled="loading" placeholder="Ask anything..." v-model="inputMessage"
        @keyup.enter="sendMessage" />
      <button class="chat-bar-send" :disabled="loading"
        :style="{ borderColor: styles.primary, color: styles.primary, '--primary-color': styles.primary }"
        @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject, onMounted, nextTick } from 'vue'
import type { ChatMessage, PluginOptions } from '../types'
import type { Agent, authProps, conversationHistoryProps, StramProps } from "../api/types"
import MessageItem from "./MessageItem.vue"
import { renderMarkdown } from "../utils/markdown-plugin"
import { useStorage } from '../composables/useStorage'
import { app_conversation_history, app_upsert_conversation, sdk_sdk_get_token, app_delete_one_conversation_history } from '../api'
import { baseURL } from '../utils/request'
import { useEventStream } from '../composables/useEventSource'
import { transformDataArray } from "../utils"
import 'highlight.js/styles/github-dark.css';
import FingerprintJS from '@fingerprintjs/fingerprintjs'

export default defineComponent({
  name: 'ChatLibrary',
  components: {
    MessageItem
  },
  setup() {
    const loading = ref(false)
    const { connect } = useEventStream()
    const { getStorage, setStorage, storageRef } = useStorage()
    const currentAIResponseIndex = ref<number | null>(null);
    const chatContainer = ref<HTMLElement | null>(null)
    const options = inject<PluginOptions>('chat-library-options')
    if (!options?.apiKey) {
      throw new Error('apiKey must be provided via provide/inject')
    }
    const messages = ref<ChatMessage[]>([])
    const inputMessage = ref('')
    const aiLoading = ref(false)
    const openingText = ref('')

    const styles = {
      padding: options.theme?.padding || 20,
      borderRadius: options.theme?.borderRadius || 20,
      bgColor: options.theme?.bgColor || '#151515',
      primary: options.theme?.primary || '#AFAFFE',
      textColor: options.theme?.textColor || '#fff'
    }
    const handleMessage = (message: any) => {
      if (message.type === 'text') {
        if (currentAIResponseIndex.value === null) {
          const lastMessage = messages.value[messages.value.length - 1];
          if (lastMessage && lastMessage.loading) {
            lastMessage.content = message.content;
            lastMessage.loading = false;
            currentAIResponseIndex.value = messages.value.length - 1;
            aiLoading.value = false;
          }
        } else {
          const currentIndex = currentAIResponseIndex.value;
          if (currentIndex !== null && currentIndex < messages.value.length) {
            const currentMessage = messages.value[currentIndex];
            if (currentMessage.loading) {
              currentMessage.loading = false;
              aiLoading.value = false;
            }
            currentMessage.content += message.content;
          }
        }
        scrollToBottom();
      } else if (message.type === 'complete') {
        if (currentAIResponseIndex.value !== null) {
          messages.value[currentAIResponseIndex.value].loading = false;
        }
        currentAIResponseIndex.value = null;
        loading.value = false;
        aiLoading.value = false;
      }
    }
    const sendMessage = async () => {
      if (!inputMessage.value.trim()) return
      
      loading.value = true;
      aiLoading.value = true;
      currentAIResponseIndex.value = null;
      
      messages.value.push({
        self: true,
        content: inputMessage.value,
        loading: false
      });

      messages.value.push({
        self: false,
        content: '',
        loading: true
      });
      currentAIResponseIndex.value = messages.value.length - 1;

      scrollToBottom();
      
      const conversation = await getStorage<string>('conversation');
      const agent = await getStorage<Agent>('agent');
      const body: StramProps = {
        q: inputMessage.value,
        app_id: agent?.app_id || '',
        conversation_id: conversation || '',
        is_debug: false,
        medias: [],
      };
      inputMessage.value = '';
      
      try {
        await connect(body, `${baseURL}/app/stream_chat`, handleMessage);
      } catch (error) {
        console.error('Error sending message:', error);
        if (currentAIResponseIndex.value !== null) {
          messages.value[currentAIResponseIndex.value].loading = false;
        }
        currentAIResponseIndex.value = null;
        aiLoading.value = false;
      } finally {
        loading.value = false;
      }
    }

    const scrollToBottom = () => {
      nextTick(() => {
        if (chatContainer.value) {
          chatContainer.value.scrollTop = chatContainer.value.scrollHeight
        }
      })
    }
    const handleLogin = async (visitorId: string) => {
      const params: authProps = {
        api_key: options.apiKey,
        unique_id: visitorId
      }
      const res = await sdk_sdk_get_token(params)
      if (res.code == 0) {
        storageRef('auth', res.data.auth)
        storageRef('agent', res.data.agent)
        handleSetConversation(res.data.agent)
      }
    }
    const handleTrashConversation = async () => {
      const conversation = await getStorage<string>('conversation')
      if (conversation) {
        const res = await app_delete_one_conversation_history(conversation)
        if (res.code == 0) {
          messages.value = []
        }
      }
    }
    const handleFetchConversationList = async (conversation: string) => {
      const agent = await getStorage<Agent>('agent')
      const params: conversationHistoryProps = {
        page: 1,
        pagesize: 2000000,
        app_id: agent?.app_id || '',
        conversation_id: conversation || ''
      }
      const res = await app_conversation_history(params)
      if (res.code == 0) {
        messages.value = transformDataArray(res.data.list).reverse()
        if (!messages.value.length && agent?.opening_text) {
          openingText.value = agent.opening_text
        }
        nextTick(() => {
          scrollToBottom()
        })
      }
    }
    const handleSetConversation = async (agent: Agent) => {
      const conversation = await getStorage<string>('conversation')

      if (!conversation) {
        const params = {
          id: '',
          app_id: agent?.app_id || '',
          name: "Unnamed"
        }
        const res = await app_upsert_conversation(params)
        if (res.code == 0) {
          await setStorage('conversation', res.data.id || '')
          handleFetchConversationList(res.data.id || '')
        }
      } else {
        handleFetchConversationList(conversation)
      }
    }

    onMounted(() => {
      scrollToBottom()
      if (options.apiKey) {
        FingerprintJS.load()
          .then((fp) => fp.get())
          .then(async (result) => {
            const visitorId = result.visitorId
            await setStorage('visitorId', visitorId)
            handleLogin(visitorId)
          })
      }
    })

    return {
      inputMessage,
      messages,
      styles,
      renderMarkdown,
      sendMessage,
      chatContainer,
      options,
      loading,
      aiLoading,
      handleTrashConversation,
      openingText
    }
  },
})
</script>

<style scoped>
/* 原有样式保持不变 */
.chat-library {
  box-sizing: border-box;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
}

.chat-bar {
  display: flex;
  align-items: center;
  gap: 16px;
}

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

.chat-bar-send:hover {
  background-color: var(--primary-color);
  color: white !important;
}

.chat-container {
  flex: 1;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.chat-container::-webkit-scrollbar {
  display: none;
}

.chat-container-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chat-bar-trash {
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  color: #fff;
  cursor: pointer;
}
</style>