<template>
    <div class="d-flex flex-column justify-center h-100 pt-10">
        <v-avatar size="170" class="bg-primary mx-auto" style="overflow:visible">
            <v-img  src="/icons/start-up.png"></v-img>
        </v-avatar>
        <h2 class="text-center mt-10">Get Started with Your Verification</h2>
        <p class="text-center">Complete your profile information to begin the verification process and become a recognized member of the Arellano University alumni community.</p>
        <v-btn class="mt-5" size="large" color="primary" rounded @click="$router.push({name: 'alumni-alumni-index-verification-email'})">Get's Started</v-btn>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>