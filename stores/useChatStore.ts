
export type conversation = {
    "participants": string[],
    "messages": message[]
}

export type message = {
    "sender": string,
    "recipient": string,
    "content": string,
    "timestamp": string
}


export const useChatStore = defineStore('chat', () => {
    const selected = ref<conversation[]>([ ])

    return {selected}
})