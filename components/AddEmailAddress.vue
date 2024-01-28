<template>
    <div v-if="authorize">
        <v-form @submit.prevent="submit">
            <v-text-field type="email" v-model="email" v-if="showTextField" prepend-inner-icon="mdi-email" flat density="compact" variant="outlined" :disabled="loading" >
            </v-text-field>
            <slot name="activator" @click="showTextField=true" v-if="!showTextField"></slot>
            <v-btn type="submit" color="primary" :loading="loading" flat size="small" v-else class="text-capitalize" prepend-icon="mdi-plus">add email</v-btn>
        </v-form>
    </div>
</template>

<script setup>
const {authorize} = storeToRefs(useProfileStore())
const email = ref('')
const showTextField = ref(false)
const $profile = useProfileStore()
const loading = ref(false)
const submit = () => {
    loading.value= true
    $profile.add_information([{label: 'email', type: 'email', content: email.value}]).then(() => {
        loading.value = false
        showTextField.value = false;
        email.value = ''
    })
}
</script>

<style lang="scss" scoped>

</style>