<template>
    <v-card class="rounded-lg d-flex align-center justify-center rounded-b-0 empty-background" flat height="200">
        <img id="cover" :src="user?.cover" :style="{transform: `translateY(${translateY}%)`}" v-if="user?.profile_cover" class="w-100" />
       
    </v-card>
</template>

<script setup lang="ts">
const {user} = storeToRefs(useProfileStore())
const translateY = computed(() => user.value && user.value.profile_cover ? (user.value?.profile_cover.data.styles.translateY / 50 * 100 - 100) : 0 )
</script>

<style scoped>
.empty-background {
    background-color: #c5dee9;
    opacity: 1;
    background-image:  linear-gradient(135deg, #05668dbe 25%, transparent 25%), linear-gradient(225deg, #05668dbe 25%, transparent 25%), linear-gradient(45deg, #05668dbe 25%, transparent 25%), linear-gradient(315deg, #05668dbe 25%, #c5dee9 25%);
    background-position:  40px 0, 40px 0, 0 0, 0 0;
    background-size: 80px 80px;
    background-repeat: repeat;
}
</style>