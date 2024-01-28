<template>
    <slot @click="showDialog = true" name="activator"></slot>
    <v-dialog scrollable width="650" v-model="showDialog">
        <v-card class="rounded-lg" :disabled="loading">
            <v-card-title class="d-flex align-center">
                Add Experience
                <v-spacer></v-spacer>
                <v-btn icon="mdi-close" size="small" flat @click="showDialog = false"></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-form @submit.prevent="submit">
                    <div>
                        <label for="title">Job Title<span class="text-red">*</span></label>
                        <v-text-field :error-messages="errors?.title" v-model="form.title" class="mt-2" id="title"
                            label="Job title" density="compact" variant="outlined" single-line></v-text-field>
                    </div>
                    <div>
                        <label for="type">Position<span class="text-red">*</span></label>
                        <v-text-field :error-messages="errors?.position" v-model="form.position" class="mt-2" id="type"
                            label="Job Position" density="compact" variant="outlined" single-line></v-text-field>
                    </div>
                    <div>
                        <label for="company">Company Name<span class="text-red">*</span></label>
                        <v-text-field :error-messages="errors?.company_name" v-model="form.company_name" class="mt-2" id="company"
                            label="Company name" density="compact" variant="outlined" single-line></v-text-field>
                    </div>
                    <div>
                        <label for="location">Location<span class="text-red">*</span></label>
                        <v-text-field :error-messages="errors?.location" v-model="form.location" class="mt-2" id="location"
                            label="Location" density="compact" variant="outlined" single-line></v-text-field>
                    </div>
                    <div>
                        <v-checkbox v-model="form.is_current" color="primary" class="ml-n2" density="comfortable"
                            single-line hide-details label="Current Work"></v-checkbox>
                    </div>
                    <select-month-year class="mb-4" v-model:date="form.start_date" title="Start Date" :error-messages="errors?.start_date"></select-month-year>
                    <select-month-year class="mb-4" :disable="form.is_current" v-model:date="form.end_date" title="End Date" :error-messages="errors?.end_date"></select-month-year>
                    <div>
                        <label for="description">Description</label>
                        <v-textarea v-model="form.description" class="mt-2" id="description" label="Description" density="compact" variant="outlined"
                            single-line></v-textarea>
                    </div>
                    <div class="">
                        <h4 class="text-grey-darken-3 font-weight-medium">Photo/Image</h4>
                        <v-btn rounded variant="outlined" color="primary" class="text-capitalize mt-2"
                            prepend-icon="mdi-plus">Add Media</v-btn>
                    </div>
                  
                        <input type="submit" hidden variant="elevated" color="primary" />
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="submit" color="primary" variant="elevated" :loading="loading" flat>Submit</v-btn>
                <v-btn @click="showDialog = false">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { useExperienceStore } from '~/stores/useExperienceStore';
import {useMagicKeys} from '@vueuse/core'
const $experience = useExperienceStore()
const showDialog = ref(false)
const form = reactive({
  title: 'Software Engineer',
  position: 'Senior Developer',
  company_name: 'TechCorp',
  location: 'Cityville, USA',
  is_current: true,
  start_date: null,
  end_date: null, 
  description: 'Developing and maintaining web applications',
})
const errors = ref(null)
const loading = ref(false)
const submit = () => {
    loading.value = true
    $experience.store(form).then((res) => {
        const { error } = res

        loading.value = false

        if(error.value){
            errors.value = error.value.data.errors;
        }else{
            errors.value = null
            form.company_name = form.description = form.end_date = form.location = form.location = form.position = form.start_date = form.title = ''
            form.is_current = ''
            showDialog.value = false
        }
    })
}
</script>

<style lang="scss" scoped></style>