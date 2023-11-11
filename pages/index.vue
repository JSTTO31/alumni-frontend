<script setup>
definePageMeta({
  middleware: ["auth"],
  layout: "authenticated",
});
useHead({
  title: "Tracking System | Home",
});
const $auth = useAuthStore();
const $post = usePostStore();
const { user } = storeToRefs($auth);
const { posts } = storeToRefs($post);
$post.getAll();
</script>
<template>
  <nuxt-layout>
    <v-main>
      <div class="pa-5">
        <card-post-options></card-post-options>
        <card-post :post="post" flat v-for="post in posts"> </card-post>
      </div>
      <h4 class="text-center">No more posts</h4>
    </v-main>
    <v-navigation-drawer color="transparent" flat floaing class="border-0" width="480">
      <div class="pr-2" style="padding-top: 100px">
        <v-card
          flat
          class="d-flex flex-column align-center rounded-lg pa-5 py-10 ml-auto border"
          style="z-index: 200; overflow: visible"
          width="300"
        >
          <v-avatar size="150" class="border" style="margin-top: -110px">
            <v-img
              src="https://as2.ftcdn.net/v2/jpg/02/44/42/79/1000_F_244427911_aoHHulebtYy4wLpncBBuWqCTNFKolcCB.jpg"
            ></v-img>
          </v-avatar>
          <h3 class="mt-5" style="font-family: 'Poppins;">
            {{ user.name }}
          </h3>
          <h4 class="font-weight-regular">BSCS</h4>
          <div class="mt-3">
            <v-btn class="mx-2" icon="mdi-account-multiple-plus"></v-btn>
            <v-btn class="mx-2" icon="mdi-account-multiple-check"></v-btn>
            <v-btn class="mx-2" icon="mdi-account-eye"></v-btn>
            <v-btn
              class="mt-4"
              color="#1F6E8C"
              block
              @click="useRouter().push({ name: 'profile-edit' })"
              >View Profile</v-btn
            >
          </div>
        </v-card>
      </div>
    </v-navigation-drawer>

    <v-navigation-drawer
      location="right"
      flat
      floating
      class="border-0"
      color="transparent"
      width="425"
    >
      <div class="pl-2 pt-5">
        <p class="mb-2">Connection Request</p>

        <v-card flat width="250" class="rounded-lg d-flex border pa-5 flex-column">
          <div class="d-flex">
            <v-avatar size="60" class="border mr-2">
              <v-img
                src="https://as2.ftcdn.net/v2/jpg/02/44/42/79/1000_F_244427911_aoHHulebtYy4wLpncBBuWqCTNFKolcCB.jpg"
              ></v-img>
            </v-avatar>
            <div>
              <h4>Joshua Sotto</h4>
              <h5 class="font-weight-regular">25 minutes ago</h5>
            </div>
          </div>
          <div class="d-flex mt-2">
            <v-btn color="#1F6E8C" flat size="small" class="text-capitalize w-50"
              >Accept</v-btn
            >
            <v-btn color="transparent" flat size="small" class="text-capitalize w-50 ml-2"
              >Remove</v-btn
            >
          </div>
        </v-card>
        <div class="mt-4">
          <p>People connected with you</p>
        </div>
      </div>
    </v-navigation-drawer>
  </nuxt-layout>
</template>

<style lang="scss" scoped></style>
