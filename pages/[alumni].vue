<script setup>
definePageMeta({
  layout: 'authenticated',
  middleware: ['auth']
})
const route = useRoute()
const { user, loading } = storeToRefs(useProfileStore())
await useProfileStore().getProfile(route.params.alumni)
</script>
<template>
  <nuxt-layout>
    <Suspense>
      <div>
        <AlumniProfileContainer></AlumniProfileContainer>
        <div class="text-caption mb-5">Privacy  · Terms · Arellano Connect © 2024</div>
      </div>
      <template #fallback>
          <AlumniProfileSkeleton></AlumniProfileSkeleton>
      </template>
    </Suspense>
  </nuxt-layout>
</template>

<style lang="scss" scoped></style>