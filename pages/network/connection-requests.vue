<template>
    <v-container>
        <v-row>
            <v-col cols="4" v-for="person in people.data" :key="person.id">
                <card-person :user="person"></card-person>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
const {user} = storeToRefs(useAuthStore())
const $connection = useConnectionStore()
const {data:people}  = await $connection.getRequestConnections(user.value, {limit: 12})
</script>

<style scoped>

</style>