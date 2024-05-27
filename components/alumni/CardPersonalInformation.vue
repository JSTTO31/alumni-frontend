<template>
    <v-card class="pa-5 rounded-lg mb-5 border" v-if="user && !loading && (user.personal_information || auth.id == user.id)" flat>
        <v-card-title class="font-weight-medium d-flex py-0 align-center">
            Personal Information
            <v-spacer></v-spacer>
            <v-btn icon="mdi-pencil" class="" flat @click="$router.push({name: 'alumni-information-edit-personal'})" v-if="user.personal_information && user.id == auth.id"></v-btn>
        </v-card-title>
        <v-divider class="my-4"></v-divider>
        <v-card-text>
            <div class="d-flex align-center justify-center" v-if="!user.personal_information">
                <v-btn class="" variant="flat" color="grey-lighten-4" @click="$router.push({name: 'alumni-information-add'})">Fill up the personal information</v-btn>
            </div>
            <v-container fluid class="py-0" v-else>
                <v-row class="pa-0 d-flex align-center">
                    <v-col cols="4" class="pa-0">
                        Name:
                    </v-col>
                    <v-col>
                        <strong class="font-weight-medium text-primary text-capitalize" >{{ fullname }}</strong>
                    </v-col>
                </v-row>
                <v-row class="pa-0 d-flex align-center">
                    <v-col cols="4" class="pa-0">
                        Birthday:
                    </v-col>
                    <v-col>
                        <strong class="font-weight-medium text-primary text-capitalize" >{{ user.personal_information.birthday }}</strong>
                    </v-col>
                </v-row>
                <v-row class="pa-0 d-flex align-center">
                    <v-col cols="4" class="pa-0">
                        Gender:
                    </v-col>
                    <v-col>
                        <strong class="font-weight-medium text-primary text-capitalize" >{{ user.personal_information.gender }}</strong>
                    </v-col>
                </v-row>
                <v-row class="pa-0 d-flex align-center">
                    <v-col cols="4" class="pa-0">
                        Age:
                    </v-col>
                    <v-col>
                        <strong class="font-weight-medium text-primary text-capitalize" >{{ user.personal_information.age }}</strong>
                    </v-col>
                </v-row>
                <v-row class="pa-0 d-flex align-center">
                    <v-col cols="4" class="pa-0">
                        Civil Status:
                    </v-col>
                    <v-col>
                        <strong class="font-weight-medium text-primary text-capitalize" >{{ user.personal_information.civil_status }}</strong>
                    </v-col>
                </v-row>
                <v-row class="pa-0 d-flex align-center">
                    <v-col cols="4" class="pa-0">
                        Nationality:
                    </v-col>
                    <v-col>
                        <strong class="font-weight-medium text-primary text-capitalize" >{{ user.personal_information.nationality }}</strong>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script setup>
const {user, loading} = storeToRefs(useProfileStore())
const {user: auth} = storeToRefs(useAuthStore())

const fullname = computed(() => {
    if(!user.value.personal_information) return
    const first_name = user.value.personal_information.first_name
    const middle_name = user.value.personal_information.middle_name
    const last_name = user.value.personal_information.last_name

    if(middle_name) return first_name + " " + middle_name + " " + last_name
    return first_name + " " + last_name;
})
</script>

<style lang="scss" scoped></style>