<template>
    <v-overlay class="d-flex align-start pt-15 justify-center" transition="slide-y-transition" :model-value="show" @click:outside="emits('update:show', false)" width="750">
        <v-card class="pa-3 rounded-lg mb-5 border"  flat v-if="user">
            <v-card-title class="font-weight-medium px-6 d-flex py-0 align-center">
                Certifications
                <v-spacer></v-spacer>
                <v-btn icon="mdi-close" flat @click="emits('update:show', false)"></v-btn>
            </v-card-title>
            <v-divider class="mx-6"></v-divider>
            <v-card-text>
                <div class="d-flex align-center justify-center mt-15" v-if="user.certifications.length < 1">
                    <v-btn class="" variant="flat" color="grey-lighten-4" @click="$router.push({name: 'alumni-alumni-index-authorize-add-certifications'})">Add your certification</v-btn>
                </div>
                <v-alert v-for="certification in user.certifications" :key="certification.id" icon="mdi-seal" @click="" variant="tonal" active color="primary" class="pa-5 mt-3 rounded-lg">
                    <div class="clickable-text font-weight-bold ">{{ certification.name }}</div>
                    <div class="clickable-text font-weight-medium text-subtitle-2">{{ certification.issuing_organization }}</div>
                    <v-btn variant="text" style="position: absolute;right: 10px;top: 50%;transform: translateY(-50%);" icon="mdi-pencil" flat v-if="user && user.id == certification.user_id" @click="$router.push({name: 'alumni-alumni-index-authorize-edit-certifications', query: {id: certification.id}})"></v-btn>
                </v-alert>
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