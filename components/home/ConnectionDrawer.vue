<template>
    <v-card class=" pb-0 rounded-lg border" flat>
        <div class="pa-5">
            <h4 class="">Connected to this people ({{ options.count }})</h4>
            <v-divider class="mt-2 mb-1"></v-divider>
            <transition-group name="card" >
                <CardConnectedListItem style="border: none !important" v-for="user in connections.slice(0, 6)" :key="user.id" :user="user"></CardConnectedListItem>
            </transition-group>
        </div>
        <v-btn class="" block flat append-icon="mdi-arrow-right">Show more</v-btn>
    </v-card>
</template>

<script setup lang="ts">
import { useConnectionStore } from '~/stores/useConnectionStore';
import CardConnectedListItem from '../CardConnectedListItem.vue';
const {user} = storeToRefs(useAuthStore())
const $connection = useConnectionStore()
const {connections, connections_options: options} = storeToRefs($connection)
//@ts-ignore
const {execute} = await $connection.getConnected(user.value.email, {limit: 6})

await execute()
</script>

<style scoped>

</style>