<script setup>
definePageMeta({
  middleware: ['auth'],
  layout:'authenticated'
})
useHead({
  title: "Home",
});
</script>
<template>
  <v-container class="pa-0 d-flex pt-4" fluid>
      <div>
        <HomeNavigationDrawerRight></HomeNavigationDrawerRight>
      </div>
      <div class="w-100 px-5">
        <suspense>
          <HomeConnectionCard></HomeConnectionCard>
          <template #fallback>
            <v-card class="rounded-lg mb-5 border" flat>
              <v-skeleton-loader type="chip"></v-skeleton-loader>
              <div class="d-flex pb-5">
                <v-skeleton-loader type="avatar" v-for="n in 9"></v-skeleton-loader>
              </div>
            </v-card>
          </template>
        </suspense>
        <div class="d-flex align-center mb-4">
          <h4 class="font-weight-medium">Feeds</h4>
          <v-spacer></v-spacer>
          <v-btn variant="outlined" class="ml-3 bg-white text-grey-darken-3 rounded-xl text-capitalize">Relevant</v-btn>
          <v-btn variant="outlined" class="ml-3 bg-white text-grey-darken-3 rounded-xl text-capitalize">Latest</v-btn>
        </div>
        <v-divider thickness="2" color="black"></v-divider>
        <Suspense>
          <PostContainer></PostContainer>
          <template #fallback>
            <v-skeleton-loader type="avatar, chip, actions, image, button, button, button" class="rounded-lg border mt-5" v-for="n in 3"></v-skeleton-loader>
          </template>
        </Suspense>
      </div>
      <div class="pb-15" flat>
        <v-card class=" mb-5 rounded-lg border d-flex align-center justify-center flex-column pa-5" flat>
          <h4 class="font-weight-medium">Invite your fellow alumni</h4>
          <v-btn rounded="lg" prepend-icon="mdi-plus" variant="outlined" color="primary" class="text-capitalize mt-3">Invite Alumni</v-btn>
        </v-card>
        <suspense>
          <div>
              <HomeConnectionRequestDrawer class="mb-5"></HomeConnectionRequestDrawer>
              <HomeSuggestionDrawer></HomeSuggestionDrawer>
          </div>
          <template #fallback>
            <div class="rounded-lg border mb-4 w-100" v-for="n in 5" style="overflow:hidden">
                <v-skeleton-loader class="w-100" type="avatar, chip"></v-skeleton-loader>
                <v-skeleton-loader type="actions"></v-skeleton-loader>
            </div>
          </template>
        </suspense>
      </div>       
  </v-container>
</template>

<style lang="scss" scoped></style>
