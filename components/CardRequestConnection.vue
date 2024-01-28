<template>
    <v-card class="d-flex flex-column border-b pa-4 rounded-lg " flat>
        <div class="d-flex align-center">
            <v-avatar class="mr-3" size="65">
                <v-img :src="'https://source.unsplash.com/random/100x100?person&' + user.id"></v-img>
            </v-avatar>
            <v-hover v-slot="{props, isHovering}">
                <div @click="$router.push({ name: 'alumni', params: { alumni: user.email } })" v-bind="props" :style="isHovering ? 'text-decoration: underline;cursor:pointer' : ''">
                    <h4>{{ user.name }}</h4>
                    <h6 class="text-grey-darken-1 pa-0 font-weight-regular text-caption">
                        <span style="font-size: 12px;">{{ user.email }}</span>
                    </h6>
                </div>
            </v-hover>
        </div>
        <div class="d-flex justify-space-between mt-5">
            <v-btn class="text-capitalize mb-2 mr-1" flat prepend-icon="mdi-check" color="primary">Confirm</v-btn>
            <v-btn class="text-capitalize border mb-2" prepend-icon="mdi-close" flat>Remove</v-btn>
        </div>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{user: any }>()
</script>

<style lang="scss" scoped>

</style>