<script setup>
import { reactive } from "vue";
const $auth = useAuthStore()
useHead({
  title: "Register your account!",
});

definePageMeta({
  middleware: ["guest"],
  pageTransition: {
    name: 'page-slide-x',
    mode: 'out-in'
  }
})

const form = reactive({
  email: "",
  password: "",
  password_confirmation: "",
  name: "",
  student_number: null,
});

const loading = ref(false)

const errors = ref(null)

const { status, error, execute } = await $auth.register(form)

async function submit() {
  loading.value = true;
  await execute()
  loading.value = false
  if (error.value) {
    errors.value = error.value.data.errors
  }

  if (status.value == 'success') {
    window.location.reload()
  }
};
</script>

<template>
  <v-container class="h-100 pa-0" fluid
    style="background: url('/register-background.png') no-repeat;background-size: contain;background-position: left;">
    <v-row class="h-100 ma-0">
      <v-col cols="6">
        <!-- <v-avatar size="550" class="rounded-0">
          <v-img src="/undraw/welcome.svg"></v-img>
        </v-avatar> -->
      </v-col>
      <v-col class="d-flex  justify-center align-center h-100" cols="6">
        <v-card width="650" class="pa-5 rounded-lg" flat>
          <div class="pb-10">
            <h1 style="font-size: 30px" class="text-center">Join the Arellano University Alumni Career Network Today!
            </h1>
            <p style="font-size: 18px" class="text-center">Sign up to reconnect with alumni, explore career
              opportunities, and grow professionally with our community.</p>
          </div>
          <div class="stepper-container">
            <div class="stepper-item"></div>
            <div class="stepper-item"></div>
            <div class="stepper-item"></div>
          </div>
          <v-form @submit.prevent="submit">
            <label class="font-weight-medium text-grey-darken-2" for="name">Name</label>
            <v-text-field type="text" single-line v-model="form.name" :error-messages="errors?.name || null"
              class="mt-2" id="name" label="Joshua Sotto, John Doe, Jane etc" variant="outlined"
              color="#1F6E8C"></v-text-field>
            <label class="font-weight-medium text-grey-darken-2" for="email">Email Address</label>
            <v-text-field type="email" single-line v-model="form.email" :error-messages="errors?.email || null"
              class="mt-2" id="email" label="joshua@arellanites.edu" variant="outlined" color="#1F6E8C"></v-text-field>
            <v-row>
              <v-col>
                <label class="font-weight-medium text-grey-darken-2" for="password-confirmation">Confirmation
                  Password</label>
                <v-text-field :error-messages="errors?.password || null" single-line
                  v-model="form.password_confirmation" class="mt-2" id="password-confirmation" label="*********"
                  variant="outlined" color="#1F6E8C" type="password"></v-text-field>
              </v-col>
              <v-col>
                <label class="font-weight-medium text-grey-darken-2" for="password">Password</label>
                <v-text-field :error-messages="errors?.password || null" single-line v-model="form.password"
                  class="mt-2" id="password" label="*********" variant="outlined" color="#1F6E8C"
                  type="password"></v-text-field>
              </v-col>
            </v-row>
            <v-card-actions class="px-0 d-flex flex-column">
              <v-btn type="submit" class="text-capitalize" variant="elevated" color="#1F6E8C" size="large" block
                :loading="loading">Create an account</v-btn>
            </v-card-actions>
            <v-divider class="my-4"></v-divider>
            <h5 class="text-center mb-2">Already have an account?</h5>
            <v-card-actions class="px-0 d-flex flex-column">
              <v-btn @click="$router.push({ name: 'auth-login' })" class="text-capitalize" variant="outlined"
                color="#1F6E8C" size="large" block>Login account</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
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
