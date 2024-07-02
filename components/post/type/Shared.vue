<template>
    <v-card class="border rounded-lg" flat @click.stop="$router.push({name: 'posts-post', params: {post: post.data.id}})" v-if="$route.name != 'posts-post'">
        <div class="pa-4 pb-0 d-flex align-center">
            <avatar size="50" class="border mr-4" :user="(post.data as Post).user">
            </avatar>
            <div class="underline">
                <h5>{{ (post.data as Post).user.name }}</h5>
                <h6 @click.stop="" class="font-weight-regular text-caption font-weight-bold"
                    v-if="post.user.general_information">{{
                        post.user.general_information.department_name }}</h6>
            </div>
        </div>
        <v-card-text>
            <h3 class="mb-2">{{ post.title }}</h3>
            <PostContainerContent :post="(post.data as Post)"></PostContainerContent>
        </v-card-text>
    </v-card>

    <v-card class="border rounded-lg" flat @click.stop="$router.push({name: 'posts-post', params: {post: post.data.id}})" v-else>
        <div class="pa-4 pb-0 d-flex align-center">
            <avatar size="60" class="border mr-4" :user="(post.data as Post).user">
            </avatar>
            <div class="underline">
                <h4>{{ (post.data as Post).user.name }}</h4>
                <h5 @click.stop="" class="font-weight-regular text-caption font-weight-bold"
                    v-if="post.user.general_information">{{
                        post.user.general_information.department_name }}</h5>
            </div>
        </div>
        <v-card-text>
            <h2 class="mb-3 font-weight-bold">{{ post.title }}</h2>
            <PostContainerContent class="text-subtitle-1" :post="(post.data as Post)"></PostContainerContent>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{post: Post,}>()
</script>

<style scoped>

</style>