<template>
     <div>
        <v-menu location="center center" >
            <template #activator="{props}">
                <v-avatar v-bind="props" class="bg-grey-lighten-2" size="165" style="border: 4px solid #05668D">
                    <v-img v-if="user?.id == auth?.id" width="165" height="165" class="rounded-lg"
                        :src="auth?.picture" id="profile" />
                    <v-img v-else width="165" height="165" class="rounded-lg"
                        :src="`https://source.unsplash.com/random/250x250&${user?.alumni_information.gender}&` + user?.id" />
                </v-avatar>
            </template>
            <v-list class="" style="margin-top: 150px;margin-left: 100px">
                <v-list-item @click="view = true" density="compact" prepend-icon="mdi-eye-outline">View</v-list-item>
                <v-list-item @click="$router.push({name: 'alumni-index-edit-profile-picture'})" density="compact" prepend-icon="mdi-pencil-outline">Change</v-list-item>
            </v-list>
        </v-menu>
        <v-dialog width="650" height="650" v-model="view">
                <v-img :src="auth?.picture"></v-img>
        </v-dialog>
     </div>
</template>

<script setup lang="ts">
const {user:auth} = storeToRefs(useAuthStore())
const {user} = storeToRefs(useProfileStore())
const view = ref(false)

</script>

<style scoped>

</style>