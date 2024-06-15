<template>
    <nuxt-layout>
        <v-main>
            <v-container>
                <v-row>
                    <v-col cols="9" class="pl-5">
                        <v-card class="rounded-lg pa-8 mb-5">
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
                                    <v-chip variant="flat" flat size="large" class="mr-2 rounded-lg" color="purple">{{
                                job.level }}</v-chip>
                                    <v-chip variant="flat" flat size="large" class="mr-2 rounded-lg" color="green">{{
                                job.category }}</v-chip>
                                    <v-chip variant="flat" flat size="large" class="mr-2 rounded-lg" color="red">{{
                                job.type }}</v-chip>
                                </div>
                                <div class="d-flex flex-wrap">
                                    <v-chip class="mr-2 rounded-lg mt-3" v-for="tag in job.tags" :key="tag">{{ tag
                                        }}</v-chip>
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
                                    <v-list-item v-for="requirement in job.requirements" class="px-0" :key="requirement"
                                        prepend-icon="mdi-check">{{ requirement }}</v-list-item>
                                </v-list>
                                <h3 class="mt-5">Description</h3>
                                <p class="mt-4 text-justify">{{ job.description }}</p>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions class="px-0 d-flex mt-4 align-center">
                                <h2>{{ job.salary }}</h2>
                                <v-spacer></v-spacer>
                                <v-btn class="text-capitalize px-4" variant="flat" color="primary" prepend-icon="mdi-briefcase"  rounded :disabled="apply" @click="apply = true">
                                    Apply now
                                </v-btn>
                                <v-btn class="text-capitalize px-4" variant="tonal" prepend-icon="mdi-cancel" color="error"  rounded @click="apply = false" v-if="apply">
                                    Cancel
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col cols="3" >
                        <div  style="position: sticky;top: 64px">
                            <h4 class="font-weight-medium">Might be interest you</h4>
                            <v-card class="mt-2" v-for="job, n in jobs.slice(0, 5)" :key="n">
                                <v-card-title class="d-flex text-subtitle-1 font-weight-bold align-start w-100">
                                    {{ job.title }}
                                    <v-spacer></v-spacer>
                                </v-card-title>
                                <v-card-subtitle class="mt-n2">{{ job.company }} &middot; {{ Math.floor(Math.random() * 20) }}
                                    Applicants</v-card-subtitle>
                                <v-card-text>
                                    <h4>{{ job.salary }}</h4>
                                    
                                </v-card-text>
                            </v-card>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
            <transition name="slide">
                <v-alert id="alert" width="450"  icon="mdi-briefcase" closable class="bg-primary" v-if="alert">
                    <h4>Job Application Submitted Successfully</h4>
                    <p class="text-subtitle-2 font-weight-medium">Your application for the {{ job.title }} has been submitted. We'll review it and contact you if you match our requirements. Thanks for your interest!</p>
                </v-alert>
            </transition>
        </v-main>
    </nuxt-layout>
</template>

<script setup>
import useJobObjects from '~/composables/useJobObjects';
useHead({
    title: 'Job - Tracking System'
})
definePageMeta({
    layout: 'authenticated'
})
const alert = ref(false)
const apply = ref(false)
const route = useRoute()
const { types: jobTypes, levels: experienceLevels, categories: jobCategories, jobs } = useJobObjects
const job = computed(() => jobs[parseInt(route.params.job.toString()) - 1])
const router = useRouter()
if(!job){
    router.push({name: 'job'})
}

let timer = null

watch(apply, () => {
    if(apply.value){
        alert.value = true
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
            alert.value = false
        }, 2500);
    }
})


</script>

<style scoped>
#variation::-webkit-scrollbar {
    width: 8px;
}


#variation:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.162);
    border-radius: 25px;
}

#alert{
    position: fixed;
    bottom: 25px;
    left: 25px;
}


.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-20%);
  opacity: 0;
}
</style>