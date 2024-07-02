<template>
    <v-card class="rounded-lg py-3 px-4" :disabled="pending && status != 'idle'">
        <v-form @submit.prevent="submit">
            <v-card-title>Report Post</v-card-title>
            <v-card-text class="px-2">
                <v-radio-group v-model="information.type">
                    <v-radio color="primary" v-for="type in types" :key="type" :label="type" :value="type"></v-radio>
                </v-radio-group>
                <div class="px-2">
                    <v-textarea :disabled="information.type != 'Other'" hide-details variant="outlined" single-line label="Type your report here..." v-model="information.description"></v-textarea>
                </div>
            </v-card-text>
            <v-card-actions class="px-4">
                <v-btn type="submit" block variant="flat" color="primary" :loading="pending && status != 'idle'" :disabled="!information.type">Submit</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script setup lang="ts">
const router = useRouter()
const $post = usePostStore()
const route = useRoute()
const post_id = computed(() => route.query.post?.toString() || '')
const information = reactive({
    type: '',
    description: ''
})
const {execute, pending, status} = await $post.report(post_id.value, information)
const types = [
    "Spam",
    "Harassment",
    "Hate Speech",
    "Fake News",
    "Violence",
    "Nudity",
    "Self-Harm",
    "Impersonation",
    "Other"
];

async function submit(){
    await execute()
    if(status.value == 'success'){
        router.push({query: {}})
    }
}

</script>

<style scoped>

</style>