<template>
    <div class="d-flex w-100 mb-4" v-if="!reply.hide">
        <Avatar size="40" :user="reply.user" @click.stop="$router.push({ name: 'alumni-alumni', params: { alumni: comment.user.email } })"></Avatar>
        <div class="w-100 pl-5 rounded-lg" style="font-weight: 400 !important; font-family: 'Poppins'; font-size: 15px"
            color="grey-lighten-4 " flat>
            <div class="d-flex">
                <div>
                    <h5 class="font-weight-medium underline"
                        @click.stop="$router.push({ name: 'alumni-alumni', params: { alumni: comment.user.email } })">
                        {{
                            reply.user.name }}
                        <v-icon color="blue-darken-1" style="transform: scale(.8)" class="verify-icon"
                            v-if="comment.user.general_information">mdi-check-decagram</v-icon>
                    </h5>
                    <h6 class="font-weight-regular text-grey-darken-1" v-if="reply.user.general_information">
                        {{ reply.user.general_information.department_name }}
                    </h6>
                </div>
                <v-spacer></v-spacer>
                <span style="font-size: 10px;" class="text-grey-darken-1 font-weight-medium">{{ timeAgo }}</span>
            </div>
            <div class="pt-2" style="font-size: 15px;font-weight: 400;">
                {{ reply.text }}
            </div>
            <div class="text-caption align-start font-weight-bold pt-2 d-flex">
                <v-btn :loading="reactionLoading" size="small" flat class="text-capitalize"
                    style="font-family: 'Poppins';" @click="reactionToggle" color="#1f6e8c" variant="text"
                    v-if="reply.reacted" prepend-icon="mdi-heart">Heart<span v-if="reply.reactions_count > 0"
                        style="font-size: 10px;"> &middot;&nbsp;&nbsp;{{ reply.reactions_count }}</span></v-btn>
                <v-btn :loading="reactionLoading" size="small" variant="text" flat class="text-capitalize"
                    prepend-icon="mdi-heart-outline" style="font-family: 'Poppins';" @click="reactionToggle"
                    v-else>Heart<span v-if="reply.reactions_count > 0" style="font-size: 10px;">&middot;&nbsp;&nbsp;{{
                        reply.reactions_count }}</span></v-btn>
                <v-btn size="small" variant="text" flat class="text-capitalize" prepend-icon="mdi-comment-outline"
                    style="font-family: 'Poppins';" @click="focus">Reply</v-btn>
                <v-menu location="bottom right">
                    <template #activator="{ props }">
                        <v-btn :loading="hideLoading" v-bind="props" size="small" variant="text" flat class="text-capitalize"
                            style="font-family: 'Poppins';">
                            <v-icon>mdi-dots-horizontal</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item prepend-icon="mdi-eye-off-outline" @click="toggleHide">Hide</v-list-item>
                        <v-list-item prepend-icon="mdi-alert-outline" @click="showReportDialog = true"
                            v-if="!reply.report">Report</v-list-item>
                        <v-list-item prepend-icon="mdi-alert-outline" v-else class="text-error">Reported</v-list-item>
                        <v-list-item prepend-icon="mdi-trash-can-outline" @click="showDeleteDialog = true" class="text-error">Delete</v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </div>
        <v-dialog v-model="showReportDialog" width="600">
            <PostCommentReplyFormReport @close="showReportDialog = false" :reply="reply" :comment="comment"></PostCommentReplyFormReport>
        </v-dialog>
        <v-dialog v-model="showDeleteDialog" width="600">
            <PostCommentReplyDeleteMessageBox @close="showDeleteDialog = false" :comment="comment" :reply="reply"></PostCommentReplyDeleteMessageBox>
        </v-dialog>
    </div>
    <v-card v-else class="rounded-lg d-flex pa-10 align-center justify-center " variant="tonal">
        <v-btn class="text-capitalize" variant="outlined" :loading="hideLoading" @click="toggleHide">Undo hide</v-btn>
    </v-card>
</template>
<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core';
const $comment = useCommentStore()
const props = defineProps(['reply', 'comment'])
const timeAgo = useTimeAgo(new Date(props.reply.created_at))
const showReportDialog = ref(false)
const showDeleteDialog = ref(false)
const reactionLoading = ref(false)
async function reactionToggle() {
    reactionLoading.value = true;
    await $comment.reply_reaction(props.comment.id, props.reply.id)
    reactionLoading.value = false
}
const focus = inject('focus')
const hideLoading = ref(false)
async function toggleHide() {
  hideLoading.value = true;
  await $comment.reply_hide(props.comment.id, props.reply.id)
  hideLoading.value = false
}
</script>

<style scoped>
.underline:hover {
    text-decoration: underline;
    cursor: pointer;
}
</style>