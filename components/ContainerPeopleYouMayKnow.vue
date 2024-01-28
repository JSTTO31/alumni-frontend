<template>
    <div class="bg-white pa-5 rounded-lg">
        <h4 class="font-weight-medium mb-5">People you may know</h4>
        <v-row>
            <v-col cols="4" v-for="user in people.data" :key="user.id">
                <card-person :user="user"></card-person>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
const $search = useSearchStore()
const {data: people} = await $search.getPeopleYouMayKnow({limit: 6})
</script>

<style lang="scss" scoped>

</style>