<template>
    <div class="pt-8" v-if="!user?.general_information">
        <v-alert type="info" variant="tonal" class="mt-2">
            Please fill in the information based on the details you used in school to ensure it can be confirmed by the staff or the school authorities.
        </v-alert>
        <v-form class="my-5" @submit.prevent="execute">
            <div>
                <v-text-field v-model="informations.student_number" class="mb-2" :error-messages="error?.data?.errors?.student_number || ''" :disabled="pending && status != 'idle'" variant="outlined" label="Student number"></v-text-field>
            </div>
            <div class="">
                <v-select v-model="informations.department" class="mb-2" :error-messages="error?.data?.errors?.department || ''" :disabled="pending && status != 'idle'" variant="outlined" label="Select Department" :items="departments" item-title="name" item-value="id"></v-select>
            </div>
            <div class="">
                <v-select v-model="informations.school_branch" class="mb-2" :error-messages="error?.data?.errors?.school_branch || ''" :disabled="pending && status != 'idle'" variant="outlined" label="Select School Branch" :items="schoolBranches" item-title="name" item-value="id"></v-select>
            </div>
            <div>
                <v-text-field v-model="informations.graduation_year" class="mb-2" :error-messages="error?.data?.errors?.graduation_year || ''" :disabled="pending && status != 'idle'" variant="outlined" label="Graduation Year"></v-text-field>
            </div>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" variant="elevated" :loading="pending && status != 'idle'" color="primary">Submit</v-btn>
            </v-card-actions>
        </v-form>
    </div>
    <!-- <div v-else-if="user.general_information && !user.verified_at" class="d-flex flex-column justify-center align-center h-100">
        <v-avatar class="rounded-0 mb-12 mx-auto" size="160">
            <v-img src="/icons/alumni-waiting-verification.png"></v-img>
        </v-avatar>
        <h2 class="text-center mb-1">Account Verification in Progress!</h2>
        <h3 class="text-center font-weight-medium">Please wait for your account alumni verification. It may take a few days to complete the verification process.</h3>
    </div> -->
    <div v-else class="d-flex flex-column justify-center align-center h-100">
        <v-avatar class="rounded-0 mb-12 mx-auto" size="160">
            <v-img src="/icons/verified.png"></v-img>
        </v-avatar>
        <h2 class="text-center mb-1">Account Verified Successfully!</h2>
        <h3 class="text-center font-weight-medium">Your account is now verified. Welcome to the Arellano University alumni community!</h3>
    </div>
</template>

<script setup lang="ts">
import { useDepartmentStore } from '~/stores/useDepartment';
import { useSchoolBrancheStore } from '~/stores/useSchoolBranche';
const $auth = useAuthStore()
const {user} = storeToRefs($auth)
// initializing the options
const {departments} = storeToRefs(useDepartmentStore())
const {schoolBranches} = storeToRefs(useSchoolBrancheStore())
const $department = useDepartmentStore()
const $schoolBranch = useSchoolBrancheStore()
const requestOptions = [
    $department.getAll(),
    $schoolBranch.getAll()
]
// request all the options
await Promise.all(requestOptions)
const informations = reactive({
    department: null,
    school_branch: null,
    student_number: '',
    graduation_year: '',
})
const {execute, pending, error, status} = await $auth.submitGeneralInformation(informations)

</script>

<style scoped>

</style>