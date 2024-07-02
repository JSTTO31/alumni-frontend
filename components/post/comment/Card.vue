<template>
  <div class="d-flex py-4" v-if="!comment.hide">
    <Avatar :user="comment.user" size="55" class="mr-5" @click.stop="$router.push({name: 'alumni-alumni', params: {alumni: comment.user.email}})"></Avatar>
    <div class="d-flex w-100 flex-column">
      <div class="d-flex">
        <div class="">
          <h4 class="underline font-weight-medium"
            @click.stop="$router.push({ name: 'alumni-alumni', params: { alumni: comment.user.email } })">{{
              comment.user.name }} <v-icon color="blue-darken-1" style="transform: scale(.8)" class="verify-icon" v-if="comment.user.general_information">mdi-check-decagram</v-icon></h4>
          <h5 class="underline font-weight-regular text-grey-darken-1" v-if="comment.user?.general_information">
            {{ comment.user.general_information.department_name }}
          </h5>
        </div>
        <v-spacer></v-spacer>
        <span style="font-size: 11px;" class="text-grey-darken-1 font-weight-medium">{{ timeAgo }}</span>
      </div>
      <div class="pt-2" style="font-family: 'Roboto', sans-serif;font-size: 17px;font-weight: 600;">
        {{ comment.text }}
      </div>
      <div class="text-caption font-weight-bold pt-2">
        <v-btn :loading="reactionLoading" prepend-icon="mdi-heart" flat class="text-capitalize"
          style="font-family: 'Poppins';" @click="toggleReaction" color="#1f6e8c" variant="text"
          v-if="comment.reacted">heart <v-chip size="small" class="ml-2" style="font-size: 10px;">{{
            comment.reactions_count }}</v-chip></v-btn>
        <v-btn :loading="reactionLoading" prepend-icon="mdi-heart-outline" variant="text" flat class="text-capitalize"
          style="font-family: 'Poppins';" @click="toggleReaction" v-else>heart <v-chip size="small" class="ml-2"
            style="font-size: 10px;" v-if="comment.reactions_count > 0">{{ comment.reactions_count }}</v-chip>
        </v-btn>
        <v-btn prepend-icon="mdi-comment-outline" variant="text" flat class="text-capitalize ml-2"
          style="font-family: 'Poppins';" @click="focus">Reply
          <v-chip size="x-small" class="ml-2"
            style="font-size: 10px;" v-if="comment.replies_count > 0">{{ comment.replies_count }}</v-chip>
        </v-btn>
        <v-menu location="bottom right">
          <template #activator="{ props }">
            <v-btn v-bind="props" variant="text" class="ml-2" :loading="hideLoading">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list class="mt-1">
            <v-list-item prepend-icon="mdi-eye-off-outline" @click="toggleHide">Hide</v-list-item>
            <v-list-item prepend-icon="mdi-alert-outline" @click="showReportDialog = true" v-if="!comment.report">Report</v-list-item>
            <v-list-item prepend-icon="mdi-alert-outline" v-else
              class="text-error">Reported</v-list-item>
              <v-list-item @click="showDeleteDialog = true" prepend-icon="mdi-trash-can-outline"
              class="text-error">Delete</v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div class="mt-2">
          <div>
            <v-divider class="mb-4"></v-divider>
            <PostCommentReplyContainer :comment="comment"></PostCommentReplyContainer>
            <div class="w-100 d-flex mt-3" v-if="showTextField">
              <Avatar :user="user" class="mr-3"></Avatar>
              <v-text-field v-model="text" style="font-size: 10px !important;" :label="`Reply to ${comment.user.name}`"
                single-line density="compact" variant="outlined" ref="text_field" @keyup.enter="replyHandler"
                hide-details append-inner-icon="mdi-send" :loading="createLoading" :disabled="createLoading"></v-text-field>
            </div>
          </div>
        </div>
    </div>
    <v-dialog v-model="showReportDialog" width="600">
      <PostCommentFormReport @close="showReportDialog = false" :comment="comment"></PostCommentFormReport>
    </v-dialog>
    <v-dialog v-model="showDeleteDialog" width="600">
      <PostCommentDeleteMessageBox :comment="comment" @close="showDeleteDialog = false"></PostCommentDeleteMessageBox>
    </v-dialog>
  </div>
  <v-card v-else class="rounded-lg d-flex pa-10 align-center justify-center " variant="tonal">
    <v-btn class="text-capitalize" variant="outlined" :loading="hideLoading" @click="toggleHide">Undo hide</v-btn>
  </v-card>
</template>
<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import auth from '~/middleware/auth';
import { useCommentStore, type Comment } from '~/stores/post/useCommentStore';
const { user } = storeToRefs(useAuthStore())
const $comment = useCommentStore()
const props = defineProps<{comment: Comment}>();
const text = ref()
const showDeleteDialog = ref(false)
const text_field = ref()
const showTextField = ref(false)
const focus = () => {
  showTextField.value = true
  const time_out = setTimeout(() => {
    text_field.value.focus()
    clearTimeout(time_out)
  }, 100);
}
provide('focus', focus)
const timeAgo = useTimeAgo(new Date(props.comment.created_at))

const reactionLoading = ref(false)
async function toggleReaction() {
  reactionLoading.value = true;
  await $comment.reaction(props.comment.id)
  reactionLoading.value = false
}

const hideLoading = ref(false)
async function toggleHide() {
  hideLoading.value = true;
  await $comment.hide(props.comment.id)
  hideLoading.value = false
}

const createLoading = ref(false)
async function replyHandler(){
  if (!text.value) {
    return
  }
  createLoading.value = true;
  await $comment.reply_create(props.comment.id, text.value)
  text.value = ''
  createLoading.value = false;

}

const showReportDialog = ref(false)
</script>
<style scoped>
.underline:hover {
  text-decoration: underline;
  cursor: pointer
}
</style>