<template>
    <v-card class=" pb-0 rounded-lg border" flat>
        <div class="pa-5">
            <h4 class="font-weight-medium">Suggestion</h4>
            <v-divider class="mt-2 mb-1"></v-divider>
            <transition-group name="card" >
                <CardConnectedListItem style="border: none !important" v-for="user in people.slice(0, 6)" :key="user.id" :user="user"></CardConnectedListItem>
            </transition-group>
        </div>
        <v-btn class="text-capitalize" block flat append-icon="mdi-arrow-right" @click="$router.push({name: 'network-suggestion'})">Show more</v-btn>
    </v-card>
</template>

<script setup lang="ts">
import CardConnectedListItem from '../CardConnectedListItem.vue';
const {user} = storeToRefs(useAuthStore())
const $people = usePeopleStore()
const {people, options} = storeToRefs($people)
//@ts-ignore
const {execute} = await $people.getAll(user.value.email, {limit: 6})

if(people.value.length < 1){
    await execute()
}
</script>

<style scoped>

</style>