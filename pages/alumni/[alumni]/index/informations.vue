<template>
    <v-card class="rounded-lg">
        <v-card-title class="d-flex px-5 align-center">
            More information
            <v-spacer></v-spacer>
            <v-btn flat icon="mdi-close" @click="$router.push({ name: 'alumni-alumni' })"></v-btn>
        </v-card-title>
        <v-divider class="mb-2"></v-divider>
        <v-card-text class="pt-0"  :style="{height: name == 'xl' ? '650px' : '350px',overflowY: 'auto'}">
            <AlumniCardVerified></AlumniCardVerified>
            <AlumniCardPersonalInformation></AlumniCardPersonalInformation>
            <AlumniCardContactInformation></AlumniCardContactInformation>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import {useDisplay} from 'vuetify'
const {name} = useDisplay()
const {user} = storeToRefs(useProfileStore())
useHead({
    title: 'Information'
})
const route = useRoute()
</script>

<style scoped>

</style>