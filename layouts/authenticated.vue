<script setup>
const $auth = useAuthStore();
</script>
<template>
  <v-app class="" style="background: #F8F6F4">
    <v-app-bar flat class="border-b" color="primaryVariant">
      <v-container class="d-flex align-center">
        <h3 @click="useRouter().push({ name: 'index' })" style="cursor: pointer">
          <span class="pa-2 text-primaryVariant bg-white rounded-lg mr-2">Alumni</span>
          <span class="text-white">Tracking</span>
        </h3>
        <v-spacer></v-spacer>
        <v-tabs class="ml-5 pr-5" density="compact">
          <v-tab to="/">
            <v-icon size="25">mdi-home</v-icon>
          </v-tab>
          <v-tab>
            <v-icon size="25">mdi-briefcase</v-icon>
          </v-tab>
          <v-tab>
            <v-icon size="25">mdi-calendar</v-icon>
          </v-tab>
          <v-tab :to="{name: 'network'}">
            <v-icon size="25" >mdi-account-multiple</v-icon>
          </v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
       <dialog-search>
        <template #activator="props">
          <v-card v-bind="props" class=" rounded-pill mr-3" color="white" style="border-color: #028090;" flat variant="elevated">
            <v-avatar size="35" class=" border-0">
              <v-icon color="primary">mdi-magnify</v-icon>
            </v-avatar>
            <span class="pr-4 font-weight-medium text-primary">
              ctrl + k
            </span>
          </v-card>
        </template>
       </dialog-search>
        <v-btn class="mr-2" icon="mdi-bell"></v-btn>
        <v-btn class="mr-4" icon="mdi-message-text"></v-btn>
        <v-menu location="bottom end">
          <template #activator="{ props }">
            <v-avatar v-bind="props">
              <v-img
                src="https://as2.ftcdn.net/v2/jpg/02/44/42/79/1000_F_244427911_aoHHulebtYy4wLpncBBuWqCTNFKolcCB.jpg?ads"></v-img>
            </v-avatar>
          </template>
          <v-card class="rounded-lg d-flex flex-column" width="250">
            <v-card height="80" width="100%" class="rounded-0" flat>
              <img class="w-100" src="https://source.unsplash.com/random/250x80" />
            </v-card>
            <v-avatar size="80" class="mx-auto border mt-n10">
              <v-img src="https://as2.ftcdn.net/v2/jpg/02/44/42/79/1000_F_244427911_aoHHulebtYy4wLpncBBuWqCTNFKolcCB.jpg?ads"></v-img>
            </v-avatar>
            <v-list>
              <v-list-item @click="" prepend-icon="mdi-account">Profile</v-list-item>
              <v-list-item @click="" prepend-icon="mdi-tune-variant">Settings</v-list-item>
              <v-list-item @click="$auth.logout()" prepend-icon="mdi-logout">Logout</v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-container>
    </v-app-bar>
    <!-- <v-card icon="mdi-message-text" @click="" color="secondary" class="pt-2 px-7 rounded-b-0 pb-1"
      style="position: fixed;bottom: 0px; right: 35px;user-select: none;" variant="elevated">
      <h4 class="font-weight-regular"><v-icon class="mr-2" size="20">mdi-message</v-icon>Messages</h4>
    </v-card> -->
    <slot></slot>
  </v-app>
</template>
