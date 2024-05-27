

export type NotificationType = {
    id?: number,
    title: string,
    message: string,
    type: "success" | "error" | "information" | "warning"
}

let id : number = 0

export const useNotificationStore = defineStore('notification', () => {
    const notifications = ref<NotificationType[]>([]);

    function addNotification(notification: NotificationType){
        id++
        notifications.value.push({...notification, id});
    }

    function removeNotification(notification_id: number){
        notifications.value = notifications.value.filter(item => item.id != notification_id);
    }

    return {notifications, addNotification, removeNotification};
})