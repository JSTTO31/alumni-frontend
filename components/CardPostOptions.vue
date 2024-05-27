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
    <v-card-text class="rounded-lg d-flex justify-center pa-4 pb-0 flex-column">
      <div class="mb-2 d-flex align-center">
        <v-card class="rounded-circle mr-4 mt-1 align-center" @click="$router.push({ name: 'alumni', params: { alumni: user.email } })"
              flat>
          <v-avatar size="50" style="border: 2px solid #05668D">
            <v-img
              :src="user.picture"></v-img>
          </v-avatar>
        </v-card>
        <v-text-field v-model="information.text"  rounded  rows="1" variant="outlined" density="compact" single-line hide-details flat label="Share your thoughts">
        </v-text-field>
      </div>
    </v-card-text>
    <v-card-actions class="pt-0 d-flex justify-space-between px-5">
      <v-btn  variant="text" class="ml-2 text-capitalize px-10 rounded-lg" flat prepend-icon="mdi-camera-outline">Media</v-btn>
      <v-btn  variant="text" class="ml-2 text-capitalize px-10 rounded-lg" flat prepend-icon="mdi-video-outline">Video</v-btn>
      <v-btn  variant="text" class="ml-2 text-capitalize px-10 rounded-lg" flat prepend-icon="mdi-poll">Vote</v-btn>
    </v-card-actions>
  </v-card>
</template>
