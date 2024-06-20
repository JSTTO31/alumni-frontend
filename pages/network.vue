<template>
   <nuxt-layout>
        <v-container class="d-flex px-0">
                <v-col cols="3">
                    <div style="position: fixed;width: 270px;">
                        <v-tabs direction="vertical">
                            <v-tab class="text-capitalize" :to="{name: 'network'}" color="primary">Home</v-tab>
                            <v-tab class="text-capitalize" :to="{name: 'network-connection-requests'}" color="primary">Request Connection</v-tab>
                            <v-tab class="text-capitalize" :to="{name: 'network-suggestion'}" color="primary">Suggestion</v-tab>
                            <v-tab class="text-capitalize" :to="{name: 'network-batchmates'}" color="primary">Batchmates</v-tab>
                            <v-tab class="text-capitalize" :to="{name: 'network-connections'}" color="primary">connections</v-tab>
                        </v-tabs>
                    </div>
                </v-col>
                <v-col cols="9" class="">
                    <nuxt-page></nuxt-page>
                </v-col>
        </v-container>
   </nuxt-layout>
</template>

<script setup>
definePageMeta({
    middleware:'auth',
    layout: 'authenticated'
})
useHead({
    title: 'Alumni Tracking | Network'
})
</script>

<style lang="scss" scoped>

</style>