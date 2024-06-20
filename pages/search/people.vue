<template>
     <div v-if="loading">
        <SkeletonUser v-for="n in 3"></SkeletonUser>
    </div>
    <div v-else>
        <div v-if="people">
            <v-card class="border rounded-lg mb-2" flat v-for="person in people.data"  :key="person.id">
                <card-person :person="person"></card-person>
            </v-card>
            <v-pagination :model-value="page" rounded="circle" total-visible="5" :length="Math.ceil(people.total) / people.per_page" color="primary" @update:model-value="update"></v-pagination>
        </div>
        
        <div v-if="!people || people.total < 1">
            No People Found
        </div>
    </div>
</template>

<script setup>
const router = useRouter()
const route = useRoute()
const page = ref(parseInt(route.query?.page) || 1)
const loading = ref(false)
const people = ref(null)
async function loadData (){
    await useApiFetch(`/api/search`, {
        query: {
            search: route.query.search || '',
            page: page.value,
            filter: 'people'
        },
        onRequest(){
            loading.value = true
        },
        onResponse(event){
            const {_data} = event.response
            people.value = _data
            loading.value = false
        }
    })
}


await loadData()

const update = (value) => {
    router.push({query: {...route.query, page: value}})
}


onBeforeRouteUpdate(async (to, from, next) => {
    page.value = parseInt(to.query.page) || 1 
    await loadData()
    return next()
})
</script>

<style scoped>

</style>