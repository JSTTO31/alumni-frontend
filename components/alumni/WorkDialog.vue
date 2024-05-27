<template>
    <v-overlay class="d-flex align-start pt-15 justify-center" transition="slide-y-transition" :model-value="show" @click:outside="emits('update:show')" width="750">
        <v-card class="pa-3 rounded-lg mb-5 border"  flat v-if="user">
            <v-card-title class="font-weight-medium px-6 d-flex py-0 align-center">
                Work Experience
                <v-spacer></v-spacer>
                <v-btn icon="mdi-close" flat v-if="user.work && auth?.id == user.id" @click="emits('update:show', false)"></v-btn>
            </v-card-title>
            <v-divider class="mx-6"></v-divider>
            <v-card-text>
                <div class="d-flex align-center justify-center mt-15" v-if="user.works.length < 1">
                    <v-btn class="" variant="flat" color="grey-lighten-4" @click="$router.push({name: 'alumni-index-add-works'})">Add your work experience</v-btn>
                </div>
                <AlumniWorkListItem class="py-2" :class="index == sortedWorks.length - 1 ? '' : 'border-b-md'" v-for="work, index in sortedWorks" :key="work.id" :work="work"></AlumniWorkListItem>
            </v-card-text>
        </v-card>
        <!-- <ProfileWorkCreateForm v-model:show="showAll"></ProfileWorkCreateForm> -->
    </v-overlay>
</template>

<script setup>
const props = defineProps(['show'])
const emits = defineEmits(['update:show'])
const {user} = storeToRefs(useProfileStore())
const {user: auth} = storeToRefs(useAuthStore())
//@ts-ignore
const sortedWorks = computed(() => !!user.value  ?  user.value.works.sort((a, b) => new Date(b.from) - new Date(a.from)) : [])
</script>

<style scoped>

</style>