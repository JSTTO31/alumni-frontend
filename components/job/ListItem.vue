<template>
    <v-card class="rounded-lg pa-8 mb-5" @click="$router.push('/job/' + (index + 1))">
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
            <!-- <h3 class="mt-5">Date</h3>
            <v-list>
                <v-list-item prepend-icon="mdi-calendar" class="pl-0">{{ new Date().toDateString() }}</v-list-item>
            </v-list>
            <h3 class="mt-5">Location</h3>
            <v-list>
                <v-list-item prepend-icon="mdi-map-marker" class="pl-0">{{ job.location }}</v-list-item>
            </v-list> -->
            <h3 class="mt-5">Requirements</h3>
            <v-list>
                <v-list-item v-for="requirement in job.requirements" class="px-0" :key="requirement" prepend-icon="mdi-check">{{ requirement }}</v-list-item>
            </v-list>
            <h3 class="mt-5">Description</h3>
            <p class="mt-4 text-justify">{{ job.description }}</p>
        </v-card-text>
        <!-- <v-divider></v-divider>
        <v-card-actions class="px-0 d-flex mt-4 align-center">
            <h2>{{ job.salary }}</h2>
            <v-spacer></v-spacer>
            <v-btn class="text-capitalize px-4" variant="flat" color="secondary" prepend-icon="mdi-information-outline"  rounded>
                More details
            </v-btn>
        </v-card-actions> -->
    </v-card>
</template>

<script setup>
const props = defineProps(['job', 'index'])
</script>

<style lang="scss" scoped>

</style>