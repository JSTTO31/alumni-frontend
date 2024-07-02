<template>
    <div>
        <div v-if="post.postable_type ==  'App\\Models\\PostText'">
            <div  v-html="(post.data as PostText).content">
            </div>
        </div>
        <div v-else>
            <PostTypeShared :post="post" v-if="post.data"></PostTypeShared>
            <v-card  class="rounded-lg border" flat v-else>
                <h3 class="px-4 py-2 font-weight-medium">
                    <v-icon color="yellow-darken-3" class="mr-2">mdi-alert-outline</v-icon>
                    Post No Longer Available</h3>
                <v-divider></v-divider>
                <p class="pa-4">
                    We’re sorry, but the post you are looking for is no longer available. It has been removed either by the user or due to a violation of our community guidelines. Thank you for your understanding.
                </p>
            </v-card>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{post: Post}>()
</script>

<style scoped>

</style>