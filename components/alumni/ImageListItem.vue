<template>
     <v-hover v-slot="{props, isHovering}">
        <v-card color="primary" rounded flat variant="tonal" v-bind="props" height="155" class="d-flex align-center rounded-lg mt-2 justify-center">
            <img :src="'http://localhost:8000/storage/' + image.location" class="w-100"  :alt="image.title">
            <v-overlay contained class="d-flex align-center justify-center" :model-value="isHovering">
                <div class="d-flex" style="gap: 5px">
                    <v-btn class="text-white" variant="outlined" @click.stop="$router.push({name: 'alumni-index-edit-images', query: {id: image.id}})" rounded>Edit</v-btn>
                    <v-btn class="text-white" variant="outlined" @click.stop="$router.push({name: 'alumni-index-images', query: {id: image.id}})" rounded>View</v-btn>
                </div>
            </v-overlay>
        </v-card>
    </v-hover>
</template>

<script setup lang="ts">
const props = defineProps<{image: Image}>()
</script>

<style scoped>

</style>