<script setup>
const {user} = storeToRefs(useAuthStore())
</script>
<template>
  <v-card class=" rounded-lg pa-0 border" flat>
    <v-card-text class="rounded-lg d-flex pa-4 flex-column">
      <div class="mb-2 d-flex align-center">
        <v-card class="rounded-circle" @click="$router.push({name: 'alumni', params: {alumni: user.email}})" flat>
          <v-avatar size="65" class="border">
            <v-img
              src="https://as2.ftcdn.net/v2/jpg/02/44/42/79/1000_F_244427911_aoHHulebtYy4wLpncBBuWqCTNFKolcCB.jpg"
            ></v-img>
          </v-avatar>
        </v-card>
        <v-text-field single-line hide-details variant="solo" flat label="Share your thoughts"></v-text-field>
        <v-btn class="ml-2 rounded-lg" flat icon="mdi-camera-outline"></v-btn>
        <v-btn class="ml-2 rounded-lg" flat icon="mdi-video-outline"></v-btn>
        <v-btn class="ml-2 rounded-lg" flat icon="mdi-poll"></v-btn>
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
    <!-- <div class="d-flex pa-5">
      <v-spacer></v-spacer>
      <v-btn color="primary">Post</v-btn>
    </div> -->
  </v-card>
</template>
