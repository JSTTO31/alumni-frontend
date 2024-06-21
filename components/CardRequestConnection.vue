<template>
    <v-card :disabled="loading || removeLoading" class="d-flex flex-column border-b pa-4 rounded-lg " flat @click="$router.push({name: 'alumni-alumni', params: {alumni: user.email}})">
        <div class="d-flex align-center">
            <Avatar :user="user" class="mr-3" size="65">
            </Avatar>
            <v-hover v-slot="{props, isHovering}">
                <div>
                    <h4>{{ user.name }}</h4>
                    <h6 class="text-grey-darken-1 pa-0 font-weight-regular text-caption">
                        <span style="font-size: 12px;">{{ user.email }}</span>
                    </h6>
                </div>
            </v-hover>
        </div>
        <div class="d-flex justify-space-between mt-4">
            <v-btn :loading="loading"  class="w-50 text-capitalize mb-2 mr-1" flat  color="primary" v-if="user.has_request_from" @click.stop="confirm">Confirm</v-btn>
            <v-chip class="text-capitalize rounded font-weight-medium" style="font-size: 15px" size="large" color="primary" variant="tonal" 
            v-else-if="user.is_connected">Connected</v-chip>
            <v-btn  class="w-50 text-capitalize border mb-2" flat @click.stop="remove">Remove</v-btn>
        </div>
    </v-card>
</template>

<script setup lang="ts">
import Avatar from './Avatar.vue';
const props = defineProps<{user: UserProfile }>()
const loading = ref(false)
const removeLoading = ref(false)
const $connection = useConnectionStore()
const {request_connections} = storeToRefs($connection)

async function confirm(){
    loading.value = true
    await $connection.confirm(props.user);
    loading.value = false
}

async function remove(){
    removeLoading.value = true;
    await $connection.personRemove(props.user).then(async (response) => {
        if(request_connections.value.length < 6){
            const {execute} = await $connection.getRequestConnections()
            execute()
        }
       
    })
    removeLoading.value = false
}

</script>

<style lang="scss" scoped>

</style>