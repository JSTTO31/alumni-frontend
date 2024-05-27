

export const useConversationStore = defineStore('conversation', () => {
    const conversation = ref(useConversation)

    return {conversation}
})