<template>
    <NuxtLayout>
        <v-main class="h-100">
          <div class="py-5 w-66">
            <h1 class="text-grey-darken-3 mb-5">Create Post</h1>
            <v-tabs clas="mt-5">
              <v-tab class="px-5 text-capitalize"  prepend-icon="mdi-text">Text</v-tab>
              <v-tab class="px-5 text-capitalize" prepend-icon="mdi-image">Media</v-tab>
              <v-tab class="px-5 text-capitalize" prepend-icon="mdi-link-variant">Link</v-tab>
              <v-tab class="px-5 text-capitalize" prepend-icon="mdi-poll">Vote</v-tab>
            </v-tabs>
            <ClientOnly>
              <NuxtPage>
              </NuxtPage>
              <template #fallback></template>
            </ClientOnly>
          </div>
        </v-main>
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout:'authenticated'
})
useHead({
  title: "Home",
});
</script>

<style scoped>

</style>