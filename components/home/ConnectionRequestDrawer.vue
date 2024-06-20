<template>
    <v-card class=" pb-0 rounded-lg border" flat>
        <div class="pa-5">
            <h4 class="">Connection Request ({{ options.count }})</h4>
            <v-divider class="mt-2 mb-1"></v-divider>
            <transition-group name="card" >
                <card-request-connection style="border: none !important" v-for="user in request_connections.slice(0, 2)" :key="user.id" :user="user"></card-request-connection>
            </transition-group>
        </div>
        <v-btn class="" block flat append-icon="mdi-arrow-right" @click="$router.push({name: 'network-connection-requests'})">Show more</v-btn>
    </v-card>
</template>

<script setup lang="ts">
import { useConnectionStore } from '~/stores/useConnectionStore';
const $connection = useConnectionStore()
const {request_connections, request_connections_options: options} = storeToRefs($connection)
const {execute} = await $connection.getRequestConnections({limit: 2})

await execute()
</script>

<style scoped>

</style>