<template>
    <v-card class="rounded-lg py-3 px-4" height="800" style="overflow: auto">
            <v-card-title class="d-flex align-center">
                More information
                <v-spacer></v-spacer>
                <v-btn flat icon="mdi-close" @click="$router.push({ name: 'alumni' })"></v-btn>
            </v-card-title>
            <AlumniCardPersonalInformation></AlumniCardPersonalInformation>
            <AlumniCardContactInformation></AlumniCardContactInformation>
    </v-card>
</template>

<script setup lang="ts">
useHead({
    title: 'Information'
})
const route = useRoute()
</script>

<style scoped></style>