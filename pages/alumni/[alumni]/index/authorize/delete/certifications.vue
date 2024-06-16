<template>
     <v-card :disabled="loading" class="px-4 py-3 rounded-lg">
       <v-card-title>Delete Certification</v-card-title>
       <v-card-text>
           <p>
            Are you sure you want to delete this <b>{{ certification?.name }}</b>? Deleting it will remove all associated details and records from your profile. This action cannot be undone. Please confirm if you want to proceed with this irreversible action.
           </p>
       </v-card-text>
       <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="" variant="flat" @click="$router.push({name: 'alumni-index-authorize-edit-certifications', query: {id: $route.query.id}})">Cancel</v-btn>
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
    await $profile.removeCertification(parseInt(route.query.id.toString()));
    loading.value = false
    router.push({name: "alumni"})
}
const certification : Ref<null | Certification> = ref(null)

onMounted(() => {
    //@ts-ignore
    const findCertification = user.value?.certifications.find(item => item.id == route.query.id)
    if(!findCertification) return router.push({name: 'alumni-alumni'})

    certification.value = findCertification
})
</script>

<style scoped>

</style>