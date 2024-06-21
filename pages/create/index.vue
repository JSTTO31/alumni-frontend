<template>
    <v-card :disabled="pending && status != 'idle'" flat class="py-10 bg-transparent">
        <v-form @submit.prevent="submit">
            <label for="">Post title (*)</label>
            <v-text-field v-model="informations.title" :error-messages="error?.data?.errors?.title[0].toString() || ''" label="Enter Post Title" class="mt-3 mb-2" single-line variant="outlined"></v-text-field>
            <div class="mb-2 rounded-lg" id="container">
                <div id="editor" class="border" style="font-family: 'Roboto', sans-serif;font-size: 17px;">
                </div>
            </div>
            
            <p class="text-subtitle-2 text-error ml-4 mb-5" v-if="error?.data.errors.content">{{ error?.data?.errors?.content[0].toString() || ''}}</p>
            <v-divider class="my-5"></v-divider>
            <v-btn type="submit" color="primary" :loading="pending && status != 'idle'">Create</v-btn>
        </v-form>
    </v-card>
</template>

<script setup lang="ts">
import Quill from 'quill';
import "quill/dist/quill.core.css";
const router = useRouter()
const $post = usePostStore();
const informations = reactive({
    title: '',
    privacy: 'public',
    content: ''
})
let quill : Quill | null = null
const {execute, error, pending, status} = await $post.createPostText(informations)

async function submit(){
    if(quill){
        informations.content = quill?.getSemanticHTML()
        await execute()

        if(status.value == 'success'){
            router.push('/')
        }
    }
}

onMounted(() => {
    quill = new Quill('#editor', {
        theme: 'snow',
        placeholder: 'Writer your text here',
    });
    const example = document.getElementById('example')
    if(example){
        example.innerHTML = quill.getSemanticHTML()
    }
})
</script>

<style scoped>

</style>