<template>
    <v-card class="rounded-lg mt-5 pa-5 border" flat>
        <v-card-text>
            <v-row>
                <v-col cols="8">
                    <h3 class="font-weight-medium mb-4">
                        <v-icon size="20" class="mr-2">mdi-calendar</v-icon>{{ start_month.label }}, {{ start_year }} 
                        <v-btn icon="mdi-pencil" size="small" flat v-if="authorize"></v-btn>
                    </h3>
                    <h2 class="text-grey-darken-3 font-weight-medium">{{ experience.title }}</h2>
                    <h4 class="text-grey-darken-3 font-weight-medium mt-2">{{ experience.company_name }} - {{ experience.location }}</h4>
                    <h4 class="font-weight-bold text-primary">{{ experience.position }}</h4>
                    <v-chip class="mt-4 px-4" v-if="experience.is_current" prepend-icon="mdi-briefcase" color="secondary">Current Job</v-chip>
                    <v-chip class="mt-4 px-4" v-else prepend-icon="mdi-briefcase" color="secondary">Current Job</v-chip>

                </v-col>
                <v-col cols="4" >
                    <v-card class="rounded-lg" flat>
                        <v-img :src="'https://source.unsplash.com/random/250x250&engineer,job,company&' + experience.id"></v-img>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup>
import {months} from '~/composables/useDate'
const {authorize} = storeToRefs(useProfileStore())
const props = defineProps(['experience'])
const start_month = computed(() => months[new Date(props.experience.start_date).getMonth()])
const start_year = computed(() => new Date(props.experience.start_date).getFullYear())
</script>

<style lang="scss" scoped>

</style>