<script setup lang="ts">
const props = defineProps(["post"]);
const $post = usePostStore();
const comment = ref("");
const commenthandler = () => {
  if (!comment.value) {
    return;
  }
  $post.add_comment(props.post, comment.value);
  comment.value = "";
};
</script>

<template>
  <v-card class="rounded-lg my-2 border" flat>
    <div class="pa-4 pb-0 d-flex align-center">
      <v-avatar size="60" class="border mr-2">
        <v-img
          src="https://as2.ftcdn.net/v2/jpg/02/44/42/79/1000_F_244427911_aoHHulebtYy4wLpncBBuWqCTNFKolcCB.jpg"
        ></v-img>
      </v-avatar>
      <div>
        <h5>{{ post.user.name }}</h5>
        <h6 class="font-weight-regular">Bachelor of Science in Computer Science</h6>
        <h6 class="font-weight-regular">
          <v-icon>mdi-earth</v-icon>
          &middot; 1m
        </h6>
      </div>
      <v-spacer></v-spacer>
      <div class="mt-n5">
        <v-btn icon="mdi-dots-horizontal" size="small" flat class=""></v-btn>
      </div>
    </div>
    <v-card-text class="pa-5" :class="post.text.length <= 20 ? 'text-h5' : ''">
      {{ post.text }}
    </v-card-text>
    <div>
      <v-divider></v-divider>
      <v-row>
        <v-col class="px-0">
          <v-btn
            block
            flat
            class="text-capitalize rounded-0"
            prepend-icon="mdi-thumb-up-outline"
          >
            Like
          </v-btn>
        </v-col>
        <v-col class="px-0">
          <v-btn
            block
            flat
            color="grey-darken-3"
            variant="text"
            class="text-capitalize rounded-0"
            prepend-icon="mdi-message-text-outline"
            >Comment</v-btn
          >
        </v-col>
        <v-col class="px-0">
          <v-btn
            block
            flat
            color="grey-darken-3"
            variant="text"
            class="text-capitalize rounded-0"
            prepend-icon="mdi-share-outline"
            >Share</v-btn
          >
        </v-col>
      </v-row>
    </div>
    <v-card-actions class="d-flex flex-column">
      <div class="w-100 d-flex px-5">
        <v-avatar size="50" class="border mr-5">
          <v-img
            src="https://as2.ftcdn.net/v2/jpg/02/44/42/79/1000_F_244427911_aoHHulebtYy4wLpncBBuWqCTNFKolcCB.jpg"
          ></v-img>
        </v-avatar>
        <v-text-field
          label="Write your comment"
          single-line
          v-model="comment"
          rounded
          density="compact"
          variant="outlined"
          @keyup.enter="commenthandler"
          hide-details
          append-inner-icon="mdi-send"
        ></v-text-field>
      </div>
      <h5 class="w-100 mt-4 font-weight-regular text-center" v-if="!post.comment">
        No Comments
      </h5>
      <div class="px-5 w-100">
        <card-comment v-if="post.comment" :comment="post.comment"></card-comment>
      </div>
    </v-card-actions>
  </v-card>
</template>
