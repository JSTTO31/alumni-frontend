<template>
    <v-card class="rounded-lg py-3 px-4" :disabled="loading">
        <v-form @submit.prevent="save">
            <v-card-title class=" d-flex align-center">
                Edit Image
                <v-spacer></v-spacer>
                <v-btn flat icon="mdi-close" @click="$router.push({name: 'alumni-alumni'})"></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text >
                <div class="d-flex w-100 flex-column">
                    <label for="">Title (*)</label>
                    <v-text-field :error-messages="$v.title.$errors[0]?.$message.toString() || ''"
                        v-model="$v.title.$model" class="mt-2" variant="outlined" density="compact"
                        label="Title" single-line></v-text-field>
                </div>
                <div class="d-flex w-100 flex-column">
                    <label for="">Image (*)</label>
                    {{informations.image}}
                    <v-card height="500" flat class="border" @click="choose" v-if="!informations.image">
                        <v-img :src="'http://localhost:8000/storage/' + url"></v-img>
                    </v-card>
                    <v-card height="500" flat class="border" @click="choose" v-else>
                        <v-img :src="url"></v-img>
                    </v-card>
                    <input ref="fileInput" @change="change"  hidden type="file" accept="image/*" />
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="px-4">
                <v-btn class="text-capitalize px-6 text-error" prepend-icon="mdi-trash-can" variant="text" @click="$router.push({name: 'alumni-alumni-index-authorize-delete-images', query: {id: $route.query.id}})">Delete</v-btn>
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
const fileInput = ref()
const url = ref("")
const informations = reactive({
        title: "",
        image: null,
})

const rules = {
    title: {required},
    image: {}
}

const loading = ref(false)

const $v = useVuelidate(rules, informations);
const router = useRouter();
const route = useRoute()
function choose(){
   fileInput.value.click()
}

function change(e: any){
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload  = () => {
        //@ts-ignore
        url.value = reader.result
    }
    informations.image = file

    reader.readAsDataURL(file)
}

async function save() {
    if (!await $v.value.$validate()) {
        return
    }

    loading.value = true

    if(!route.query.id) return

    await $profile.editImage(route.query.id.toString(), informations)

    loading.value = false
    router.push({name: 'alumni-alumni'})
}

onMounted(() => {
    //@ts-ignore
    const findImage = user.value?.images.find(item => item.id == route.query.id);

    if(!findImage) {
        return router.push({name: 'alumni-alumni'})
    }


    url.value = findImage.location
    informations.title = findImage.data.title

})
</script>

<style scoped></style>