<script setup>
const { user } = storeToRefs(useAuthStore())
const $post = usePostStore()
const {posts} = storeToRefs(usePostStore())
const information = reactive({
  text: '',
  privacy: 'public'
})


const {status, execute, data} = await $post.store(information)


async function post(){
  await execute()

  if(status.value == 'success'){
    posts.value.unshift(data.value)
    information.text = ''
  }
}

</script>

<template>
  <v-card class=" rounded-lg pa-0 border" flat>
    <v-card-text class="rounded-lg d-flex pa-4 flex-column">
      <div class="mb-2 d-flex align-start">
        <v-card class="rounded-circle mr-4" @click="$router.push({ name: 'alumni', params: { alumni: user.email } })"
              flat>
              <v-avatar size="65" class="border">
                <v-img
                  src="https://as2.ftcdn.net/v2/jpg/02/44/42/79/1000_F_244427911_aoHHulebtYy4wLpncBBuWqCTNFKolcCB.jpg"></v-img>
              </v-avatar>
            </v-card>
        <v-textarea v-model="information.text" rounded="lg"  rows="1" variant="solo-filled" auto-grow single-line hide-details flat label="Share your thoughts" class="mt-1">
          <!-- <template #append-inner>
            <div class="d-flex">
              <v-btn class="ml-2 rounded-lg" flat icon="mdi-camera-outline"></v-btn>
              <v-btn class="ml-2 rounded-lg" flat icon="mdi-video-outline"></v-btn>
              <v-btn class="ml-2 rounded-lg" flat icon="mdi-poll"></v-btn>
            </div>
          </template> -->
        </v-textarea>

      </div>
      <!-- <DialogPost>
        <template #activator="props">
          <v-textarea
            v-bind="props"
            variant="solo-filled"
            hide-details
            label="Share your thoughts"
            single-line
            rounded="lg"
            rows="5"
            readonly
            flat
          ></v-textarea>
        </template>
      </DialogPost> -->
    </v-card-text>
    <v-card-actions class="d-flex pa-5 pt-0" v-if="information.text.length > 0">
      <v-spacer></v-spacer>
      <v-btn color="primary" variant="elevated" @click="post" :loading="status == 'pending'">Post</v-btn>
      <v-btn variant="text" class="ml-2" @click="information.text = ''">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>
