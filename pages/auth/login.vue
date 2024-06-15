<script setup>
import { useAuthStore } from "~/stores/useAuthStore";
import { reactive, ref } from "vue";
definePageMeta({
  middleware: ["guest"],
  pageTransition: {
    name: 'page-slide-x',
    mode: 'out-in'
  }
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
  <v-container class="h-100 pa-0" fluid
    style="background: url('/login-background.png') no-repeat;background-size: contain;background-position: right;">
    <v-row class="h-100 ma-0">
      <v-col class="d-flex align-center justify-center h-100" cols="6">
        <v-card class="ml-n10 rounded-lg w-75 pb-xl-15" flat :disabled="loading">
          <div class="pb-10">
            <h1 class="text-center">Welcome Back to Your Arellano University Alumni Career Network!</h1>
            <p style="font-size: 18px" class="text-center mt-2">Reconnect with fellow alumni, find new opportunities, and grow professionally. Sign in now!</p>
          </div>
          <v-form @submit.prevent="loginHandler" class="px-5">
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
            <p class="text-center" style="padding-inline: 150px;">
              If you don't have an account, please <NuxtLink :to="{name: 'auth-register'}" class="text-decoration-none font-weight-bold text-blue-darken-3">sign up</NuxtLink>.
            </p>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="6" style="position: relative">
        <div id="logo" class="d-flex align-center">
          <v-avatar size="50" class="rounded-0">
            <v-img src="/logo/chief-white.png"></v-img>
          </v-avatar>
          <h1 class="text-white ml-5">Alumni.</h1>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
#logo {
  position: absolute;
  top: 25px;
  left: 0;
}

.page-slide-x-enter-active,
.page-slide-x-leave-active {
  transition: all 0.45s;
}
.page-slide-x-enter-from,
.page-slide-x-leave-to {
  opacity: 0;
  filter: blur(50);

}
</style>
