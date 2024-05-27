<template>
    <v-card class="rounded-lg py-3 px-4" :disabled="loading">
        <v-form @submit.prevent="save">
            <v-card-title class=" d-flex align-center">
                Add Image
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
                    <label for="">Image (*)</label>
                    <v-card @click="choose" variant="tonal" height="250" class="rounded-lg text-primary mt-5 d-flex align-center justify-center" style="border: 2px dashed #05668D" flat v-if="!informations.image" :color="$v.image.$errors.length > 0 ? 'error' : ''">
                        <h3>Click or Drop the image here</h3>
                    </v-card>
                    <v-card @click="choose" height="500" flat class="border" v-else>
                        <v-img :src="url"></v-img>
                    </v-card>
                    <input ref="fileInput" @change="change"  hidden type="file" accept="image/*" />
                </div>
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
import { required} from '@vuelidate/validators';
const { user: auth } = storeToRefs(useAuthStore())
const $profile = useProfileStore()
const { user } = storeToRefs(useProfileStore())
const fileInput = ref()
const url = ref("")
const informations = reactive({
        title: "",
        image: null,
})

const rules = {
    title: {required},
    image: {required}
}

const loading = ref(false)

const $v = useVuelidate(rules, informations);
const router = useRouter()
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

    await $profile.addImage(informations)

    loading.value = false
    router.push({name: 'alumni'})
}
</script>

<style scoped></style>