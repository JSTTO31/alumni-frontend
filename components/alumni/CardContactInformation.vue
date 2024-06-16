<template>
    <div class=" rounded-lg mb-5" flat v-if="user">
        <h4 class="font-weight-medium d-flex pa-0 align-center">
            Contact Information
            <v-spacer></v-spacer>
            <v-btn icon="mdi-pencil" @click="$router.push({name: 'alumni-index-authorize-edit-contact'})" flat v-if="user.contact_information && user.id == auth.id"></v-btn>
        </h4>
        <v-container fluid class="pa-2">
            <v-row>
                <v-col cols="6" class="pa-0">
                    <v-list lines="two">
                        <v-list-item :title="user.contact_information.mobile_number" :subtitle="'Mobile Number'" prepend-icon="mdi-cellphone"></v-list-item>
                        <v-list-item :title="user.contact_information.region" :subtitle="'Region'" prepend-icon="mdi-map"></v-list-item>
                        <v-list-item :title="user.contact_information.city" subtitle="City" prepend-icon="mdi-city"></v-list-item>
                    </v-list>
                </v-col>
                <v-col cols="6" class="pa-0">
                    <v-list lines="two">
                        <v-list-item :title="user.contact_information.home_number" :subtitle="'Home number'" prepend-icon="mdi-phone"></v-list-item>
                        <v-list-item :title="user.contact_information.work_number" :subtitle="'Work number'" prepend-icon="mdi-cellphone-dock"></v-list-item>
                        <v-list-item :title="user.contact_information.postal_code" subtitle="Postal Code" prepend-icon="mdi-mailbox"></v-list-item>
                    </v-list>
                </v-col>
                <v-col cols="12" class="pa-0 py-2">
                    <v-list-item :title="user.contact_information.address" :subtitle="'Address'" prepend-icon="mdi-map-marker"></v-list-item>
                </v-col>
                <v-col cols="12" class="pa-0 py-2" v-if="user.contact_information.facebook">
                    <v-list-item prepend-icon="mdi-facebook">
                        <v-list-item-title>
                            <a :href="user.contact_information.facebook" target="_blank">{{user.contact_information.facebook}}</a>
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            Facebook
                        </v-list-item-subtitle>
                    </v-list-item>
                </v-col>
                <v-col cols="12" class="pa-0 py-2" v-if="user.contact_information.facebook">
                    <v-list-item prepend-icon="mdi-twitter">
                        <v-list-item-title>
                            <a :href="user.contact_information.twitter" target="_blank">{{user.contact_information.twitter}}</a>
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            Twitter
                        </v-list-item-subtitle>
                    </v-list-item>
                </v-col>
                <v-col cols="12" class="pa-0 py-2" v-if="user.contact_information.facebook">
                    <v-list-item prepend-icon="mdi-linkedin">
                        <v-list-item-title>
                            <a :href="user.contact_information.linkedin" target="_blank">{{user.contact_information.linkedin}}</a>
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            Linkedin
                        </v-list-item-subtitle>
                    </v-list-item>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup>
const {user} = storeToRefs(useProfileStore())
const {user:auth} = storeToRefs(useAuthStore())
</script>

<style lang="scss" scoped></style>