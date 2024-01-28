<template>
    <div class="my-5">
        <v-card class="pa-2 px-5 rounded-lg" v-if="authorize"> 
            <v-card-title class="d-flex align-center ">
                Experience
                <v-spacer></v-spacer>
                <dialog-add-experience>
                    <template #activator="props">
                        <v-btn v-bind="props" prepend-icon="mdi-plus" flat class="text-capitalize">Add Experience</v-btn>
                    </template>
                </dialog-add-experience>
            </v-card-title>
        </v-card>
        <container-card-experience></container-card-experience>
    </div>
</template>

<script setup>
import { useExperienceStore } from '~/stores/useExperienceStore';
const {authorize} = storeToRefs(useProfileStore())
</script>

<style lang="scss" scoped></style>