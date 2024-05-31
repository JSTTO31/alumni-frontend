<template>
    <div class="pa-5 pt-3 rounded-lg" flat>
        <h4 class="font-weight-medium d-flex py-0 align-center">
            Personal Information
            <v-spacer></v-spacer>
            <v-btn icon="mdi-pencil" class="" flat @click="$router.push({name: 'alumni-index-edit-personal'})" v-if="user.personal_information && user.id == auth.id"></v-btn>
        </h4>
        <v-container fluid class="pa-2">
            <v-row>
                <v-col class="pa-0">
                    <v-list lines="two">
                        <v-list-item :title="fullname" :subtitle="'Full name'" prepend-icon="mdi-account"></v-list-item>
                        <v-list-item :title="user.personal_information.gender" :subtitle="'gender'" prepend-icon="mdi-gender-male"></v-list-item>
                        <v-list-item :title="user.personal_information.civil_status" :subtitle="'gender'" prepend-icon="mdi-heart"></v-list-item>
                    </v-list>
                </v-col>
                <v-col class="pa-0">
                    <v-list lines="two">
                        <v-list-item :title="new Date(user.personal_information.birthday).toDateString()" subtitle="Birthday" prepend-icon="mdi-cake"></v-list-item>
                        <v-list-item :title="user.personal_information.age" subtitle="Birthday" prepend-icon="mdi-calendar"></v-list-item>
                        <v-list-item :title="user.personal_information.nationality" subtitle="Birthday" prepend-icon="mdi-flag"></v-list-item>
                    </v-list>
                </v-col>
            </v-row>
        </v-container>
    </div>
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