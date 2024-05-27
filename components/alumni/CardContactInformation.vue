<template>
    <v-card class="pa-5 rounded-lg mb-5 border" flat v-if="user">
        <v-card-title class="font-weight-medium d-flex pa-0 align-center px-4">
            Contact Information
            <v-spacer></v-spacer>
            <v-btn icon="mdi-pencil" @click="$router.push({name: 'alumni-information-edit-contact'})" flat v-if="user.contact_information && user.id == auth.id"></v-btn>
        </v-card-title>
        <v-divider class="my-4"></v-divider>
        <v-card-text>
            <div class="d-flex align-center justify-center" v-if="!user.contact_information">
                <v-btn class="" variant="flat" color="grey-lighten-4" @click="$router.push({name: 'alumni-information-add-contact'})">Fill up the contact information</v-btn>
            </div>
            <v-container v-else class="pa-0">
                <v-row class="pa-0">
                    <v-col cols="4">
                        Mobile number:
                    </v-col>
                    <v-col>
                        <strong class="font-weight-medium text-primary">
                            {{ user.contact_information.mobile_number }}
                        </strong>
                    </v-col>
                </v-row>
                <v-row v-if="user.contact_information.work_number" class="pa-0">
                    <v-col cols="4">
                        Work number:
                    </v-col>
                    <v-col>
                        <strong class="font-weight-medium text-primary">
                            {{ user.contact_information.work_number }}
                        </strong>
                    </v-col>
                </v-row>
                <v-row v-if="user.contact_information.home_number" class="pa-0">
                    <v-col cols="4">
                        Home number:
                    </v-col>
                    <v-col>
                        <strong class="font-weight-medium text-primary">
                            {{ user.contact_information.home_number }}
                        </strong>
                    </v-col>
                </v-row>
                <v-row class="pa-0">
                    <v-col cols="4">
                        Address:
                    </v-col>
                    <v-col>
                        <strong class="font-weight-medium text-primary">
                            {{ user.contact_information.address }}
                        </strong>
                    </v-col>
                </v-row>
                <v-row class="pa-0">
                    <v-col cols="4">
                        Region:
                    </v-col>
                    <v-col>
                        <strong class="font-weight-medium text-primary">
                            {{ user.contact_information.region }}
                        </strong>
                    </v-col>
                </v-row>
                <v-row class="pa-0">
                    <v-col cols="4">
                        City:
                    </v-col>
                    <v-col>
                        <strong class="font-weight-medium text-primary">
                            {{ user.contact_information.city }}
                        </strong>
                    </v-col>
                </v-row>
                <v-row class="pa-0">
                    <v-col cols="4">
                        Postal Code:
                    </v-col>
                    <v-col>
                        <strong class="font-weight-medium text-primary">
                            {{ user.contact_information.postal_code }}
                        </strong>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script setup>
const {user} = storeToRefs(useProfileStore())
const {user:auth} = storeToRefs(useAuthStore())
</script>

<style lang="scss" scoped></style>