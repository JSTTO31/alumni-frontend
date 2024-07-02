<template>
    <v-card @click="$router.push({ name: 'posts-post', params: { post: post.id } })" v-ripple="false"
        class="rounded-lg pa-0 mb-5 pb-4 border" flat :id="'card' + post.id" v-if="post && !post.hide">
        <v-card-text>
            <h3 class="mb-2">{{ post.title }}</h3>
            <p>{{ paragraph }}</p>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{ post: Post }>()
const paragraph = computed(() => {
    const content = (props.post.data as PostText).content
    return content.length > 220 ? content.slice(0, 215) + "..." : content
})
</script>

<style scoped></style>