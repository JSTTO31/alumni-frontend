<template>
   <v-card class="rounded-lg border" max-height="850" style="overflow: auto"  flat v-if="user">
        <v-card-title class="font-weight-medium pa-4 py-2 d-flex align-center">
            Edit Profile
            <v-spacer></v-spacer>
            <v-btn icon="mdi-close" flat @click="$router.push({name: 'alumni-alumni'})"></v-btn>
        </v-card-title>
        <v-divider class="mx-4"></v-divider>
        <v-card-text :style="{height: name == 'xl' ? '750px' : '350px',overflowY: 'auto'}">
            <div class="mb-5">
                <div class="pb-2 d-flex align-center justify-space-between">
                    <span class="font-weight-medium">Cover</span>
                    <v-spacer></v-spacer>
                    <v-btn prepend-icon="mdi-pencil-outline" @click="$router.push({name: 'alumni-alumni-index-authorize-edit-profile-cover'})" size="small" variant="text" class="text-capitalize">Edit</v-btn>
                </div>
                <v-card class="rounded-lg" flat>
                    <cover class="rounded-lg"></cover>
                </v-card>
            </div>
            <div>
                <div class="pb-2 d-flex align-center justify-space-between">
                    <span class="font-weight-medium">Picture</span>
                    <v-spacer></v-spacer>
                    <v-btn prepend-icon="mdi-pencil-outline" @click="$router.push({name: 'alumni-alumni-index-authorize-edit-profile-picture'})" size="small" variant="text" class="text-capitalize">Edit</v-btn>
                </div>
                <v-card class="rounded-lg bg-grey-darken-3 d-flex align-center justify-center" height="300" flat>
                    <avatar :user="user" size="285" class="rounded-lg"></avatar>
                </v-card>
            </div>
            <v-list class="mt-5 d-flex flex-column text-black">
                <h4 class="font-weight-medium mb-2">Sections</h4>
                <v-list-item :to="{name: 'alumni-alumni-index-authorize-edit-about'}" class="mb-1 text-black rounded">Edit About</v-list-item>
                <v-list-item :to="{name: 'alumni-alumni-index-authorize-add-skills'}" class="mb-1 text-black rounded">Add new Skills</v-list-item>
                <v-list-item :to="{name: 'alumni-alumni-index-authorize-add-works'}" class="mb-1 text-black rounded">Add new Work</v-list-item>
                <v-list-item :to="{name: 'alumni-alumni-index-authorize-add-educations'}" class="mb-1 text-black rounded">Add new Education</v-list-item>
                <v-list-item :to="{name: 'alumni-alumni-index-authorize-add-certifications'}" class="mb-1 text-black rounded">Add new Certification</v-list-item>
            </v-list>
            <v-list class=" d-flex flex-column text-black">
                <h4 class="font-weight-medium mb-2">Informations</h4>
                <v-list-item :to="{name: 'alumni-alumni-index-authorize-edit-personal'}" class="mb-1 text-black rounded">Edit Personal Informations</v-list-item>
                <v-list-item :to="{name: 'alumni-alumni-index-authorize-edit-contact'}" class="mb-1 text-black rounded">Edit Contact Informations</v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script setup>
import {useDisplay} from 'vuetify'
const {name} = useDisplay()
const {user} = storeToRefs(useProfileStore())
</script>

<style scoped>
.expansion-panel{
    cursor: pointer;
}
</style>