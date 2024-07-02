<template>
    <div class="py-5">
        <PostCard class="mb-5" v-for="post in posts" :key="post.id" :post="post"></PostCard>
        <div class="d-flex" v-if="status != 'idle' && pending">
            <VProgressCircular class="mx-auto mb-5" size="45" indeterminate color="primary"></VProgressCircular>
        </div>
        <p v-if="status != 'idle' && !options.next_cursor" class="font-weight-bold text-center text-grey-darken-3">No More Post</p>
    </div>
</template>

<script setup lang="ts">
const $post = usePostStore()
const {posts, options} = storeToRefs(usePostStore())
const {execute, pending, status} = await $post.getAll({cursor: computed(() => options.value.next_cursor)})

if(posts.value.length < 1){
    await execute()
}

onMounted(() => {
    window.addEventListener('scroll', async (e) => {
        if(document.body.scrollHeight == window.scrollY + window.innerHeight && !pending.value && options.value.next_cursor){
            await execute()
        }
    })
})
</script>

<style scoped>

</style>