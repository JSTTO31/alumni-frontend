<template>
    <v-card class="rounded-lg py-3 px-4" :disabled="loading">
        <v-form @submit.prevent="save">
            <v-card-title>Contact Information</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <div class="d-flex" style="gap: 15px">
                    <div class="d-flex w-100 flex-column">
                        <label for="">Email Address (*)</label>
                        <v-text-field :model-value="auth?.email" disabled class="mt-2" variant="outlined"
                            density="compact" label="First Name" single-line></v-text-field>
                    </div>
                    <div class="d-flex w-100 flex-column">
                        <label for="">Mobile Number (*)</label>
                        <v-text-field :error-messages="$v.mobile_number.$errors[0]?.$message.toString() || ''"
                            v-model="$v.mobile_number.$model" type="tel" min="11" max="11" class="mt-2"
                            variant="outlined" density="compact" label="Mobile number" single-line>
                            <template #prepend-inner>+63</template>
                        </v-text-field>
                    </div>
                </div>
                <div class="d-flex" style="gap: 15px">
                    <div class="d-flex w-100 flex-column">
                        <label for="">Home Number</label>
                        <v-text-field v-model="$v.home_number.$model" type="tel" min="11" max="11" class="mt-2"
                            variant="outlined" density="compact" label="Home number" single-line>
                            <template #prepend-inner>+63</template>
                        </v-text-field>
                    </div>
                    <div class="d-flex w-100 flex-column">
                        <label for="">Work Number</label>
                        <v-text-field v-model="$v.work_number.$model" type="tel" min="11" max="11" class="mt-2"
                            variant="outlined" density="compact" label="Work number" single-line>
                            <template #prepend-inner>+63</template>
                        </v-text-field>
                    </div>
                </div>
                <div class="d-flex" style="gap: 15px">
                    <div class="d-flex w-100 flex-column">
                        <label for="">Address (*)</label>
                        <v-text-field :error-messages="$v.address.$errors[0]?.$message.toString() || ''"
                            v-model="$v.address.$model" class="mt-2" variant="outlined" density="compact"
                            label="Address" single-line>
                        </v-text-field>
                    </div>
                    <div class="d-flex w-100 flex-column">
                        <label for="">Region (*)</label>
                        <v-select :error-messages="$v.region.$errors[0]?.$message.toString() || ''" :items="regions"
                            v-model="$v.region.$model" item-title="name" item-value="name" class="mt-2"
                            variant="outlined" density="compact" label="Region" single-line>

                        </v-select>
                    </div>
                </div>
                <div class="d-flex" style="gap: 15px">
                    <div class="d-flex w-100 flex-column">
                        <label for="">City (*)</label>
                        <v-select :disabled="!informations.region"
                            :error-messages="$v.city.$errors[0]?.$message.toString() || ''" v-model="$v.city.$model"
                            :items="cities" item-title="name" item-value="name" message="example" class="mt-2"
                            variant="outlined" density="compact" label="City" single-line>
                        </v-select>
                    </div>
                    <div class="d-flex w-100 flex-column">
                        <label for="">Postal Code</label>
                        <v-text-field v-model="$v.postal_code.$model" class="mt-2" variant="outlined" density="compact"
                            label="Postal code" single-line>
                        </v-text-field>
                    </div>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="px-6">
                <v-spacer></v-spacer>
                <v-btn type="submit" class="text-capitalize px-6" color="primary" variant="flat"
                    :loading="loading">Save</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
const { user: auth } = storeToRefs(useAuthStore())
const $profile = useProfileStore()
const { user } = storeToRefs(useProfileStore())
const props = defineProps<{ show: boolean }>()
const emits = defineEmits(['update:show'])
const informations = reactive({
    mobile_number: user.value?.contact_information.mobile_number,
    home_number: user.value?.contact_information.home_number,
    work_number: user.value?.contact_information.work_number,
    address: user.value?.contact_information.address,
    region: user.value?.contact_information.region,
    city: user.value?.contact_information.city,
    postal_code: user.value?.contact_information.postal_code,
})
const { data: regions }: any = await useFetch("https://psgc.gitlab.io/api/regions/", {
    onResponse(event) {
        event.response._data = JSON.parse(event.response._data)
        return event
    }
})
const cities = ref([])


watch(() => informations.region, async () => {
    if (!informations.region) return []
    const region = regions.value.find((item: any) => item.name == informations.region)

    const { data }: any = await useFetch(`https://psgc.gitlab.io/api/regions/${region.code}/cities`, {
        onResponse(event) {
            event.response._data = JSON.parse(event.response._data)
            return event
        }
    })

    cities.value = data.value
})


const rules = {
    mobile_number: { required },
    home_number: {},
    work_number: {},
    address: { required },
    region: { required },
    city: { required },
    postal_code: {},
}

const loading = ref(false)

const $v = useVuelidate(rules, informations);

async function save() {
    if (!await $v.value.$validate()) {
        return
    }

    loading.value = true

    await $profile.editContactInformation(informations)

    loading.value = false
    emits('update:show', false)
}
</script>

<style scoped></style>