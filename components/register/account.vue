<template>
    <div>
        <h4 class="text-capitalize text-grey-darken-2 font-weight-regular">Enter your details below.</h4>
        <v-card-text class="px-0">
            <label class="font-weight-medium" for="email">Email Address</label>
            <v-text-field type="email" single-line v-model="account.email.$model" :error-messages="account.email.$errors[0]?.$message.toString() || ''"
            class="mt-2" id="email" label="joshua@arellanites.edu" variant="outlined"
            color="#1F6E8C"></v-text-field>
            <div>
                <label class="font-weight-medium" for="password-confirmation">Confirmation
                    Password</label>
                <v-text-field :error-messages="account.password.$errors[0]?.$message.toString() || ''" single-line
                    v-model="account.password.$model" class="mt-2" id="password-confirmation" label="*********"
                    variant="outlined" color="#1F6E8C" type="password"></v-text-field>
            </div>
            <div>
                <label class="font-weight-medium" for="password">Password</label>
                <v-text-field :error-messages="account.password_confirmation.$errors[0]?.$message.toString() || ''" single-line v-model="account.password_confirmation.$model"
                    class="mt-2" id="password" label="*********" variant="outlined" color="#1F6E8C"
                    type="password"></v-text-field>
            </div>
        </v-card-text>
        <div class="px-0 d-flex">
            <v-spacer></v-spacer>
            <v-btn class="text-capitalize" variant="elevated" size="large" color="#1F6E8C" :disabled="account.$invalid" @click="stepper = 2">Next</v-btn>
        </div>
    </div>
</template>

<script setup>
const {account, stepper} = inject('forms')

</script>

<style scoped></style>