<template>
      <div class="py-10 w-66">
        <h1 class="text-grey-darken-3 mb-5">Create Post</h1>
        <v-tabs clas="mt-5">
          <v-tab :to="{name: 'create'}" class="px-5 text-capitalize"  prepend-icon="mdi-text">Text</v-tab>
          <v-tab :to="{name: 'create-media'}" class="px-5 text-capitalize" prepend-icon="mdi-image">Media</v-tab>
          <v-tab class="px-5 text-capitalize" prepend-icon="mdi-link-variant">Link</v-tab>
          <v-tab class="px-5 text-capitalize" prepend-icon="mdi-poll">Vote</v-tab>
        </v-tabs>
        <NuxtPage>
        </NuxtPage>
      </div>
</template>

<script setup lang="ts">
useHead({
  title: "Create",
});

definePageMeta({
  layout:'authenticated',
  middleware: 'auth',
})

</script>

<style scoped>

</style>