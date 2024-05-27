<template>
    <nuxt-layout>
        <v-main>
            <v-container>
                <v-row>
                    <v-col cols="3">
                        <div id="variation" class="pr-5"
                            style="position: fixed;width: 270px;height: 80%;overflow-y: auto;">
                            <v-list class="bg-transparent">
                                <h4 class="d-flex align-center mb-2">
                                    Job Types
                                    <v-spacer></v-spacer>
                                    <span class="text-grey-darken-1 font-weight-regular text-error">Clear all</span>
                                </h4>
                                <span v-for="type in jobTypes" :key="type.type">
                                    <v-checkbox hide-details color="primary" class="font-weight-medium text-black"
                                        density="compact" :label="type.type"></v-checkbox>
                                </span>
                                <h4 class="d-flex align-center my-3">
                                    Salary Range
                                </h4>
                                <div class="d-flex" style="gap: 10px">
                                    <v-text-field type="number" variant="outlined" single-line hide-details
                                        density="compact" label="min"></v-text-field>
                                    <v-text-field type="number" variant="outlined" single-line hide-details
                                        density="compact" label="max"></v-text-field>
                                </div>
                                <h4 class="d-flex align-center mt-5 my-3">
                                    Experience Levels
                                </h4>
                                <span v-for="level in experienceLevels" :key="level.level">
                                    <v-checkbox hide-details color="primary" class="font-weight-medium text-black"
                                        density="compact" :label="level.level"></v-checkbox>
                                </span>
                                <h4 class="d-flex align-center mt-5 my-3">
                                    Categories
                                </h4>
                                <span v-for="category in jobCategories" :key="category.name">
                                    <v-checkbox hide-details color="primary" class="font-weight-medium text-black"
                                        density="compact" :label="category.name"></v-checkbox>
                                </span>
                            </v-list>
                        </div>
                    </v-col>
                    <v-col cols="9" class="pl-5">
                        <job-list-item  v-for="job, n in jobs" :key="job.title" :job="job" :index="n" class="rounded-lg pa-8 mb-5">
                           
                        </job-list-item>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </nuxt-layout>
</template>

<script setup lang="ts">
import useJobObjects from '~/composables/useJobObjects';
useHead({
    title: 'Job - Tracking System'
})
definePageMeta({
    layout: 'authenticated',
})
const { types: jobTypes, levels: experienceLevels, categories: jobCategories, jobs } = useJobObjects
</script>

<style scoped>
#variation::-webkit-scrollbar {
    width: 8px;
}


#variation:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.162);
    border-radius: 25px;
}
</style>