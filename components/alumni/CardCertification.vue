<template>
    <v-card class="border h-75 pa-3 rounded-lg d-flex flex-column mt-5" flat v-if="user">
        <v-card-title class="font-weight-medium d-flex py-0 align-center">
            Certifications
            <v-spacer></v-spacer>
            <v-btn icon="mdi-plus" flat v-if="user.id == auth?.id"  @click="$router.push({name: 'alumni-alumni-index-authorize-add-certifications'})"></v-btn>
        </v-card-title>
        <v-card-text>
            <div class="d-flex align-center justify-center mt-15" v-if="user.certifications.length < 1" >
                <v-btn class="" variant="flat" color="grey-lighten-4" @click="$router.push({name: 'alumni-alumni-index-authorize-add-certifications'})" prepend-icon="mdi-plus" v-if="user.id == auth?.id">Add your certification</v-btn>
                <p v-else class="text-center pt-5">No Available</p>
            </div>
            <v-alert v-for="certification in user.certifications.slice(0, 3)" :key="certification.id" icon="mdi-seal" @click="" variant="tonal" active color="primary" class="pa-5 mt-3 rounded-lg">
                <div class="clickable-text font-weight-bold ">{{certification.name.length > 24 ? certification.name.substring(0, 24) + "..."  : certification.name }}</div>
                <div class="clickable-text font-weight-medium text-subtitle-2">{{ certification.issuing_organization }}</div>
            </v-alert>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions class="py-0 px-4">
            <v-btn block class="text-capitalize" @click="showAll = true" v-if="user.certifications.length > 3">Show All</v-btn>
        </v-card-actions>
    </v-card>
    <AlumniCertificationDialog v-model:show="showAll"></AlumniCertificationDialog>
</template>

<script setup lang="ts">
const {user:auth} = storeToRefs(useAuthStore())
const {user} = storeToRefs(useProfileStore())
const showAll = ref(false)
</script>

<style scoped>

</style>