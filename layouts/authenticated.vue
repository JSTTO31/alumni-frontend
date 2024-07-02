<script setup>
import { useDisplay } from 'vuetify'
import { useChatStore } from "~/stores/useChatStore";
const $auth = useAuthStore();
const { selected } = storeToRefs(useChatStore());
const { user } = storeToRefs(useAuthStore());
const { name } = useDisplay()
</script>
<template>
  <v-app-bar flat class="border-b d-flex" color="primaryVariant"
    :style="{ paddingInline: name == 'xl' ? '300px' : '150px' }" density="comfortable">
    <h3 @click="$router.push({name: 'index'})" style="cursor: pointer" class="text-primary d-flex align-center">
      <v-avatar size="35" class="rounded-0 mr-3">
        <v-img src="/logo/chief-white.png"></v-img>
      </v-avatar>
      <span class="text-white">Alumni.</span>
    </h3>
    <dialog-search>
      <template #activator="props">
        <v-text-field style="transform: scale(.9)"  prepend-inner-icon="mdi-magnify" class="w-25 mx-5 ml-5" density="compact"
          variant="solo-filled" flat hide-details v-bind="props" single-line label="Search"></v-text-field>
      </template>
    </dialog-search>
    <v-spacer></v-spacer>
    <v-tabs class="" stacked mandatory="false">
      <v-tab size="x-small" class="text-capitalize" to="/">
        <v-icon size="25">mdi-home</v-icon>
        Home
      </v-tab>
      <v-tab size="x-small" class="text-capitalize" :to="{ name: 'job' }">
        <v-icon size="25">mdi-briefcase</v-icon>
        Jobs
      </v-tab>
      <v-tab size="x-small" class="text-capitalize" :to="{ name: 'network' }">
        <v-icon size="25">mdi-account-multiple</v-icon>
        People
      </v-tab>
      <v-tab size="x-small" class="text-capitalize" :to="{ name: 'notification' }">
        <v-badge content="5" color="red" location="right">
          <div class="d-flex flex-column align-center">
            <v-icon size="25">mdi-bell</v-icon>
            Notification
          </div>
        </v-badge>
      </v-tab>
      <v-tab size="x-small" class="text-capitalize" :to="{ name: 'chat' }">
        <v-icon size="25">mdi-chat</v-icon>
        Chat
      </v-tab>
    </v-tabs>
    <v-btn class="text-capitalize mx-5 rounded-lg" prepend-icon="mdi-plus" id="create-button" @click="$router.push({name: 'create'})">New
      post</v-btn>
    <v-menu location="bottom end">
      <template #activator="{ props }">
        <v-card flat class="rounded-pill d-flex bg-transparent align-center" v-bind="props">
          <avatar size="35" :user="user" style="border: 1px solid white">
          </avatar>
          <v-icon>mdi-chevron-down</v-icon>
        </v-card>
      </template>
      <v-card class="rounded-lg mt-4 d-flex flex-column" width="250">
        <v-card flat class="rounded-lg align-center pa-2 mb-1 d-flex" variant="text"
          @click="$router.push({ name: 'alumni-alumni', params: { alumni: user.email } })">
          <avatar :user="user" size="44" class="bg-white border mr-3">
          </avatar>
          <div class=" d-flex h-100 ml-2 flex-column">
            <h5>
              {{ user.name }}
            </h5>
            <h6>
              View Profile
            </h6>
          </div>
        </v-card>
        <v-list>
          <v-list-item @click="" prepend-icon="mdi-tune-variant">Settings</v-list-item>
          <v-list-item @click="$auth.logout()" prepend-icon="mdi-logout">Logout</v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
  <v-main :style="{ paddingInline: name == 'xl' ? '300px' : '150px' }" class="bg-grey-lighten-5">
    <slot></slot>
  </v-main>
  <div id="conversations-container" class="d-flex align-end" style="gap: 8px">
    <conversation-card v-for="conversation in selected" :key="conversation.participants[1]"
      :conversation="conversation"></conversation-card>
  </div>
  <notification-container></notification-container>
  <v-dialog :model-value="$route.query?.post && $route.query.type == 'report'" width="600" @click:outside="$router.push({query: {}})" location="top">
    <v-card>
      <PostFormReport></PostFormReport>
    </v-card>
  </v-dialog>
</template>

<style scoped>
#notification-card::-webkit-scrollbar {
  width: 8px;
}

#notification-card:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.162);
  border-radius: 25px;
}

#conversations-container {
  position: fixed;
  bottom: 0%;
  right: 5%;
}

#create-button{
  background-image: radial-gradient( circle 986.6px at 10% 20%,  rgba(251,6,6,0.94) 0%, rgba(3,31,213,1) 82.8%, rgba(248,101,248,1) 87.9% );
}
</style>
