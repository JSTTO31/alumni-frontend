<script setup>
useHead({ title: 'Tracking System | About' })
const {user, loading} = storeToRefs(useProfileStore())
</script>
<template>
  <v-container fluid class="pa-0 px-2 pt-5 pb-15">
    <v-row>
      <v-col>
        <card-about></card-about>
        <card-personal-information></card-personal-information>
        <card-contact-information></card-contact-information>
      </v-col>
    </v-row>
    <v-divider thickness="3" class="my-5"></v-divider>
    <v-row v-if="user" class="pb-5">
      <v-col cols="12" class="d-flex align-center">
        <h3 class="text-primary">Connected with {{ user.name }}</h3>
        <v-spacer></v-spacer>
        <v-btn class="text-capitalize" variant="text">See more</v-btn>
      </v-col>
      <v-col cols="3" v-for="n in 6">
        <v-card class="pa-5 rounded-lg d-flex flex-column">
          <v-avatar size="160" class="mx-auto">
            <img class="h-100" src="https://kreately.in/wp-content/uploads/2020/08/24081559/images-2020-08-24T081400.506.jpg">
          </v-avatar>
          <h4 class="text-center mt-4">Jane Doe</h4>
          <h6 class="text-center font-weight-regular">Bachelor of Science in Computer Science</h6>  
          <v-btn block color="primary " variant="tonal" prepend-icon="mdi-connection" class="mt-5">Connect</v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-divider thickness="3" class="my-5"></v-divider>
    <v-row v-if="user" class="">
      <v-col cols="12" class="d-flex align-center">
        <h3 class="text-primary">Connected with {{ user.name }}</h3>
        <v-spacer></v-spacer>
        <v-btn class="text-capitalize" variant="text">See more</v-btn>
      </v-col>
      <v-col cols="4" v-for="n in 6">
        <v-card class="pa-5 rounded-lg d-flex flex-column">
          <v-avatar size="160" class="mx-auto">
            <img class="h-100" src="https://kreately.in/wp-content/uploads/2020/08/24081559/images-2020-08-24T081400.506.jpg">
          </v-avatar>
          <h4 class="text-center mt-4">Jane Doe</h4>
          <h6 class="text-center font-weight-regular">Bachelor of Science in Computer Science</h6>  
          <v-btn block color="primary " variant="tonal" prepend-icon="mdi-connection" class="mt-5">Connect</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>



<style lang="scss" scoped></style>