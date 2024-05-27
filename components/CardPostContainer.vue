<script setup lang="ts">
const $post = usePostStore()
const {posts} = storeToRefs($post)
const no_post = ref(true)
const loading = ref(false)
const getAll = async () => {
    const {data} = await $post.getAll()
    //@ts-ignore
    if(data.value && data.value.length < 1){
        no_post.value = true
    }
}
const fetchOnScroll = async () => {
    if((scrollY + window.innerHeight) >= (document.body.scrollHeight - 250) && !loading.value && !no_post.value){
        loading.value = true
        await getAll().then(() => loading.value = false)
    }
}

if(posts.value.length < 1){
    await getAll()
}
// window.addEventListener('scroll',fetchOnScroll)

onBeforeRouteLeave((to, from, next) => {
    removeEventListener('scroll', fetchOnScroll)

return next()
})

</script>
<template>
    <div>
        <card-post :post="post" flat v-for="post in posts.filter(item => !!item)" :key="post.id" class="mb-5"></card-post>
        <div v-if="loading">
            <skeleton-post v-for="n in 3" :key="n + Math.random() * 100" class="mb-2 rounded-0 border-b" flat></skeleton-post>
        </div>
        <h4 class="text-center pt-15 text-grey-darken-3" v-if="no_post">No more posts</h4>
    </div>
</template>



<style scoped>

</style>