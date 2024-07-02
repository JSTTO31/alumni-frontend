<template>
    <v-container>
        <suspense>
            <v-row>
                <v-col cols="8" class="pl-0">
                    <nuxt-page></nuxt-page>
                </v-col>
                <v-col cols="4">
                    <AlumniCard v-if="post?.user" :user="post.user"></AlumniCard>
                    <v-card class="mt-5 rounded-lg border" flat
                        v-if="post && post.user.posts && post.user.posts.length > 0">
                        <v-card-title style="font-size: 18px">Popular Post</v-card-title>
                        <v-card-text>
                            <PostCardText v-for="post in post.user.posts" :post="post" :key="post.id"></PostCardText>
                        </v-card-text>
                        <v-btn block class="text-capitalize" append-icon="mdi-arrow-right">See more posts</v-btn>
                    </v-card>
                </v-col>
            </v-row>
            <template #fallback>
                <div>
                    <v-row>
                        <v-col cols="8" class="pl-0">
                            <div>
                                <v-skeleton-loader type="avatar, avatar, chip, ossein, avatar, avatar"
                                    class="bg-transparent ml-n5"></v-skeleton-loader>
                                <v-skeleton-loader type="heading, paragraph, paragraph, button, button, button"
                                    class="bg-transparent ml-12"></v-skeleton-loader>
                                <v-skeleton-loader type="divider" class="bg-transparent my-5 ml-12"></v-skeleton-loader>
                            </div>
                            <div class="pl-12">
                                <v-skeleton-loader type="avatar, chip" class="bg-transparent"></v-skeleton-loader>
                                <v-skeleton-loader type="paragraph, button, button, button"
                                    class="bg-transparent"></v-skeleton-loader>
                                <v-skeleton-loader type="avatar, chip" class="bg-transparent"></v-skeleton-loader>
                                <v-skeleton-loader type="paragraph, button, button, button"
                                    class="bg-transparent"></v-skeleton-loader>
                            </div>
                        </v-col>
                        <v-col cols="4">
                            <div>
                                <v-skeleton-loader type="avatar" class="bg-transparent"></v-skeleton-loader>
                                <v-skeleton-loader type="heading, list-item, paragraph, button, button, actions"
                                    class="bg-transparent"></v-skeleton-loader>
                                <v-skeleton-loader v-for="n in 3" type="divider, table-heading, list-item-two-line"
                                    class="bg-transparent"></v-skeleton-loader>
                                <v-skeleton-loader type="heading" class="bg-transparent"></v-skeleton-loader>

                            </div>
                        </v-col>
                    </v-row>
                </div>
            </template>
        </suspense>
    </v-container>
</template>

<script setup lang="ts">
const { post } = storeToRefs(usePostStore())
useHead({
    title: 'Posts'
})

definePageMeta({
    middleware: ['auth'],
    layout: 'authenticated'
})


</script>

<style scoped></style>