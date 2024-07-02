<template>
  <v-card
    class="mb-5 rounded-lg border d-flex align-center justify-center flex-column pa-5"
    flat
  >
    <h4 class="font-weight-medium">Invite your fellow alumni</h4>
    <v-btn
      rounded="lg"
      prepend-icon="mdi-plus"
      variant="outlined"
      color="primary"
      class="text-capitalize mt-3"
      @click="showDialog = true"
      >Invite Alumni</v-btn
    >
  </v-card>
  <v-overlay transition="slide-y-transition" width="600" class="d-flex justify-center pt-15" v-model="showDialog">
    <v-card class="pa-5">
      <v-card-title class="d-flex align-center">
        Share this in
        <v-spacer></v-spacer>
        <v-btn icon="mdi-close" @click="showDialog = false" variant="text"></v-btn>

      </v-card-title>
      <v-card-text>
        <div class="d-flex my-5 justify-center" style="gap: 25px">
          <v-icon color="blue-darken-1" size="55">mdi-facebook</v-icon>
          <v-icon color="blue-lighten-2" size="55">mdi-twitter</v-icon>
          <v-icon color="blue-darken-4" size="55">mdi-linkedin</v-icon>
        </div>
        <p class="pa-2 text-h6 bg-grey-lighten-1 px-5 font-weight-medium rounded-lg d-flex align-center" style="user-select: all;">
          https://arellano-connect.au
          <v-spacer></v-spacer>
          <v-btn icon="mdi-content-duplicate" variant="text"></v-btn>
        </p>
      </v-card-text>
    </v-card>
  </v-overlay>
</template>

<script setup lang="ts">
const showDialog = ref(false)

</script>

<style scoped></style>
