<template>
    <v-card class="rounded-lg py-3 px-4" :disabled="loading">
        <v-form @submit.prevent="save">
            <v-card-title class=" d-flex align-center">
                Add Work Experience
                <v-spacer></v-spacer>
                <v-btn flat icon="mdi-close" @click="$router.push({name: 'alumni'})"></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <div class="d-flex" style="gap: 15px">
                    <div class="d-flex w-100 flex-column">
                        <label for="">Company Name (*)</label>
                        <v-text-field :error-messages="$v.company_name.$errors[0]?.$message.toString() || ''" v-model="$v.company_name.$model" class="mt-2" variant="outlined"
                            density="compact" label="Company name" single-line></v-text-field>
                    </div>
                    <div class="d-flex w-100 flex-column">
                        <label for="">Company Website (optional)</label>
                        <v-text-field v-model="$v.company_website.$model" class="mt-2" variant="outlined" density="compact" label="https://website" single-line>
                        </v-text-field>
                    </div>
                </div>
                <div class="d-flex" style="gap: 15px">
                    <div class="d-flex w-100 flex-column">
                        <label for="">Position Title (*)</label>
                        <v-text-field :error-messages="$v.position_title.$errors[0]?.$message.toString() || ''" v-model="$v.position_title.$model"  class="mt-2" variant="outlined" density="compact" label="Position title" single-line>
                        </v-text-field>
                    </div>
                    <div class="d-flex w-100 flex-column">
                        <label for="">Position Level (*)</label>
                        <v-select v-model="$v.position_level.$model" :error-messages="$v.position_level.$errors[0]?.$message.toString() || ''" :items="position_levels" class="mt-2" variant="outlined" density="compact" label="Position Level" single-line>
                        </v-select>
                    </div>
                </div>
                <div class="d-flex" style="gap: 15px">
                    <div class="d-flex w-100 flex-column">
                        <label for="">Industry (*)</label>
                        <v-select v-model="$v.industry.$model" :error-messages="$v.industry.$errors[0]?.$message.toString() || ''" :items="industries" class="mt-2" variant="outlined" density="compact" label="Industry" single-line>
                        </v-select>
                    </div>
                    <div class="d-flex w-100 flex-column">
                        <label for="">Specialization (*)</label>
                        <v-select v-model="$v.specialization.$model" :error-messages="$v.specialization.$errors[0]?.$message.toString() || ''" :items="specializations" class="mt-2" variant="outlined" density="compact" label="Specialization" single-line>
                        </v-select>
                    </div>
                </div>
                <div class="d-flex" style="gap: 15px">
                    <div class="d-flex w-100 flex-column">
                        <label for="">From (*)</label>
                        <v-text-field :error-messages="$v.from.$errors[0]?.$message.toString() || ''" v-model="$v.from.$model" type="date" class="mt-2" variant="outlined"
                            density="compact" label="From" single-line></v-text-field>
                    </div>
                    <div class="d-flex w-100 flex-column">
                        <label for="">to (optional)</label>
                        <v-text-field  v-model="$v.to.$model" type="date" class="mt-2" variant="outlined" density="compact" label="to" single-line>
                        </v-text-field>
                    </div>
                </div>
                <div>
                    <label for="">Nature of work (optional)</label>
                    <v-textarea v-model="$v.description.$model" class="mt-2" density="compact" variant="outlined" single-line label="Nature of work" counter>
                        <template #counter="{value}">
                            <span>Remaining {{ 
                                //@ts-ignore
                                800 - value 
                            }} / 800</span>
                        </template>
                    </v-textarea>
                </div>
                <v-switch color="primary" v-model="$v.current.$model" label="Current working here" inset></v-switch>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="px-6">
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
const props = defineProps<{ show: boolean }>()
const emits = defineEmits(['update:show'])
const {specializations, position_levels, industries} = usePersonalInformationOptions
const informations = reactive({
    // company_name: "",
    // company_website: "",
    // position_title: "",
    // position_level: null,
    // industry: null,
    // specialization: null,
    // description: "",
    // current: false,
    // from: null,
    // to: null
    "company_name": "Innovative Solutions Corp.",
    "company_website": "https://www.innovativesolutions.com",
    "position_title": "Lead Software Engineer",
    "position_level": "Senior",
    "industry": "Information Technology",
    "specialization": "Software Development",
    "description": "Leading a team of developers to design and implement cutting-edge software solutions.",
    "current": true,
    "from": "2020-06-01",
    "to": null
})


const rules = {
    company_name: {required},
    company_website: {},
    position_title: {required},
    position_level: {required},
    industry: {required},
    specialization: {required},
    description: {required},
    current: {required},
    from: {required},
    to: {}
}

const loading = ref(false)

const $v = useVuelidate(rules, informations);

const router = useRouter()

async function save() {
    if (!await $v.value.$validate()) {
        return
    }

    loading.value = true

    await $profile.addWork(informations)

    loading.value = false
    router.push({name: 'alumni'})
}
</script>

<style scoped></style>