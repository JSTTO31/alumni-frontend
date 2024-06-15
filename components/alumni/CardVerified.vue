<template>
  <div>
    <v-card :style="{cursor: isAuthorize ? 'pointer' : ''}" v-ripple="isAuthorize" v-hover="isAuthorize" v-bind="{onclick: showVerification}" class="rounded-lg bg-blue-lighten-4 d-flex align-center px-5 " variant="tonal" flat height="150" v-if="!!user?.verified_at">
        <div class="d-flex">
            <v-avatar size="100">
                <v-img src="/icons/verified.png"></v-img>
            </v-avatar>
            <div class="px-5" v-if="false">
                <h3>Verified Alumni by Arellano University Authority</h3>
                <p>We are thrilled to have you as a recognized and verified member of the Arellano University community from the [Branch Name] branch.</p>
            </div>
            <div v-else class="px-5">
                <h3>Verified Alumni Profile</h3>
                <p>This alumni profile has been verified by Arellano University, confirming their status as a recognized member of the [Branch Name] branch.</p>

            </div>
        </div>
    </v-card>
    <v-card :style="{cursor: isAuthorize ? 'pointer' : ''}" v-ripple="isAuthorize" v-hover="isAuthorize" v-bind="{onclick: showVerification}" class="rounded-lg d-flex align-center px-5 " color="error" variant="tonal" flat height="150" >
        <div class="d-flex">
            <v-avatar size="110">
                <v-img src="/icons/block-user.png"></v-img>
            </v-avatar>
            <div class="px-5">
                <h3>Unverified Alumni Profile</h3>
                <p>This alumni profile is currently unverified due to incomplete information. Verification is required to confirm their status and access full benefits.</p>
            </div>
        </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
const {user: auth} = storeToRefs(useAuthStore())
const {user} = storeToRefs(useProfileStore())
const isAuthorize = computed(() => user.value?.id == auth.value?.id)
const router = useRouter()
function showVerification(){
    if(isAuthorize.value){
        router.push({name: 'alumni-alumni-index-verification'})
    }
}
</script>

<style scoped>

</style>