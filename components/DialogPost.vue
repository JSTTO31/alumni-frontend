<script setup lang="ts">
const showDialog = ref(false);
const $post = usePostStore();
const information = reactive({
  text: "",
  privacy: "public",
  media: null
});
const selectedPrivacyIcon = computed(() =>
  information.privacy == "public"
    ? "mdi-earth"
    : information.privacy == "private"
    ? "mdi-account"
    : "mdi-account-group"
);
const loading = ref(false);
const createPost = () => {
  loading.value = true;
  $post.store(information).then(() => {
    loading.value = false;
    information.text = "";
    showDialog.value = false;
  });
};
</script>
<template>
  <slot name="activator" @click="showDialog = true"> </slot>
  <v-dialog v-model="showDialog" width="550" transition="dialog-bottom-transition">
    <v-card class="rounded-lg" :disabled="loading">
      <v-divider></v-divider>
      <div class="pa-5">
        <div class="d-flex align-center">
          <v-avatar size="60" class="border mr-3">
            <v-img
              src="https://as2.ftcdn.net/v2/jpg/02/44/42/79/1000_F_244427911_aoHHulebtYy4wLpncBBuWqCTNFKolcCB.jpg"
            ></v-img>
          </v-avatar>
          <div>
            <h4>Joshua Sotto</h4>
            <DialogPrivacy v-model:privacy="information.privacy">
              <template #activator="props">
                <v-btn
                  size="small"
                  append-icon="mdi-chevron-down"
                  flat
                  :prepend-icon="selectedPrivacyIcon"
                  v-bind="props"
                  class="font-weight-regular pl-0 text-capitalize"
                >
                  {{ information.privacy }}
                </v-btn>
              </template>
            </DialogPrivacy>
          </div>
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" @click="showDialog = false"></v-btn>
        </div>
        <v-hover v-slot="{props, isHovering}">
          <v-card height="160" flat v-bind="props" :style="isHovering ? 'overflow-y: scroll' : 'padding-right: 16px'">
            <div class="mt-2">
              <v-textarea
                v-model="information.text"
                flat
                single-line
                density="comfortable"
                variant="solo"
                rows="3"
                no-resize
                hide-details
                label="Share your thoughts"
              ></v-textarea>
            </div>
            <div>
              <v-card class="pa-2 border rounded-lg" flat>
                <card-media v-model:medias="information.media">
                  <template #activator="props">
                    <v-btn  
                    v-bind="props"
                    prepend-icon="mdi-image-plus"
                    class="text-capitalize"
                    color="blue-darken-4"
                    variant="text"
                    >Add Media</v-btn
                  >
                  </template>
                </card-media>
              </v-card>
            </div>
          </v-card>
        </v-hover>
        <v-card-actions class="mt-5">
          <v-spacer></v-spacer>
          <v-btn flat class="text-capitalize" @click="showDialog = false">Cancel</v-btn>
          <v-btn
            @click="createPost"
            variant="elevated"
            color="#1F6E8C"
            class="text-capitalize px-5"
            :disabled="!information.text"
            :loading="loading"
            >Post</v-btn
          >
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
