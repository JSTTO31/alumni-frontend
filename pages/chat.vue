<template>
        <v-main class="h-100">
            <v-container class="h-100 d-flex">
                <v-col cols="4" class="pa-0">
                    <v-list class="bg-transparent pt-3">
                        <v-list-item :active="convo1.id == convo.id" class="pa-4 bg-white rounded-lg mb-2 border" :prepend-avatar="'https://source.unsplash.com/random/50x50&person&' + convo.name" color="primary" v-for="convo, n in conversation" :key="convo.id" :title="convo.name" :subtitle="convo.conversation[convo.conversation.length - 1].content" @click="$router.push({query: {id: convo.id}})"></v-list-item>
                    </v-list>
                </v-col>
                <v-col cols="8" class="pb-0 h-100">
                    <v-card flat class="h-100 rounded-lg border">
                        <v-layout class="h-100 w-100">
                            <v-main id="main" style="overflow: auto;height: 650px;">
                                    <chat-list-item v-for="message, n in convo1.conversation" :message="message" :user="convo1" :key="n"></chat-list-item>
                            </v-main>
                            <v-footer app class="pb-3">
                                <v-text-field label="Enter your message here..." v-model="text" single-line hide-details variant="solo-filled" flat @keyup.enter="sendMessage">
                                    <template #append-inner>
                                        <div class="d-flex text-grey-darken-1" style="gap: 15px">
                                            <v-icon>mdi-emoticon</v-icon>
                                            <v-icon>mdi-image</v-icon>
                                            <v-icon>mdi-paperclip</v-icon>
                                            <v-icon>mdi-send</v-icon>
                                        </div>
                                    </template>
                                </v-text-field>
                            </v-footer>
                        </v-layout>
                    </v-card>
                </v-col>
            </v-container>
        </v-main>
</template>

<script setup>
import { useConversationStore } from '~/stores/useCoversationStore';

useHead({
    title: 'Chat - Tracking System'
})
definePageMeta({
    layout: 'authenticated'
})
const {conversation} = storeToRefs(useConversationStore())
const selected = ref(0)
const convo1 = ref(conversation.value[selected.value])
const text = ref('')

onBeforeRouteUpdate((to, from ,next) => {
    selected.value = parseInt(to.query.id)
    convo1.value = conversation.value.find(item => item.id == selected.value)
    return next()
})


function sendMessage(){
    if(!text.value) return
    convo1.value.conversation.push({
        "id": (Math.random() * 100).toString(),
        "content": text.value,
        "timestamp": new Date().toString(),
        "read": false,
        "isReceiver": false
    })

    text.value = ''

    const main = document.getElementById('main')
    if(main){
        main.scrollTo(0, main.scrollHeight)
    }
}



onMounted(() => {
    const main = document.getElementById('main')
    if(main){
        main.scrollTo(0, main.scrollHeight)
    }
})
</script>

<style scoped>
#variation::-webkit-scrollbar {
    width: 8px;
}

#main::-webkit-scrollbar{
    width: 8px;
}

#main::-webkit-scrollbar-thumb{
    background-color: rgba(182, 182, 182, 0.603);
    border-radius: 25px;
}

#variation:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.162);
    border-radius: 25px;
}
</style>