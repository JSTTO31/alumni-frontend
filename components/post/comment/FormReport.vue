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
        <v-btn icon="mdi-close" @click="emits('close')" style="position: absolute;top: 2%;right: 2%" flat></v-btn>
    </v-card>
</template>

<script setup lang="ts">
import type { Comment } from '~/stores/post/useCommentStore'
const props = defineProps<{comment: Comment}>()
const emits = defineEmits(['close'])
const $comment = useCommentStore()
const information = reactive({
    type: '',
    description: ''
})
const {execute, pending, status} = await $comment.report(props.comment.id, information)
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
    emits('close')
}

</script>

<style scoped>

</style>