<script setup lang="ts">
const showDialog = ref(false);
const emits = defineEmits(["update:privacy"]);
const props = defineProps(["privacy"]);
const statuses = [
  {
    label: "public",
    icon: "mdi-earth",
  },
  {
    label: "private",
    icon: "mdi-account",
  },
  {
    label: "connected",
    icon: "mdi-account-group",
  },
];
const connect = (value: string) => {
  emits("update:privacy", value);
  showDialog.value = false;
};
</script>
<template>
  <slot name="activator" @click="showDialog = true"> </slot>
  <v-dialog v-model="showDialog" width="450">
    <v-card class="rounded-lg">
      <h4 class="text-center py-2">Choose privacy</h4>
      <v-divider></v-divider>
      <v-list class="pa-5">
        <v-list-item
          @click="connect(status.label)"
          v-for="status in statuses"
          class="pa-4 rounded-lg mb-2"
          :key="status.label"
          :append-icon="status.icon"
          :active="status.label == privacy"
          color="#1F6E8C"
        >
          <template #prepend>
            <v-radio :model-value="status.label == privacy" hide-details></v-radio>
          </template>
          <v-list-item-title class="text-capitalize">{{
            status.label
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
