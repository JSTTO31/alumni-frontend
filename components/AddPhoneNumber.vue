<template>
    
    <div v-if="authorize">
        <v-text-field v-model="phone_number" v-if="showTextField" :counter="11" flat density="compact" @keyup="filter" variant="outlined" :disabled="loading" @keyup.enter="submit">
            <template #prepend-inner>+63</template>
        </v-text-field>
        <slot name="activator" @click="showTextField=true" v-if="!showTextField"></slot>
        <v-btn @click="submit" color="primary" :loading="loading" flat size="small" v-else class="text-capitalize" prepend-icon="mdi-plus">add number</v-btn>

    </div>
</template>

<script setup>
const {authorize} = storeToRefs(useProfileStore())
const phone_number = ref('')
const showTextField = ref(false)
const filter = (e) => {
    phone_number.value = phone_number.value.split('').filter(item => Number.isInteger(parseInt(item))).join('')
    if(phone_number.value.length > 11){
        phone_number.value = phone_number.value.substring(0, 11)
    }
}
const $profile = useProfileStore()
const loading = ref(false)
const submit = () => {
    loading.value= true
    $profile.add_information([{label: 'phone', type: 'phone', content: '+63' + phone_number.value}]).then(() => {
        loading.value = false
        showTextField.value = false;
        phone_number.value = ''
    })
}
</script>

<style lang="scss" scoped>

</style>