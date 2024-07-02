<template>
    <v-card class="rounded-lg mb-5 border d-flex flex-column pa-5 py-8" flat v-if="user">
        <!-- <Cover height="120" :user="post.user"></Cover> -->
        <avatar @click="$router.push({name: 'alumni-alumni', params: {alumni: user.email}})" class="mx-auto" size="125" :user="user"></avatar>
        <h3 @click="$router.push({name: 'alumni-alumni', params: {alumni: user.email}})" class="underline text-center mt-2">{{ user.name }}</h3>
        <h5 class="underline text-center text-grey-darken-1 font-weight-regular" v-if="user.general_information">{{
            user.general_information?.department_name }}</h5>
        <div class="d-flex my-5 justify-center w-100">
            <span>
                <v-icon>mdi-heart-outline</v-icon>
                {{post?.user.reactions_count}}
            </span>
            <v-divider class="mx-10" vertical></v-divider>
            <span>
                <v-icon>mdi-comment-outline</v-icon>
                {{post?.user.comments_count}}
            </span>
            <v-divider class="mx-10" vertical></v-divider>

            <span>
                <v-icon>mdi-share-outline</v-icon>
                {{post?.user.shares_count}}
            </span>
        </div>
        <div class="d-flex justify-center my-5 mt-4" style="gap: 15px;" v-if="user?.id != auth?.id">
            <v-btn :loading="loading" class="text-capitalize" color="primary" prepend-icon="mdi-account-check"
                 v-if="user.has_request_from"
                @click="confirm">Confirm</v-btn>
            <v-chip class="text-capitalize rounded font-weight-medium" style="font-size: 15px"
                size="large" color="primary" variant="tonal" prepend-icon="mdi-check" 
                v-else-if="user.is_connected">Connected</v-chip>
            <v-btn :loading="loading" class="text-capitalize" color="primary" prepend-icon="mdi-cancel" 
                v-else-if="user.requested_at" @click="cancel_request">Cancel</v-btn>
            <v-btn :loading="loading" class="text-capitalize" color="primary" prepend-icon="mdi-connection"
                 v-else @click="request_connection">Connect</v-btn>
            <v-btn prepend-icon="mdi-chat" flat class="text-capitalize">Message</v-btn>
        </div>
        <div class="my-4 d-flex justify-center" v-else>
            <v-btn class="text-capitalize rounded-lg" color="primary"
                @click="$router.push({name: 'alumni-alumni', params: {alumni: user.email}})">Complete Profile</v-btn>
        </div>
        <div class="d-flex justify-center mt-5" style="gap: 15px" v-if="user.contact_information">
            <v-icon v-if="user.contact_information && !!user.contact_information.facebook"
                @click="gotoWebsite(user.contact_information.facebook)" size="35" color="blue-darken-2"
                class="mr-2">mdi-facebook</v-icon>
            <v-icon v-if="user.contact_information && !!user.contact_information.twitter"
                @click="gotoWebsite(user.contact_information.twitter)" size="35" color="blue-lighten-2"
                class="mr-2">mdi-twitter</v-icon>
            <v-icon v-if="user.contact_information && !!user.contact_information.linkedin"
                @click="gotoWebsite(user.contact_information.linkedin)" size="35" color="blue-darken-3"
                class="mr-2">mdi-linkedin</v-icon>
        </div>
        <p style="font-size: 13px;" class="mt-3 text-center">{{ user.about.paragraph.slice(0, 150) }}</p>
    </v-card>
</template>

<script setup lang="ts">
const {user: auth} = storeToRefs(useAuthStore())
const {post} = storeToRefs(usePostStore())
const props = defineProps<{ user: UserProfile }>()

const gotoWebsite = (link: string) => {
    window.open(link, "_blank")
}

const $connection = useConnectionStore()
const loading = ref(false)
async function confirm(){
    loading.value = true
    const {status} = await $connection.confirm(props.user)
    loading.value = false

    if(status.value == 'success' && post.value){
        post.value.user = {...post.value.user, request_accepted_at: new Date(), has_request_from: false, is_connected: true, follow_accepted_at: new Date(), followed_at: new Date()}
    }
}

async function cancel_request(){
    loading.value = true
    const {status} = await $connection.cancelRequestConnection(props.user)
    loading.value = false

    if(status.value == 'success' && post.value){
        post.value.user = {...post.value.user, follow_accepted_at: null, followed_at: null, requested_at: null}
    }
}

async function request_connection(){
    loading.value = true
    const {status} = await $connection.requestConnection(props.user)
    loading.value = false

    if(status.value == 'success' && post.value){
        post.value.user = {...post.value.user, follow_accepted_at: new Date(), followed_at: new Date(), requested_at: new Date()}
    }
}


</script>

<style scoped>
.underline:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>