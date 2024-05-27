<template>
    <div id="container">
        <TransitionGroup name="slide-x">
            <NotificationListItem v-for="notification in notifications" :key="notification.id" :notification="notification"></NotificationListItem>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
const {notifications} = storeToRefs(useNotificationStore())
</script>

<style scoped>
#container{
    position: fixed;
    left: 15px;
    bottom: 15px;
    width: 450px;
}


.slide-x-enter-active,
.slide-x-leave-active {
  transition: all 0.4s;
}
.slide-x-enter-from,
.slide-x-leave-to {
  transform: translateX(-20%);
  opacity: 0;
}
</style>