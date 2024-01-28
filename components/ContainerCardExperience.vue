<template>
    <div>
        <CardExperience v-for="experience in experiences" :experience="experience" :key="experience.id"></CardExperience>
    </div>
</template>

<script setup lang="ts">
import { useExperienceStore } from '~/stores/useExperienceStore';
const $experience = useExperienceStore()
const {experiences} = storeToRefs($experience)
await $experience.getAll()
</script>

<style scoped>

</style>