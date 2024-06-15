<script setup>
import useVuelidate from '@vuelidate/core';
import { email, minLength, required, sameAs } from '@vuelidate/validators';

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
const $auth = useAuthStore()
const stepper = ref(1)
const loading = ref(false)
const $externalResults = ref({});
const forms = reactive({
  account: {
    email: "johndoe@example.com",
    password: "SecurePass123!",
    password_confirmation: "SecurePass123!",
  },
  personal: {
    first_name: "John",
    middle_name: "Michael",
    last_name: "Doe",
    nationality: "American",
    gender: "male",
    age: 30,
    civil_status: "Single",
    birthday: "1993-02-15",
  },
  contact: {
    mobile_number: "+1-234-567-8900",
    home_number: "+1-234-567-8901",
    work_number: "+1-234-567-8902",
    address: "123 Elm Street, Apartment 4B",
    region: "NCR",
    city: "Malabon City",
    postal_code: "1470",
  }
  // account: {
  //   email: "",
  //   password: "",
  //   password_confirmation: "",
  // },
  // personal: {
  //   first_name: "",
  //   middle_name: "",
  //   last_name: "",
  //   nationality: '',
  //   gender: '',
  //   age: null,
  //   civil_status: 'Single',
  //   birthday: '',
  // },
  // contact: {
  //   mobile_number: "",
  //   home_number: "",
  //   work_number: "",
  //   address: "",
  //   region: 'NCR',
  //   city: 'Malabon City',
  //   postal_code: "1470",
  // }
})

const rules = {
  account: {
    email: {required, email},
    password: {required, minLength: minLength(8)},
    password_confirmation: {required, sameAs: sameAs(computed(() => forms.account.password))}
  },
  personal: {
    first_name: {required},
    middle_name: {},
    last_name: {required},
    nationality: {required},
    gender: {required},
    age: {required},
    civil_status: {required},
    birthday: {required},
  },
  contact: {
    mobile_number: { required },
    home_number: {},
    work_number: {},
    address: { required },
    region: { required },
    city: { required },
    postal_code: {},
  }
}

const $v = useVuelidate(rules, forms, {$externalResults})

async function submit(){
  if(!await $v.value.$validate()){
    return;
  }

  loading.value = true

  const {error, status} = await $auth.register(forms)
  
  loading.value = false

  if(error.value){
    for(const [key, value] of Object.entries(error.value.data.errors)){
      const [parent,child] = key.split(".")
      $externalResults.value[parent] = {
        ...$externalResults.value[parent],
        [child]: [value]
      }
    }
  }

  if(status.value == 204){
    window.location.reload()
  }
  
}

provide('forms', {
  loading,
  stepper,
  account: $v.value.account,
  personal: $v.value.personal,
  contact: $v.value.contact,
  submit
});

</script>

<template>
  <v-container class="h-100 pa-0" fluid
    style="background: url('/register-background.png') no-repeat;background-size: contain;background-position: left;background-attachment: fixed;">
    <v-row class="h-100 ma-0">
      <v-col cols="6">
      </v-col>
      <v-col class="bg-white h-100 px-15" cols="6">
        <div class="mt-5">
            <h2>Connect with Fellow Alumni
            </h2>
            <p class="text-subtitle-1">
                Sign up to network, collaborate, and stay informed with our alumni community!<br> By signing up, you agree to our <a href="#" class="text-decoration-none font-weight-bold text-blue-darken-3">Terms and Conditions</a>.
            </p>
        </div>
        <v-stepper flat v-model="stepper" class="my-5">
          <v-stepper-header style="box-shadow: none;">
            <v-stepper-item :disabled="loading" :editable="!$v.account.$invalid || $v.account.$anyDirty" title="Account" error-icon="mdi-exclamation"  :complete="!$v.account.$invalid && $v.account.$anyDirty"  :error="$v.account.$invalid && $v.account.$anyDirty"  :value="1"></v-stepper-item>
            <v-divider></v-divider>
            <v-stepper-item :disabled="loading" :editable="$v.personal.$anyDirty || !$v.account.$invalid" title="Personal Info"  error-icon="mdi-exclamation" :complete="!$v.personal.$invalid && $v.personal.$anyDirty"  :error="$v.personal.$invalid && $v.personal.$anyDirty"  :value="2"></v-stepper-item>
            <v-divider></v-divider>
            <v-stepper-item :disabled="loading" :editable="$v.contact.$anyDirty || !$v.personal.$invalid" title="Contact Info"  error-icon="mdi-exclamation"  :complete="!$v.contact.$invalid && $v.contact.$anyDirty"  :error="$v.contact.$invalid && $v.contact.$anyDirty"  :value="3"></v-stepper-item>
          </v-stepper-header>
          <v-stepper-window style="overflow: visible">
            <v-stepper-window-item :value="1">
              <RegisterAccount></RegisterAccount>
            </v-stepper-window-item>
            <v-stepper-window-item :value="2">
              <RegisterPersonal></RegisterPersonal>
            </v-stepper-window-item>
            <v-stepper-window-item :value="3">
              <Suspense>
                <template #default>
                  <RegisterContact></RegisterContact>
                </template>
                <template #fallback>
                  <SkeletonForm></SkeletonForm>
                </template>
              </Suspense>
            </v-stepper-window-item>
          </v-stepper-window>
        </v-stepper>
        <v-divider class="mb-5"></v-divider>
        <p class="text-center" style="padding-inline: 250px;">
           If you already have an account, please <NuxtLink :to="{name: 'auth-login'}" class="text-decoration-none font-weight-bold text-blue-darken-3">log in</NuxtLink>.
        </p>
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
