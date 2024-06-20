<template>
  <div>
    <v-card  v-if="user?.id != auth?.id" class="rounded-circle" style="overflow: visible;" flat>
      <avatar :user="user" style="border: 2px solid white" size="175" class="onclick-scale " @click="view = true">
      </avatar>
      <v-icon v-if="!!user?.verified_at" style="position: absolute;bottom: 6%;right:6%" color="blue-darken-2" size="30"
        class="bg-white rounded-circle">mdi-check-decagram</v-icon>
    </v-card>
    <v-menu location="center center" v-else>
      <template #activator="{ props }">
        <avatar style="border: 2px solid white" size="175" :user="user" v-bind="props" v-if="user"></avatar>
      </template>
      <v-list class="" style="margin-top: 150px; margin-left: 100px">
        <v-list-item @click="view = true" density="compact" append-icon="mdi-eye-outline">View</v-list-item>
        <v-list-item @click="$router.push({ name: 'alumni-alumni-index-authorize-edit-profile-picture' })"
          density="compact" append-icon="mdi-pencil-outline" v-if="user?.id == auth?.id">Change</v-list-item>
      </v-list>
    </v-menu>
    <v-dialog width="650" height="650" v-model="view">
      <avatar class="rounded-lg" style="border: 0" size="650" :user="user"></avatar>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
const { user: auth } = storeToRefs(useAuthStore())
const { user } = storeToRefs(useProfileStore());
const view = ref(false);
</script>

<style scoped>
.onclick-scale {
  transition: .25s ease;
  cursor: pointer;
}

.onclick-scale:active {
  transform: scale(.95)
}
</style>
