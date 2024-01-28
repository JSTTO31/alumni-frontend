<template>
    <nuxt-layout>
        <v-main>
            <v-container class="py-0 h-100">
                <v-card class="pa-0 h-100">
                    <v-row class="h-100 ma-0 pa-0 px-10">
                        <v-col cols="2" class="bg-grey-lighten-5 pa-0 pt-5" v-if="false">
                            <div style="position: fixed;width: 292px;">
                                <v-tabs density="compact" color="primary" direction="vertical">
                                    <v-tab :to="{name: 'search', query: {...$route.query, filter: ''}}" variant="text" flat class="rounded-0 mb-2 text-capitalize">All</v-tab>
                                    <v-tab :to="{name: 'search-people', query: {...$route.query}}" variant="text" flat class="rounded-0 mb-2 text-capitalize">People</v-tab>
                                    <!-- <v-tab :to="{query: {...$route.query, filter: 'posts'}}" variant="text" flat class="rounded-0 mb-2 text-capitalize">Post</v-tab>
                                    <v-tab :to="{query: {...$route.query, filter: 'batchmate'}}" variant="text" flat class="rounded-0 mb-2 text-capitalize">Batchmate</v-tab>
                                    <v-tab :to="{query: {...$route.query, filter: 'events'}}" variant="text" flat class="rounded-0 mb-2 text-capitalize">Events</v-tab> -->
                                </v-tabs>
                            </div>
                        </v-col>
                        <v-col cols="9" class="pt-5 px-15">
                            <h4 class="text-grey-darken-4 font-weight-medium mb-3">
                                <span class="mr-5">Search for {{ $route.query.search }}</span>
                                <v-text-field @keyup.enter="$event => $router.push({query: {...$route.query, search: $event.target.value}})" class="mt-2" variant="outlined" label="Enter your search..." density="compact" single-line hide-details prepend-inner-icon="mdi-magnify"></v-text-field>
                            </h4>
                            <suspense>
                                <nuxt-page></nuxt-page>
                                <template #fallback>
                                    <div>
                                        <SkeletonUserContainerSearch class="mb-5 rounded-lg" flat></SkeletonUserContainerSearch>
                                    </div>
                                </template>
                            </suspense>
                        </v-col>
                        <v-col cols="3"  class="d-flex pt-5 flex-column pr-10 h-100">
                            <div style="position: fixed;width: 250px;">
                                <span class="font-weight-medium mb-2 ml-auto">Some Ads</span>
                                <v-card class="rounded-lg mt-2">
                                    <v-img src="https://source.unsplash.com/random/580x600?advertisement"></v-img>
                                </v-card>
                                <v-card class="rounded-lg mt-5">
                                    <v-img src="https://source.unsplash.com/random/580x500?advertisement"></v-img>
                                </v-card>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
        </v-main>
    </nuxt-layout>
</template>

<script setup>
definePageMeta({
    layout: 'authenticated',
    middleware: ['auth']
})
const route = useRoute()
useHead({
    title: 'Alumni Tracking | Search - ' + route.query.s
})
</script>

<style scoped></style>