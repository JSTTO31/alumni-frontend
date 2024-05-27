<template>
    <v-card class="pa-3 rounded-lg mb-5 border" flat v-if="user">
        <v-card-title class="d-flex align-center">
            Images 
            <v-spacer></v-spacer>
            <div v-if="user.skills.length > 0 && auth.id == user.id">
                <v-btn  icon="mdi-plus" color="grey-darken-1" variant="text" flat @click="$router.push({name: 'alumni-index-add-images'})"></v-btn>
            </div>
        </v-card-title>
        <v-card-text>
            <v-container class="pa-0">
                <v-row>
                    <v-col cols="3" v-for="image in user.images" :key="image.id">
                        <alumni-image-list-item :image="image"></alumni-image-list-item>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script setup>
const {user:auth} = storeToRefs(useAuthStore());
const {user} = storeToRefs(useProfileStore())
</script>

<style scoped>

</style>