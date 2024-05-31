<template>
   <v-card class="pa-3 rounded-lg mb-5 border" max-height="850" style="overflow: auto"  flat v-if="user">
        <v-card-title class="font-weight-medium px-4 d-flex py-0 align-center">
            Edit Profile
            <v-spacer></v-spacer>
            <v-btn icon="mdi-close" flat @click="$router.push({name: 'alumni'})"></v-btn>
        </v-card-title>
        <v-divider class="mx-4"></v-divider>
        <v-card-text>
            <div class="mb-5">
                <div class="pb-2 d-flex align-center justify-space-between">
                    <span class="font-weight-medium">Cover</span>
                    <v-spacer></v-spacer>
                    <v-btn prepend-icon="mdi-pencil-outline" @click="$router.push({name: 'alumni-index-edit-profile-cover'})" size="small" variant="text" class="text-capitalize">Edit</v-btn>
                </div>
                <v-card class="rounded-lg" flat>
                    <cover class="rounded-lg"></cover>
                </v-card>
            </div>
            <div>
                <div class="pb-2 d-flex align-center justify-space-between">
                    <span class="font-weight-medium">Picture</span>
                    <v-spacer></v-spacer>
                    <v-btn prepend-icon="mdi-pencil-outline" @click="$router.push({name: 'alumni-index-edit-profile-picture'})" size="small" variant="text" class="text-capitalize">Edit</v-btn>
                </div>
                <v-card class="rounded-lg bg-grey-darken-3 d-flex align-center justify-center" height="300" flat>
                    <avatar :user="user" size="285" class="rounded-lg"></avatar>
                </v-card>
            </div>
            <v-list class="mt-5 d-flex flex-column text-black">
                <h4 class="font-weight-medium mb-2">Sections</h4>
                <v-list-item :to="{name: 'alumni-index-edit-about'}" class="mb-1 text-black rounded">Edit About</v-list-item>
                <v-list-item :to="{name: 'alumni-index-add-skills'}" class="mb-1 text-black rounded">Add new Skills</v-list-item>
                <v-list-item :to="{name: 'alumni-index-add-works'}" class="mb-1 text-black rounded">Add new Work</v-list-item>
                <v-list-item :to="{name: 'alumni-index-add-educations'}" class="mb-1 text-black rounded">Add new Education</v-list-item>
                <v-list-item :to="{name: 'alumni-index-add-certifications'}" class="mb-1 text-black rounded">Add new Certification</v-list-item>
            </v-list>
            <v-list class=" d-flex flex-column text-black">
                <h4 class="font-weight-medium mb-2">Informations</h4>
                <v-list-item :to="{name: 'alumni-index-edit-personal'}" class="mb-1 text-black rounded">Edit Personal Informations</v-list-item>
                <v-list-item :to="{name: 'alumni-index-edit-contact'}" class="mb-1 text-black rounded">Edit Contact Informations</v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script setup>
const props = defineProps(['show'])
const emits = defineEmits(['update:show'])
const {user} = storeToRefs(useProfileStore())
const {user: auth} = storeToRefs(useAuthStore())
const showSections = ref(false)
</script>

<style scoped>
.expansion-panel{
    cursor: pointer;
}
</style>