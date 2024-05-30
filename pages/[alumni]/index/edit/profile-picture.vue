<template>
  <v-card class="rounded-lg py-3 px-4">
    <v-form @submit.prevent="save">
      <v-card-title class="d-flex align-center">
        Edit Profile Picture
        <v-spacer></v-spacer>
        <v-btn flat icon="mdi-close" @click="$router.push({ name: 'alumni' })"></v-btn>
      </v-card-title>
      <v-card-text>
        <v-card class="rounded-lg d-flex align-center justify-center bg-grey-darken-3" height="550" flat>
          <!-- Back Avatar -->
          <div class="w-100 h-100 d-flex align-start justify-center"
            style="position: absolute; padding-top: 40px; z-index: 1">
            <v-avatar class="rounded-lg" style="overflow: visible" size="400">
              <v-img class="rounded-lg" :style="{ transform: `scale(${scale})` }"
                :src="!!url ? url : user?.picture"></v-img>
            </v-avatar>
          </div>
          <!-- Front Avatar -->
          <div class="w-100 h-100 d-flex align-start justify-center" style="
              position: absolute;
              padding-top: 40px;
              background-color: rgba(0, 0, 0, 0.3);
              z-index: 5;
            ">
            <v-avatar class="rounded-lg bg-transparent" style="filter: brightness(110%)" size="400">
              <v-img class="rounded-lg" :style="{ transform: `scale(${scale})` }"
                :src="!!url ? url : user?.picture"></v-img>
            </v-avatar>
          </div>
          <!-- Frame Avatar -->
          <div class="w-100 h-100 d-flex align-start justify-center"
            style="position: absolute; padding-top: 40px; z-index: 5" v-if="informations.selected_frame > 0">
            <v-avatar class="bg-transparent rounded-lg" size="400">
              <v-img class="rounded-lg" src="/frames/alumni.png"></v-img>
            </v-avatar>
          </div>
          <v-card class="w-100 pa-3 bg-grey-darken-1 d-flex rounded-0"
            style="position: absolute; bottom: 0; z-index: 10; gap: 10px">
            <v-card @click="$v.selected_frame.$model = 0" :style="{
              border: informations.selected_frame == 0 ? '3px solid #F44336' : '',
            }" :variant="informations.selected_frame == 0 ? 'flat' : 'tonal'" flat
              class="bg-white d-flex align-center justify-center" width="55" height="55">
              <v-icon size="45">mdi-cancel</v-icon>
            </v-card>
            <v-card @click="$v.selected_frame.$model = 1" :style="{
              border: informations.selected_frame == 1 ? '3px solid #F44336' : '',
            }" :variant="informations.selected_frame == 1 ? 'flat' : 'tonal'" flat
              class="bg-white d-flex align-center justify-center" width="55" height="55">
              <v-img class="rounded-lg" style="transform: scale(1.05)" src="/frames/alumni.png"></v-img>
            </v-card>
          </v-card>
        </v-card>
        <div class="mt-5">
          <v-slider class="px-0 mt-5" thumb-label v-model="$v.styles.scale.$model"></v-slider>
          <v-text-field v-model="$v.image.$model" @change="changeProfile" type="file" variant="outlined"
            accept="image/*"></v-text-field>
        </div>
      </v-card-text>
      <v-card-actions class="px-6">
        <v-spacer></v-spacer>
        <v-btn type="submit" class="text-capitalize px-6" color="primary" variant="flat" :loading="loading"
          :disabled="!$v.$anyDirty || !!(!user?.profile_picture && !informations.image)">Save</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
const { user } = storeToRefs(useAuthStore());
const loading = ref(false);
const url = ref("");
const informations = reactive({
  image: null,
  styles: {
    //@ts-ignore
    scale: user.value?.profile_picture?.data.styles.scale || 0,
  },
  //@ts-ignore
  selected_frame: user.value?.profile_picture?.data.selected_frame || 0,
});
const rules = {
  image: {},
  styles: {
    scale: {},
  },
  selected_frame: 0,
};
const $v = useVuelidate(rules, informations);
const scale = computed(() => (informations.styles.scale + 100) / 100);
const changeProfile = (e: any) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    url.value = reader.result as string;
  };
  //@ts-ignore
  informations.image = file
  reader.readAsDataURL(file);
};

const $profile = useProfileStore();
const router = useRouter();
async function save() {
  if (!(await $v.value.$validate())) {
    return;
  }

  loading.value = true;

  await $profile.changeProfile(informations);

  loading.value = false;
  router.push({ name: "alumni" });
}
</script>

<style scoped></style>
