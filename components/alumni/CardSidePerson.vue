<template>
    <v-card flat class="d-flex" color="transparent" >
        <v-col cols="3">
            <avatar :user="person"></avatar>
        </v-col>
        <v-col cols="10">
        <v-hover v-slot="{props, isHovering}">
            <div v-bind="props" :style="isHovering ? 'text-decoration: underline;cursor: pointer' : ''" @click="$router.push({name: 'alumni-alumni', params: {alumni: person.email}})">
                <v-list-item-title  >{{ person.name }}</v-list-item-title>
                <!-- <v-list-item-subtitle style="font-size: 10px;">{{ person.alumni_information.department.name }} </v-list-item-subtitle> -->
                <v-list-item-subtitle style="font-size: 10px;" v-if="person.general_information"> {{ person.general_information.department_name }} </v-list-item-subtitle>
            </div>
        </v-hover>
        <div>
            <v-btn class="text-capitalize mt-2" prepend-icon="mdi-information-outline" size="small" rounded
            variant="tonal" color="primary" @click="$router.push({name: 'alumni-alumni', params: {alumni: person.email}})">View Info</v-btn>
        </div>
        <!-- <v-btn class="text-capitalize mt-2" size="small" rounded
            variant="outlined" color="black" v-if="person.is_connected">Message</v-btn>
        <v-btn class="text-capitalize mt-2" prepend-icon="mdi-check" size="small" rounded
            variant="tonal" color="primary" v-else-if="person.has_request_from">Confirm</v-btn>
        <v-btn class="text-capitalize mt-2" prepend-icon="mdi-cancel" size="small" rounded
            variant="tonal" color="secondary" v-else-if="person.requested_at">Cancel Request</v-btn>
        <v-btn class="text-capitalize mt-2" prepend-icon="mdi-connection" size="small" rounded
            variant="tonal" color="primary" v-else>Connect</v-btn> -->
        </v-col>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{person: User}>()
</script>

<style lang="scss" scoped>

</style>