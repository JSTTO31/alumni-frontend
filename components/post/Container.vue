<template>
    <div class="py-5">
        <PostCard class="mb-5" v-for="post in posts" :key="post.id" :post="post"></PostCard>
    </div>
</template>

<script setup lang="ts">
const $post = usePostStore()
const {posts} = storeToRefs(usePostStore())

const {execute} = await $post.getAll()

execute()
</script>

<style scoped>

</style>