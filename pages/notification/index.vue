<template>
    <NuxtLayout>
        <v-main>
            <v-container class="d-flex">
                <v-col cols="3">
                    <div style="position: fixed;width: 270px;">
                        <v-tabs direction="vertical">
                            <v-tab class="text-capitalize" :to="{name: 'network'}" color="primary">All</v-tab>
                            <v-tab class="text-capitalize" :to="{name: 'network-connection-requests'}" color="primary">Unread</v-tab>
                            <v-tab class="text-capitalize" color="primary">Read</v-tab>
                        </v-tabs>
                    </div>
                </v-col>
               <v-col cols="8" class="">
                <v-list class="pa-0 bg-transparent">
                    <v-list-item flat class="rounded-lg bg-white border pa-7 mb-2" v-for="notification in notifications"
                        :key="notification.title" :subtitle="notification.message" :title="notification.title" @click="$router.push('/notification/323')">
                        <template #prepend>
                            <v-btn color="primary" class="mr-4" variant="tonal" icon="mdi-briefcase-outline"
                                v-if="notification.type == 'Job'"></v-btn>
                            <v-btn color="success" class="mr-4" variant="tonal" icon="mdi-chat-outline"
                                v-else-if="notification.type == 'Message'"></v-btn>
                            <v-btn color="primary" class="mr-4" variant="tonal" icon="mdi-briefcase"
                                v-else-if="notification.type == 'Candidate'"></v-btn>
                            <v-btn color="info" class="mr-4" variant="tonal" icon="mdi-post-outline"
                                v-else-if="notification.type == 'Post'"></v-btn>
                            <v-btn color="info" class="mr-4" variant="tonal" icon="mdi-pen"
                                v-else-if="notification.type == 'Interview'"></v-btn>
                            <v-btn color="secondary" class="mr-4" variant="tonal" icon="mdi-application"
                                v-else-if="notification.type == 'Application'"></v-btn>
                            <v-btn color="secondary" class="mr-4" variant="tonal" icon="mdi-account-check"
                                v-else-if="notification.type == 'Candidate Notification'"></v-btn>
                            <v-btn color="blue" class="mr-4" variant="tonal" icon="mdi-emoticon-happy-outline"
                                v-else></v-btn>
                        </template>
                        <v-chip class="rounded" size="small" prepend-icon="mdi-fire" color="red" style="position: absolute;top: 10px;right: 10px">new</v-chip>
                    </v-list-item>
                </v-list>
               </v-col>
            </v-container>
        </v-main>
    </NuxtLayout>
</template>

<script setup>
import { useNotificationObjects } from '#imports';
definePageMeta({
    middleware: ["auth"],
    layout: "authenticated",
});
useHead({
    title: "Notification | AU connect",
});
const { notifications } = useNotificationObjects
</script>

<style lang="scss" scoped></style>