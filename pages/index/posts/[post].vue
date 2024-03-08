<template>
    <v-card v-if="!!post" height="850" class="rounded-lg">
        <v-layout class="w-100 h-100">
            <v-navigation-drawer location="right" width="450">
                <v-layout class="w-100 h-100">
                    <v-main>
                        <v-card id="comment-container" color="transparent" flat class="rounded-0 h-100 w-100" style="overflow-y: auto;">
                            <div class="mb-5">
                                <div class="pa-4 pb-0 d-flex align-center">
                                    <v-avatar size="60" class="border mr-2">
                                        <nuxt-img
                                        class="h-100 w-100"
                                            :src="$route.query.avatar_image?.toString() || ''"></nuxt-img>
                                    </v-avatar>
                                    <div>
                                        <h5>{{ post.user.name || '' }}</h5>
                                        <h6 class="font-weight-regular">Bachelor of Science in Computer Science</h6>
                                        <h6 class="font-weight-regular">
                                            <v-icon>mdi-earth</v-icon>
                                            &middot; {{ useTimeAgo(new Date(post.created_at)) }}
                                        </h6>
                                    </div>
                                    <v-spacer></v-spacer>
                                    <div class="mt-n5">
                                        <v-btn size="small" icon="mdi-dots-horizontal" flat class=""></v-btn>
                                        <v-btn size="small" icon="mdi-close" flat class=""
                                            @click="$router.push('/')"></v-btn>

                                    </div>
                                </div>
                                <div class="px-5 mt-2">
                                    {{ post.text }}
                                </div>
                                <v-row class="px-3 pt-3">
                                    <v-col class="px-0">
                                        <v-btn block flat class="text-capitalize rounded-lg py-6" variant="text"
                                            color="#1f6e8c" prepend-icon="mdi-thumb-up"
                                            @click="$post.post_reaction(post.id)" v-if="post.reacted">
                                            Like
                                            <v-chip class="ml-5" v-if="post.reactions_count > 0">{{ post.reactions_count
                                                }}
                                            </v-chip>
                                        </v-btn>
                                        <v-btn block flat class="text-capitalize rounded-lg py-6"
                                            prepend-icon="mdi-thumb-up-outline" @click="$post.post_reaction(post.id)"
                                            v-else>
                                            Like <v-chip class="ml-5" v-if="post.reactions_count > 0">{{
        post.reactions_count }} </v-chip>
                                        </v-btn>
                                    </v-col>
                                    <v-col class="px-0">
                                        <v-btn block flat color="grey-darken-3" variant="text"
                                            class="text-capitalize rounded-lg py-6"
                                            prepend-icon="mdi-message-text-outline" @click="focus">Comment <v-chip
                                                class="ml-5" v-if="post.comments_count > 0">{{
        post.comments_count }} </v-chip>
                                        </v-btn>
                                    </v-col>
                                    <v-col class="px-0">
                                        <v-btn block flat color="grey-darken-3" variant="text"
                                            class="text-capitalize rounded-lg py-6"
                                            prepend-icon="mdi-share-outline">Share</v-btn>
                                    </v-col>
                                </v-row>
                            </div>
                            <div class="px-5 w-100">
                                <card-comment v-for="comment in post.comments" :key="comment.id"
                                    :comment="comment"></card-comment>
                            </div>
                        </v-card>
                    </v-main>
                    <v-footer app>
                        <v-text-field id="comment" flat label="Write your comment here..." append-inner-icon="mdi-send" hide-details
                            density="compact" single-line variant="solo-filled" v-model="comment" @keyup.enter="commenthandler"></v-text-field>
                    </v-footer>
                </v-layout>
            </v-navigation-drawer>
            <v-main>
                
                <div class="h-100 w-100 rounded-0 flex-column justify-center bg-grey-darken-4 px-15 d-flex">
                    
                    <v-card flat class="rounded-lg" color="transparent" v-if="(post.user.id != user?.id || null)">
                        <v-img  :src="$route.query.image_url?.toString()" class="rounded-0 w-100" />
                    </v-card>
                </div>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script setup lang="ts">
const $post = usePostStore()
const { posts, post } = storeToRefs(usePostStore())
const { user } = storeToRefs(useAuthStore())
const route = useRoute()
const comment = ref('')
await $post.getById(parseInt(route.params.post.toString()))

function focus() {
    const commentField = document.getElementById('comment')

    if(commentField){
        commentField.focus()
    }
}

const commenthandler = () => {
  if (!comment.value) {
    return;
  }
  $post.add_comment(parseInt(route.params.post.toString()), comment.value);
  comment.value = "";

  const container = document.getElementById('comment-container')

  if(container){
    setTimeout(() => {
        container.scrollTo(0, container.scrollHeight)
    }, 100);
  }
};
</script>

<style scoped></style>