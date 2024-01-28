<template>
    <v-card  class="rounded-lg border pa-0" flat>
        <v-card width="100%" height="100" flat class="rounded-0 d-flex bg-grey-lighten-4">
            <nuxt-img class="w-100" :src="'https://source.unsplash.com/random/450x350?' + user.id" />
        </v-card>
        <div class="d-flex align-center flex-column pa-8 mt-n15">
            <v-avatar size="150" class=" mr-2 mt-n15 bg-grey-lighten-4" style="border: 4px solid #00a896">
                <v-img
                    :src="'https://source.unsplash.com/random/150x150?person&' + user.id"
                ></v-img>
            </v-avatar>
            <div class="mt-2">
                <h5 class="text-center">{{ user.name }}</h5>
                <h6 class="text-center font-weight-regular text-grey-darken-1">{{ user.email }}</h6>
            </div>
           <div>
                <v-btn class="text-capitalize" color="primary" prepend-icon="mdi-account-check"
                    v-if="user.has_request_from">Confirm</v-btn>
                <v-chip class="text-capitalize rounded font-weight-medium" style="font-size: 15px" size="large" color="primary" variant="tonal" prepend-icon="mdi-check"
                    v-else-if="user.is_connected">Connected</v-chip>
                <v-btn class="text-capitalize" color="primary" prepend-icon="mdi-cancel"
                    v-else-if="user.requested_at">Cancel Request</v-btn>
                <v-btn class="text-capitalize" color="primary" prepend-icon="mdi-connection"
                    v-else>Connect</v-btn>
                <v-btn variant="text" block>Remove</v-btn>
           </div>
        </div>
    </v-card>
</template>

<script setup>
const props = defineProps(['user'])
</script>

<style scoped>

</style>