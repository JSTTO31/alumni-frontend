<template>
    <v-container fluid>
        <v-skeleton-loader type="heading"></v-skeleton-loader>
        <div class="d-flex">
            <v-skeleton-loader class="w-50" type="heading, heading"></v-skeleton-loader>
            <v-skeleton-loader class="w-50" type="heading, heading"></v-skeleton-loader>
        </div>
        <v-skeleton-loader type="heading, heading, heading"></v-skeleton-loader>
        <v-skeleton-loader type="actions"></v-skeleton-loader>
        
    </v-container>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>