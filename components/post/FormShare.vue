<template>
    <v-card class="rounded-lg py-3 px-4" :disabled="pending && status != 'idle'">
        <v-form @submit.prevent="execute()">
            <v-card-title class="d-flex align-center">
                <p>Share <b class="">{{ post.user.name }}</b> Post</p>
                <v-spacer></v-spacer>
                <v-btn icon="mdi-close" @click="emits('close')" flat></v-btn>
            </v-card-title>
            <div class="px-4">
                <label for="">Post title (*)</label>
                <v-text-field :error-messages="error?.data?.errors?.title[0].toString() || ''" v-model="informations.title" class="mt-2" single-line label="Title" variant="outlined"></v-text-field>
            </div>
            <v-card-text class="pt-0">
                <v-divider class="mb-5"></v-divider>
                <v-card class="rounded-lg border" flat>
                    <div class="pa-4 pb-0 d-flex align-center">
                        <avatar size="50" class="border mr-4" :user="post.user">
                        </avatar>
                        <div class="underline">
                            <h5>{{ post.user.name }}</h5>
                            <h6 @click.stop="" class="font-weight-regular text-caption font-weight-bold"
                                v-if="post.user.general_information">{{
                                    post.user.general_information.department_name }}</h6>
                        </div>
                    </div>
                    <v-card-text>
                        <h3 class="mb-2">{{ post.title }}</h3>
                        <div class="" v-html="(post.data as PostText).content">
                        </div>
                    </v-card-text>
                </v-card>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <V-btn class="text-capitalize" variant="flat" color="primary" type="submit" :loading="pending && status != 'idle'">Share post</V-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{ post: Post }>()
const emits = defineEmits(['close'])
const informations = reactive({
    title: '',
    privacy: 'public'
})
const router = useRouter()
const {execute, pending, status, error, data} = await usePostStore().share(props.post.id, informations) 
watch(status, () => {
    if(status.value == 'success'){
        router.push({name: 'posts-post', params: {post: (data as Ref<Post>).value.id}})
    }
})
</script>

<style scoped></style>