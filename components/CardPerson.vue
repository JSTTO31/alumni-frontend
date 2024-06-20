<template>
    <v-card :disabled="loading || removeLoading" class="rounded-lg border pa-0" flat @click="$router.push({name: 'alumni-alumni', params: {alumni: user.email}})" v-if="user">
        <Cover height="100" :user="user"></Cover>
        <div class="d-flex align-center flex-column px-8" style="margin-top: -90px">
            <Avatar :user="user" size="120"></Avatar>
            <div class="mt-2">
                <h5 class="text-center">{{ user.name }}</h5>
                <h6 class="text-center font-weight-regular text-grey-darken-1">{{ user.email }}</h6>
            </div>
           <div class="my-2">
                <v-btn flat :loading="loading" class="text-capitalize px-10" color="primary" prepend-icon="mdi-account-check"
                    v-if="user.has_request_from" @click.stop="confirm()">Confirm</v-btn>
                <v-chip class="text-capitalize px-10 rounded font-weight-medium" style="font-size: 15px" size="large" color="primary" variant="tonal" prepend-icon="mdi-check"
                    v-else-if="user.is_connected">Connected</v-chip>
                <v-btn flat :loading="loading" class="text-capitalize px-10" color="primary" prepend-icon="mdi-cancel"
                    v-else-if="user.requested_at" @click.stop="cancelRequest">Cancel Request</v-btn>
                <v-btn flat :loading="loading" class="text-capitalize px-10" color="primary" prepend-icon="mdi-connection"
                    v-else @click.stop="request">Connect</v-btn>
                <v-btn variant="text" block class="mt-2 text-capitalize" @click.stop="remove">Remove</v-btn>
           </div>
        </div>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{user: UserProfile}>()
const $people = usePeopleStore()
const {people} = storeToRefs(usePeopleStore())
const $connection = useConnectionStore()
const loading = ref(false)
const removeLoading = ref(false)
async function confirm(){
    loading.value = true
    await $connection.confirm(props.user);
    loading.value = false
}

async function request(){
    loading.value = true
    await $connection.requestConnection(props.user);
    loading.value = false
}

async function cancelRequest(){
    loading.value = true
    await $connection.cancelRequestConnection(props.user);
    loading.value = false
}

async function remove(){
    removeLoading.value = true;
    await $connection.personRemove(props.user).then(async (response) => {
        if(people.value.length < 6){
            const {execute} = await $people.getAll()
            execute()
        }
    })
    removeLoading.value = false
}
</script>

<style scoped>

</style>