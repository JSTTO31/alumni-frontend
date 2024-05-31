<template>
    <NuxtLoadingIndicator></NuxtLoadingIndicator>
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'authenticated',
  middleware: ["auth"],

})
</script>

<style scoped>

</style>