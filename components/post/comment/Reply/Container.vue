<template>
    <div>
        <PostCommentReplyCard :comment="comment" v-for="reply in comment.replies" :key="reply.id" :reply="reply"></PostCommentReplyCard>
        <v-btn v-if="remaining_replies > 0" class="text-capitalize" variant="text" size="small" color="primary" @click="execute" :loading="pending && status != 'idle'">
            More Replies {{ remaining_replies }}
        </v-btn>
    </div>
</template>

<script setup lang="ts">
import { useCommentStore, type Comment } from '~/stores/post/useCommentStore';
const props = defineProps<{comment: Comment}>()
const remaining_replies = computed(() => props.comment.replies_count - props.comment.replies.length)
const $comment = useCommentStore()
const {pending, execute, status} = await $comment.getAllReplies(props.comment.id)
</script>

<style scoped>
.underline:hover {
  text-decoration: underline;
  cursor: pointer
}
</style>