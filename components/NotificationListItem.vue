<template>
      <v-alert class="mt-5" density="compact" border closable :title="notification.title" :text="notification.message" :type="notification.type"></v-alert>
</template>

<script setup lang="ts">
import type { Notification } from '#imports';

const $notification = useNotificationStore()
const props = defineProps<{notification: Notification}>()
const timer = setTimeout(() => {
    $notification.removeNotification(props.notification.id)
}, 3500);


onUnmounted(() => {
    clearTimeout(timer)
})
</script>

<style scoped>

</style>