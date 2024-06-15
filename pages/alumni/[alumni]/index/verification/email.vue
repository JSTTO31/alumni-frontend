<template>
    <div class="d-flex flex-column justify-center pt-10">
        <v-avatar size="170" class="mx-auto" style="overflow:visible">
            <v-img  src="/icons/send.png"></v-img>
        </v-avatar>
        <h2 class="text-center mt-5">Email Verification</h2>
        <p class="text-center">Please enter the 6-digit code sent to your email to verify your account and complete the verification process.</p>
        <div>
            <v-otp-input v-model="otp"></v-otp-input>
        </div>
        <v-btn class="mx-auto mt-5" block size="large" color="primary" :disabled="otp.length < 6" rounded @click="verify" :loading="loadingVerify">Verify Email</v-btn>
        <p class="text-center mt-5" v-if="!expires_at">
            Didn't received the code? 
            <a href="#" v-if="!loadingResend"@click="resend">Resend code</a>
            <v-progress-circular v-else indeterminate class="mx-5" size="20" width="1"></v-progress-circular>
        </p>
        <p v-else class="text-center mt-5">Please wait <b>{{ expires_at }}</b> minutes before requesting a new OTP code</p>
    </div>
</template>

<script setup lang="ts">
const otp = ref("")
const $auth = useAuthStore()
const { data, execute } = await $auth.sendEmailVerification();
const {timestamp, pause, resume} = useTimestamp({controls: true})
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
const error = ref(false)

watch(expires_at, () => {
    if(!expires_at.value){
        pause()
    }
})

const loadingResend = ref(false);
async function resend(){
    loadingResend.value = true
    await execute()
    loadingResend.value = false
    resume()
}

const loadingVerify = ref(false)
async function verify(){
    loadingVerify.value = true;
    const {data: verifyData, error} = await $auth.verifyEmail(otp.value)
    loadingVerify.value = false
    
}
</script>

<style scoped>

</style>