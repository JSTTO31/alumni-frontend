<template>
    <v-card class="rounded-lg py-3 px-4" :disabled="loading">
        <v-form @submit.prevent="save">
            <v-card-title class=" d-flex align-center">
                Edit skill
                <v-spacer></v-spacer>
                <v-btn flat icon="mdi-close" @click="$router.push({name: 'alumni-alumni'})"></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <div class="d-flex w-100 flex-column">
                    <label for="">Skill Name (*)</label>
                    <v-text-field :error-messages="$v.name.$errors[0]?.$message.toString() || ''" v-model="$v.name.$model" class="mt-2" variant="outlined"
                        density="compact" label="Skill name" single-line></v-text-field>
                </div>
                <div class="d-flex w-100 flex-column">
                    <label for="">Certification (Optional)</label>
                    <v-text-field :error-messages="$v.certification.$errors[0]?.$message.toString() || ''" v-model="$v.certification.$model" class="mt-2" variant="outlined"
                        density="compact" label="Certified JavaScript Developer, Certified Information Systems Security Professional etc." single-line></v-text-field>
                </div>
                <div class="d-flex w-100 flex-column">
                    <label for="">Proficiency level</label>
                    <v-slider
                        v-model="$v.proficiency.$model"
                        :max="4"
                        :ticks="levels"
                        show-ticks="always"
                        step="1"
                        tick-size="3"
                        color="primary"
                    ></v-slider>
                </div>
              
                <div class="d-flex w-100 flex-column">
                    <label for="">Years of experience (*)</label>
                    <v-text-field type="number" :error-messages="$v.years.$errors[0]?.$message.toString() || ''" v-model="$v.years.$model" class="mt-2" variant="outlined"
                        density="compact" label="Years of experience" single-line></v-text-field>
                </div>
                <v-switch color="primary" v-model="$v.pinned.$model" label="Pinned" inset></v-switch>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="px-4">
                <v-btn class="text-capitalize px-6 text-error" prepend-icon="mdi-trash-can" variant="text" @click="$router.push({name: 'alumni-index-delete-skills', query: {id: $route.query.id}})">Delete</v-btn>
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
const $profile = useProfileStore()
const {user} = storeToRefs(useProfileStore())
const route = useRoute()
const router = useRouter()
const informations = reactive({
    "name": "",
    "years": null,
    "certification": "",
    "proficiency": 1,
    "pinned": null
})
const levels = {
    0: "Beginner",
    1: "Intermediate",
    2: "Advanced",
    3: "Expert",
    4: "Master"
}

const rules = {
    name: {required},
    years: {required},
    certification: {},
    proficiency: {required},
    pinned: {required},
}

const loading = ref(false)

const $v = useVuelidate(rules, informations);

async function save() {
    if (!await $v.value.$validate() || !route.query.id) {
        return
    }

    loading.value = true

    await $profile.editSkill(route.query.id.toString(), informations)

    loading.value = false
    router.push({name: 'alumni-alumni'})
}


onMounted(() => {
    const skill = user.value?.skills.find(item => item.id == route.query.id)
    if(!skill){
        return router.push({name: 'alumni-alumni'})
    }

    informations.name = skill.name
    //@ts-ignore
    informations.years = skill.years
    informations.certification = skill.certification
    informations.proficiency = skill.proficiency
    //@ts-ignore
    informations.pinned = skill.pinned

})
</script>

<style scoped></style>