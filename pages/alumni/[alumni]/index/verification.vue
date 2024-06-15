<template>
    <v-card class="rounded-lg ">
        <v-card-text style="height: 600px" class="d-flex flex-column px-15">
            <div class=" d-flex align-center pt-5">
                    <v-btn rounded :active="$route.name == 'alumni-alumni-index-verification'" @click="$router.push({name: 'alumni-alumni-index-verification'})" class="font-weight-medium text-capitalize"  variant="text" prepend-icon="mdi-check-circle" color="primary">Get's Started</v-btn>
                    <v-divider thickness="3" color="primary"></v-divider>
                    <v-btn rounded :active="$route.name == 'alumni-alumni-index-verification-email'" @click="$router.push({name: 'alumni-alumni-index-verification-email'})"  class="font-weight-medium text-capitalize" color="grey"  variant="text" prepend-icon="mdi-email">Email Verification</v-btn>
                    <v-divider ></v-divider>
                    <v-btn rounded class="font-weight-medium text-capitalize" color="grey"  variant="text" prepend-icon="mdi-school">Alumni Verification</v-btn>
            </div>
            <div class="px-15 h-100">
                <NuxtPage></NuxtPage>
            </div>
        </v-card-text>
        <v-btn icon="mdi-close" class="close-btn" @click="$router.push({name: 'alumni-alumni'})"></v-btn>
    </v-card>
</template>

<script setup lang="ts">
const {user} = storeToRefs(useAuthStore())
</script>

<style scoped>
.close-btn{
    position: absolute;
    top: 2%;
    right: 2%;
}
</style>