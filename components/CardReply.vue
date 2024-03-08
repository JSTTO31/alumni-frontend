<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core';
import { usePostStore } from '#imports';
const $post = usePostStore()
const props = defineProps(['reply', 'comment'])
const text = ref('')
const replyHandler = () => {
  if(!text.value){
    return
  }

  $post.add_reply(props.comment, text.value)
  text.value = ''
  text_field.value.blur()
  showTextField.value = false
}
const showTextField = ref(false)
const text_field = ref()
const focus = () => {
    showTextField.value = true
    const time_out = setTimeout(() => {
        text_field.value.focus()
        clearTimeout(time_out)
    }, 100);
}
const timeAgo = useTimeAgo(new Date(props.reply.created_at))
</script>
<template>
    <div class="d-flex w-100 mb-1">
        <v-avatar size="40" class="border mr-2">
            <nuxt-img class="h-100 w-100"
            src="https://source.unsplash.com/random/45x45&person"
            ></nuxt-img>
        </v-avatar>
        <div class="w-100">
            <v-card
                class="w-100 pr-5 px-3 py-2 rounded-lg"
                style="font-weight: 400 !important; font-family: 'Poppins'; font-size: 15px"
                color="grey-lighten-4 "
                flat
            >
                <div class="d-flex">
                    <div @click.stop="$router.push({name: 'alumni', params: {alumni: comment.user.email}})" class="underline">
                        <h5 class="font-weight-medium">{{ comment.user.name }}</h5>
                        <h6 class="font-weight-regular text-grey-darken-1">
                        Bachelor of Science in Computer Science
                        </h6>
                    </div>
                    <v-spacer></v-spacer>
                    <span style="font-size: 10px;" class="text-grey-darken-1 font-weight-medium">{{ timeAgo }}</span>
                </div>
                <div class="pt-2" style="font-size: 12px;font-weight: 400;">
                    {{ reply.text }}
                </div>
            </v-card>
            <div class="text-caption align-start font-weight-bold pt-2 d-flex">
                <v-btn size="x-small" flat class="text-capitalize" style="font-family: 'Poppins';" @click="$post.reply_reaction(comment, reply.id)" color="#1f6e8c" variant="text" v-if="reply.reacted">Like<span v-if="reply.reactions_count > 0" style="font-size: 10px;">&middot;&nbsp;&nbsp;{{ reply.reactions_count }}</span></v-btn>
                 <v-btn size="x-small" flat class="text-capitalize" style="font-family: 'Poppins';" @click="$post.reply_reaction(comment, reply.id)" v-else>Like<span v-if="reply.reactions_count > 0" style="font-size: 10px;">&middot;&nbsp;&nbsp;{{ reply.reactions_count }}</span></v-btn>
                 
            </div>
            <div class="w-100 d-flex mt-3" v-if="showTextField">
                <v-avatar size="40" class="border mr-2">
                <v-img
                    src="https://as2.ftcdn.net/v2/jpg/02/44/42/79/1000_F_244427911_aoHHulebtYy4wLpncBBuWqCTNFKolcCB.jpg"></v-img>
                </v-avatar>
                <v-text-field v-model="text" style="font-size: 10px !important;" :label="`Reply to ${reply.reply_from.name}`" single-line density="compact" variant="outlined"
                @keyup.enter="replyHandler"
                ref="text_field"
                hide-details append-inner-icon="mdi-send"></v-text-field>
            </div>
        </div>
    </div>
</template>



<style scoped>
.underline:hover{
  text-decoration: underline;
}
</style>