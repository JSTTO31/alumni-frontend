<template>
    <div>
        <div>
            <cover @click="view = true"></cover>
            <v-btn size="small" prepend-icon="mdi-camera" class="text-capitalize"
            style="position: absolute;top: 15px;right: 15px;" @click.stop="$router.push({name: 'alumni-index-edit-profile-cover'})">Edit cover photo</v-btn>
        </div>
        <v-overlay class="d-flex justify-center pt-15" v-model="view" width="750">
            <cover></cover>
        </v-overlay>
    </div>
</template>

<script setup lang="ts">
const view = ref(false)
</script>

<style scoped>

</style>