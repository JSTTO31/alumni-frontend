<template>
    <div v-if="!profile_loading">
        <v-card class="pa-5 rounded-lg mb-5 border" flat v-if="user.about">
            <v-card-title class="d-flex align-center">
            About me 
            <v-spacer></v-spacer>
            <v-btn v-if="authorize" icon="mdi-pencil" color="grey-darken-1" variant="text" flat @click="showEditDialog = true"></v-btn>
            </v-card-title>
            <v-card-text style="font-size: 15px;line-height: 2;">
            <span v-if="!user.about">No paragraph</span>
            <span v-if="seemore || user.about.paragraph.length < 250">{{ user.about.paragraph }}</span>
            <span v-else>{{ user.about.paragraph.substring(0, 250) }}...<span class="font-weight-medium text-blue-darken-3" @click="seemore = true" style="cursor: pointer;" v-if="user.about.paragraph.length > 250">see more</span></span>
            </v-card-text>
        </v-card>
        <v-card v-else-if="authorize" class="rounded-lg mb-5 pa-5">
            <v-card-text class="d-flex flex-column align-center justify-center">
                No Available about paragraph <v-btn variant="text" size="small" prepend-icon="mdi-plus" class="text-capitalize" @click="showEditDialog = true">Add</v-btn>
            </v-card-text>
        </v-card>
    </div>
    <skeleton-about v-else class="mb-5"></skeleton-about>
    <v-dialog width="650" v-model="showEditDialog">
            <v-card class="pa-5 rounded-lg" :disabled="loading">
                <v-card-title class="font-weight-medium mb-3">Tell me about you</v-card-title>
                <div class="px-3">
                    <v-textarea variant="solo-filled" rows="10" :error-messages="errors?.paragraph" v-model="paragraph" flat single-line label="Paragraph"></v-textarea>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn prepend-icon="mdi-pencil" @click="submit" variant="elevated" color="primary" :loading="loading">Edit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
</template>

<script setup>
import { useProfileStore } from '~/stores/useProfileStore';
const $profile = useProfileStore()
const {user, authorize, loading: profile_loading} = storeToRefs($profile);
const paragraph = ref(user.value?.about?.paragraph || '')
const showEditDialog = ref(false)
const loading = ref(false)
const errors = ref(null) 
const submit = async () => {
    loading.value = true;
    $profile.editAbout(paragraph.value).then((response) => {
        loading.value = false
        const {error} = response;
        if(error.value){
            errors.value = error.value?.data.errors
        }else{
            showEditDialog.value  = false
        }
    })
}
const seemore = ref(false)
</script>

<style scoped>

</style>