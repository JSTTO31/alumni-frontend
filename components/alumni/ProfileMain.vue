<template>
    <v-container class="pb-0 px-0 pt-0" fluid>
        <v-row>
            <v-col cols="12">
                <v-card class="rounded-lg border" flat>
                    <v-card class="rounded-lg d-flex align-center justify-center rounded-b-0 empty-background" flat height="200"
                        @click="fileInputCover.click()">
                        <img id="cover" class="w-100" />
                        <!-- <img width="870" height="217.5" :src="'https://source.unsplash.com/random/870x217.5' + user.id" v-else/> -->
                        <v-btn size="small" prepend-icon="mdi-camera" class="text-capitalize" style="position: absolute;top: 15px;right: 15px;">Edit cover photo</v-btn>
                    </v-card>
                    <input @change="changeCover" type="file" hidden="true" ref="fileInputCover">
                    <v-container class="d-flex pb-0">
                        <div class="align-self-start pl-2" style="position: relative;margin-top: -120px">
                            <AlumniProfileAvatar></AlumniProfileAvatar>
                            <!-- <v-icon color="blue" size="30" class="bg-white rounded-circle" style="position: absolute;bottom: 10px;right: 5px;">mdi-check-decagram</v-icon> -->
                        </div>
                        <div class="py-5 px-0 pt-0 w-100" flat>
                            <h1 class="font-weight-medium align-center text-capitalize  d-flex">
                                {{ user.name }} <v-chip class="ml-2 rounded-lg" prepend-icon="mdi-check-decagram">Verify your account</v-chip>
                                <v-spacer></v-spacer>
                                <v-icon v-if="!!user.contact_information.facebook" @click="gotoWebsite(user.contact_information.facebook)" size="35" color="blue-darken-2" class="mr-2">mdi-facebook</v-icon>
                                <v-icon v-if="!!user.contact_information.twitter" @click="gotoWebsite(user.contact_information.twitter)" size="35" color="blue-lighten-2" class="mr-2">mdi-twitter</v-icon>
                                <v-icon v-if="!!user.contact_information.linkedin" @click="gotoWebsite(user.contact_information.linkedin)" size="35" color="blue-darken-3" class="mr-2">mdi-linkedin</v-icon>
                            </h1>
                            <h5 class="mb-1 font-weight-medium profile-action-text">
                                Bachelor of Science in Computer Science
                            </h5>
                            <h5 class="mb-1  font-weight-regular">
                                Live at <b @click="showLocation=true" class="location-btn">{{ user.contact_information.city }}</b>
                            </h5>
                            <alumni-location-dialog v-model:show="showLocation"></alumni-location-dialog>
                            <div>
                                <v-chip color="primary" variant="text" class="rounded profile-action-text"
                                prepend-icon="mdi-connection">Connections 39</v-chip>
                                <v-chip color="primary" prepend-icon="mdi-eye"
                                v-if="user.viewers_count" variant="text" class="ml-3 rounded profile-action-text">Views {{ user.viewers_count }}</v-chip>
                            </div>
                            <div class="my-5" v-if="!authorize">
                                <v-btn class="text-capitalize" color="primary" prepend-icon="mdi-account-check"
                                    :loading="loading" v-if="user.has_request_from"
                                    @click="$profile.confirm">Confirm</v-btn>
                                <v-chip class="text-capitalize rounded font-weight-medium" style="font-size: 15px"
                                    size="large" color="primary" variant="tonal" prepend-icon="mdi-check" :loading="loading"
                                    v-else-if="user.is_connected">Connected</v-chip>
                                <v-btn class="text-capitalize" color="primary" prepend-icon="mdi-cancel" :loading="loading"
                                    v-else-if="user.requested_at" @click="$profile.cancelRequestConnection">Cancel
                                    Request</v-btn>
                                <v-btn class="text-capitalize" color="primary" prepend-icon="mdi-connection"
                                    :loading="loading" v-else @click="$profile.requestConnection">Connect</v-btn>
                                <v-btn class="text-capitalize ml-3" color="grey-darken-3" variant="text"
                                    prepend-icon="mdi-message-text">Send Message</v-btn>
                                <v-menu location="bottom end">
                                    <template #activator="{ props }">
                                        <v-btn class="text-capitalize ml-3" v-bind="props" color="grey-darken-3"
                                            variant="text">
                                            <v-icon size="25">mdi-dots-horizontal</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-card class="rounded-lg mt-1" width="250">
                                        <v-list>
                                            <v-list-item color="primary" @click="$profile.toggleFollow()"
                                                v-if="!user.followed_at">Follow</v-list-item>
                                            <v-list-item color="primary" @click="$profile.toggleFollow()"
                                                v-else>Unfollow</v-list-item>
                                            <v-list-item color="primary" @click="$profile.disconnect"
                                                v-if="user.is_connected">Disconnect</v-list-item>
                                        </v-list>
                                    </v-card>
                                </v-menu>
                            </div>
                            <div class="my-4" v-else>
                                <v-btn class="text-capitalize" color="primary" prepend-icon="mdi-pencil" @click="showQuickEdit = true">Quick Edit</v-btn>
                                <!-- <v-btn class="text-capitalize ml-2" color="primary" variant="text" prepend-icon="mdi-information-outline" >More Info</v-btn> -->
                            </div>
                        </div>
                    </v-container>
                    <div class="d-flex border-t">
                        <v-tabs color="primary" align-tabs="center">
                            <v-tab rounded class="text-capitalize"
                                :to="{ name: 'alumni', params: { alumni: route.params.alumni } }">Home</v-tab>
                            <v-tab rounded class="text-capitalize"
                                :to="{ name: 'alumni-information', params: { alumni: route.params.alumni } }">Informations</v-tab>
                            <v-tab rounded class="text-capitalize"
                                :to="{ name: 'alumni-activities', params: { alumni: route.params.alumni } }">Activities</v-tab>
                            <v-tab rounded class="text-capitalize"
                                :to="{ name: 'alumni-connections', params: { alumni: route.params.alumni } }">Connections</v-tab>
                            <v-tab rounded class="text-capitalize">More</v-tab>
                        </v-tabs>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <AlumniQuickEditDialog v-model:show="showQuickEdit"></AlumniQuickEditDialog>
</template>

<script setup>
const route = useRoute()
const { user, authorize } = storeToRefs(useProfileStore())
const { user: auth } = storeToRefs(useAuthStore())
const $profile = useProfileStore()
const loading = ref(false)
const fileInputCover = ref()
const showLocation = ref(false)
const showQuickEdit = ref(false)
const changeCover = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
        const cover = document.getElementById('cover')
        if (cover) {
            cover.src = reader.result
        }
    }

    reader.readAsDataURL(file)
}

const gotoWebsite = (link) => {
    window.open(link, "_blank")
}
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
.location-btn:hover{
    color: #05668D;
    cursor: pointer;
}

.location-btn:active{
    color: #044761;
}

.profile-action-text:hover{
    text-decoration: underline;
    cursor: pointer;
    color: #05668D;
}
</style>