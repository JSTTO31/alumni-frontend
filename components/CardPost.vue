<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
const props = defineProps(["post"]);
const {user} = storeToRefs(useAuthStore())
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
  if(position_y <= trigger_height && (!viewed.value || !props.post.view)){
    viewed.value = true
    $post.add_view(props.post.id)
  }
}

const timeAgo = useTimeAgo(new Date(props.post.created_at))
onMounted(() => {
  view_post()
  window.addEventListener('scroll', view_post)
})
const random_width = Math.floor(Math.random() * 450) + 250
const random_height = Math.floor(Math.random() * 250) + 250

const show = () => {
  if(user.value && user.value.id == props.post.user.id){
    return
  }else{
    useRouter().push({name: 'index-posts-post', params: {post: props.post.id}, query: {image_url: `https://source.unsplash.com/random/${random_width}x${random_height}`, avatar_image: 'https://source.unsplash.com/50x50&person&' + props.post.id}})
  }
}
</script>

<template>
  <v-card v-ripple="false"  class="rounded-lg pa-0 pb-4 border" :id="'card' + post.id" v-if="post" @click="show">
    <div class="pa-4 pb-0 d-flex align-center">
      <v-avatar size="60" class="border mr-2">
        <nuxt-img class="h-100 w-100"
          :src="'https://source.unsplash.com/random/50x50&person&' + post.id"
        ></nuxt-img>
      </v-avatar>
      <div class="underline" @click.stop="$router.push({name: 'alumni', params: {alumni: post.user.email}})">
        <h5>{{ post.user.name }}</h5>
        <h6 class="font-weight-regular">Bachelor of Science in Computer Science</h6>
        <h6 class="font-weight-regular">
          <v-icon>mdi-earth</v-icon>
          &middot; {{ timeAgo }}
        </h6>
      </div>
      <v-spacer></v-spacer>
      <div class="mt-n5">
        <v-btn @click.stop icon="mdi-dots-horizontal" flat class=""></v-btn>
      </div>
    </div>
    <v-card-text class="pa-5" :class="post.text.length <= 20 ? 'text-h5' : ''">
      {{ post.text }}
    </v-card-text>
    <div v-if="(post.user.id != user?.id || null)">
      <v-card>
        <v-img  :src="`https://source.unsplash.com/random/${random_width}x${random_height}`" class="rounded-0 w-100" />
      </v-card>
    </div>
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
      <v-divider></v-divider>
      <v-row class="px-3 pt-3">
        <v-col class="px-0">
          <v-btn
            block
            flat
            class="text-capitalize rounded-lg py-6"
            variant="text"
            color="#1f6e8c"
            prepend-icon="mdi-thumb-up"
            @click.stop="$post.post_reaction(post.id)"
            v-if="post.reacted"
          >
            Like
            <v-chip class="ml-5" v-if="post.reactions_count > 0">{{ post.reactions_count }} </v-chip>
          </v-btn>
          <v-btn
            block
            flat
            class="text-capitalize rounded-lg py-6"
            prepend-icon="mdi-thumb-up-outline"
            @click.stop="$post.post_reaction(post.id)"
            v-else
          >
            Like <v-chip class="ml-5" v-if="post.reactions_count > 0">{{ post.reactions_count }} </v-chip>
          </v-btn>
        </v-col>
        <v-col class="px-0">
            <v-btn
              block
              flat
              color="grey-darken-3"
              variant="text"
              class="text-capitalize rounded-lg py-6"
              prepend-icon="mdi-message-text-outline"
              @click.stop="focus"
              >Comment  <v-chip class="ml-5" v-if="post.comments_count > 0">{{ post.comments_count }} </v-chip>
              </v-btn
            >
        </v-col>
        <v-col class="px-0">
          <v-btn
            block
            flat
            color="grey-darken-3"
            variant="text"
            class="text-capitalize rounded-lg py-6"
            prepend-icon="mdi-share-outline"
            >Share</v-btn
          >
        </v-col>
      </v-row>
    </div>
    <v-card-actions class="d-flex flex-column" v-if="true" @click.stop="">
      <div class="px-5 w-100">
        <card-comment v-for="comment in post.comments" :key="comment.id" :comment="comment"></card-comment>
      </div>
      <div class="w-100 d-flex px-5 mt-3">
        <v-avatar size="50" class="border mr-2">
          <v-img
            src="https://as2.ftcdn.net/v2/jpg/02/44/42/79/1000_F_244427911_aoHHulebtYy4wLpncBBuWqCTNFKolcCB.jpg"
          ></v-img>
        </v-avatar>
        <v-text-field
          label="Write your comment"
          single-line
          v-model="comment"
          variant="solo-filled"
          rounded
          density="compact"
          flat
          ref="text_field"
          @keyup.enter="commenthandler"
          hide-details
          append-inner-icon="mdi-send"
        ></v-text-field>
      </div>
    </v-card-actions>
  </v-card>
</template>


<style scoped>
.underline:hover{
  text-decoration: underline;
}
</style>