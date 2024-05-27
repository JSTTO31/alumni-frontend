<template>
    <v-card class="rounded-lg py-3 px-4" :disabled="loading">
        <v-form @submit.prevent="save">
            <v-card-title class=" d-flex align-center">
                Edit link
                <v-spacer></v-spacer>
                <v-btn flat icon="mdi-close" @click="$router.push({name: 'alumni'})"></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <div class="d-flex w-100 flex-column">
                    <label for="">Title (*)</label>
                    <v-text-field :error-messages="$v.title.$errors[0]?.$message.toString() || ''"
                        v-model="$v.title.$model" class="mt-2" variant="outlined" density="compact"
                        label="Title" single-line></v-text-field>
                </div>
                <div class="d-flex w-100 flex-column">
                    <label for="">location (*)</label>
                    <v-text-field :error-messages="$v.location.$errors[0]?.$message.toString() || ''"
                        v-model="$v.location.$model" class="mt-2" variant="outlined" density="compact"
                        label="https://example.com" single-line></v-text-field>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="px-4">
                <v-btn class="text-capitalize px-6 text-error" prepend-icon="mdi-trash-can" variant="text" @click="$router.push({name: 'alumni-index-delete-links', query: {id: $route.query.id}})">Delete</v-btn>
                <v-spacer></v-spacer>
                <v-btn type="submit" class="text-capitalize px-6" color="primary" variant="flat"
                    :loading="loading">Save</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { helpers, required,  } from '@vuelidate/validators';
const { user: auth } = storeToRefs(useAuthStore())
const $profile = useProfileStore()
const { user } = storeToRefs(useProfileStore())
const url = ref("")
const informations = reactive({
        title: "",
        location: "",
})

function shouldWebsite(value: string){
    const reg = new RegExp("^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$", 'i')
    return reg.test(value)
}

const rules = {
    title: {required},
    location: {required, website: helpers.withMessage("The field should be a link", shouldWebsite)},
}

const loading = ref(false)
const router = useRouter()
const route = useRoute()
const $v = useVuelidate(rules, informations);

async function save() {
    if (!await $v.value.$validate()) {
        return
    }

    loading.value = true
    if(!route.query.id) return
    await $profile.editLink(parseInt(route.query.id.toString()), informations)

    loading.value = false
    router.push({name: 'alumni'})
}

onMounted(() => {
    //@ts-ignore
    const findLink = user.value?.links.find(item => item.id == route.query.id)
    if(!findLink) return router.push({name: 'alumni'}) 

    informations.location = findLink.location
    informations.title = findLink.title
})
</script>

<style scoped></style>