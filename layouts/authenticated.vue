<script setup>
import useConversationObjects from '~/composables/useConversationObjects';
import useNotificaionObject from '../composables/useNotificationObjects'
import { useChatStore } from '~/stores/useChatStore';
const $auth = useAuthStore();
const { notifications } = useNotificaionObject
const conversations = useConversationObjects
const { selected } = storeToRefs(useChatStore())
const {user} = storeToRefs(useAuthStore())
const isSelected = computed(() => (person) => selected.value.some(item => item.participants[1] == person))
</script>
<template>
  <v-app style="background: #F8F6F4">
    <v-app-bar flat class="border-b" density="compact" color="primaryVariant">
      <v-container class="d-flex align-center">
        <h4 @click="useRouter().push({ name: 'index' })" style="cursor: pointer">
          <span class="pa-2 text-primaryVariant bg-white rounded-lg mr-2">Arellano</span>
          <span class="text-white">Connect</span>
        </h4>
        <v-spacer></v-spacer>
        <v-tabs class="ml-5 pr-5" stacked align-tabs="center" density="compact">
          <v-tab size="small" class="text-capitalize" to="/">
            <v-icon size="25">mdi-home</v-icon>
            Home
          </v-tab>
          <v-tab size="small" class="text-capitalize" :to="{ name: 'job' }">
            <v-icon size="25">mdi-briefcase</v-icon>
            Jobs
          </v-tab>
          <v-tab size="small" class="text-capitalize" :to="{ name: 'network' }">
            <v-icon size="25">mdi-account-multiple</v-icon>
            People
          </v-tab>
          <v-tab size="small" class="text-capitalize" :to="{ name: 'network' }">
            <v-icon size="25">mdi-bell</v-icon>
            Notification
          </v-tab>
          <v-tab size="small" class="text-capitalize" :to="{ name: 'network' }">
            <v-icon size="25">mdi-chat</v-icon>
            Chat
          </v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
        <!-- <v-menu>
          <template #activator="{ props }">
            <v-btn class="mr-2" icon="mdi-bell" v-bind="props"></v-btn>
          </template>
          <v-card width="350" height="650" class="mt-2 rounded-lg">
            <v-layout class="w-100 h-100">
              <v-app-bar flat class="font-weight-medium" density="compact">
                <v-card-title>
                  Notifications <v-chip>{{ notifications.length }}</v-chip>
                </v-card-title>
              </v-app-bar>
              <v-app-bar flat class="px-2 border-b" density="compact">
                <v-chip>All Notifications</v-chip>
                <v-chip variant="text">Read</v-chip>
                <v-chip variant="text">Unread</v-chip>
              </v-app-bar>
              <v-main id="notification-card" style="overflow-y: auto;">
                <v-list class="px-2">
                  <v-list-item flat @click="" class="rounded-lg mb-2" v-for="notification in notifications"
                    :key="notification.title" :subtitle="notification.message" :title="notification.title">
                    <template #prepend>
                      <v-btn color="primary" class="mr-4 mt-n3" variant="tonal" icon="mdi-briefcase-outline"
                        v-if="notification.type == 'Job'"></v-btn>
                      <v-btn color="success" class="mr-4 mt-n3" variant="tonal" icon="mdi-chat-outline"
                        v-else-if="notification.type == 'Message'"></v-btn>
                      <v-btn color="primary" class="mr-4 mt-n3" variant="tonal" icon="mdi-briefcase"
                        v-else-if="notification.type == 'Candidate'"></v-btn>
                      <v-btn color="info" class="mr-4 mt-n3" variant="tonal" icon="mdi-post-outline"
                        v-else-if="notification.type == 'Post'"></v-btn>
                      <v-btn color="info" class="mr-4 mt-n3" variant="tonal" icon="mdi-pen"
                        v-else-if="notification.type == 'Interview'"></v-btn>
                      <v-btn color="secondary" class="mr-4 mt-n3" variant="tonal" icon="mdi-application"
                        v-else-if="notification.type == 'Application'"></v-btn>
                      <v-btn color="blue" class="mr-4 mt-n3" variant="tonal" icon="mdi-emoticon-happy-outline"
                        v-else></v-btn>
                    </template>
                    <div class="d-flex">
                      <div class="mt-2">
                        <v-chip class="text-caption" color="error" density="compact"
                          v-if="notification.priority == 'High'">{{
          notification.priority }}</v-chip>
                        <v-chip class="text-caption" density="compact" color="warning"
                          v-else-if="notification.priority == 'Medium'">{{ notification.priority }}</v-chip>
                        <v-chip class="text-caption" density="compact" color="blue" v-else>{{ notification.priority
                          }}</v-chip>

                      </div>

                    </div>
                  </v-list-item>
                </v-list>
              </v-main>
            </v-layout>
          </v-card>
        </v-menu> -->
        <!-- <v-menu :close-on-content-click="false">
          <template #activator="{ props }">
            <v-btn v-bind="props" class="mr-4" icon="mdi-message-text"></v-btn>
          </template>
          <v-card width="350" height="550" class="mt-2 rounded-lg">
            <v-layout class="w-100 h-100">
              <v-app-bar flat class="font-weight-medium" density="compact">
                <v-card-title>Messages <v-chip>{{ conversations.length }}</v-chip></v-card-title>
              </v-app-bar>
              <v-main id="notification-card" style="overflow-y: auto;">
                <v-list class="px-2">
                  <v-list-item :disabled="isSelected(convo.participants[1])" @click="selected.push(convo)"
                    :prepend-avatar="'https://source.unsplash.com/random/50x50&person&' + n" flat
                    class="rounded-lg mb-2 py-5" v-for="convo, n in conversations" :key="convo.participants[1]"
                    :title="convo.participants[1]" :subtitle="convo.messages[0].content">
                  </v-list-item>
                </v-list>
              </v-main>
            </v-layout>
          </v-card>
        </v-menu> -->
        <dialog-search>
          <template #activator="props">
            <v-card v-bind="props" class=" rounded-pill mr-3" color="white" style="border-color: #028090;" flat
              variant="elevated">
              <v-avatar size="35" class=" border-0">
                <v-icon color="primary">mdi-magnify</v-icon>
              </v-avatar>
              <span class="pr-4 font-weight-medium text-primary">
                ctrl + k
              </span>
            </v-card>
          </template>
        </dialog-search>
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
              <v-img
                src="https://as2.ftcdn.net/v2/jpg/02/44/42/79/1000_F_244427911_aoHHulebtYy4wLpncBBuWqCTNFKolcCB.jpg?ads"></v-img>
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
    <slot></slot>
    <v-footer color="transparent" app>
    </v-footer>
    <div id="conversations-container" class="d-flex align-end" style="gap: 8px;">
      <conversation-card v-for="conversation in selected" :key="conversation.participants[1]" :conversation="conversation"></conversation-card>
    </div>
  </v-app>

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
</style>
