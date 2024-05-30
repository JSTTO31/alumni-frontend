<template>
    <div class="mt-5">
        <AlumniCardPersonalInformation></AlumniCardPersonalInformation>
        <AlumniCardContactInformation></AlumniCardContactInformation>
        <v-overlay class="d-flex align-start pt-15 justify-center" transition="slide-y-transition"  width="750" :model-value="route.name.includes('alumni-information-edit') || route.name.includes('alumni-information-add') " @click:outside="$router.push({name: 'alumni-information'})" persistent no-click-animation>
            <NuxtPage></NuxtPage>
        </v-overlay>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'Information'
})
const route = useRoute()
</script>

<style scoped>

</style>