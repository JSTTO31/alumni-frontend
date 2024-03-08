<template>
    <v-container fluid v-if="user">
        <v-row>
            <v-col cols="6">
                <h3 class="text-grey-darken-3 font-weight-medium pt-2">Connected With <strong class="text-primary">{{ user.name }}</strong></h3>
            </v-col>
            <v-col>
                <div class="d-flex">
                    <v-text-field variant="solo" label="Search..." single-line density="compact" prepend-inner-icon="mdi-magnify"></v-text-field>
                </div>
            </v-col>
        </v-row>
        <v-row class="pt-0">
            <v-col cols="4" class="pt-0" v-for="user in connected.data" :key="user.id">
                <v-card  class="rounded-lg border pa-0" flat>
                    <v-card width="100%" height="100" flat class="rounded-0 d-flex bg-grey-lighten-4">
                        <nuxt-img class="w-100 h-100" :src="'https://source.unsplash.com/random/450x350&' + user.id" />
                    </v-card>
                    <div class="d-flex align-center flex-column pa-8 mt-n15">
                        <v-avatar size="150" class=" mr-2 mt-n15 bg-grey-lighten-4" style="border: 4px solid #00a896">
                            <nuxt-img class="w-100 h-100"
                                :src="'https://source.unsplash.com/random/150x150&person&' + user.id"
                            ></nuxt-img>
                        </v-avatar>
                        <div class="mt-2">
                            <h5 class="text-center">{{ user.name }}</h5>
                            <h6 class="text-center font-weight-regular text-grey-darken-1">{{ user.email }}</h6>
                        </div>
                        <v-btn color="primary" class="mt-2 text-capitalize" size="small" block @click="$router.push({name: 'alumni', params: {alumni: user.email}})" prepend-icon="mdi-information-outline">View Info</v-btn>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useConnectionStore } from '~/stores/useConnectionStore';

useHead({
    title: 'Tracking System | Connections'
})
const $connection = useConnectionStore()
const route = useRoute()
const {user} = storeToRefs(useProfileStore())
const {data:connected} = await $connection.getConnected(route.params.alumni, {limit: 6})
</script>

<style scoped>

</style>