<script setup>
import { reactive } from "vue";
const $auth = useAuthStore()
useHead({
  title: "Register your account!",
});

definePageMeta({
  middleware: ["guest"],
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
  <v-card width="650" class="pa-5 rounded-lg" flat>
    <div class="d-flex">
      <v-avatar size="75" class="mx-auto mb-5" style="cursor: pointer" @click="$router.push({ name: 'welcome' })">
        <v-img src="/chief.png"></v-img>
      </v-avatar>
    </div>
    <h1 class="text-center mb-5" style="color: #1f6e8c">
      Connect with us now
    </h1>
    <v-form @submit.prevent="submit">
      <label class="font-weight-medium text-grey-darken-2" for="name">Name</label>
      <v-text-field type="text" single-line v-model="form.name" :error-messages="errors?.name || null" class="mt-2"
        id="name" label="Joshua Sotto, John Doe, Jane etc" variant="outlined" color="#1F6E8C"></v-text-field>
      <label class="font-weight-medium text-grey-darken-2" for="email">Email Address</label>
      <v-text-field type="email" single-line v-model="form.email" :error-messages="errors?.email || null" class="mt-2"
        id="email" label="joshua@arellanites.edu" variant="outlined" color="#1F6E8C"></v-text-field>
      <v-row>
        <v-col>
          <label class="font-weight-medium text-grey-darken-2" for="password-confirmation">Confirmation
            Password</label>
          <v-text-field :error-messages="errors?.password || null" single-line v-model="form.password_confirmation"
            class="mt-2" id="password-confirmation" label="*********" variant="outlined" color="#1F6E8C"
            type="password"></v-text-field>
        </v-col>
        <v-col>
          <label class="font-weight-medium text-grey-darken-2" for="password">Password</label>
          <v-text-field :error-messages="errors?.password || null" single-line v-model="form.password" class="mt-2"
            id="password" label="*********" variant="outlined" color="#1F6E8C" type="password"></v-text-field>
        </v-col>
      </v-row>
      <v-card-actions class="px-0 d-flex flex-column">
          <v-btn type="submit" class="text-capitalize" variant="elevated" color="#1F6E8C" size="large" block
            :loading="loading">Create an account</v-btn>
        </v-card-actions>
      <v-divider class="my-4"></v-divider>
      <h5 class="text-center mb-2">Already have an account?</h5>
      <v-card-actions class="px-0 d-flex flex-column">
        <v-btn @click="$router.push({name: 'auth-login'})" class="text-capitalize" variant="outlined" color="#1F6E8C" size="large" block>Login account</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
