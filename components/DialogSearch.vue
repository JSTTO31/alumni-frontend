<template>
    <slot name="activator" @click="showDialog = true"></slot>
    <v-dialog v-model="showDialog" width="650" scrollable style="z-index: 2000;" transition="dialog-top-transition">
        <v-card class="rounded-lg bg-transparent" flat>
            <v-card-title class="pa-0 bg-white">
                <v-text-field @keyup.enter="submit" prepend-inner-icon="mdi-magnify" v-model="search" hide-details label="Search for people, post, and etc." autofocus single-line>
                        <template #append-inner>
                            <v-chip class="rounded-lg py-4" color="primary">Press Esc</v-chip>
                        </template>
                </v-text-field>
            </v-card-title>
            <v-card-text style="height: 550px;" class="pa-0 bg-transparent">
                <v-card class="rounded-lg rounded-t-0 d-flex align-center" height="250" flat v-if="loading">
                    <v-progress-circular indeterminate size="45" color="primary" class="mx-auto my-5"></v-progress-circular>
                </v-card>
                <v-card class="rounded-lg rounded-t-0 d-flex align-center" height="250" flat v-if="basic_people.length < 1 && !loading">
                    <nuxt-img width="150" class="mx-auto" src="/searching.svg"></nuxt-img>
                </v-card>
                <v-list v-if="!loading && basic_people.length > 0" class="bg-trasparent rounded-b-lg px-2">
                    <v-list-item class="rounded-lg pa-4" @click="$router.push({name: 'alumni', params: {alumni: person.email}})" v-for="person in basic_people" :key="person.id" :title="person.name" :subtitle="person.email">
                        <template #prepend>
                            <v-avatar size="50">
                                <nuxt-img width="80" height="80" :src="'https://source.unsplash.com/random/250x250?&person&`' + person.id"></nuxt-img>
                            </v-avatar>
                        </template>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup>
import {useSearchStore} from '~/stores/useSearchStore'
import {refThrottled, useMagicKeys} from '@vueuse/core'
const showDialog = ref(false)
const search = ref('')
const searchThrottled = refThrottled(search, 1500)
const $search = useSearchStore()
const loading = ref(false)
const {basic_people} = storeToRefs($search)
const router = useRouter()
const submit = (e) => {
    showDialog.value = false
    router.push({name: 'search', query: {search: e.target.value}})
}

watch(() => searchThrottled.value, () => {
    loading.value = true
    $search.getBasicPeople(searchThrottled.value).then(() => {
        loading.value = false
    })
})



document.onkeydown = (e) => {
    e = e || window.event;

    if(e.ctrlKey && e.code == 'KeyK'){
        e.preventDefault()
        showDialog.value = true
    }

    if(e.key == 'Escape'){
        showDialog.value = false
    }
}
</script>

<style lang="scss" scoped>

</style>