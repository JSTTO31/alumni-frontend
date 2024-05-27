<template>
     <!-- "id": "1",
    "content": "Hey Alice, how are you doing?",
    "timestamp": "2024-04-27T15:30:00Z",
    "read": true,
    "isReceiver": false -->
    <div class="pa-5 py-1 pb-0" v-if="!message.isReceiver">
        <div class="d-flex align-end justify-end" v-bind="props">
            <div class="d-flex align-center">
                <div class="d-flex w-100 flex-column align-end">
                    <v-card flat class="pa-4 py-3 rounded-lg text-subtitle-2 font-weight-bold" color="primary"
                        style="border-bottom-right-radius: 0px !important;">
                        {{ message.content }}
                    </v-card>
                </div>
            </div>
        </div>
    </div>
    <div class="px-5 py-4" v-else>
        <div class="d-flex align-end" v-bind="props">
            <v-avatar class="border mb-n1" size="35">
                <img class="w-100" :src="'https://source.unsplash.com/random/50x50&person&' + 'alison'" />
            </v-avatar> 
            <div class="d-flex flex-column">
                <span class="text-caption text-grey-darken-2 font-weight-regular mb-1 px-2">{{ user.name }}</span>
                <div class="d-flex align-center">
                    <v-card class="ml-2 pa-4 py-3 rounded-lg text-subtitle-2 font-weight-bold" flat
                        style="border-bottom-left-radius: 0px !important;" variant="tonal">
                        {{ message.content }}
                    </v-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['message', 'user'])

</script>

<style scoped></style>