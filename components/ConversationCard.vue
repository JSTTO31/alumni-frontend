<template>
    <v-card width="300" class="rounded-b-0" :height="minimize ? 49 :400">
        <v-layout class="h-100 w-100">
            <v-app-bar density="compact" flat class="border-b pl-2" @click="minimize = false" color="primary">
                <v-avatar size="35">
                    <nuxt-img :src="'https://source.unsplash.com/random/50x50&person&' + conversation.participants[1]"></nuxt-img>
                </v-avatar>
                <div class="ml-2 d-flex flex-column">
                    <h5 class="font-weight-medium">{{ conversation.participants[1] }}</h5>
                    <span class="text-caption mt-n1">
                        <v-icon color="success" class="ml-n2">mdi-circle-medium</v-icon>online
                    </span>
                </div>
                <v-spacer></v-spacer>
                <v-btn size="small" class="rounded-lg" icon="mdi-minus" @click.stop="minimize = true" v-if="!minimize"></v-btn>
                <v-btn size="small" class="rounded-lg" icon="mdi-close" @click="close"></v-btn>
            </v-app-bar>
            <v-main style="overflow-y: auto;">
                <v-list class="px-3">
                    <v-list-item class="px-0" v-for="message in conversation.messages"
                        :key="conversation.participants[1]">
                        <div class="pa-2" v-if="message.sender == 'me'">
                            <div class="d-flex">
                                <div class="d-flex w-100 flex-column align-end">
                                    <v-card class="mr-2 pa-2 text-caption w-100 text-right" color="primary">
                                        {{ message.content }}
                                    </v-card>
                                    <span
                                        class="text-caption d-flex align-center font-weight-regular mr-2 mt-1 text-grey-darken-1">
                                        <v-icon color="success" size="15" class="mr-2">mdi-check</v-icon>{{ new
                        Date(message.timestamp).toLocaleTimeString() }}
                                    </span>
                                </div>
                                <v-avatar class="border" size="30">
                                    <v-img
                                        src="https://as2.ftcdn.net/v2/jpg/02/44/42/79/1000_F_244427911_aoHHulebtYy4wLpncBBuWqCTNFKolcCB.jpg"></v-img>
                                </v-avatar>
                            </div>
                        </div>
                        <div class="pa-2" v-else>
                            <div class="d-flex">
                                <v-avatar class="border" size="30">
                                    <v-img
                                        :src="'https://source.unsplash.com/random/35x35/?person&' + message.sender"></v-img>
                                </v-avatar>
                                <div class="d-flex flex-column">
                                    <v-card class="ml-2 pa-2 text-caption" color="secondary">
                                        {{ message.content }}
                                    </v-card>
                                    <span class="text-caption font-weight-regualar ml-2 mt-1 text-grey-darken-1">{{
                        new
                                        Date(message.timestamp).toLocaleTimeString() }}</span>
                                </div>
                            </div>
                        </div>
                    </v-list-item>
                </v-list>
            </v-main>
            <v-footer app class="border-t">
                <v-text-field label="write your message here..." single-line hide-details append-inner-icon="mdi-send"
                    density="compact" flat variant="solo-filled" v-model="text" @keyup.enter="send"></v-text-field>
            </v-footer>
        </v-layout>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{conversation: conversation}>()
const {selected} = storeToRefs(useChatStore())
const close = () => {
    selected.value = selected.value.filter(item => item.participants[1] != props.conversation.participants[1])
}
const text = ref('')
const minimize = ref(false)
const send = () => {
    const conversation = selected.value.find(item => item.participants[1] == props.conversation.participants[1])
    conversation?.messages.push(
        {
            "sender": "me",
            "recipient": props.conversation.participants[1],
            "content": text.value,
            "timestamp": new Date().toDateString()
        },
    )

    text.value = ''
}   

watch(() => selected.value.length, (current, old) => {
    if(current > old){
        minimize.value = true

    }
})
</script>

<style scoped></style>