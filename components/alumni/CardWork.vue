<template>
  <v-card class="pa-3 rounded-lg mb-5 border" height="310" flat v-if="user">
    <v-card-title class="font-weight-medium d-flex py-0 align-center">
      Work Experience
      <v-spacer></v-spacer>
      <v-btn
        icon="mdi-plus"
        flat
        v-if="user.work && auth.id == user.id"
        @click="$router.push({ name: 'alumni-index-add-works' })"
      ></v-btn>
    </v-card-title>
    <v-card-text>
      <div class="d-flex align-center justify-center mt-15" v-if="user.works.length < 1">
        <v-btn
          class=""
          variant="flat"
          color="grey-lighten-4"
          @click="$router.push({ name: 'alumni-index-add-works' })"
          >Add your work experience</v-btn
        >
      </div>
      <AlumniWorkListItem
        class="py-2"
        :class="index == sortedWorks.length - 2 ? '' : 'border-b-md'"
        v-for="(work, index) in sortedWorks.slice(0, 2)"
        :key="work.id"
        :work="work"
      ></AlumniWorkListItem>
    </v-card-text>
    <v-card-actions>
      <v-btn
        block
        class="text-capitalize"
        v-if="sortedWorks.length > 2"
        @click="showAll = true"
        >Show all</v-btn
      >
    </v-card-actions>
  </v-card>
  <AlumniWorkDialog v-model:show="showAll" :show="showAll"></AlumniWorkDialog>
</template>

<script setup>
const { user: auth } = storeToRefs(useAuthStore());
const { user } = storeToRefs(useProfileStore());
const showAll = ref(false);
const sortedWorks = computed(() =>
  user.value.works.sort((a, b) => new Date(b.from) - new Date(a.from))
);
</script>

<style scoped></style>
