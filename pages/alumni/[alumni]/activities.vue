<script setup>
useHead({
  title: 'Tracking System | Activities',
})
</script>
<template>
  <v-container fluid class="pa-0 py-5">
    <v-row>
      <v-col cols="4">
       <v-card class="pa-5 rounded-lg">
        <h4 class="text-grey-darken-4 font-weight-medium mb-5">Activity Filter</h4>
        <div class="">
          <label for="">Select Year</label>
          <v-select variant="outlined" density="compact"></v-select>
        </div>
        <div class="">
          <label for="">Select month</label>
          <v-select variant="outlined" density="compact"></v-select>
        </div>
        <div class="">
          <label for="">Privacy</label>
          <v-select variant="outlined" density="compact"></v-select>
        </div>
        <div class="">
          <label for="">Tagged Post</label>
          <v-select variant="outlined" density="compact"></v-select>
        </div>
        <v-card-actions></v-card-actions>
       </v-card>
      </v-col>
      <v-col cols="8">
        <card-post-options class="mb-5"></card-post-options>
        <card-post-container></card-post-container>
      </v-col>
    </v-row>
  </v-container>
</template>



<style lang="scss" scoped></style>