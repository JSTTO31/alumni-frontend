<script setup lang="ts">
import { useTimeAgo  } from '@vueuse/core'
const {user} = storeToRefs(useAuthStore())
const $post = usePostStore()
const props = defineProps(["comment"]);
const text = ref()
const replyHandler = () => {
  if(!text.value){
    return
  }

  $post.add_reply(props.comment, text.value)
  text.value = ''
}
const text_field = ref()
const showTextField = ref(false)
const focus = () => {
  showTextField.value = true
  const time_out = setTimeout(() => {
    text_field.value.focus()
    clearTimeout(time_out)
  }, 100);
}
const timeAgo = useTimeAgo (new Date(props.comment.created_at))
</script>
<template>
  <v-card class="w-100 d-flex py-2" flat>
    <div>
      <v-avatar size="50" class="border mr-2" v-if="user">
        <v-img v-if="user.id == comment.user.id" width="160" height="160" class="rounded-lg"
                :src="user.picture"/>
        <v-img v-else width="160" height="160" class="rounded-lg"
                :src="`https://source.unsplash.com/random/250x250&` + comment.user.name"/>
      </v-avatar>
    </div>
    <div class="d-flex w-100 flex-column">
      <v-card class="w-100 pr-5 px-3 py-2 rounded-lg"
        style="font-weight: 400 !important; font-family: 'Poppins'; font-size: 15px" color="grey-lighten-4 " flat>
        <div class="d-flex">
          <div @click.stop="$router.push({name: 'alumni', params: {alumni: comment.user.email}})" class="" >
            <h5 class="underline font-weight-medium">{{ comment.user.name }}</h5>
            <h6 class="underline font-weight-regular text-grey-darken-1">
              Bachelor of Science in Computer Science
            </h6>
          </div>
          <v-spacer></v-spacer>
          <span style="font-size: 11px;" class="text-grey-darken-1 font-weight-medium">{{ timeAgo }}</span>
        </div>
        <div class="pt-2">
          {{ comment.text }}
        </div>
      </v-card>
      <div class="text-caption font-weight-bold pt-2">
        <v-btn flat size="small" class="text-capitalize" style="font-family: 'Poppins';" @click="$post.comment_reaction(comment.post_id, comment.id)" color="#1f6e8c" variant="text" v-if="comment.reacted">Like <span v-if="comment.reactions_count > 0" style="font-size: 10px;">&middot;&nbsp;&nbsp;{{ comment.reactions_count }}</span></v-btn>
        <v-btn flat size="small" class="text-capitalize" style="font-family: 'Poppins';" @click="$post.comment_reaction(comment.post_id, comment.id)" v-else>Like <span v-if="comment.reactions_count > 0" style="font-size: 10px;">&middot;&nbsp;&nbsp;{{ comment.reactions_count }}</span>
        </v-btn>
       
        <span class="ml-2">|</span>
        <v-btn flat size="small" class="text-capitalize ml-2" style="font-family: 'Poppins';" @click="focus">Reply
          <span v-if="comment.replies_count > 0" style="font-size: 10px;">&nbsp;&nbsp;&middot;&nbsp;&nbsp;{{ comment.replies_count }}</span>
        </v-btn>
      </div>
      <div class="mt-2">
        <div>
          <card-reply :comment="comment" v-for="reply in comment.replies" :key="reply.id" :reply="reply"></card-reply>
          <div class="w-100 d-flex mt-3" v-if="showTextField">
            <v-avatar size="40" class="border mr-2">
              <v-img
                src="https://as2.ftcdn.net/v2/jpg/02/44/42/79/1000_F_244427911_aoHHulebtYy4wLpncBBuWqCTNFKolcCB.jpg"></v-img>
            </v-avatar>
            <v-text-field v-model="text" style="font-size: 10px !important;" :label="`Reply to ${comment.user.name}`" single-line density="compact" variant="outlined"
            ref="text_field"
              @keyup.enter="replyHandler"
              hide-details append-inner-icon="mdi-send"></v-text-field>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.underline:hover{
  text-decoration: underline;
}
</style>
