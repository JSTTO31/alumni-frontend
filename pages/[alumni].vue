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
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="9">
            <profile-main></profile-main>
            <nuxt-page></nuxt-page>
          </v-col>
          <v-col cols="3">
            <div v-if="loading">
              <SkeletonCardSidePerson v-for="n in 10" :key="n"></SkeletonCardSidePerson>
            </div>
            <div v-else>
              <v-card class="pt-0 rounded-lg mb-5" color="transparent" flat v-if="user.viewers_count > 1">
                <div class="pa-5 pt-2 pb-0" >
                  <h4 class="font-weight-medium">
                    People who viewed <v-icon>mdi-eye-outline</v-icon>
                  </h4>
                  <v-divider></v-divider>
                  <v-list class="bg-transparent">
                    <CardSidePerson v-for="viewer in user.viewers" :viewer="viewer"></CardSidePerson>
                  </v-list>
                </div>
                <v-btn block flat class="text-capitalize font-weight-medium" color="transparent"
                  v-if="user.viewers_count > 5">View all</v-btn>
              </v-card>
              <v-card class=" rounded-lg mb-3 pt-2 bg-transparent" flat>
                <div class="pa-5 pb-0 pt-0 ">
                  <h4 class="font-weight-medium">
                    Your Batch Mate <v-icon>mdi-school</v-icon>
                  </h4>
                  <v-divider></v-divider>
                  <v-list class="bg-transparent">
                    <v-card flat class="d-flex" color="transparent" v-for="batchmate in user.batchmates">
                      <v-col cols="3">
                        <v-avatar size="45">
                          <nuxt-img class="w-100 h-100"
                          :src="'https://source.unsplash.com/random/150x150&person&' + batchmate.id"></nuxt-img>
                        </v-avatar>
                      </v-col>
                      <v-col cols="10">
                        <v-hover v-slot="{ props, isHovering }">
                          <div v-bind="props" :style="isHovering ? 'text-decoration: underline;cursor: pointer' : ''"
                            @click="$router.push({ name: 'alumni', params: { alumni: batchmate.email } })">
                            <v-list-item-title>{{ batchmate.name }}</v-list-item-title>
                            <v-list-item-subtitle style="font-size: 10px;">{{ user.alumni_information.department.name }}</v-list-item-subtitle>
                          </div>
                        </v-hover>
                        <v-btn class="text-capitalize mt-2" prepend-icon="mdi-information-outline" size="small" rounded
                          variant="tonal" color="primary" @click="$router.push({name: 'alumni', params: {alumni: batchmate.email}})">View Info</v-btn>
                      </v-col>
                    </v-card>
                  </v-list>
                </div>
                <v-btn color="transparent" block flat class="text-capitalize font-weight-medium">View all</v-btn>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </nuxt-layout>
</template>

<style lang="scss" scoped></style>