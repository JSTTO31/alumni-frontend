<template>
     <v-card :disabled="loading" class="px-4 py-3 rounded-lg">
       <v-card-title>Delete Link</v-card-title>
       <v-card-text>
           <p>
                Are you sure you want to delete this <b>{{ link?.title }}</b>? Deleting it will remove all associated details and records from your profile. This action cannot be undone. Please confirm if you want to proceed with this irreversible action.
           </p>
       </v-card-text>
       <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="" variant="flat" @click="$router.push({name: 'alumni-index-edit-Links', query: {id: $route.query.id}})">Cancel</v-btn>
            <v-btn class="" color="error" variant="flat" @click="remove" :loading="loading">Delete Permanently</v-btn>
       </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
const $profile = useProfileStore()
const {user} = storeToRefs(useProfileStore())
const route = useRoute()
const router = useRouter()
const loading = ref(false)
async function remove(){

    if(!route.query.id) return
    loading.value = true
    await $profile.removeLink(parseInt(route.query.id.toString()));
    loading.value = false
    router.push({name: "alumni"})
}
const link : Ref<null | Link> = ref(null)

onMounted(() => {
    //@ts-ignore
    const findLink = user.value?.links.find(item => item.id == route.query.id)
    if(!findLink) return router.push({name: 'alumni-alumni'})

    link.value = findLink
})
</script>

<style scoped>

</style>