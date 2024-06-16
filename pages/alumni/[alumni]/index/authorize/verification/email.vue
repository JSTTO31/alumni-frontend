<template>
    <div class="d-flex flex-column justify-center pt-10" v-if="!user?.email_verified_at">
        <v-avatar size="170" class="mx-auto" style="overflow:visible">
            <v-img  src="/icons/send.png"></v-img>
        </v-avatar>
        <h2 class="text-center mt-5">Email Verification</h2>
        <p class="text-center">Please enter the 6-digit code sent to your email to verify your account and complete the verification process.</p>
        <div>
            <v-otp-input v-model="otp" :error="verify_status == 'error'"></v-otp-input>
            <p v-if="error && error.data.message[0]" class="text-center text-error">{{ error.data.message[0] }}</p>
        </div>
        <div class="d-flex" style="gap: 15px">
            <v-btn class="mx-auto w-50 mt-5" size="large" rounded variant="outlined" :disabled="!!expires_at || send_pending" :loading="send_pending" @click="send">
                Resend {{expires_at}}
            </v-btn>
            <v-btn class="mx-auto w-50 mt-5" size="large" color="primary" :disabled="otp.length < 6 || send_pending" :loading="verify_status != 'idle' && verify_pending" rounded @click="verify">Verify Email</v-btn>
        </div>
    </div>
    <div v-else class="d-flex flex-column justify-center h-100 align-center">
        <v-avatar class="rounded-0 mb-12 mx-auto" size="160">
            <v-img src="/icons/email-verified.png"></v-img>
        </v-avatar>
        <h2 class="text-center mb-1">Email Verified Successfully!</h2>
        <h3 class="text-center font-weight-medium">Congratulations! Your email has been successfully verified. You can now enjoy full access to our services.</h3>
        <!-- <div class="w-100">
            <v-btn class="mt-10" block size="large" variant="text" append-icon="mdi-arrow-right" color="primary" rounded @click="$router.push({name: 'alumni-alumni-index-verification-alumni'})">Continue to next section</v-btn>
        </div> -->
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'Email Verification'
})
const otp = ref("")
const $auth = useAuthStore()
const {user} = storeToRefs(useAuthStore())
const {timestamp, pause, resume} = useTimestamp({controls: true})
const { data, execute: send, pending: send_pending } = await $auth.sendEmailVerification()
.then((event) => {
    resume()
    return event
});
//@ts-ignore
const {execute: verify, data: verify_data, status: verify_status, pending: verify_pending, error } = await $auth.verifyEmail(otp) 
//@ts-ignore
const expires_at = computed(() => {
    // Get current time
    const currentDate = new Date()
    currentDate.setTime(timestamp.value)
    const currentTime = currentDate.getTime()

    //@ts-ignore
    if(!data.value || (data.value && currentTime > new Date(data.value.expires_at).getTime())){
        return null
    }
    
    //@ts-ignore
    const expiresAtTime = new Date(data.value.expires_at).getTime();
    const timeDifference = Math.abs(currentTime - expiresAtTime) / 1000
    
    const minutesLeft = Math.floor(timeDifference / 60)
    const secondsLeft = Math.floor(timeDifference % 60)

    return `${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`
})

watch(expires_at, () => {
    if(!expires_at.value){
        pause()
    }
})

if(verify_status.value == 'success' && verify_data.value){
    user.value = verify_data.value as User
}

if(!user.value?.email_verified_at){
    await send()
}
</script>

<style scoped>

</style>