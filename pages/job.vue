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
                        <v-card v-for="job in jobs" :key="job.title" class="rounded-lg pa-8 mb-5">
                            <div class="d-flex align-center">
                                <v-avatar class="rounded-lg mr-4" size="55">
                                    <nuxt-img
                                        :src="'https://source.unsplash.com/random/50x50&company&' + job.title"></nuxt-img>
                                </v-avatar>
                                <div class="w-100">
                                    <v-card-title class="d-flex align-start pt-0 w-100">
                                        {{ job.title }}
                                        <v-spacer></v-spacer>
                                        <v-icon color="grey">mdi-heart-outline</v-icon>
                                    </v-card-title>
                                    <v-card-subtitle>{{ job.company }} &middot; {{ Math.floor(Math.random() * 20) }}
                                        Applicants</v-card-subtitle>
                                </div>
                            </div>
                            <v-card-text class="px-0">
                                <div class="d-flex">
                                    <v-chip variant="flat" flat size="large" class="mr-2 rounded-lg" color="purple">{{ job.level }}</v-chip>    
                                    <v-chip variant="flat" flat size="large" class="mr-2 rounded-lg" color="green">{{ job.category }}</v-chip>    
                                    <v-chip variant="flat" flat size="large" class="mr-2 rounded-lg" color="red">{{ job.type }}</v-chip> 
                                </div>
                                <div class="d-flex flex-wrap">
                                    <v-chip  class="mr-2 rounded-lg mt-3" v-for="tag in job.tags" :key="tag">{{ tag }}</v-chip>    
                                </div>
                                <h3 class="mt-5">Date</h3>
                                <v-list>
                                    <v-list-item prepend-icon="mdi-calendar" class="pl-0">{{ new Date().toDateString() }}</v-list-item>
                                </v-list>
                                <h3 class="mt-5">Location</h3>
                                <v-list>
                                    <v-list-item prepend-icon="mdi-map-marker" class="pl-0">{{ job.location }}</v-list-item>
                                </v-list>
                                <h3 class="mt-5">Requirements</h3>
                                <v-list>
                                    <v-list-item v-for="requirement in job.requirements" class="px-0" :key="requirement" prepend-icon="mdi-check">{{ requirement }}</v-list-item>
                                </v-list>
                                <h3 class="mt-5">Description</h3>
                                <p class="mt-4">{{ job.description }}</p>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions class="px-0 d-flex mt-4 align-center">
                                <h2>{{ job.salary }}</h2>
                                <v-spacer></v-spacer>
                                <v-btn class="text-capitalize px-4" variant="flat" color="primary"  rounded>
                                    Apply Now
                                </v-btn>
                            </v-card-actions>
                        </v-card>
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
    layout: 'authenticated'
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