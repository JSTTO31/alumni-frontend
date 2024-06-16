<template>
    <v-card class="px-4 py-3 rounded-lg" >
        <v-card-title class=" d-flex align-center">
            Tell me about yourself
            <v-spacer></v-spacer>
            <v-btn flat icon="mdi-close" @click="$router.push({name: 'alumni-alumni'})"></v-btn>
        </v-card-title>
        <v-divider class="mx-6"></v-divider>
        <v-card-text>
            <v-textarea variant="outlined" rows="10" v-model="paragraph" flat single-line label="Paragraph"></v-textarea>
        </v-card-text>
        <v-card-actions class="px-6">
            <v-spacer></v-spacer>
            <v-btn @click="submit" class="text-capitalize px-6" color="primary" variant="flat"
                :loading="loading" :disabled="paragraph.length < 1">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { useProfileStore } from '~/stores/useProfileStore';
const $profile = useProfileStore()
const {user: auth} = storeToRefs(useAuthStore());
const {user} = storeToRefs($profile);
const paragraph = ref(user.value?.about?.paragraph || '')
const loading = ref(false)
const router = useRouter()
const submit = async () => {
    loading.value = true;
    $profile.updateOrCreateAbout(paragraph.value).then(() => {
        loading.value = false
        router.push({name: 'alumni-alumni'})
    })
}
</script>

<style scoped>

</style>