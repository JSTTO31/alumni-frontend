<template>
  <div>
    <v-menu location="center center">
      <template #activator="{ props }">
       <avatar 
        style="border: 2px solid white"
        size="175" :user="user" v-bind="props" v-if="user"></avatar>
      </template>
      <v-list class="" style="margin-top: 150px; margin-left: 100px">
        <v-list-item @click="view = true" density="compact" append-icon="mdi-eye-outline"
          >View</v-list-item
        >
        <v-list-item
          @click="$router.push({ name: 'alumni-alumni-index-authorize-edit-profile-picture' })"
          density="compact"
          append-icon="mdi-pencil-outline"
          v-if="user?.id == auth?.id"
          >Change</v-list-item
        >
      </v-list>
    </v-menu>
    <v-dialog width="650" height="650" v-model="view">
      <avatar class="rounded-lg" style="border: 0" size="650" :user="user"></avatar>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
const {user: auth} = storeToRefs(useAuthStore())
const { user } = storeToRefs(useProfileStore());
const view = ref(false);
</script>

<style scoped></style>
