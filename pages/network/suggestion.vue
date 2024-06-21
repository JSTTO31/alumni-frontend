<template>
        <h4 class="font-weight-medium" v-if="status != 'idle'">Suggestion</h4>
        <v-skeleton-loader type="chip" class="mt-n5" v-else></v-skeleton-loader>
        <v-divider thickness="2" class="my-2 mb-3"></v-divider>
        <v-row>
            <v-col cols="4" v-for="person in people" :key="person.id">
                <card-person :user="person"></card-person>
            </v-col>
        </v-row>
        <div v-if="pending" class="mt-5">
            <v-row>
                <v-col cols="4" v-for="n in 6">
                    <div class="rounded-lg" style="overflow: hidden">
                        <v-skeleton-loader type="card, heading"></v-skeleton-loader>
                    </div>
                </v-col>
            </v-row>
        </div>
        <div class="d-flex justify-center my-5" v-if="status != 'idle'">
            <v-btn class="" variant="outlined" color="primary" rounded @click="execute()" v-if="options.next_cursor">Show more</v-btn>
            <p class rounded @click="execute()" v-else>No More People</p>
        </div>
</template>

<script setup>
const {user} = storeToRefs(useAuthStore())
const $people = usePeopleStore()
const {people, options} = storeToRefs($people)
const {execute, status, pending}  = await $people.getAll({limit: 9})
execute()

</script>

<style scoped>

</style>