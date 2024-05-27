<template>
    <v-overlay class="d-flex align-start pt-15 justify-center" transition="slide-y-transition" :model-value="show" @click:outside="emits('update:show')" width="750">
        <v-card class="pa-3 rounded-lg mb-5 border"  flat v-if="user">
            <v-card-title class="font-weight-medium px-4 d-flex py-0 align-center">
                Edit Profile
                <v-spacer></v-spacer>
                <v-btn icon="mdi-close" flat v-if="user.work && auth?.id == user.id" @click="emits('update:show', false)"></v-btn>
            </v-card-title>
            <v-divider class="mx-6"></v-divider>
            <v-card-text class="pt-4">
                <!-- <v-expansion-panels class="pa-0">
                    <v-expansion-panel elevation="0">
                        <v-expansion-panel-title class="text-subtitle-1 font-weight-bold">Main</v-expansion-panel-title>
                        <v-expansion-panel-text></v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel elevation="0">
                        <v-expansion-panel-title class="text-subtitle-1 font-weight-bold">Sections</v-expansion-panel-title>
                        <v-expansion-panel-text></v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel elevation="0">
                        <v-expansion-panel-title class="text-subtitle-1 font-weight-bold">Informations</v-expansion-panel-title>
                        <v-expansion-panel-text></v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels> -->
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
const showSections = ref(false)
//@ts-ignore
</script>

<style scoped>
.expansion-panel{
    cursor: pointer;
}
</style>