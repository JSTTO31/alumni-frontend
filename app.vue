<script setup>
useHead({
  link: [
    {
      rel: "icon",
      href: "/chief.png",
      type: "image/x-icon",
    },
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css',
    },
  ],
  // script: [
  //   {
  //     src: 'https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js'
  //   }
  // ],
  titleTemplate: (title) => title ? title + " | AU Connect" : "AU Connect" 
});
</script>
<template>
  <v-app>
    <ClientOnly>
      <div class="h-100 bg-grey-lighten-5">
        <NuxtLoadingIndicator></NuxtLoadingIndicator>
        <nuxt-page></nuxt-page>
      </div>
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
