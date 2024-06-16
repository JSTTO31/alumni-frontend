<template>
    <div>
        <div>
            <cover @click="view = true"></cover>
            <v-btn v-if="auth?.id == user?.id" size="small" prepend-icon="mdi-camera" class="text-capitalize"
            style="position: absolute;top: 15px;right: 15px;" @click.stop="$router.push({name: 'alumni-alumni-index-authorize-edit-profile-cover'})">Edit cover photo</v-btn>
        </div>
        <v-overlay class="d-flex justify-center pt-15" v-model="view" width="750">
            <cover></cover>
        </v-overlay>
    </div>
</template>

<script setup lang="ts">
const {user: auth} = storeToRefs(useAuthStore())
const { user } = storeToRefs(useProfileStore());
const view = ref(false)
</script>

<style scoped>

</style>