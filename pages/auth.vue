<template>
      <v-main class="h-100 w-100">
          <NuxtPage>
          </NuxtPage>
      </v-main>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["guest"],
})

</script>

<style scoped>
.page-slide-x-enter-active,
.page-slide-x-leave-active {
  transition: all 0.25s;
}
.page-slide-x-enter-from,
.page-slide-x-leave-to {
  opacity: 0;
  transform: translateX(-50%);
}
</style>