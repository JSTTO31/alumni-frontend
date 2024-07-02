<template>
    <div>
        <div class="d-flex align-center mb-4">
            <h4 class="font-weight-medium">Feeds</h4>
            <v-spacer></v-spacer>
            <v-btn @click="$router.push({ query: {} })" :color="!$route.query.latest ? 'primary' : 'black'"
                :variant="!$route.query.latest ? 'flat' : 'outlined'"
                class="ml-3 rounded-xl text-capitalize">Relevant</v-btn>
            <v-btn @click="$router.push({ query: { latest: true}})" :color="$route.query.latest ? 'primary' : 'black'"
                :variant="$route.query.latest ? 'flat' : 'outlined'"
                class="ml-3 rounded-xl text-capitalize">Latest</v-btn>
        </div>
        <v-divider thickness="2" color="black"></v-divider>
        <div class="py-5">
            <PostCard class="mb-5" v-for="post in posts" :key="post.id" :post="post"></PostCard>
            <div class="d-flex mt-15" v-if="status != 'idle' && pending">
                <VProgressCircular class="mx-auto mb-5" size="45" indeterminate color="primary"></VProgressCircular>
            </div>
            <p v-if="status != 'idle' && !options.next_cursor && !pending"
                class="font-weight-bold text-center text-grey-darken-3">No More Post</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const $post = usePostStore()
const { posts, options } = storeToRefs(usePostStore())
const route = useRoute()
const latest = ref(!!route.query.latest)
const { execute, pending, status } = await $post.getAll({ cursor: computed(() => options.value.next_cursor), latest })

if (posts.value.length < 1) {
    await execute()
}

onBeforeRouteUpdate(async (to, from, next) => {
    latest.value = !!to.query.latest
    posts.value = []
    options.value = {} as OptionsType
    await execute()

    return next()
})

onMounted(() => {
    window.addEventListener('scroll', async (e) => {
        if (document.body.scrollHeight == window.scrollY + window.innerHeight && !pending.value && options.value.next_cursor) {
            await execute()
        }
    })
})
</script>

<style scoped></style>