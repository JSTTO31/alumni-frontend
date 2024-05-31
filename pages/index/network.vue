<template>
    <v-container class="d-flex">
            <v-col cols="3">
                <div style="position: fixed;width: 270px;">
                    <v-tabs direction="vertical">
                        <v-tab class="text-capitalize" :to="{name: 'index-network'}" color="primary">Home</v-tab>
                        <v-tab class="text-capitalize" :to="{name: 'index-network-connection-requests'}" color="primary">Request Connection</v-tab>
                        <v-tab class="text-capitalize" color="primary">Connected</v-tab>
                        <v-tab class="text-capitalize" :to="{name: 'index-network-batchmates'}" color="primary">Batchmates</v-tab>
                    </v-tabs>
                </div>
            </v-col>
            <v-col cols="9" class="">
                <nuxt-page></nuxt-page>
            </v-col>
    </v-container>
</template>

<script setup>
useHead({
    title: 'Alumni Tracking | Network'
})
</script>

<style lang="scss" scoped>

</style>