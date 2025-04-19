<template>
  <div class="message-container message-spacing-small message-spacing-medium" :class="{
    'message-align-left': !self,
    'message-align-right': self
  }">
    <img v-if="!self" :src="AgentAvatar" class="chat-avatar" />
    <div class="message-bubble" :class="self ? 'chat-message' : ''">
      <div v-if="!content && !loading" class="message-empty">
        {{ emptyText }}
      </div>
      <slot v-else />
      <div v-if="loading" class="message-loading">
        {{ loadingText }}
      </div>
    </div>
    <img v-if="self" :src="UserAvatar" class="chat-avatar" />
  </div>
</template>

<script setup>
const props = defineProps({
  avatar: String,
  self: {
    type: Boolean,
    default: false,
  },
  UserAvatar: {
    type: String,
    default: ''
  },
  AgentAvatar: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: 'AI is thinking...'
  },
  emptyText: {
    type: String,
    default: 'No messages yet'
  },
  content: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>
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

.chat-avatar {
  width: 44px;
  height: 44px;
  max-width:44px;
  max-height:44px;
  min-width: 44px;
  min-height: 44px;
  border-radius: 8px;
}

.chat-message {
  background-color: rgba(255, 255, 255, 0.1)
}

.message-container {
  display: flex;
}

.message-spacing-small {
  gap: 0.5rem;
}

.message-spacing-medium {
  gap: 1rem;
}

.message-align-left {
  justify-content: flex-start;
}

.message-align-right {
  justify-content: flex-end;
}

.message-loading {
  color: #fff;
  font-style: italic;
}

.message-empty {
  color: #fff;
  font-style: italic;
  text-align: center;
}
</style>