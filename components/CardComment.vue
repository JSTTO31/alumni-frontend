<script setup lang="ts">
const props = defineProps(["comment"]);
</script>
<template>
  <v-card class="w-100 d-flex py-2" flat>
    <div>
      <v-avatar size="50" class="border mr-2">
        <v-img
          src="https://as2.ftcdn.net/v2/jpg/02/44/42/79/1000_F_244427911_aoHHulebtYy4wLpncBBuWqCTNFKolcCB.jpg"
        ></v-img>
      </v-avatar>
    </div>
    <div class="d-flex w-100 flex-column">
      <v-card
        class="w-100 pr-5 px-3 py-2 rounded-lg"
        style="font-weight: 400 !important; font-family: 'Poppins'; font-size: 15px"
        color="grey-lighten-4 "
        flat
      >
        <div>
          <h5 class="font-weight-medium">{{ comment.user.name }}</h5>
          <h6 class="font-weight-regular text-grey-darken-1">
            Bachelor of Science in Computer Science
          </h6>
        </div>
        <div class="pt-2">
          {{ comment.text }}
        </div>
      </v-card>
      <div class="text-caption font-weight-bold pt-2">
        <span>Like</span>
        <span class="mx-2">|</span>
        <span>Reply</span>
      </div>
    </div>
  </v-card>
</template>

<style scoped></style>
