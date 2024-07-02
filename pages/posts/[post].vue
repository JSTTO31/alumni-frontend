<template>
    <div v-if="post" class="d-flex pb-15">
        <v-btn variant="tonal" class="mr-5 mt-5" @click="$router.push({ name: 'index' })" icon="mdi-arrow-left"></v-btn>
        <div>
            <div class="pa-4 pb-0 d-flex align-center">
                <div class="d-flex align-center">
                    <avatar size="65" class="border mr-4" :user="post.user">
                    </avatar>
                </div>
                <div>
                    <h4>
                        <span @click.stop="$router.push({ name: 'alumni-alumni', params: { alumni: post.user.email } })" class="underline">{{ post.user.name }}</span>
                        <v-icon color="blue-darken-1" style="transform: scale(.8)"
                            class="verify-icon" v-if="post.user?.general_information">mdi-check-decagram</v-icon> <span
                            class="text-subtitle-2 font-weight-bold">{{ timeAgo
                            }}</span></h4>
                    <h5 @click.stop="" class="font-weight-regular font-weight-regular underline"
                        v-if="user?.general_information">
                        {{ user.general_information.department_name }}</h5>
                </div>
                <v-spacer></v-spacer>
                <v-btn variant="text" :loading="loading" @click.stop="toggleSave"
                    :icon="post.post_saved ? 'mdi-bookmark' : 'mdi-bookmark-outline'" class="mr-4"></v-btn>
                <v-menu location="bottom right">
                    <template #activator="{ props }">
                        <v-btn variant="text" :loading="loading_hide" v-bind="props" @click.stop
                            icon="mdi-dots-horizontal" flat class=""></v-btn>
                    </template>
                    <v-card width="250">
                        <v-list>
                            <v-list-item @click="toggleSave" v-if="!post.post_saved" prepend-icon="mdi-bookmark">Save
                                post</v-list-item>
                            <v-list-item @click="toggleSave" v-else prepend-icon="mdi-bookmark-outline">Unsave
                                post</v-list-item>
                            <v-list-item prepend-icon="mdi-eye-off-outline" @click="toggleHide">Hide post</v-list-item>
                            <v-list-item v-if="!post.report" prepend-icon="mdi-alert-octagon-outline"
                                @click="$router.push({ query: { type: 'report', post: post.id } })">Report
                                post</v-list-item>
                            <v-list-item v-else prepend-icon="mdi-alert-octagon" class="text-error">Reported</v-list-item>
                            <v-list-item prepend-icon="mdi-share-outline" @click="showShareDialog = true">Share</v-list-item>
                            <v-list-item prepend-icon="mdi-link-variant" @click="copyLink">Copy link</v-list-item>
                            <v-list-item prepend-icon="mdi-trash-can-outline" @click="showRemoveDialog = true" v-if="user?.id == post.user.id">Delete</v-list-item>
                        </v-list>
                    </v-card>
                </v-menu>
            </div>
            <v-card-text>
                <h1 class="text-grey-darken-4 mb-2 font-weight-medium">{{ post.title }}</h1>
                <PostContainerContent style="font-size: 18px" :post="post"></PostContainerContent>
            </v-card-text>
            <div class="px-4 d-flex">
                <PostButtonReaction :post="post" size="large"></PostButtonReaction>
                <v-btn size="large" flat color="grey-darken-3" variant="text" class="text-capitalize mr-3"
                    prepend-icon="mdi-message-text-outline" @click.stop="focus">Comment <v-chip size="small"
                        class="ml-5" v-if="post.comments_count > 0">{{ post.comments_count }} </v-chip>
                </v-btn>
                <v-btn size="large" flat color="grey-darken-3" variant="text" class="text-capitalize mr-3"
                    prepend-icon="mdi-share-outline" v-if="post.postable_type != 'App\\Models\\Post'"
                    @click.stop="showShareDialog = true">Share <v-chip size="small" class="ml-5" v-if="post.shares_count > 1">{{
                        post.shares_count }}</v-chip>
                </v-btn>
            </div>
            <div class="w-100 d-flex px-4 mt-3">
                <v-text-field :disabled="pending && status != 'idle'" :loading="pending && status != 'idle'"
                    id="comment" label="Write your comment" single-line v-model="comment" variant="outlined" flat
                    ref="text_field" @keyup.enter="commenthandler" hide-details append-inner-icon="mdi-send">
                </v-text-field>
            </div>
            <div class="d-flex align-center px-4">
                Relevant
                <v-divider class="my-5 mx-5"></v-divider>
            </div>
            <Suspense>
                <PostCommentContainer></PostCommentContainer>
                <template #fallback>
                    <div>
                        <v-skeleton-loader type="avatar, chip" class="bg-transparent"></v-skeleton-loader>
                        <v-skeleton-loader type="paragraph, button, button, button"
                            class="bg-transparent"></v-skeleton-loader>
                        <v-skeleton-loader type="avatar, chip" class="bg-transparent"></v-skeleton-loader>
                        <v-skeleton-loader type="paragraph, button, button, button"
                            class="bg-transparent"></v-skeleton-loader>
                    </div>
                </template>
            </Suspense>
        </div>
        <v-dialog v-model="showShareDialog" width="750" persistent>
            <PostFormShare @close="showShareDialog = false" :post="post"></PostFormShare>
        </v-dialog>
        <v-dialog v-model="showRemoveDialog" width="650" persistent>
            <PostDeleteMessageBox @close="showRemoveDialog = false" :post="post"></PostDeleteMessageBox>
        </v-dialog>
    </div>

</template>

<script setup lang="ts">
import { useCommentStore } from '~/stores/post/useCommentStore';
const { post } = storeToRefs(usePostStore())
const $post = usePostStore()
const $comment = useCommentStore()
const { user } = storeToRefs(useAuthStore())
const route = useRoute()
const router = useRouter()
const comment = ref('')
const showShareDialog = ref(false)
const showRemoveDialog = ref(false)
await $post.getById(route.params.post.toString())
//@ts-ignore
const timeAgo = useTimeAgo(new Date(post.value.created_at))
//@ts-ignore
const { pending, execute, status } = await $comment.create(comment);
const loading = ref(false)
const loading_hide = ref(false)

function copyLink(){
  const routeData = router.resolve({name: 'posts-post', params: {post: post.value?.id}})
  navigator.clipboard.writeText('localhost:3000' + routeData.href)
}

async function toggleHide() {
    if (post.value) {
        loading_hide.value = true;
        await $post.hide(post.value.id)
        loading_hide.value = false
        router.push({ name: 'index' })
    }
}

function focus() {
    const commentField = document.getElementById('comment')

    if (commentField) {
        commentField.focus()
    }
}

async function commenthandler() {
    if (!comment.value) {
        return;
    }
    await execute()
    comment.value = ""
};

async function toggleSave() {
    if (!post.value) return
    loading.value = true;
    await $post.save(post.value.id)
    loading.value = false
}

if (post.value) {
    useHead({
        title: (post.value?.title || 'Unknown title') + ' | Alumni Post'
    })
}
</script>

<style scoped>
.underline:hover {
    text-decoration: underline;
    cursor: pointer;
}
</style>