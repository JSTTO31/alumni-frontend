<template>
    <v-card class="rounded-lg py-3 px-4" :disabled="loading">
        <v-form @submit.prevent="save">
            <v-card-title class=" d-flex align-center">
                Add Education
                <v-spacer></v-spacer>
                <v-btn flat icon="mdi-close" @click="$router.push({name: 'alumni-alumni'})"></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <div class="d-flex w-100 flex-column">
                    <label for="">Eduation Attainment (*)</label>
                    <v-select :items="attainments" :error-messages="$v.attainment.$errors[0]?.$message.toString() || ''" v-model="$v.attainment.$model" class="mt-2" variant="outlined"
                        density="compact" label="Select education attainment" single-line></v-select>
                </div>
                <div class="d-flex" style="gap: 15px">
                    <div class="d-flex w-100 flex-column">
                        <label for="">School (*)</label>
                        <v-text-field :error-messages="$v.school.$errors[0]?.$message.toString() || ''" v-model="$v.school.$model" class="mt-2" variant="outlined"
                            density="compact" label="School" single-line></v-text-field>
                    </div>
                    <div class="d-flex w-100 flex-column">
                        <label for="">Field of study (*)</label>
                        <v-text-field :error-messages="$v.field.$errors[0]?.$message.toString() || ''" v-model="$v.field.$model" class="mt-2" variant="outlined"
                            density="compact" label="Field of study" single-line></v-text-field>
                    </div>
                </div>
                <div class="d-flex" style="gap: 15px">
                    <div class="d-flex w-100 flex-column">
                        <label for="">Date graduated (*)</label>
                        <v-text-field type="date" :error-messages="$v.graduated_at.$errors[0]?.$message.toString() || ''" v-model="$v.graduated_at.$model" class="mt-2" variant="outlined"
                            density="compact" label="Date graduated" single-line></v-text-field>
                    </div>
                    <div class="d-flex w-100 flex-column">
                        <label for="">Major/Course (*)</label>
                        <v-text-field :error-messages="$v.major.$errors[0]?.$message.toString() || ''" v-model="$v.major.$model" class="mt-2" variant="outlined"
                            density="compact" label="Major or Course" single-line></v-text-field>
                    </div>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="px-6">
                <v-btn class="text-capitalize px-6 text-error" prepend-icon="mdi-trash-can" variant="text" @click="$router.push({name: 'alumni-index-delete-educations', query: {id: $route.query.id}})">Delete</v-btn>
                <v-spacer></v-spacer>
                <v-btn type="submit" class="text-capitalize px-6" color="primary" variant="flat"
                    :loading="loading">Save</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
const { user: auth } = storeToRefs(useAuthStore())
const $profile = useProfileStore()
const { user } = storeToRefs(useProfileStore())
const informations = reactive({
    "attainment": "",
    "school": "",
    "field": "",
    "major": "",
    "graduated_at": ""
    // "attainment": "Bachelor's Degree",
    // "school": "University of Example",
    // "field": "Computer Science",
    // "major": "Software Engineering",
    // "graduated_at": "2018-05-15"
})
const attainments = [
    "High School Diploma",
    "Associate's Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate (PhD)",
    "Professional Degree",
    "Technical Diploma",
    "Certificate",
    "Diploma",
    "Some College, No Degree"
]



const rules = {
    attainment: {required},
    school: {required},
    field: {required},
    major: {required},
    graduated_at: {required},
}

const loading = ref(false)

const $v = useVuelidate(rules, informations);
const router = useRouter()
const route = useRoute()
async function save() {
    if (!await $v.value.$validate()) {
        return
    }

    loading.value = true

    if(!route.query.id) return

    await $profile.editEducation(route.query.id.toString(), informations)

    loading.value = false
    router.push({name: 'alumni-alumni'})
}


onMounted(() => {
    //@ts-ignore
    const findEducation = user.value?.educations.find(item => item.id == route.query.id.toString())
    if(!findEducation){
        return router.push({name: 'alumni-alumni'})
    }

    informations.attainment = findEducation.attainment
    informations.field = findEducation.field
    informations.graduated_at = findEducation.graduated_at
    informations.major = findEducation.major
    informations.school = findEducation.school
})
</script>

<style scoped></style>