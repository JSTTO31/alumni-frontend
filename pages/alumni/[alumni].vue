<template>
  <NuxtLoadingIndicator></NuxtLoadingIndicator>
  <nuxt-layout>
    <v-container class="pa-0 pt-5" fluid v-if="user && !pending">
        <v-row>
            <v-col cols="9">
               <alumni-profile-main></alumni-profile-main>
               <nuxt-page></nuxt-page>
            </v-col>
            <v-col cols="3">
                <v-card class="pt-3 rounded-lg mb-5 border" flat>
                    <div class="pa-5 pt-2 pb-0">
                        <h4 class="font-weight-medium">
                            People who viewed <v-icon>mdi-eye-outline</v-icon>
                        </h4>
                        <v-divider class="my-2"></v-divider>
                        <p class="text-center" v-if="user.views_count < 1">No Available View</p>
                        <v-list class="bg-transparent">
                            <AlumniCardSidePerson v-for="viewer in user.viewers" :person="viewer"></AlumniCardSidePerson>
                        </v-list>
                    </div>
                    <v-btn block flat class="text-capitalize font-weight-medium" color="transparent"
                        v-if="user.views_count > 5">View all</v-btn>
                </v-card>
                <v-card class=" rounded-lg mb-3 pt-3 border" flat>
                    <div class="pa-5 pb-0 pt-0 ">
                        <h4 class="font-weight-medium">
                            Your Batch Mate <v-icon>mdi-school</v-icon>
                        </h4>
                        <v-divider></v-divider>
                        <v-list class="bg-transparent">
                            <AlumniCardSidePerson  v-for="batchmate in user.batchmates" :person="batchmate"></AlumniCardSidePerson>
                        </v-list>
                    </div>
                    <v-btn color="transparent" block flat class="text-capitalize font-weight-medium">View
                        all</v-btn>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <AlumniProfileSkeleton v-else></AlumniProfileSkeleton>
  </nuxt-layout>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'authenticated',
  middleware: ["auth"],
})
const route = useRoute()
const { user } = storeToRefs(useProfileStore())
const { pending } = await useProfileStore().getProfile(route.params.alumni.toString())

</script>
<style lang="scss" scoped></style>