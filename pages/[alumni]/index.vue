<script setup>
const route = useRoute();
const { user } = storeToRefs(useProfileStore())
useHead({
  title: computed(() => user.value?.name),
})
definePageMeta({
  layout: 'authenticated',
})

function open(){
  if(!user.value) return;
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
              <v-card class="pa-5 mt-5 rounded-lg d-flex" @click="open" variant="flat" color="primaryVariant">
                <h3>{{ user.work.company_name }}</h3>
                <v-spacer></v-spacer>
                <v-icon>mdi-open-in-new</v-icon>
              </v-card>
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
    <v-overlay class="d-flex align-start pt-15 justify-center" transition="slide-y-transition"  width="750" :model-value="$route.name.includes('alumni-index-edit') || $route.name.includes('alumni-index-add') || $route.name.includes('alumni-index-delete')" @click:outside="$router.push({name: 'alumni'})" persistent no-click-animation>
        <NuxtPage></NuxtPage>
    </v-overlay>
    <v-dialog fullscreen  class="d-flex align-start pt-15 justify-center" :model-value="$route.name.includes('alumni-index-images')" persistent no-click-animation>
        <NuxtPage></NuxtPage>
    </v-dialog>
  </v-container>
</template>



<style  scoped>

</style>