<template>
    <v-card class="pa-5 rounded-lg mb-5 border" flat v-if="user && !loading">
        <v-card-title class="font-weight-medium">Contact Information</v-card-title>
        <v-divider class="my-4"></v-divider>
        <v-card-text>
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
            <v-row v-for="contact, n in contacts" :key="n">
                <v-col cols="4">
                </v-col>
                <v-col>
                    <strong class="font-weight-medium text-primary">
                        {{ contact.content }}
                    </strong>
                </v-col>
            </v-row>
            <v-row class="pa-0">
                <v-col cols="4"></v-col>
                <v-col class="pt-0 pr-10">
                    <AddPhoneNumber>
                        <template #activator="props">
                            <v-btn class="text-capitalize" v-bind="props" icon="mdi-pencil" size="small" color="grey-darken-2" variant="text"></v-btn>
                        </template>
                    </AddPhoneNumber>
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
            <v-row v-for="email, n in emails" :key="n">
                <v-col cols="4">
                </v-col>
                <v-col>
                    <strong class="font-weight-medium text-primary">
                        {{ email.content }}
                    </strong>
                </v-col>
            </v-row>
            <v-row class="pa-0">
                <v-col cols="4"></v-col>
                <v-col class="pt-0">
                    <AddEmailAddress>
                        <template #activator="props">
                            <v-btn class="text-capitalize" v-bind="props" icon="mdi-pencil" size="small" color="grey-darken-2" variant="text"></v-btn>
                        </template>
                    </AddEmailAddress>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
    <SkeletonCardInformation class="mb-5" v-else></SkeletonCardInformation>
</template>

<script setup>
const {user, loading} = storeToRefs(useProfileStore())
const contacts = computed(() => user.value.informations?.filter(item => item.type == 'phone') || [])
const emails = computed(() => user.value.informations?.filter(item => item.type == 'email') || [])
</script>

<style lang="scss" scoped></style>