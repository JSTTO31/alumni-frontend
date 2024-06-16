<script setup>
useHead({
  link: [
    {
      rel: "icon",
      href: "/chief.png",
      type: "image/x-icon",
    },
  ],
  titleTemplate: (title) => title ? title + " | AU Connect" : "AU Connect" 
});
</script>
<template>
  <v-app>
    <NuxtLoadingIndicator></NuxtLoadingIndicator>
    <ClientOnly>
      <nuxt-page></nuxt-page>
      <template #fallback>
        <div class="h-100 w-100 d-flex justify-center align-center" style="position:fixed">
          <loader></loader>
        </div>
      </template>
    </ClientOnly>
  </v-app>
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@300&display=swap");
body {
  font-family: "Poppins", sans-serif;
}


.page-slide-enter-active,
.page-slide-leave-active {
  transition: all 0.4s;
}
.page-slide-enter-from,
.page-slide-leave-to {
  transform: translateX(-20%);
  opacity: 0;
}
</style>
