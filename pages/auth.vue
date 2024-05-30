<template>
    <v-app>
        <v-main class="d-flex align-center justify-center">
            <NuxtLoadingIndicator></NuxtLoadingIndicator>
            <NuxtPage>

            </NuxtPage>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["guest"],
  pageTransition: {
    name: 'page-slide-x',
    mode: 'out-in'
  }
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