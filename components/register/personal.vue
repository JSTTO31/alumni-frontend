<template>
    <div>
        <h4 class="text-capitalize text-grey-darken-2 font-weight-regular">Enter your details below.</h4>
        <v-card-text class="px-0">
            <div class="d-flex" style="gap: 15px">
                <div class="d-flex w-100 flex-column">
                    <label for="">First name (*)</label>
                    <v-text-field :error-messages="personal.first_name.$errors[0]?.$message.toString() || ''" v-model="personal.first_name.$model"  class="mt-2" variant="outlined" label="First Name" single-line></v-text-field>
                </div>
                <div class="d-flex w-100 flex-column">
                    <label for="">Middle Name (Optional)</label>
                    <v-text-field  v-model="personal.middle_name.$model"  class="mt-2" variant="outlined" label="Middle Name" single-line></v-text-field>
                </div>
            </div>
            <div class="d-flex" style="gap: 15px">
                <div class="d-flex flex-column w-100">
                    <label for="">Last Name (*)</label>
                    <v-text-field :error-messages="personal.last_name.$errors[0]?.$message.toString() || ''" v-model="personal.last_name.$model"  class="mt-2" variant="outlined" label="Last Name" single-line></v-text-field>
                </div>
                <div class="d-flex flex-column w-100">
                    <label for="">Nationality (*)</label>
                    <v-select :error-messages="personal.nationality.$errors[0]?.$message.toString() || ''"  v-model="personal.nationality.$model" class="mt-2" variant="outlined" label="Select Nationality" :items="nationalities" single-line></v-select>
                </div>
            </div>
            <div class="d-flex" style="gap: 15px">
                <div class="d-flex flex-column w-100">
                    <label for="">Gender (*)</label>
                    <v-select :error-messages="personal.gender.$errors[0]?.$message.toString() || ''"  v-model="personal.gender.$model" :items="genders" class="mt-2" variant="outlined" label="Select gender" single-line></v-select>
                </div>
                <div class="d-flex flex-column w-100">
                    <label for="">Age (*)</label>
                    <v-text-field :error-messages="personal.age.$errors[0]?.$message.toString() || ''" v-model="personal.age.$model"  type="number" class="mt-2" variant="outlined" label="Your age" single-line></v-text-field>
                </div>
            </div>
            <div class="d-flex" style="gap: 15px">
                <div class="d-flex flex-column w-100">
                    <label for="">Civil Status (*)</label>
                    <v-select :error-messages="personal.civil_status.$errors[0]?.$message.toString() || ''"  v-model="personal.civil_status.$model" :items="civil_statuses"  class="mt-2" variant="outlined" label="Civil Status" single-line></v-select>
                </div>
                <div class="d-flex flex-column w-100">
                    <label for="">Birthday (*)</label>
                    <v-text-field :error-messages="personal.birthday.$errors[0]?.$message.toString() || ''" v-model="personal.birthday.$model"  type="date" class="mt-2" variant="outlined" label="Birthday" single-line></v-text-field>
                </div>
            </div>
        </v-card-text>
        <div class="d-flex px-0">
            <v-btn class="text-capitalize" variant="elevated" size="large" @click="stepper = 1">Previous</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="text-capitalize" variant="elevated" size="large" color="#1F6E8C" :disabled="personal.$invalid" @click="stepper = 3">Next</v-btn>
        </div>
    </div>
</template>

<script setup>
const {personal, stepper} = inject('forms')
const {nationalities, genders, civil_statuses} = usePersonalInformationOptions

</script>

<style scoped></style>