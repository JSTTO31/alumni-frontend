<template>
    <v-card class="rounded-lg py-3 px-4" :disabled="loading">
        <v-form @submit.prevent="save">
            <v-card-title class=" d-flex align-center">
                Edit Certification
                <v-spacer></v-spacer>
                <v-btn flat icon="mdi-close" @click="$router.push({name: 'alumni'})"></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <div class="d-flex w-100 flex-column">
                    <label for="">Title (*)</label>
                    <v-text-field :error-messages="$v.name.$errors[0]?.$message.toString() || ''" v-model="$v.name.$model" class="mt-2" variant="outlined"
                        density="compact" label="Certification title" single-line></v-text-field>
                </div>
                <div class="d-flex w-100 flex-column">
                    <label for="">Issuing Organization (*)</label>
                    <v-text-field :error-messages="$v.issuing_organization.$errors[0]?.$message.toString() || ''" v-model="$v.issuing_organization.$model" class="mt-2" variant="outlined"
                        density="compact" label="Issuing organization" single-line></v-text-field>
                </div>
                <div class="d-flex w-100 flex-column">
                    <label for="">Date Issue (*)</label>
                    <v-text-field :error-messages="$v.issue_date.$errors[0]?.$message.toString() || ''" v-model="$v.issue_date.$model" class="mt-2" variant="outlined"
                        density="compact" label="Date issue" single-line></v-text-field>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="px-4">
                <v-btn class="text-capitalize px-6 text-error" prepend-icon="mdi-trash-can" variant="text" @click="$router.push({name: 'alumni-index-delete-certifications', query: {id: $route.query.id}})">Delete</v-btn>
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
    // "name": "",
    // "issuing_organization": "",
    // "issue_date": "",
    "name": "Certified Information Systems Security Professional (CISSP)",
    "issuing_organization": "(ISC)²",
    "issue_date": "2019-09-10",
})


const rules = {
    name: {required},
    issuing_organization: {required},
    issue_date: {required},
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
    if(!route.query.id) return;
    await $profile.editCertification(parseInt(route.query.id.toString()), informations)

    loading.value = false
    router.push({name: 'alumni'})
}


onMounted(() => {
    //@ts-ignore
    const findCertification = user.value?.certifications.find(item => item.id == route.query.id)
    if(!findCertification) return router.push({name: 'alumni'})
    informations.issue_date = findCertification.issue_date
    informations.issuing_organization = findCertification.issuing_organization
    informations.name = findCertification.name
})


</script>

<style scoped></style>