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
      <v-container class="py-0">
        <v-row>
          <v-col cols="3" class="pt-8" v-if="true">
            <div style="position: fixed;width: 270px;">
              <v-card flat style="background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(176,229,208,1) 42%, rgba(92,202,238,0.41) 93.6% );"
                class="mb-3 rounded-lg d-flex flex-column align-center py-10 pa-5"
                @click="$router.push({ name: 'alumni', params: { alumni: user.email } })">
                <v-avatar size="150" class="">
                  <v-img
                    src="https://as2.ftcdn.net/v2/jpg/02/44/42/79/1000_F_244427911_aoHHulebtYy4wLpncBBuWqCTNFKolcCB.jpg"></v-img>
                </v-avatar>
                <h4 class="mt-5 text-white" style="font-family: 'Poppins;">
                  {{ user.name }}
                </h4>
                <h6 class="font-weight-regular text-white text-center px-1">Bachelor of Science in Computer Science</h6>
                <div>
                  <v-btn class="mt-4" size="small" block
                    @click="useRouter().push({ name: 'alumni', params: { alumni: 'joshuasotto@example.example' } })">View
                    Profile</v-btn>
                </div>
              </v-card>
              <v-card class="rounded-lg pa-4 border" height="300" flat>
                <h5>People Connected</h5>
                <div class="d-flex flex-wrap mt-2">
                  <v-badge color="success" class="mb-4 ml-1" dot location="bottom right" :key="n" v-for="n in 6">
                    <v-avatar size="55" class="border">
                      <nuxt-img class="h-100 w-100" :src="'https://source.unsplash.com/random/50x50&person&' + n"></nuxt-img>
                    </v-avatar>
                  </v-badge>
                  <v-btn icon="mdi-account-plus" class="text-capitalize ml-1" size="55" variant="text"></v-btn>
                </div>
              </v-card>
            </div>
          </v-col>
          <!-- <v-col cols="1" class="pt-8 d-flex flex-column align-center">
              <div style="position:fixed" class="d-flex flex-column">
                <v-badge color="success" class="mb-4" dot location="bottom right" :key="n" v-for="n in 6">
                  <v-card class="rounded-circle border" elevation="5" @click="" style="overflow: visible !important;">
                    <v-avatar size="60" class="border">
                      <v-img :src="'https://source.unsplash.com/random/50x50?person&' + 'person' + n"></v-img>
                    </v-avatar>
                  </v-card>
                </v-badge>
                <v-btn icon="mdi-account-plus" size="60"></v-btn>
              </div>
          </v-col> -->
          <v-col class="pt-8 " cols="6" style="position: relative;">
            <card-post-options class="mb-4"></card-post-options>
            <!-- <v-card class="d-flex bg-transparent mb-5" flat style="position: relative">
                <div v-ripple="true" v-for="n in 5" style="cursor: pointer;" class="mr-2 rounded-lg bg-grey-lighten-4">
                  <v-hover v-slot="{props, isHovering}">
                    <v-img v-bind="props" style="transition: all .2s linear;" :style="isHovering ? 'filter: brightness(1)' : 'filter:brightness(.7)'" height="250" class="rounded-lg" width="250" :src="'https://source.unsplash.com/random/300x300?celebrity&' + n"  lazy-src="/empty-cover.jpg"></v-img>
                  </v-hover>
                </div>
            </v-card> -->
            <div class="d-flex align-center py-5">
              <v-divider thickness="2" class="mr-5" color="black"></v-divider>
              <span class="d-flex">relevant <v-icon>mdi-chevron-down</v-icon></span>
            </div>
            <!-- <v-btn icon="mdi-chevron-right" style="position: absolute;right: 15px;top: 250px;"></v-btn> -->
            <suspense>
              <card-post-container></card-post-container>
              <template #fallback>
                <skeleton-post v-for="n in 3" :key="n" class="mb-2 rounded-0 border-b" flat></skeleton-post>
              </template>
            </suspense>
          </v-col>
       
          <v-col cols="3" v-if="true">
            <div class="pt-5" style="position:fixed;width: 270px">
              <v-card class="pa-5 rounded-lg d-flex flex-column align-center border" flat>
                <h4 class="font-weight-medium">Complete Your Profile</h4>
                <v-progress-circular class="my-5" size="120" :model-value="80" color="primary" width="6">
                  <h3 class="font-weight-medium">80%</h3>
                </v-progress-circular>
                <v-timeline side="end"  density="compact">
                  <v-timeline-item dot-color="grey" size="x-small" class="text-caption font-weight-bold">
                    General Information
                  </v-timeline-item>
                  <v-timeline-item dot-color="grey" size="x-small" class="text-caption font-weight-bold">
                    Work Experience
                  </v-timeline-item>
                  <v-timeline-item dot-color="primary" icon="mdi-check" size="x-small"
                    class="text-caption font-weight-bold">
                    Profile Photo
                  </v-timeline-item>
                  <v-timeline-item dot-color="primary" icon="mdi-check" size="x-small"
                    class="text-caption font-weight-bold">
                    Cover Photo
                  </v-timeline-item>
                </v-timeline>
              </v-card>
              <v-card class="pa-5 rounded-lg mt-5 border" flat>
                <h5 class="font-weight-regular">Suggested For you</h5>
                <div class="pt-2">
                  <v-avatar size="45" v-for="n in 8" class="ma-1">
                    <nuxt-img class="w-100 h-100" :src="'https://source.unsplash.com/random/45x45&person&' + n"></nuxt-img>
                  </v-avatar>
                </div>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-dialog @click:outside="$router.push('/')" persistent no-click-animation width="1250" height="650" :model-value="$route.name == 'index-posts-post'">
      <suspense>
        <nuxt-page></nuxt-page>
        <template #fallback>
          <v-card height="750" class="w-100 d-flex align-center justify-center" color="transparent" flat elevation="0">
            <v-progress-circular size="65" width="6" color="primary"  indeterminate></v-progress-circular>
          </v-card>
        </template>
      </suspense>
    </v-dialog>
  </nuxt-layout>
</template>

<style lang="scss" scoped></style>
