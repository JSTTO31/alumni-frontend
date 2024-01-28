<script setup>
definePageMeta({
  middleware: ["auth"],
  layout: "authenticated",
});
useHead({
  title: "Tracking System | Home",
});
const $auth = useAuthStore();
const { user } = storeToRefs($auth);
</script>
<template>
  <nuxt-layout>
    <v-main>
      <v-container>
        <div class="pa-5">
          <card-post-options></card-post-options>
          <suspense>
            <card-post-container></card-post-container>
            <template #fallback>
              <skeleton-post v-for="n in 3" :key="n" class="mb-2 rounded-lg border" flat></skeleton-post>
            </template>
          </suspense>
        </div>
      </v-container>
    </v-main>
    <dialog-post-view></dialog-post-view>
    <v-navigation-drawer v-if="false" color="transparent" flat floaing class="border-0" width="480">
      <div class="pr-2" style="padding-top: 100px">
        <v-card
          class="d-flex flex-column align-center rounded-lg pa-5 py-10 ml-auto"
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
              color="primary"
              block
              @click="useRouter().push({ name: 'profile-alumni', params: {alumni: 'joshuasotto@example.example'}})"
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
      width="455"
      style="padding-right: 160px"
    >
      <div class="px-2 pt-5">
        <p class="mb-2">Connection Request</p>

        <v-card  class="rounded-lg d-flex  pa-5 flex-column">
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
            <v-btn color="primary" flat size="small" class="text-capitalize w-50"
              >Accept</v-btn
            >
            <v-btn color="transparent" flat size="small" class="text-capitalize w-50 ml-2"
              >Remove</v-btn
            >
          </div>
        </v-card>
        <div class="mt-4">
          <v-card class="rounded-lg  pa-5">
            <p>Contacts</p>
            <v-card v-for="n in 5" :key="n" flat class="rounded-lg d-flex pa-2" color="transparent">
              <div class="d-flex align-center">
                <v-avatar size="60" class="border mr-2">
                  <v-img
                    src="https://as2.ftcdn.net/v2/jpg/02/44/42/79/1000_F_244427911_aoHHulebtYy4wLpncBBuWqCTNFKolcCB.jpg"
                  ></v-img>
                </v-avatar>
                <div>
                  <h5>Joshua Sotto</h5>
                  <span class="text-caption">Online at {{ Math.floor(Math.random() * 60).toString() }}m ago</span>
                </div>
              </div>
            </v-card>
          </v-card>
        </div>
      </div>
    </v-navigation-drawer>
  </nuxt-layout>
</template>

<style lang="scss" scoped></style>
