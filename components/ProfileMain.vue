<template>
    <v-container class="pb-0 px-0 pt-2" fluid v-if="!profile_loading">
        <v-row>
            <v-col cols="12">
                <v-card class="rounded-lg bg-grey-lighten-2" flat width="870" height="217.5">
                    <nuxt-img width="870" height="217.5" :src="'https://source.unsplash.com/random/870x217.5' + user.id"></nuxt-img>
                    <v-btn size="small" icon="mdi-camera" style="position: absolute;top: 15px;right: 15px;"></v-btn>
                </v-card>
            </v-col>
            <v-col cols="2">
                <div class="pa-5 pt-10 pl-7 d-flex flex-column" style="position: relative">
                    <v-avatar class="bg-grey-lighten-2" size="160" style="margin-top: -135px;border: 4px solid #028090">
                        <nuxt-img width="160" height="160" class="rounded-lg"
                                :src="`https://source.unsplash.com/random/250x250?&${user.alumni_information.gender}&` + user.id"/>
                    </v-avatar>
                </div>
            </v-col>
            <v-col cols="10" class="pl-15 pt-8 mt-n8">
                <v-card class="rounded-lg pl-3" color="transparent" flat>
                    <h2 class="font-weight-medium align-end text-capitalize  d-flex">
                        {{ user.name }}
                        <v-spacer></v-spacer>
                        <v-chip color="grey-darken-3" v-if="user.connections_count" variant="text" prepend-icon="mdi-connection">Connections
                            {{ user.connections_count }}</v-chip>
                        <v-chip color="grey-darken-3" variant="text" prepend-icon="mdi-eye" v-if="user.viewers_count"
                            class="px-5 mx-3">Views {{ user.viewers_count }}</v-chip>
                    </h2>
                    <h5 class="text-primary font-weight-medium">
                        <v-icon>mdi-school</v-icon>
                        Bachelor in Science of Computer Science
                    </h5>
                    <div class="my-5" v-if="!authorize">
                        <v-btn class="text-capitalize" color="primary" prepend-icon="mdi-account-check" :loading="loading"
                            v-if="user.has_request_from" @click="$profile.confirm">Confirm</v-btn>
                        <v-chip class="text-capitalize rounded font-weight-medium" style="font-size: 15px" size="large" color="primary" variant="tonal" prepend-icon="mdi-check" :loading="loading"
                            v-else-if="user.is_connected">Connected</v-chip>
                        <v-btn class="text-capitalize" color="primary" prepend-icon="mdi-cancel" :loading="loading"
                            v-else-if="user.requested_at" @click="$profile.cancelRequestConnection">Cancel Request</v-btn>
                        <v-btn class="text-capitalize" color="primary" prepend-icon="mdi-connection" :loading="loading"
                            v-else @click="$profile.requestConnection">Connect</v-btn>
                        <v-btn class="text-capitalize ml-3" color="grey-darken-3" variant="text"
                            prepend-icon="mdi-message-text">Send Message</v-btn>
                        <v-menu location="bottom end">
                            <template #activator="{props}">
                                <v-btn class="text-capitalize ml-3" v-bind="props" color="grey-darken-3" variant="text"
                                    >
                                    <v-icon size="25">mdi-dots-horizontal</v-icon>
                                </v-btn>
                            </template>
                            <v-card class="rounded-lg mt-1" width="250">
                                <v-list>
                                    <v-list-item color="primary" @click="$profile.toggleFollow()" v-if="!user.followed_at">Follow</v-list-item>
                                    <v-list-item color="primary" @click="$profile.toggleFollow()" v-else>Unfollow</v-list-item>
                                    <v-list-item color="primary" @click="$profile.disconnect" v-if="user.is_connected">Disconnect</v-list-item>
                                </v-list>
                            </v-card>
                        </v-menu>
                    </div>
                    <div class="my-5" v-else>
                        <v-btn class="text-capitalize" color="primary" prepend-icon="mdi-pencil"
                            >Edit Profile</v-btn>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <div class="px-0 pt-5 d-flex" v-if="!!route.params.alumni">
            <v-tabs color="primary" align-tabs="center">
                <v-tab rounded class="text-capitalize" :to="{ name: 'alumni', params: { alumni: route.params.alumni } }">About</v-tab>
                <v-tab rounded class="text-capitalize" :to="{ name: 'alumni-activities', params: { alumni: route.params.alumni } }">Activities</v-tab>
                <v-tab rounded class="text-capitalize" :to="{ name: 'alumni-employment', params: { alumni: route.params.alumni } }">Employment</v-tab>
                <v-tab rounded class="text-capitalize" :to="{ name: 'alumni-connections', params: { alumni: route.params.alumni } }">Connections</v-tab>
            </v-tabs>
            <v-spacer></v-spacer>
        </div>
        <v-divider></v-divider>
    </v-container>
    <SkeletonProfileMain v-else></SkeletonProfileMain>
</template>

<script setup>
const route = useRoute()
const {user, authorize, loading:profile_loading, is_connected} = storeToRefs(useProfileStore())
const $profile = useProfileStore()
const loading = ref(false)
</script>

<style scoped></style>