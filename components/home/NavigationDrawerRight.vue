<template>
    <div v-if="user" class="d-flex flex-column" style="position: sticky;top: 6.7%">
        <v-card class="rounded-lg border py-10" flat  width="280">
            <div class="d-flex justify-center h-100 align-center flex-column">
                <avatar :user="user" size="100" class="bg-white border mb-3">
                </avatar>
                <div class="d-flex flex-column align-center w-100 px-5">
                    <h4 class="text-center">{{user.name}}</h4>
                    <h6 class="text-center font-weight-regular mb-4">{{user.email}}</h6>
                    <div class="mb-5 w-100 px-5">
                        <v-progress-linear class="rounded-lg" height="7" :model-value="95" color="primary"></v-progress-linear>
                        <p class="text-caption font-weight-bold mt-1 text-center">
                            <v-icon size="15">mdi-medal</v-icon>
                            Your profile completion is 10%
                        </p>
                    </div>
                    <v-btn class="text-capitalize" rounded="lg" variant="flat" color="primary" @click="$router.push({name: 'alumni-alumni', params: {alumni: user.email}})">Complete profile</v-btn>
                </div>
            </div>
        </v-card>
        <v-card class="rounded-lg border my-5" flat>
             <v-list class="bg-transparent mb-5 mt-2 pa-0">
                <v-list-item variant="text" color="primary" class="text-subtitle-2 font-weight-bold " @click="$router.push({name: 'network-connections'})" prepend-icon="mdi-connection">
                    Connections
                </v-list-item>
                <v-list-item variant="text" @click="$router.push({name: 'network-connection-requests'})" class="text-subtitle-2 font-weight-bold" prepend-icon="mdi-human-greeting-proximity">
                    Connection Request
                </v-list-item>
                <v-list-item variant="text" @click="$router.push({name: 'network-batchmates'})" class="text-subtitle-2 font-weight-bold" prepend-icon="mdi-school">
                    Your Batchmates
                </v-list-item>
                <v-list-item variant="text" @click="" class="text-subtitle-2 font-weight-bold" prepend-icon="mdi-bookmark">
                    Saved
                </v-list-item>
                <v-list-item variant="text" @click="" class="text-subtitle-2 font-weight-bold" prepend-icon="mdi-history">
                    Recently
                </v-list-item>
            </v-list>
        </v-card>
        <!-- <v-list class="bg-transparent mb-5 mt-2 pa-0">
            <v-list-item variant="text" @click="" color="primary" class="text-subtitle-2 font-weight-bold rounded-lg mb-2 " prepend-icon="mdi-post-outline">
                Feeds
            </v-list-item>
            <v-list-item variant="text" @click="" class="text-subtitle-2 font-weight-bold rounded-lg mb-2" prepend-icon="mdi-history">
                Recents
            </v-list-item>
            <v-list-item variant="text" @click="" class="text-subtitle-2 font-weight-bold rounded-lg mb-2" prepend-icon="mdi-school">
                Batchmates
            </v-list-item>
            <v-list-item variant="text" @click="" class="text-subtitle-2 font-weight-bold rounded-lg mb-2" prepend-icon="mdi-bookmark">
                Saved
            </v-list-item>
            <v-list-item variant="text" @click="" class="text-subtitle-2 font-weight-bold rounded-lg mb-2" prepend-icon="mdi-chat">
                Messages
            </v-list-item>
            <v-list-item variant="text" @click="" class="text-subtitle-2 font-weight-bold rounded-lg mb-2" prepend-icon="mdi-bell">
                Notifications
            </v-list-item>
            <v-list-item variant="text" @click="" class="text-subtitle-2 font-weight-bold rounded-lg mb-2" prepend-icon="mdi-domain">
                Department
            </v-list-item>
        </v-list> -->
        <!-- <v-card flat class="rounded-lg align-center pa-2 py-0 mb-1 d-flex" variant="text" 
            @click="$router.push({ name: 'alumni-alumni', params: { alumni: user.email } })">
            <avatar :user="user" size="44" class="bg-white border">
            </avatar>
            <v-list class="px-0 bg-transparent">
                <v-list-item class="text-subtitle-2 font-weight-bold">
                    <v-list-item-title class="font-weight-bold">{{ user.name }}</v-list-item-title>
                    <v-list-item-subtitle class="font-weight-bold">View Profile</v-list-item-subtitle>
                </v-list-item>
            </v-list>
        </v-card> -->
        <!-- <v-list class="bg-transparent mb-5 mt-2 pa-0">
            <v-list-item variant="text" @click="" color="primary" class="text-subtitle-2 font-weight-bold rounded-lg mb-2 " prepend-icon="mdi-post-outline">
                Feeds
            </v-list-item>
            <v-list-item variant="text" @click="" class="text-subtitle-2 font-weight-bold rounded-lg mb-2" prepend-icon="mdi-history">
                Recents
            </v-list-item>
            <v-list-item variant="text" @click="" class="text-subtitle-2 font-weight-bold rounded-lg mb-2" prepend-icon="mdi-school">
                Batchmates
            </v-list-item>
            <v-list-item variant="text" @click="" class="text-subtitle-2 font-weight-bold rounded-lg mb-2" prepend-icon="mdi-bookmark">
                Saved
            </v-list-item>
            <v-list-item variant="text" @click="" class="text-subtitle-2 font-weight-bold rounded-lg mb-2" prepend-icon="mdi-chat">
                Messages
            </v-list-item>
            <v-list-item variant="text" @click="" class="text-subtitle-2 font-weight-bold rounded-lg mb-2" prepend-icon="mdi-bell">
                Notifications
            </v-list-item>
            <v-list-item variant="text" @click="" class="text-subtitle-2 font-weight-bold rounded-lg mb-2" prepend-icon="mdi-domain">
                Department
            </v-list-item>
        </v-list>
        <v-spacer></v-spacer> -->
       <span class="text-caption">Privacy  · Terms · Arellano Connect © 2024</span>
    </div>
</template>

<script setup lang="ts">
const $auth = useAuthStore();
const { user } = storeToRefs($auth);

</script>

<style scoped></style>