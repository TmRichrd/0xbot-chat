import { App, Plugin } from 'vue'
import { setupCopyHandler } from './utils/copy'
import ChatLibrary from './components/ChatLibrary.vue'
import '@unocss/reset/tailwind.css'
import './assets/styles/globa.css'
import { initRequest } from './utils/request'

export interface PluginOptions {
  apiKey: string
  serverUrl?: string
  styles?: {
    container?: string
    message?: string
    userMessage?: string
    assistantMessage?: string
    input?: string
    button?: string
  }
}
setupCopyHandler()

const ChatLibraryPlugin: Plugin = {
  install(app: App, options: PluginOptions) {
    if (!options?.apiKey) {
      throw new Error('ChatLibrary: apiKey is required')
    }
    if (options.serverUrl) {
      
      initRequest({ serverUrl: options.serverUrl })
    }
    app.provide('chat-library-options', options)
    app.component('ChatLibrary', ChatLibrary)
  },
}
export default ChatLibraryPlugin
export { ChatLibrary }
