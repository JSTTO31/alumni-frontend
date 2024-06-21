<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
const props = defineProps<{ post: Post }>();
const { user } = storeToRefs(useAuthStore())
const $post = usePostStore();
const comment = ref("");
const text_field = ref()
const commenthandler = () => {
  if (!comment.value) {
    return;
  }
  $post.add_comment(props.post.id, comment.value);
  comment.value = "";
};
const focus = () => {
  text_field.value.focus()
}
const viewed = ref(false)

const view_post = () => {
  const card = document.getElementById('card' + props.post.id)
  const position_y = card?.getBoundingClientRect().y || innerHeight
  const trigger_height = innerHeight / 2
  if (position_y <= trigger_height && (!viewed.value || !props.post.view)) {
    viewed.value = true
    $post.add_view(props.post.id)
  }
}

const timeAgo = useTimeAgo(new Date(props.post.created_at))
</script>

<template>
  <v-card v-ripple="false" class="rounded-lg pa-0 pb-4 border" flat :id="'card' + post.id" v-if="post">
    <div class="pa-4 pb-0 d-flex align-center">
      <avatar size="60" class="border mr-4" :user="user">
      </avatar>
      <div class="underline" @click.stop="$router.push({ name: 'alumni-alumni', params: { alumni: post.user.email } })">
        <h5 class="">{{ post.user.name }} &middot; <span class="text-caption font-weight-bold">{{ timeAgo }}</span></h5>
        <h6 class="font-weight-regular text-caption font-weight-bold" v-if="user?.general_information">{{
          user.general_information.department_name }}</h6>
      </div>
      <v-spacer></v-spacer>
      <div class="mt-n5">
        <v-btn @click.stop icon="mdi-dots-horizontal" flat class=""></v-btn>
      </div>
    </div>
    <v-card-text>
      <h3 class="mb-2">{{ post.title }}</h3>
      <div class="" v-html="post.post_text?.content">
      </div>
    </v-card-text>
    <div class="px-5 pt-2">
      <div class="d-flex w-100 pb-2" v-if="false">
        <div class="d-flex align-center px-2" v-if="post.reactions_count > 0">
          <v-avatar class=" mr-2" size="20" color="#1F6E8C">
            <v-icon size="10">mdi-thumb-up</v-icon>
          </v-avatar>
          <span style="font-size: 12px;">{{ post.reactions_count }} Likes</span>
        </div>
        <v-spacer></v-spacer>
        <span class="mr-3" style="font-size: 12px;">{{ post.comments_count }} comments</span>
        <span class="mr-3" style="font-size: 12px;">25 Shares</span>
      </div>
      <div class="mb-5 d-flex">
        <v-btn flat class="text-capitalize w-25" variant="text" color="#1f6e8c" prepend-icon="mdi-thumb-up"
          @click.stop="$post.post_reaction(post.id)" v-if="post.reacted">
          Heart
          <v-chip class="ml-5" v-if="post.reactions_count > 0">{{ post.reactions_count }} </v-chip>
        </v-btn>
        <v-btn flat class="text-capitalize w-25" variant="text" prepend-icon="mdi-thumb-up-outline"
          @click.stop="$post.post_reaction(post.id)" v-else>
          Heart <v-chip class="ml-5" v-if="post.reactions_count > 0">{{ post.reactions_count }} </v-chip>
        </v-btn>
        <v-btn flat color="grey-darken-3" variant="text" class="text-capitalize w-25"
          prepend-icon="mdi-message-text-outline" @click.stop="focus">Comment <v-chip class="ml-5"
            v-if="post.comments_count > 0">{{ post.comments_count }} </v-chip>
        </v-btn>
        <v-btn flat color="grey-darken-3" variant="text" class="text-capitalize w-25"
          prepend-icon="mdi-share-outline" @click.stop="focus">Share <v-chip class="ml-5"
            v-if="post.comments_count > 0">{{ post.comments_count }} </v-chip>
        </v-btn>
        <v-btn flat color="grey-darken-3" variant="text" class="text-capitalize w-25"
          prepend-icon="mdi-bookmark-outline" @click.stop="focus">Save <v-chip class="ml-5"
            v-if="post.comments_count > 0">{{ post.comments_count }} </v-chip>
        </v-btn>
      </div>
    </div>
    <v-divider></v-divider>
    <v-card-actions class="d-flex flex-column" v-if="true" @click.stop="">
      <div class="px-5 w-100">
        <card-comment v-for="comment in post.comments" :key="comment.id" :comment="comment"></card-comment>
      </div>
      <div class="w-100 d-flex px-5 mt-3">
        <v-avatar size="50" class="border mr-2" v-if="user">
          <v-img :src="user.picture"></v-img>
        </v-avatar>
        <v-text-field label="Write your comment" single-line v-model="comment" variant="solo-filled" rounded
          density="compact" flat ref="text_field" @keyup.enter="commenthandler" hide-details
          append-inner-icon="mdi-send"></v-text-field>
      </div>
    </v-card-actions>
  </v-card>
</template>


<style scoped>
.underline:hover {
  text-decoration: underline;
}
</style>