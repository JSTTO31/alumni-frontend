<template>
    <v-container class="pa-0">
        <div v-if="!loading">
            <v-card class="border rounded-lg" flat v-if="people.length > 0">
                <card-search-person v-for="person in people" :person="person" :key="person.id"></card-search-person>
                <v-btn block class="text-capitalize pa-5 rounded-0" color="primary" variant="text" :to="{name: 'search-people', query: {search: $route.query.search}}">See more people Results</v-btn>
            </v-card>
        </div>
        <div v-else>
            <SkeletonUserContainerSearch></SkeletonUserContainerSearch>
            <SkeletonPost flat class="rounded-lg border mt-3"></SkeletonPost>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { useSearchStore } from '~/stores/useSearchStore';
const { people } = storeToRefs(useSearchStore())
const route = useRoute()
const $search = useSearchStore()
const loading = ref(false)
await $search.getAll(route.query.search?.toString() || '')

onBeforeRouteUpdate((to, from, next) => {
    if(to.name == from.name){
        loading.value = true
        $search.getAll(to.query.search?.toString() || '').then(() => loading.value =false)
    }

    next()
})
</script>

<style lang="scss" scoped></style>