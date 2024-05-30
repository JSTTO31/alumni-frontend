<template>
     <v-avatar
        class="bg-grey-lighten-2"
        v-if="user"
    >
        <img
        class="h-100"
        :src="user.picture"
        id="profile"
        :style="{transform: `scale(${scale})`}"
        />
        <img
            style="position: absolute;transform: scale(1)"
            class="w-100"
            src="/frames/alumni.png"
            id="profile"
            v-if="user.profile_picture && user.profile_picture.data.selected_frame == 1"
        />
    </v-avatar>
</template>

<script setup>
const props = defineProps(['user'])
const scale = computed(() => ((props.user.profile_picture?.data.styles.scale || 0) + 100) / 100);
</script>

<style scoped>

</style>