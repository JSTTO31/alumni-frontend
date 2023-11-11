<script setup>
definePageMeta({
  layout: "authenticated",
  middleware: ["auth"],
});
useHead({
  title: "Alumni Tracking | Profile ",
});
</script>
<template>
  <nuxt-layout>
    <v-navigation-drawer class="border-0" width="430">
      <v-list style="width: 250px" class="ml-auto pt-10 pr-2">
        <v-list-item
          active
          variant="flat"
          class="pa-3"
          append-icon="mdi-account"
          color="#1F6E8C"
          >Profile Information</v-list-item
        >
        <v-list-item
          variant="flat"
          class="pa-3 mt-2"
          append-icon="mdi-post"
          color="#1F6E8C"
          >My Post</v-list-item
        >
        <v-list-item
          variant="flat"
          class="pa-3 mt-2"
          append-icon="mdi-image-multiple"
          color="#1F6E8C"
          >Media</v-list-item
        >
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container class="pt-10">
        <v-card class="rounded-lg">
          <v-row>
            <v-col>
              <v-card class="rounded-0" flat height="200">
                <img
                  class="w-100"
                  src="https://img.freepik.com/free-vector/background-white-design-gradient-vector-modern-abstract_343694-2366.jpg"
                />
              </v-card>
            </v-col>
          </v-row>
          <div style="margin-top: -160px" class="px-10 d-flex align-end">
            <v-avatar size="250" class="border">
              <v-img
                src="https://as2.ftcdn.net/v2/jpg/02/44/42/79/1000_F_244427911_aoHHulebtYy4wLpncBBuWqCTNFKolcCB.jpg"
              ></v-img>
            </v-avatar>
            <v-spacer></v-spacer>
            <v-btn
              prepend-icon="mdi-pen"
              size="large"
              class="mb-5 text-capitalize"
              color="#1F6E8C"
              >Edit profile</v-btn
            >
          </div>
          <v-row>
            <v-col>
              <v-row>
                <v-col>
                  <v-card class="pa-5" flat>
                    <span>Student name</span>
                    <h2 class="font-weight-medium">Joshua Sotto</h2>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card class="pa-5" flat>
                    <span>Student number</span>
                    <h2 class="font-weight-medium">19-1020</h2>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card class="pa-5" flat>
                    <span>Academic Information</span>
                    <h2 class="font-weight-medium">BS Computer Science, 2020</h2>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card class="pa-5" flat>
                    <span>Occupation</span>
                    <h2 class="font-weight-medium">Unemployed</h2>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-main>
    <v-navigation-drawer
      location="right"
      width="170"
      class="border-0"
    ></v-navigation-drawer>
  </nuxt-layout>
</template>
