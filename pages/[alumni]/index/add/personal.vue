<template>
    <v-card class="rounded-lg py-3 px-4" :disabled="loading">
        <v-form @submit.prevent="save">
            <v-card-title class="d-flex align-center">
                    Add Personal Information 
                    <v-spacer></v-spacer>
                    <v-btn flat icon="mdi-close" @click="$router.push({name: 'alumni-information'})"></v-btn>

            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <div class="d-flex" style="gap: 15px">
                    <div class="d-flex w-100 flex-column">
                        <label for="">First name (*)</label>
                        <v-text-field :error-messages="$v.first_name.$errors[0]?.$message.toString() || ''" v-model="$v.first_name.$model"  class="mt-2" variant="outlined" density="compact" label="First Name" single-line></v-text-field>
                    </div>
                    <div class="d-flex w-100 flex-column">
                        <label for="">Middle Name (Optional)</label>
                        <v-text-field  v-model="$v.middle_name.$model"  class="mt-2" variant="outlined" density="compact" label="Middle Name" single-line></v-text-field>
                    </div>
                </div>
                <div class="d-flex flex-column">
                    <label for="">Last Name (*)</label>
                    <v-text-field :error-messages="$v.last_name.$errors[0]?.$message.toString() || ''" v-model="$v.last_name.$model"  class="mt-2" variant="outlined" density="compact" label="Last Name" single-line></v-text-field>
                </div>
                <div class="d-flex flex-column">
                    <label for="">Nationality (*)</label>
                    <v-select :error-messages="$v.nationality.$errors[0]?.$message.toString() || ''"  v-model="$v.nationality.$model" class="mt-2" variant="outlined" density="compact" label="Select Nationality" :items="nationalities" single-line></v-select>
                </div>
                <div class="d-flex" style="gap: 15px">
                    <div class="d-flex flex-column w-100">
                        <label for="">Gender (*)</label>
                        <v-select :error-messages="$v.gender.$errors[0]?.$message.toString() || ''"  v-model="$v.gender.$model" :items="genders" class="mt-2" variant="outlined" density="compact" label="Select gender" single-line></v-select>
                    </div>
                    <div class="d-flex flex-column w-100">
                        <label for="">Age (*)</label>
                        <v-text-field :error-messages="$v.age.$errors[0]?.$message.toString() || ''" v-model="$v.age.$model"  type="number" class="mt-2" variant="outlined" density="compact" label="Your age" single-line></v-text-field>
                    </div>
                </div>
                <div class="d-flex flex-column">
                    <label for="">Civil Status (*)</label>
                    <v-select :error-messages="$v.civil_status.$errors[0]?.$message.toString() || ''"  v-model="$v.civil_status.$model" :items="civil_statuses"  class="mt-2" variant="outlined" density="compact" label="Civil Status" single-line></v-select>
                </div>
                <div class="d-flex flex-column">
                    <label for="">Birthday (*)</label>
                    <v-text-field :error-messages="$v.birthday.$errors[0]?.$message.toString() || ''" v-model="$v.birthday.$model"  type="date" class="mt-2" variant="outlined" density="compact" label="Birthday" single-line></v-text-field>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="px-6">
                <v-spacer></v-spacer>
                <v-btn class="text-capitalize px-6" color="primary" variant="flat" type="submit" :loading="loading">Save</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

const $profile = useProfileStore()
const props = defineProps<{show: boolean}>()
const emits = defineEmits(['update:show'])
const {nationalities, genders, civil_statuses} = usePersonalInformationOptions
const informations = reactive({
    first_name: "",
    middle_name: "",
    last_name: "",
    nationality: null,
    gender: null,
    age: null,
    civil_status: null,
    birthday: null,
    // first_name: "joshua",
    // middle_name: "pereira",
    // last_name: "sotto",
    // nationality: "Filipino",
    // gender: "male",
    // age: 23,
    // civil_status: "Single",
    // birthday: new Date("2000-8-31").toISOString().substring(0,10),
})

const rules = {
    first_name: {required},
    middle_name: {},
    last_name: {required},
    nationality: {required},
    gender: {required},
    age: {required},
    civil_status: {required},
    birthday: {required},
}

const loading = ref(false)

const $v = useVuelidate(rules, informations);
const router = useRouter()
async function save(){
    if(!await $v.value.$validate()){
        return
    }

    loading.value = true

    $profile.addPersonalInformation(informations).then(() => {
        loading.value = false
        router.push({name: 'alumni'})
    })
}
</script>

<style scoped>

</style>