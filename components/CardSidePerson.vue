<template>
    <v-card flat class="d-flex" color="transparent" >
        <v-col cols="3">
        <v-avatar size="45">
            <nuxt-img class="h-100 w-100"
            :src="'https://source.unsplash.com/random/150x150&person&' + viewer.id"></nuxt-img>
        </v-avatar>
        </v-col>
        <v-col cols="10">
        <v-hover v-slot="{props, isHovering}">
            <div v-bind="props" :style="isHovering ? 'text-decoration: underline;cursor: pointer' : ''" @click="$router.push({name: 'alumni', params: {alumni: viewer.email}})">
                <v-list-item-title  >{{ viewer.name }}</v-list-item-title>
                <v-list-item-subtitle style="font-size: 10px;">{{ viewer.alumni_information.department.name }}</v-list-item-subtitle>
            </div>
        </v-hover>
        <div>
            <v-btn class="text-capitalize mt-2" prepend-icon="mdi-information-outline" size="small" rounded
            variant="tonal" color="primary" @click="$router.push({name: 'alumni', params: {alumni: viewer.email}})">View Info</v-btn>
        </div>
        <!-- <v-btn class="text-capitalize mt-2" size="small" rounded
            variant="outlined" color="black" v-if="viewer.is_connected">Message</v-btn>
        <v-btn class="text-capitalize mt-2" prepend-icon="mdi-check" size="small" rounded
            variant="tonal" color="primary" v-else-if="viewer.has_request_from">Confirm</v-btn>
        <v-btn class="text-capitalize mt-2" prepend-icon="mdi-cancel" size="small" rounded
            variant="tonal" color="secondary" v-else-if="viewer.requested_at">Cancel Request</v-btn>
        <v-btn class="text-capitalize mt-2" prepend-icon="mdi-connection" size="small" rounded
            variant="tonal" color="primary" v-else>Connect</v-btn> -->
        </v-col>
    </v-card>
</template>

<script setup>
const props = defineProps(['viewer'])
</script>

<style lang="scss" scoped>

</style>