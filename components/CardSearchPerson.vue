<template>
    <v-card class="d-flex border-b pa-2 rounded-0" flat>
        <v-col cols="2">
            <v-avatar class="mx-auto" size="75">
                <v-img :src="'https://source.unsplash.com/random/100x100?person&' + person.id"></v-img>
            </v-avatar>
        </v-col>
        <v-col class="d-flex align-center" cols="10">
            <v-hover v-slot="{props, isHovering}">
                <div @click="$router.push({ name: 'alumni', params: { alumni: person.email } })" v-bind="props" :style="isHovering ? 'text-decoration: underline;cursor:pointer' : ''">
                    <h4>{{ person.name }}</h4>
                    <h6 class="text-grey-darken-1 font-weight-regular">
                        <span style="font-size: 12px;">{{ person.alumni_information.department.name }}</span>
                    </h6>
                    <h6 class="font-weight-regular" v-if="person.about">
                        About &middot; {{ person.about.paragraph.substring(0,60) }}...
                    </h6>
                </div>
            </v-hover>
            <v-spacer></v-spacer>
            <div class="d-flex">
                <v-btn class="text-capitalize mb-2" prepend-icon="mdi-connection" color="primary" variant="tonal">Connect</v-btn>
                <v-btn class="text-capitalize mb-2 ml-2 " prepend-icon="mdi-message-text-outline" variant="text">Message</v-btn>
            </div>
        </v-col>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{person: any }>()
</script>

<style lang="scss" scoped>

</style>