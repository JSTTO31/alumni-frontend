<script setup>
import { reactive } from "vue";
const $auth = useAuthStore()
useHead({
  title: "Alumni Tracking | Register",
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

const errors = ref(null) 

const {status, error, execute} = await $auth.register(form)

async function submit(){
    await execute()

    if(error.value){
      errors.value = error.value.data.errors
    }

    if(status.value == 'success'){
      window.location.reload()
    }
};
</script>

<template>
  <v-app>
    <v-main style="padding-inline: 250px;">
      <div class="py-8 pb-0 px-15">
        <h3
          style="color: #1f6e8c; cursor: pointer"
          @click="$router.push({ name: 'index' })"
        >
          <span style="background-color: #1f6e8c" class="pa-2 text-white rounded-lg"
            >Arellano</span
          >
          Connect
        </h3>
      </div>
      <v-container>
        <v-row justify="center">
          <v-col cols="6" class="pt-5">
            <h1 class="text-center mb-5" style="color: #1f6e8c">Connect with us now</h1>
            <v-card class="pa-5 rounded-lg" flat>
              <v-form @submit.prevent="submit">
                <label class="font-weight-medium text-grey-darken-2" for="name"
                  >Name</label
                >
                <v-text-field
                  type="text"
                  single-line
                  v-model="form.name"
                  :error-messages="errors?.name || null"
                  class="mt-2"
                  id="name"
                  label="Joshua Sotto, John Doe, Jane etc"
                  variant="outlined"
                  color="#1F6E8C"
                ></v-text-field>
                <label class="font-weight-medium text-grey-darken-2" for="student_number"
                  >Student number</label
                >
                <v-text-field
                  type="text"
                  single-line
                  v-model="form.student_number"
                  :error-messages="errors?.student_number || null"
                  class="mt-2"
                  id="student_number"
                  label="10-1010"
                  variant="outlined"
                  color="#1F6E8C"
                ></v-text-field>
                <label class="font-weight-medium text-grey-darken-2" for="email"
                  >Email Address</label
                >
                <v-text-field
                  type="email"
                  single-line
                  v-model="form.email"
                  :error-messages="errors?.email || null"
                  class="mt-2"
                  id="email"
                  label="joshua@arellanites.edu"
                  variant="outlined"
                  color="#1F6E8C"
                ></v-text-field>
                <v-row>
                  <v-col>
                    <label
                      class="font-weight-medium text-grey-darken-2"
                      for="password-confirmation"
                      >Confirmation Password</label
                    >
                    <v-text-field
                      :error-messages="errors?.password || null"
                      single-line
                      v-model="form.password_confirmation"
                      class="mt-2"
                      id="password-confirmation"
                      label="*********"
                      variant="outlined"
                      color="#1F6E8C"
                      type="password"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <label class="font-weight-medium text-grey-darken-2" for="password"
                      >Password</label
                    >
                    <v-text-field
                      :error-messages="errors?.password || null"
                      single-line
                      v-model="form.password"
                      class="mt-2"
                      id="password"
                      label="*********"
                      variant="outlined"
                      color="#1F6E8C"
                      type="password"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-card-actions class="px-0 d-flex flex-column">
                  <v-btn
                    type="submit"
                    class="text-capitalize"
                    variant="outlined"
                    color="#1F6E8C"
                    rounded
                    size="x-large"
                    block
                    :loading="status == 'pending'"
                    >Connect</v-btn
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
