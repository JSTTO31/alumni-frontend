<template>
    <v-card flat :disabled="disable" class="mb-2">
        <label>{{ title }}<span class="text-red">*</span></label>
        <v-row>
            <v-col cols="6">
                <v-select hide-details v-model="month" :items="months" item-title="label" item-value="index" class="mt-2" label="Month" density="compact" variant="outlined" single-line>
                </v-select>
            </v-col>
            <v-col cols="6">
                <v-select hide-details v-model="year"  :items="years()" class="mt-2" label="Year" density="compact" variant="outlined" single-line></v-select>
            </v-col>

        </v-row>
        <span class="text-error pl-4" style="font-size: 12px;" v-if="errorMessages">{{ errorMessages[0] }}</span>

    </v-card>
</template>

<script setup>
import { months } from '~/composables/useDate';
const props = defineProps(['title', 'date', 'error-messages', 'disable'])
const emits = defineEmits(['update:date'])
const month = ref()
const year = ref()
const convert_to_date = computed(() => new Date(year.value, month.value + 1))
const years = () => {
    const current_year = new Date().getFullYear()
    let past_year = new Date('2000').getFullYear()
    const container = [];

    while(past_year <= current_year){
        container.push(past_year)
        past_year++
    }

    return container
}


watch(() => convert_to_date.value, (currentValue) => {
    if(currentValue){
        emits('update:date', currentValue)
    }
})

onMounted(() => {
    if(props.date){
        const current_date = new Date(props.date)
        month.value = current_date.getMonth()
        year.value = current_date.getFullYear()
    }
})

</script>

<style lang="scss" scoped></style>