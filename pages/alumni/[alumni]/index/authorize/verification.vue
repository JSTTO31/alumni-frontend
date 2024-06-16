<template>
    <v-card class="rounded-lg ">
        <v-card-text style="height: 620px" class="d-flex flex-column px-15">
            <div class=" d-flex align-center pt-5">
                <v-btn rounded :active="$route.name == 'alumni-alumni-index-authorize-verification'"
                    @click="$router.push({ name: 'alumni-alumni-index-authorize-verification' })"
                    class="font-weight-medium text-capitalize" variant="text" prepend-icon="mdi-check-circle"
                    color="primary">Get's Started</v-btn>
                <v-divider thickness="3" color="primary"></v-divider>
                <v-btn :color="!user?.email_verified_at ? 'grey' : 'primary'" rounded
                    :active="$route.name == 'alumni-alumni-index-authorize-verification-email'"
                    @click="$router.push({ name: 'alumni-alumni-index-authorize-verification-email' })"
                    class="font-weight-medium text-capitalize" variant="text"
                    :prepend-icon="user && user.email_verified_at ? 'mdi-email-check' : 'mdi-email'">Email
                    Verification</v-btn>
                <v-divider></v-divider>
                <v-btn rounded class="font-weight-medium text-capitalize" variant="text"
                    prepend-icon="mdi-school"
                    :active="$route.name == 'alumni-alumni-index-authorize-verification-alumni'"
                    :color="!user?.verified_at ? 'grey' : 'primary'"
                    @click="$router.push({ name: 'alumni-alumni-index-authorize-verification-alumni' })">Alumni Verification</v-btn>
            </div>
            <div class="h-100 px-2">
                <NuxtPage></NuxtPage>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
const { user } = storeToRefs(useAuthStore())
definePageMeta({
    // middleware: ['verification']
})
</script>

<style scoped>
.close-btn {
    position: absolute;
    top: 2%;
    right: 2%;
}
</style>