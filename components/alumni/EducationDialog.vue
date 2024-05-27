<template>
    <v-overlay class="d-flex align-start pt-15 justify-center" transition="slide-y-transition" :model-value="show" @click:outside="emits('update:show')" width="750">
        <v-card class="pa-3 rounded-lg mb-5 border"  flat v-if="user">
            <v-card-title class="font-weight-medium px-6 d-flex py-0 align-center">
                Educations
                <v-spacer></v-spacer>
                <v-btn icon="mdi-close" flat v-if="user.work && auth?.id == user.id" @click="emits('update:show', false)"></v-btn>
            </v-card-title>
            <v-divider class="mx-6"></v-divider>
            <v-card-text>
                <div class="d-flex align-center justify-center mt-15" v-if="user.works.length < 1">
                    <v-btn class="" variant="flat" color="grey-lighten-4" @click="">Add your educations</v-btn>
                </div>
                <AlumniEducationListItem class="py-2"  :class="index == user.educations.length - 1 ? '' : 'border-b-md'" v-for="education in user.educations" :key="education.id" :education="education"></AlumniEducationListItem>
            </v-card-text>
        </v-card>
    </v-overlay>
</template>

<script setup>
const props = defineProps(['show'])
const emits = defineEmits(['update:show'])
const {user} = storeToRefs(useProfileStore())
const {user: auth} = storeToRefs(useAuthStore())
</script>

<style scoped>

</style>