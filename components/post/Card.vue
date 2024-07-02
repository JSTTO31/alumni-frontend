<template>
  <v-card @click.stop="$router.push({ name: 'posts-post', params: { post: post.id } })" v-ripple="false"
    class="rounded-lg pa-0 mb-5 pb-4 border" flat :id="'card' + post.id" v-if="post && !post.hide">
    <div class="pa-4 pb-0 d-flex align-center">
      <avatar size="50" class="border mr-4" :user="post.user" @click="$router.push({name: 'alumni-alumni', params: {alumni: post.user.email}})">
      </avatar>
      <div>
        <h5 >
          <span class="underline" @click.stop="$router.push({ name: 'alumni-alumni', params: { alumni: post.user.email } })">{{ post.user.name }} </span>
          <v-icon color="blue-darken-1" style="transform: scale(.8)" class="verify-icon"
            v-if="post.user.general_information">mdi-check-decagram</v-icon> <span
            class="text-caption font-weight-bold">{{ timeAgo }}</span>
        </h5>
        <h6 @click.stop="" class="font-weight-regular text-caption font-weight-bold"
          v-if="post.user.general_information">{{
            post.user.general_information.department_name }}</h6>
      </div>
      <v-spacer></v-spacer>
      <div class="mt-n5">
        <v-btn :loading="loading_save" @click.stop="toggleSave"
          :icon="post.post_saved ? 'mdi-bookmark' : 'mdi-bookmark-outline'" flat class="mr-1"></v-btn>
        <v-menu location="bottom right">
          <template #activator="{ props }">
            <v-btn :loading="loading_hide" v-bind="props" @click.stop icon="mdi-dots-horizontal" flat class=""></v-btn>
          </template>
          <v-card width="200">
            <v-list>
              <v-list-item @click="toggleSave" v-if="!post.post_saved" prepend-icon="mdi-bookmark">Save</v-list-item>
              <v-list-item @click="toggleSave" v-else prepend-icon="mdi-bookmark-outline">Unsave</v-list-item>
              <v-list-item prepend-icon="mdi-eye-off-outline" @click="toggleHide">Hide</v-list-item>
              <v-list-item v-if="!post.report" prepend-icon="mdi-alert-octagon-outline"
                @click="$router.push({ query: { type: 'report', post: post.id } })">Report</v-list-item>
              <v-list-item v-else prepend-icon="mdi-alert-octagon" class="text-error">Reported</v-list-item>
              <v-list-item prepend-icon="mdi-share-outline" @click="showShareDialog = true">Share</v-list-item>
              <v-list-item prepend-icon="mdi-link-variant" @click="copyLink">Copy link</v-list-item>
              <v-list-item prepend-icon="mdi-trash-can-outline" @click="showRemoveDialog = true" v-if="user?.id == post.user.id">Delete</v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </div>
    <v-card-text>
      <h2 style="font-size: 20px;font-weight: 600;" class="mb-2">{{ post.title }}</h2>
      <PostContainerContent style="font-size: 16px;line-height: 1.5;" :post="post"></PostContainerContent>
    </v-card-text>
    <div class="px-5 pt-2">
      <div class=" d-flex">
        <PostButtonReaction :post="post"></PostButtonReaction>
        <v-btn flat color="grey-darken-3" variant="text" class="text-capitalize mr-3"
          prepend-icon="mdi-message-text-outline">Comment <v-chip size="small" class="ml-5"
            v-if="post.comments_count > 0">{{ post.comments_count }} </v-chip>
        </v-btn>
        <v-btn v-if="post.postable_type != 'App\\Models\\Post'" flat color="grey-darken-3" variant="text"
          class="text-capitalize mr-3" prepend-icon="mdi-share-outline" @click.stop="showShareDialog = true">Share
          <v-chip size="small" class="ml-5" v-if="post.shares_count > 0">{{
            post.shares_count }} </v-chip>
        </v-btn>
      </div>
    </div>
    <v-dialog v-model="showShareDialog" width="750" persistent>
      <PostFormShare @close="showShareDialog = false" :post="post"></PostFormShare>
    </v-dialog>
    <v-dialog v-model="showRemoveDialog" width="650" persistent>
      <PostDeleteMessageBox @close="showRemoveDialog = false" :post="post"></PostDeleteMessageBox>
    </v-dialog>
  </v-card>
  <v-card v-else class="rounded-lg d-flex pa-10 align-center justify-center " variant="tonal">
    <v-btn class="text-capitalize" variant="outlined" :loading="loading_hide" @click="toggleHide">Undo hide</v-btn>
  </v-card>

</template>
<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
const props = defineProps<{ post: Post }>();
const { user } = storeToRefs(useAuthStore())
const $post = usePostStore();
const timeAgo = useTimeAgo(new Date(props.post.created_at))
const showShareDialog = ref(false)
const showRemoveDialog = ref(false)
const loading_save = ref(false)
const loading_hide = ref(false)
const router = useRouter()

function copyLink(){
  const routeData = router.resolve({name: 'posts-post', params: {post: props.post.id}})
  navigator.clipboard.writeText('localhost:3000' + routeData.href)
}

async function toggleSave() {
  loading_save.value = true;
  await $post.save(props.post.id)
  loading_save.value = false
}

async function toggleHide() {
  loading_hide.value = true;
  await $post.hide(props.post.id)
  loading_hide.value = false
}
</script>
<style scoped>
.underline:hover {
  text-decoration: underline;
}
</style>