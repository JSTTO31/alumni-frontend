<template>
    <div>
        <h4 class="font-weight-medium">Request Connection</h4>
        <v-divider thickness="2" class="my-2 mb-3"></v-divider>
        <v-row>
            <v-col cols="4" v-for="user in people.data" :key="user.id">
                <card-request-connection class="border" :user="user"></card-request-connection>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import { useConnectionStore } from '~/stores/useConnectionStore';

const {user} = storeToRefs(useAuthStore())
const $connection = useConnectionStore()
const {data: people} = await $connection.getRequestConnections(user.value, {limit: 6})
</script>

<style lang="scss" scoped>

</style>