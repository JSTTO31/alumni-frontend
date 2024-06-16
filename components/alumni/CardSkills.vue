<template>
  <v-card class="pa-2 rounded-lg mb-5 border" v-bind="$attrs" flat v-if="user">
    <v-card-title class="d-flex align-center">
      Skills
      <v-spacer></v-spacer>
      <div v-if="user.skills.length > 0 && auth.id == user.id">
        <v-btn
          icon="mdi-plus"
          color="grey-darken-1"
          variant="text"
          flat
          @click="$router.push({ name: 'alumni-alumni-index-authorize-add-skills' })"
        ></v-btn>
      </div>
    </v-card-title>
    <v-card-text>
      <div class="d-flex align-center justify-center" v-if="user.skills.length < 1">
        <v-btn
          class=""
          variant="flat"
          color="grey-lighten-4"
          prepend-icon="mdi-plus"
          @click="$router.push({ name: 'alumni-alumni-index-authorize-add-skills' })"
          v-if="auth.id == user.id"
          >Add your skills</v-btn
        >
        <p class="text-center pt-5" v-else>No Available</p>
      </div>
      <div v-else>
        <div
          flat
          v-for="skill in skills"
          :key="skill.id"
          class="border-b pb-4 mb-2 border-b"
        >
          <div class="font-weight-medium align-center rounded-lg d-flex">
            <b class="mr-1">{{ skill.name }}</b
            >&middot; {{ skill.certification }}
            <v-icon>mdi-star</v-icon>
            <v-spacer></v-spacer>
            <v-btn
              v-if="auth.id == user.id"
              icon="mdi-pencil"
              color="grey-darken-1"
              class="ml-2"
              variant="text"
              flat
              @click="
                router.push({ name: 'alumni-alumni-index-authorize-edit-skills', query: { id: skill.id } })
              "
            ></v-btn>
            <v-chip v-else class="rounded" size="small" color="primary">{{
              levels[skill.proficiency]
            }}</v-chip>
          </div>
          <v-progress-linear
            :model-value="(skill.proficiency / 4) * 100"
            class="mt-3 rounded"
            color="primary"
            height="10"
          ></v-progress-linear>
        </div>
      </div>
    </v-card-text>
    <v-card-actions class="pt-0 px-4" v-if="!showAll">
      <v-btn
        block
        class="text-capitalize"
        @click="showAll = true"
        v-if="user.skills.length > 2"
        >Show All</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  inheritAttrs: true,
};
</script>
<script setup>
import { useProfileStore } from "~/stores/useProfileStore";
const router = useRouter();
const { user: auth } = storeToRefs(useAuthStore());
const { user, loading: profile_loading } = storeToRefs(useProfileStore());
const showAll = ref(false);
const skills = computed(() =>
  showAll.value ? user.value.skills : user.value.skills.slice(0, 2)
);
const levels = ["Beginner", "Intermediate", "Advanced", "Expert", "Master"];
</script>

<style scoped></style>
