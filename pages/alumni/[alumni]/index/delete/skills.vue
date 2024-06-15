<template>
     <v-card :disabled="loading" class="px-4 py-3 rounded-lg">
       <v-card-title>Delete skill</v-card-title>
       <v-card-text>
           <p>
            Are you sure you want to delete the skill <b>{{skill?.name}}</b>? Deleting this skill will remove all associated details and records from your profile. This action cannot be undone, and you will need to add the skill again if you wish to include it in the future. Please confirm if you want to proceed with this irreversible action.
           </p>
       </v-card-text>
       <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="" variant="flat" @click="$router.push({name: 'alumni-index-edit-skills', query: {id: $route.query.id}})">Cancel</v-btn>
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
    await $profile.removeSkill(route.query.id.toString());
    loading.value = false
    router.push({name: "alumni"})
}
const skill : Ref<null | Skill> = ref(null)

onMounted(() => {
    const findSkill = user.value?.skills.find(item => item.id == route.query.id)
    if(!findSkill) return router.push({name: 'alumni-alumni'})

    skill.value = findSkill
})
</script>

<style scoped>

</style>