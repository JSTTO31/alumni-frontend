<script setup>
import { useAuthStore } from "~/stores/useAuthStore";
import { reactive, ref } from "vue";

definePageMeta({
  middleware: ["guest"],
});

useHead({
  title: "Alumni Tracking | Login page",
});
const $auth = useAuthStore();
const credentials = reactive({
  email: "",
  password: "",
});
const errors = ref(null);

const { error, status, execute } = await $auth.login(credentials);




const loginHandler = async () => {

  await execute()

  if (error.value) {
    errors.value = error.value.data.errors;
  }

  if(status.value == 'success'){
    location.reload()
  }
};
</script>

<template>
  <v-app>
    <v-main>
      <div flat class="py-8 px-15">
        <h3
          style="color: #1f6e8c; cursor: pointer"
          @click="$router.push({ name: 'index' })"
        >
          <span style="background-color: #1f6e8c" class="pa-2 text-white rounded-lg"
            >Alumni</span
          >
          Tracking
        </h3>
      </div>
      <v-container>
        <v-row justify="center">
          <v-col cols="6" class="pt-15">
            <h1 class="text-center mb-5" style="color: #1f6e8c">
              Welcome back, Log in to your account.
            </h1>
            <v-card class="pa-5 rounded-lg" flat :disabled="loading">
              <v-form @submit.prevent="loginHandler">
                <label class="font-weight-medium text-grey-darken-2" for="email"
                  >Email Address</label
                >
                <v-text-field
                  v-model="credentials.email"
                  :error-messages="errors?.email"
                  type="email"
                  single-line
                  class="mt-2"
                  id="email"
                  label="joshua@arellanites.edu"
                  variant="outlined"
                  color="#1F6E8C"
                ></v-text-field>
                <label class="font-weight-medium text-grey-darken-2" for="password"
                  >Password</label
                >
                <v-text-field
                  v-model="credentials.password"
                  :error-messages="errors?.password"
                  single-line
                  class="mt-2"
                  id="password"
                  label="*********"
                  variant="outlined"
                  color="#1F6E8C"
                  type="password"
                ></v-text-field>
                <v-card-actions class="px-0 d-flex flex-column">
                  <v-btn
                    type="submit"
                    class="text-capitalize"
                    variant="outlined"
                    color="#1F6E8C"
                    rounded
                    size="x-large"
                    block
                    :loading="loading"
                    >Log in</v-btn
                  >
                </v-card-actions>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
