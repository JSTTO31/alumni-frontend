<template>
    <v-card class="pa-3 rounded-lg mb-5 border" height="310"  flat v-if="user && !loading">
        <v-card-title class="d-flex align-center">
            Links 
            <v-spacer></v-spacer>
            <div v-if="user.skills.length > 0 && auth.id == user.id">
                <v-btn  icon="mdi-plus" color="grey-darken-1" variant="text" flat @click="$router.push({name: 'alumni-index-add-links'})"></v-btn>
            </div>
        </v-card-title>
        <v-card-text>
            <v-container class="pa-0">
                <v-row>
                    <v-col cols="3" v-for="link in user.links" :key="link" >
                       <AlumniLinkListItem :link="link"></AlumniLinkListItem>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script setup>
const {user:auth} = storeToRefs(useAuthStore());
const {user, loading} = storeToRefs(useProfileStore())
const showCreate = ref(false)

</script>

<style scoped>

</style>