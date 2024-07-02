<template>
    <v-card :disabled="pending && status != 'idle'">
        <v-card-title class="d-flex align-center">
            Confirm Deletion
            <v-spacer></v-spacer>
            <v-btn icon="mdi-close" flat @click="emits('close')"></v-btn>
        </v-card-title>
        <v-card-text class="pt-2">
            <v-alert border type="error" variant="tonal" class="mb-5">
                Are you sure you want to delete this post? This action cannot be undone.
            </v-alert>
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
        <v-card-actions class="px-5">
            <v-btn @click="emits('close')">Cancel</v-btn>
            <v-btn :loading="pending && status != 'idle'" variant="flat" color="error" @click="destroy">Confirm</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{post: Post}>()
const emits = defineEmits(['close'])
const $post = usePostStore();
const {pending, status, execute} = await $post.destroy(props.post.id)
const router = useRouter()

async function destroy(){
    await execute()
    if(status.value == 'success'){
        router.push({name: 'index'})
    }
}
</script>

<style scoped>

</style>