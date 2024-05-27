<template>
    <div class="w-100 h-100 d-flex justify-center" style="overflow: hidden;">
        <img :src="'http://localhost:8000/storage/' + image.location" v-if="image" />
    </div>
    <v-icon id="close-button" class="bg-white rounded-circle" size="55"  @click="$router.push({name: 'alumni'})">mdi-close</v-icon>

</template>

<script setup lang="ts">
const {user} = storeToRefs(useProfileStore())
const route = useRoute()
const router = useRouter()
const image : Ref<null | Image> = ref(null)
onMounted(() => {
    //@ts-ignore
    const findImage = user.value.images.find(item => item.id == route.query.id);
    if(!findImage) return router.push({name: 'alumni'})
    image.value = findImage
})
</script>

<style scoped>
#close-button{
    position: fixed;
    top: 15px;
    right: 15px;
}
</style>