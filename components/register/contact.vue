<template>
    <v-card :disabled="loading" flat style="overflow:visible">
        <h4 class="text-capitalize text-grey-darken-2 font-weight-regular">Enter your details below.</h4>
        <v-card-text class="px-0">
            <div class="d-flex" style="gap: 15px">
                <div class="d-flex w-100 flex-column">
                    <label for="">Mobile Number (*)</label>
                    <v-text-field :error-messages="contact.mobile_number.$errors[0]?.$message.toString() || ''"
                        v-model="contact.mobile_number.$model" type="tel" min="11" max="11" class="mt-2"
                        variant="outlined" label="Mobile number" single-line>
                        <template #prepend-inner>+63</template>
                    </v-text-field>
                </div>
            </div>
            <div class="d-flex" style="gap: 15px">
                <div class="d-flex w-100 flex-column">
                    <label for="">Home Number (Optional)</label>
                    <v-text-field v-model="contact.home_number.$model" type="tel" min="11" max="11" class="mt-2"
                        variant="outlined" label="Home number" single-line>
                        <template #prepend-inner>+63</template>
                    </v-text-field>
                </div>
                <div class="d-flex w-100 flex-column">
                    <label for="">Work Number (Optional)</label>
                    <v-text-field v-model="contact.work_number.$model" type="tel" min="11" max="11" class="mt-2"
                        variant="outlined" label="Work number" single-line>
                        <template #prepend-inner>+63</template>
                    </v-text-field>
                </div>
            </div>
            <div class="d-flex" style="gap: 15px">
                <div class="d-flex w-100 flex-column">
                    <label for="">Address (*)</label>
                    <v-text-field :error-messages="contact.address.$errors[0]?.$message.toString() || ''"
                        v-model="contact.address.$model" class="mt-2" variant="outlined"
                        label="Address" single-line>
                    </v-text-field>
                </div>
                <div class="d-flex w-100 flex-column">
                    <label for="">Region (*)</label>
                    <v-select :error-messages="contact.region.$errors[0]?.$message.toString() || ''" :items="regions"
                        v-model="contact.region.$model" item-title="name" item-value="name" class="mt-2"
                        variant="outlined" label="Region" single-line>

                    </v-select>
                </div>
            </div>
            <div class="d-flex" style="gap: 15px">
                <div class="d-flex w-100 flex-column">
                    <label for="">City (*)</label>
                    <v-select :disabled="!contact.region.$model"
                        :error-messages="contact.city.$errors[0]?.$message.toString() || ''" v-model="contact.city.$model"
                        :items="cities" item-title="name" item-value="name" message="example" class="mt-2"
                        variant="outlined" label="City" single-line>
                    </v-select>
                </div>
                <div class="d-flex w-100 flex-column">
                    <label for="">Postal Code (Optional)</label>
                    <v-text-field v-model="contact.postal_code.$model" class="mt-2" variant="outlined"
                        label="Postal code" single-line>
                    </v-text-field>
                </div>
            </div>
        </v-card-text>
        <div class="d-flex">
            <v-btn class="text-capitalize" variant="elevated" size="large" @click="stepper = 2">Previous</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="text-capitalize" variant="elevated" size="large" color="#1F6E8C" :disabled="contact.$invalid" @click="submit" :loading="loading">Submit</v-btn>
        </div>
    </v-card>
</template>

<script setup>
const {contact, stepper, submit, loading} = inject('forms')
const { data: regions } = await useFetch("https://psgc.gitlab.io/api/regions/", {
    onResponse(event) {
        event.response._data = JSON.parse(event.response._data)
        return event
    }
})
const cities = ref([])


watch(() => contact.region.$model, async () => {
    if (!contact.region.$model) return []
    const region = regions.value.find((item) => item.name == contact.region.$model)

    const { data } = await useFetch(`https://psgc.gitlab.io/api/regions/${region.code}/cities`, {
        onResponse(event) {
            event.response._data = JSON.parse(event.response._data)
            return event
        }
    })

    cities.value = data.value
})

</script>

<style scoped></style>