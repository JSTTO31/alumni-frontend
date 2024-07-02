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
        <Suspense>
          <PostContainer></PostContainer>
          <template #fallback>
            <div>
              <v-skeleton-loader class="bg-transparent mt-n4" type="chip, actions, divider"></v-skeleton-loader>
              <v-skeleton-loader type="avatar, chip, actions, image, button, button, button" class="rounded-lg border mt-5" v-for="n in 3"></v-skeleton-loader>
            </div>
          </template>
        </Suspense>
      </div>
      <div class="pb-15" flat>
        <HomeShareThisCard></HomeShareThisCard>

        <suspense>
          <div>
              <HomeConnectionRequestDrawer width="325" class="mb-5"></HomeConnectionRequestDrawer>
              <HomeSuggestionDrawer width="325"></HomeSuggestionDrawer>
          </div>
          <template #fallback>
            <v-card width="325" flat class="rounded-lg border mb-4" v-for="n in 3" style="overflow:hidden">
                <v-skeleton-loader class="w-100" type="avatar, chip"></v-skeleton-loader>
                <v-skeleton-loader type="actions"></v-skeleton-loader>
            </v-card>
          </template>
        </suspense>
      </div>       
  </v-container>
</template>

<style lang="scss" scoped></style>
