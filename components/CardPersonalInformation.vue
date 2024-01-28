<template>
    <v-card class="pa-5 rounded-lg mb-5 border" v-if="user && !loading" flat>
        <v-card-title class="font-weight-medium">Personal Information</v-card-title>
        <v-divider class="my-4"></v-divider>
        <v-card-text>
            <v-row>
                <v-col cols="4">
                    Name:
                </v-col>
                <v-col>
                    <strong class="font-weight-medium text-primary">{{ name }}</strong>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    Address:
                </v-col>
                <v-col>
                    <strong class="font-weight-medium text-primary">
                        {{ user.alumni_information.address }}
                    </strong>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    Nationality:
                </v-col>
                <v-col>
                    <strong class="font-weight-medium text-primary">
                        {{ user.alumni_information.nationality }}
                    </strong>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    Gender:
                </v-col>
                <v-col>
                    <strong class="font-weight-medium text-primary">
                        {{ user.alumni_information.gender }}
                    </strong>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    Marital Status:
                </v-col>
                <v-col>
                    <strong class="font-weight-medium text-primary">
                        {{ user.alumni_information.marital_status }}
                    </strong>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    Phone number:
                </v-col>
                <v-col>
                    <strong class="font-weight-medium text-primary">
                        {{ user.alumni_information.phone_number }}
                    </strong>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    Email Address:
                </v-col>
                <v-col>
                    <strong class="font-weight-medium text-primary">
                        {{ user.alumni_information.email }}
                    </strong>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    Birthday:
                </v-col>
                <v-col>
                    <strong class="font-weight-medium text-primary">
                        {{ user.alumni_information.birthday }}
                    </strong>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    Address:
                </v-col>
                <v-col>
                    <strong class="font-weight-medium text-primary">
                        {{ user.alumni_information.address }}
                    </strong>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
    <SkeletonCardInformation class="mb-5" v-else></SkeletonCardInformation>
</template>

<script setup>
const {user, loading} = storeToRefs(useProfileStore())
const name = computed(() => user ? 
    user.value.alumni_information.first_name + ' ' + user.value.alumni_information.last_name
: '')
const alumni_information = user?.alumni_information | ''
</script>

<style lang="scss" scoped></style>