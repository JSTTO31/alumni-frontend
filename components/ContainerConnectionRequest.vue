<template>
    <div class="mb-5">
        <h4 class="font-weight-medium">Request Connection</h4>
        <v-divider thickness="2" class="my-2 mb-3"></v-divider>
        <v-row class="d-flex">
            <transition-group name="card" >
                <v-col cols="4" class="pa-2 px-3" v-for="user in request_connections.slice(0, 6)" :key="user.id">
                    <card-request-connection class="border" :user="user"></card-request-connection>
                </v-col>
            </transition-group>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import { useConnectionStore } from '~/stores/useConnectionStore';
const $connection = useConnectionStore()
const {request_connections} = storeToRefs($connection)
const {execute} = await $connection.getRequestConnections({limit: 6})

await execute()
</script>

<style scoped>
.card-enter-active,
.card-leave-active {
    transition: all 0.25s ease;
}
.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>