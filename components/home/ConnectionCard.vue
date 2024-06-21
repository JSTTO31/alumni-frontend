<template>
     <v-card class="rounded-lg mb-5 border pa-5" style="overflow-x: auto" flat>
        <h4 class="mb-5 d-flex align-center font-weight-medium">
            Connected with
            <v-spacer></v-spacer>
            <v-btn variant="text" class="text-capitalize" append-icon="mdi-arrow-right">Show more</v-btn>
        </h4>
        <div class="d-flex" style="gap: 20px">
            <div class="d-flex flex-column align-center" v-for="person in connections.slice(0, 8)">
            <v-badge location="bottom right" color="success" dot>
                <Avatar size="60"  :user="person"></Avatar>
            </v-badge>
            <span class="text-subtitle-2 font-weight-bold">{{ person.name.split(" ")[0] }}</span>
            </div>
        </div>
    </v-card>
</template>

<script setup lang="ts">
const {user} = storeToRefs(useAuthStore())
const {connections} = storeToRefs(useConnectionStore());
const $connection = useConnectionStore()
//@ts-ignore
const {execute} = await $connection.getConnected(user.value.email, {limit: 9})
if(connections.value.length < 1){
    await execute()
}
</script>

<style scoped>

</style>