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
    <v-main>
      <v-container class="pt-8">
        <v-row>
          <v-col cols="9">
            <v-card class="rounded-lg border pb-5" flat>
              <v-row>
                <v-col>
                  <v-card class="rounded-0" flat height="200">
                    <img class="w-100"
                      src="https://images.unsplash.com/photo-1521080755838-d2311117f767?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D" />
                  </v-card>
                </v-col>
              </v-row>
              <div style="margin-top: -160px" class="px-10 d-flex align-end">
                <v-avatar size="250" class="border">
                  <v-img
                    src="https://as2.ftcdn.net/v2/jpg/02/44/42/79/1000_F_244427911_aoHHulebtYy4wLpncBBuWqCTNFKolcCB.jpg"></v-img>
                </v-avatar>
                <v-spacer></v-spacer>
                <v-btn prepend-icon="mdi-pen" class="mb-5 text-capitalize" color="#1F6E8C">Edit profile</v-btn>
              </div>
              <v-row>
                <v-col>
                  <v-row>
                    <v-col class="pb-0">
                      <v-card class="pa-5 pb-0" flat>
                        <span style="font-size: 12px">Student name</span>
                        <h3 class="font-weight-medium">Joshua Sotto</h3>
                      </v-card>
                    </v-col>
                    <v-col class="pb-0">
                      <v-card class="pa-5 pb-0" flat>
                        <span style="font-size: 12px">Student number</span>
                        <h3 class="font-weight-medium">19-1020</h3>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" class="pb-0">
                      <v-card class="pa-5" flat>
                        <span style="font-size: 12px">Academic Information</span>
                        <h3 class="font-weight-medium">BS Computer Science, 2020</h3>
                      </v-card>
                    </v-col>
                    <v-col cols="6" class="pb-0">
                      <v-card class="pa-5" flat>
                        <span style="font-size: 12px">Occupation</span>
                        <h3 class="font-weight-medium">Unemployed</h3>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card class=" rounded-lg border mb-3" flat>
              <div class="pa-5 pb-0">
                <h4 class="font-weight-medium">
                  People who viewed <v-icon>mdi-eye-outline</v-icon>
                </h4>
                <v-divider></v-divider>
                <v-list>
                  <v-card flat class="d-flex" v-for="n in 4">
                    <v-col cols="3">
                      <v-avatar size="45">
                        <v-img src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col cols="10">
                      <v-list-item-title>Joshua Sotto</v-list-item-title>
                      <v-list-item-subtitle>Bachelor of Science in Computer Science</v-list-item-subtitle>
                      <v-btn class="text-capitalize mt-2" prepend-icon="mdi-send" size="small" rounded variant="outlined">message</v-btn>
                    </v-col>
                  </v-card>
                </v-list>
              </div>
              <v-btn block flat class="text-capitalize font-weight-medium">View all</v-btn>
            </v-card>
            <v-card class=" rounded-lg border mb-3" flat>
              <div class="pa-5 pb-0">
                <h4 class="font-weight-medium">
                  Your Batch Mate <v-icon>mdi-school</v-icon>
                </h4>
                <v-divider></v-divider>
                <v-list>
                  <v-card flat class="d-flex" v-for="n in 4">
                    <v-col cols="3">
                      <v-avatar size="45">
                        <v-img src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col cols="10">
                      <v-list-item-title>Joshua Sotto</v-list-item-title>
                      <v-list-item-subtitle>Bachelor of Science in Computer Science</v-list-item-subtitle>
                      <v-btn class="text-capitalize mt-2" prepend-icon="mdi-send" size="small" rounded variant="outlined">message</v-btn>
                    </v-col>
                  </v-card>
                </v-list>
              </div>
              <v-btn block flat class="text-capitalize font-weight-medium">View all</v-btn>
            </v-card>
            <v-card class=" rounded-lg border" flat>
              <div class="pa-5 pb-0">
                <h4 class="font-weight-medium">
                  Your might want to join <v-icon>mdi-emoticon-outline</v-icon>
                </h4>
                <v-divider></v-divider>
                <v-list>
                  <v-card flat class="d-flex" v-for="n in 4">
                    <v-col cols="3">
                      <v-avatar size="45">
                        <v-img src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col cols="10">
                      <v-list-item-title>Joshua Sotto</v-list-item-title>
                      <v-list-item-subtitle>Bachelor of Science in Computer Science</v-list-item-subtitle>
                      <v-btn class="text-capitalize mt-2" prepend-icon="mdi-send" size="small" rounded variant="outlined">message</v-btn>
                    </v-col>
                  </v-card>
                </v-list>
              </div>
              <v-btn block flat class="text-capitalize font-weight-medium">View all</v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </nuxt-layout>
</template>
