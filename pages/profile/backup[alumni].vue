<script setup>
definePageMeta({
  layout: 'authenticated',
  middleware: ['auth']
})
const { user } = storeToRefs(useProfileStore())
</script>
<template>
  <nuxt-layout>
    <v-main>
      <v-container class="px-7">
        <v-row>
          <v-col cols="3">
            <div style="position: fixed;width: 270px;" class="pa-5">
              <v-card flat class="d-flex bg-grey-lighten-4 rounded-lg align-center justify-center" v-if="user">
                <v-card class="w-100 h-100 pa-0 d-flex align-center justify-center" flat>
                  <img class="w-100 rounded-lg"
                    src="https://scontent.fmnl3-4.fna.fbcdn.net/v/t39.30808-6/350809737_202104772726649_132464225368296042_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=SeWZSicAy7kAX-NGmtQ&_nc_ht=scontent.fmnl3-4.fna&oh=00_AfDn_CVEfWU16-Wg__3sfJo6gdUYawdz1WDi2vNqyR1oHg&oe=655BB0C8">
                </v-card>
              </v-card>
              <h3 class="font-weight-medium text-center text-capitalize mt-5" v-if="user">
                {{ user.name }}
              </h3>
             
            </div>
            
          </v-col>
          <v-col class="pa-0" cols="7">
            <nuxt-page></nuxt-page>
          </v-col>
          <v-col cols="2">
            <div v-if="!!$route.params.alumni" style="position: fixed;">
                <v-tabs color="primary" direction="vertical" >
                    <v-tab rounded class="text-capitalize" 
                      :to="{ name: 'profile-alumni-about', params: { alumni: $route.params.alumni } }">About</v-tab>
                    <v-tab rounded class="text-capitalize" 
                      :to="{ name: 'profile-alumni', params: { alumni: $route.params.alumni } }">Activities</v-tab>
                    
                    <v-tab rounded class="text-capitalize" 
                      :to="{ name: 'profile-alumni-employment', params: { alumni: $route.params.alumni } }">Employment</v-tab>
                    <v-tab rounded class="text-capitalize" >Connections</v-tab>
                    <v-tab rounded class="text-capitalize" >More</v-tab>
                </v-tabs>
              </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </nuxt-layout>
</template>

<style lang="scss" scoped></style>