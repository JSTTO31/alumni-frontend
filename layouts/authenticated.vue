<script setup>
const $auth = useAuthStore();
const { user } = storeToRefs(useAuthStore());
</script>
<template>
  <v-app style="background-color: #eeeeee">
    <v-app-bar flat color="#1f6e8c">
      <v-container class="d-flex align-center">
        <h3 @click="useRouter().push({ name: 'index' })" style="cursor: pointer">
          <span
            style="background-color: white; color: #1f6e8c !important"
            class="pa-2 text-white rounded-lg mr-2"
            >Alumni</span
          >
          <span style="color: white">Tracking</span>
        </h3>
        <div class="px-5 w-33">
          <v-text-field
            label="Search..."
            prepend-inner-icon="mdi-magnify"
            density="compact"
            hide-details
            single-line
            rounded
            variant="solo"
          ></v-text-field>
        </div>
        <v-spacer></v-spacer>
        <v-tabs class="ml-5 pr-5" density="compact">
          <v-tab to="/">
            <v-icon size="25">mdi-home</v-icon>
          </v-tab>
          <v-tab>
            <v-icon size="25">mdi-briefcase</v-icon>
          </v-tab>
          <v-tab>
            <v-icon size="25">mdi-account-group</v-icon>
          </v-tab>
        </v-tabs>
        <v-btn class="mr-2" icon="mdi-bell"></v-btn>
        <v-btn class="mr-4" icon="mdi-message-text"></v-btn>
        <v-menu location="bottom end">
          <template #activator="{ props }">
            <v-avatar v-bind="props">
              <v-img
                src="https://as2.ftcdn.net/v2/jpg/02/44/42/79/1000_F_244427911_aoHHulebtYy4wLpncBBuWqCTNFKolcCB.jpg"
              ></v-img>
            </v-avatar>
          </template>
          <v-card class="rounded-lg" width="250">
            <v-list>
              <v-list-item @click="$auth.logout()" prepend-icon="mdi-logout"
                >Logout</v-list-item
              >
            </v-list>
          </v-card>
        </v-menu>
      </v-container>
    </v-app-bar>

    <slot></slot>
  </v-app>
</template>
