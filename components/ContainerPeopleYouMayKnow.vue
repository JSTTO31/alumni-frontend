<template>
    <div class="bg-white pa-5 rounded-lg border">
        <h4 class="font-weight-medium mb-5">People you may know</h4>
        <v-row>
            <transition-group name="card">
                <v-col cols="4" v-for="user in people.slice(0, 6)" :key="user.id">
                    <card-person :user="user"></card-person>
                </v-col>
            </transition-group>
        </v-row>
    </div>
</template>

<script setup>
import { usePeopleStore } from '~/stores/usePeopleStore';
const $people = usePeopleStore()
const {people} = storeToRefs(usePeopleStore())
const {execute} = await $people.getAll({limit: 6})
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