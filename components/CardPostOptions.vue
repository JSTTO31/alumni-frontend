<template>
  <v-card class="border-t-lg rounded-lg pa-0" style="border-color: #1f6e8c !important">
    <v-card-text class="rounded-lg d-flex align-center">
      <v-avatar size="60" class="border mr-5">
        <v-img
          src="https://as2.ftcdn.net/v2/jpg/02/44/42/79/1000_F_244427911_aoHHulebtYy4wLpncBBuWqCTNFKolcCB.jpg"
        ></v-img>
      </v-avatar>
      <DialogPost>
        <template #activator="props">
          <v-text-field
            v-bind="props"
            variant="solo-filled"
            rounded
            hide-details
            density="compact"
            label="Share your thoughts"
            single-line
            readonly
            flat
          ></v-text-field>
        </template>
      </DialogPost>
    </v-card-text>
    <div class="pa-0">
      <v-btn
        flat
        variant="text"
        color="blue-darken-1"
        prepend-icon="mdi-image"
        class="font-weight-medium text-capitalize rounded-0 w-50"
        >Media</v-btn
      >
      <v-btn
        flat
        variant="text"
        color="green-darken-1"
        prepend-icon="mdi-calendar"
        class="font-weight-medium text-capitalize rounded-0 w-50"
        >Event</v-btn
      >
    </div>
  </v-card>
</template>
