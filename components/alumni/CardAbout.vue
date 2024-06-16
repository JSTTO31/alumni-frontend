<template>
    <div v-if="user" >
        <v-card class="pa-2 rounded-lg mb-5 border" flat v-if="user.about">
            <v-card-title class="d-flex align-center" v-if="user.id == auth.id">
                About you 
                <v-spacer></v-spacer>
                <v-btn v-if="user && user.id == auth.id" icon="mdi-pencil" color="grey-darken-1" variant="text" flat  @click="$router.push({name: 'alumni-alumni-index-authorize-edit-about'})"></v-btn>
            </v-card-title>
            <v-card-text style="font-size: 15px;line-height: 2;">
            <v-icon color="amber" size="35">mdi-hand-wave</v-icon> <br>
            <span v-if="!user.about">No paragraph</span>
            <p class="text-justify" v-if="seemore || user.about.paragraph.length < 250">{{ user.about.paragraph }}</p>
            <span v-else>{{ user.about.paragraph.substring(0, 250) }}...<span class="font-weight-medium text-blue-darken-3" @click="seemore = true" style="cursor: pointer;" v-if="user.about.paragraph.length > 250">see more</span></span>
            </v-card-text>
        </v-card>
        <v-card v-else-if="user && user.id == auth.id" flat class="rounded-lg border mb-5 pa-3">
            <v-card-title class="d-flex align-center">
                About you 
            </v-card-title>
            <v-card-text class="d-flex flex-column align-center justify-center">
                <v-btn class="my-15" color="grey-lighten-4"  v-if="user.id == auth.id" flat prepend-icon="mdi-pencil" @click="$router.push({name: 'alumni-alumni-index-authorize-edit-about'})">Edit About</v-btn>
                <span v-else>No Available about paragraph </span>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
import { useProfileStore } from '~/stores/useProfileStore';
const $profile = useProfileStore()
const {user: auth} = storeToRefs(useAuthStore());
const {user, authorize} = storeToRefs($profile);
const seemore = ref(false)
</script>

<style scoped>

</style>