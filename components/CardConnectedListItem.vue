<template>
    <v-card :disabled="loading || removeLoading" class="d-flex flex-column border-b pa-4 rounded-lg " flat @click="$router.push({name: 'alumni-alumni', params: {alumni: user.email}})">
        <div class="d-flex align-center">
            <Avatar :user="user" class="mr-3" size="65">
            </Avatar>
            <v-hover v-slot="{props, isHovering}">
                <div v-bind="props" :style="isHovering ? 'text-decoration: underline;cursor:pointer' : ''">
                    <h4>{{ user.name }}</h4>
                    <h6 class="text-grey-darken-1 pa-0 font-weight-regular text-caption">
                        <span style="font-size: 12px;">{{ user.email }}</span>
                    </h6>
                </div>
            </v-hover>
        </div>
    </v-card>
</template>

<script setup lang="ts">
import Avatar from './Avatar.vue';
const props = defineProps<{user: UserProfile }>()
const loading = ref(false)
const removeLoading = ref(false)


</script>

<style lang="scss" scoped>

</style>