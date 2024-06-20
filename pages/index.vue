<script setup>
import SuggestionDrawer from '~/components/home/SuggestionDrawer.vue';

definePageMeta({
  middleware: ['auth'],
  layout:'authenticated'
})
useHead({
  title: "Home",
});
</script>
<template>
  <NuxtLoadingIndicator></NuxtLoadingIndicator>
  <NuxtLayout>
    <v-container class="pa-0 d-flex pt-4" fluid>
        <div>
          <home-navigation-drawer-right></home-navigation-drawer-right>
        </div>
        <div class="w-100 px-5">
          <card-post-options class="mb-2"></card-post-options>
          <v-card v-if="false" class="d-flex bg-transparent mb-5" height="250" flat
            style="position: relative;overflow-x: hidden">
            <div class="d-flex" style="position: absolute;top: 0;left: 0;height: 100%">
              <v-card @click="" width="150" color="secondary" variant="tonal" style="border: 2px dashed #00A896"
                class="mr-2 d-flex align-center justify-center rounded-lg">
                <v-icon size="30">mdi-plus</v-icon>
              </v-card>
              <div v-ripple="true" v-for="n in 2" style="cursor: pointer;" class="mr-2 rounded-lg bg-grey-lighten-4">
                <v-hover v-slot="{ props, isHovering }">
                  <v-img v-bind="props" style="transition: all .2s linear;"
                    :style="isHovering ? 'filter: brightness(1)' : 'filter:brightness(.7)'" height="250"
                    class="rounded-lg" width="150" :src="'https://source.unsplash.com/random/150x250?celebrity&' + n">
                    <template #placeholder>
                      <div class="h-100 w-100 d-flex align-center justify-center">
                        <v-progress-circular indeterminate size="55" color="primary" width="5"></v-progress-circular>
                      </div>
                    </template>
                  </v-img>
                </v-hover>
              </div>
            </div>
          </v-card>
          <div class="d-flex align-center pb-2">
            <v-divider thickness="2" class="mr-5" color="black"></v-divider>
            <span class="d-flex text-subtitle-2 font-weight-bold">relevant <v-icon>mdi-chevron-down</v-icon></span>
          </div>
          <v-btn v-if="false" icon="mdi-chevron-right" style="position: absolute;right: 15px;top: 250px;"></v-btn>
          <suspense>
            <card-post-container></card-post-container>
            <template #fallback>
              <skeleton-post v-for="n in 3" :key="n" class="mb-2 rounded-0 border-b" flat></skeleton-post>
            </template>
          </suspense>
        </div>
        <div style="width: 450px" class="pb-15">
          <v-card class=" mb-5 rounded-lg border d-flex align-center justify-center flex-column pa-5" flat>
            <h4>Invite your fellow alumni</h4>
            <v-btn rounded="lg" prepend-icon="mdi-plus" variant="outlined" color="primary" class="text-capitalize mt-3">Invite Alumni</v-btn>
          </v-card>
          <HomeConnectionRequestDrawer class="mb-5"></HomeConnectionRequestDrawer>
          <HomeSuggestionDrawer></HomeSuggestionDrawer>
        </div>
    </v-container>
    <!-- <v-dialog @click:outside="$router.push('/')" persistent no-click-animation width="1250" height="650"
      :model-value="$route.name == 'index-posts-post'">
      <suspense>
        <nuxt-page></nuxt-page>
        <template #fallback>
          <v-card height="750" class="w-100 d-flex align-center justify-center" color="transparent" flat elevation="0">
            <v-progress-circular size="65" width="6" color="primary" indeterminate></v-progress-circular>
          </v-card>
        </template>
      </suspense>
    </v-dialog> -->
  </NuxtLayout>
</template>

<style lang="scss" scoped></style>
