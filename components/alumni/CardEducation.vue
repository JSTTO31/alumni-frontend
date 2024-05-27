<template>
    <v-card class="rounded-lg mb-5 pa-3 border"  height="310"  flat v-if="user">
        <v-card-title class="font-weight-medium d-flex py-0 align-center">
            Education
            <v-spacer></v-spacer>
            <v-btn icon="mdi-plus" flat v-if="user.educations.length > 0" @click="$router.push({name: 'alumni-index-add-educations'})"></v-btn>
        </v-card-title>
        <v-card-text>
            <div class="d-flex align-center justify-center mt-15" v-if="user.educations.length < 1">
                <v-btn class="" variant="flat" color="grey-lighten-4" @click="$router.push({name: 'alumni-index-add-educations'})" prepend-icon="mdi-plus">Add your education</v-btn>
            </div>
            <AlumniEducationListItem class="py-2" :class="index == user.educations.length - 1 ? '' : 'border-b-md'" v-for="education, index in user.educations.slice(0,2)" :key="education.id" :education="education"></AlumniEducationListItem>
        </v-card-text>
        <v-card-actions class="pa-0">
            <v-btn block class="text-capitalize" v-if="user.educations.length > 2" @click="showAll = true">Show all</v-btn>
        </v-card-actions>
    </v-card>
    <AlumniEducationDialog v-model:show="showAll"></AlumniEducationDialog>
</template>

<script setup>
const {user:auth} = storeToRefs(useAuthStore());
const {user} = storeToRefs(useProfileStore())
const showAll = ref(false)
</script>

<style scoped>

</style>