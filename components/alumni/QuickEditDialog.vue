<template>
    <v-overlay class="d-flex align-start pt-15 justify-center" transition="slide-y-transition" :model-value="show" @click:outside="emits('update:show')" width="750">
        
        <!-- <ProfileWorkCreateForm v-model:show="showAll"></ProfileWorkCreateForm> -->
    </v-overlay>
</template>

<script setup>
const props = defineProps(['show'])
const emits = defineEmits(['update:show'])
const {user} = storeToRefs(useProfileStore())
const {user: auth} = storeToRefs(useAuthStore())
const showSections = ref(false)
//@ts-ignore
</script>

<style scoped>
.expansion-panel{
    cursor: pointer;
}
</style>