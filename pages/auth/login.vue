<script setup>
import { useAuthStore } from "~/stores/useAuthStore";
import { reactive, ref } from "vue";

definePageMeta({
  middleware: ["guest"],
});

useHead({
  title: "Welcome our beloved alumni!",
});
const $auth = useAuthStore();
const credentials = reactive({
  email: "",
  password: "",
});
const loading = ref(false)
const errors = ref(null);

const { error, status, execute } = await $auth.login(credentials);

const loginHandler = async () => {
  loading.value = true;
  await execute()
  loading.value = false

  if (error.value) {
    errors.value = error.value.data.errors;
  }

  if (status.value == 'success') {
    location.reload()
  }
};
</script>

<template>
    <v-card width="650" class="pa-5 rounded-lg" flat :disabled="loading">
      <div class="d-flex">
        <v-avatar size="75" class="mx-auto mb-5" style="cursor: pointer" @click="$router.push({name: 'welcome'})">
          <v-img src="/chief.png"></v-img>
        </v-avatar>
      </div>
      <h1 class="text-center mb-5" style="color: #1f6e8c">
        Log in to your account.
      </h1>
      <v-form @submit.prevent="loginHandler">
        <label class="font-weight-medium text-grey-darken-2" for="email">Email Address</label>
        <v-text-field v-model="credentials.email" :error-messages="errors?.email" type="email" single-line
          class="mt-2" id="email" label="joshua@arellanites.edu" variant="outlined" color="#1F6E8C"></v-text-field>
        <label class="font-weight-medium text-grey-darken-2" for="password">Password</label>
        <v-text-field v-model="credentials.password" :error-messages="errors?.password" single-line class="mt-2"
          id="password" label="*********" variant="outlined" color="#1F6E8C" type="password"></v-text-field>
        <v-card-actions class="px-0 d-flex flex-column">
          <v-btn type="submit" class="text-capitalize" variant="elevated" color="#1F6E8C" size="large" block
            :loading="loading">Log in</v-btn>
        </v-card-actions>
        <v-divider class="my-4"></v-divider>
        <h5 class="text-center mb-2">Don't have an account?</h5>
        <v-card-actions class="px-0 d-flex flex-column">
          <v-btn @click="$router.push({name: 'auth-register'})" class="text-capitalize" variant="outlined" color="#1F6E8C" size="large" block>Sign up</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
</template>

<style scoped>

</style>
