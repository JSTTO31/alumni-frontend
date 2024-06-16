<script setup>
const { user } = storeToRefs(useProfileStore())
useHead({
  title: computed(() => user.value?.name),
})
function open() {
  if (!user.value) return;
  window.open(user.value.work.company_website, "_blank")
}

</script>
<template>
  <v-container class="px-0">
    <AlumniCardAbout></AlumniCardAbout>
    <AlumniCardSkills></AlumniCardSkills>
    <v-container class="pa-0">
      <v-row>
        <v-col cols="5" class="pb-13">
          <v-card class="border h-25 pa-3 rounded-lg" flat v-if="user">
            <v-card-title class="font-weight-medium d-flex py-0 align-center">
              Currently working with...
            </v-card-title>
            <v-card-text>
              <v-card v-if="user.work" class="pa-5 mt-5 rounded-lg d-flex" @click="open" variant="flat"
                color="primaryVariant">
                <h3 style="text-wrap: nowrap;">{{ user.work.company_name }}</h3>
                <v-spacer></v-spacer>
                <v-icon>mdi-open-in-new</v-icon>
              </v-card>
              <div v-else class="py-10 text-center">
                No Available
              </div>
            </v-card-text>
          </v-card>
          <AlumniCardCertification></AlumniCardCertification>
        </v-col>
        <v-col cols="7">
          <AlumniCardWork></AlumniCardWork>
          <AlumniCardEducation></AlumniCardEducation>
        </v-col>
      </v-row>
    </v-container>
    <AlumniCardImages></AlumniCardImages>
    <AlumniCardLinks></AlumniCardLinks>
    <v-overlay class="d-flex align-start justify-center pt-15" scrollable transition="slide-y-transition" width="750"
      :model-value="$route.name.includes('alumni-alumni-index-authorize-edit') || $route.name.includes('alumni-alumni-index-authorize-add') || $route.name.includes('alumni-alumni-index-authorize-delete') || $route.name.includes('alumni-alumni-index-informations') || $route.name.includes('alumni-alumni-index-authorize-verification')"
      @click:outside="$router.push({ name: 'alumni-alumni' })" persistent no-click-animation>
      <Suspense>
        <NuxtPage></NuxtPage>
        <template #fallback>
          <v-card class="rounded-lg mb-5 border d-flex align-center justify-center" style="padding-block: 250px;">
            <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
          </v-card>
        </template>
      </Suspense>
    </v-overlay>
    <v-dialog fullscreen class="d-flex align-start pt-xl-15 pt-5 justify-center"
      :model-value="$route.name.includes('alumni-index-images')" persistent no-click-animation>
      <NuxtPage></NuxtPage>
    </v-dialog>
  </v-container>
</template>



<style scoped>
body{
  overflow: scroll !important;
}


</style>