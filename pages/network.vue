<template>
    <nuxt-layout>
       <v-main>
            <v-container>
                <v-row>
                    <v-col cols="3">
                        <div style="position: fixed;width: 270px;">
                            <v-tabs direction="vertical">
                                <v-tab class="text-capitalize" :to="{name: 'network'}" color="primary">Home</v-tab>
                                <v-tab class="text-capitalize" :to="{name: 'network-connection-requests'}" color="primary">Request Connection</v-tab>
                                <v-tab class="text-capitalize" color="primary">Connected</v-tab>
                                <v-tab class="text-capitalize" :to="{name: 'network-batchmates'}" color="primary">Batchmates</v-tab>
                            </v-tabs>
                        </div>
                    </v-col>
                    <v-col cols="9">
                        <nuxt-page></nuxt-page>
                    </v-col>
                </v-row>
            </v-container>
       </v-main>
    </nuxt-layout>
</template>

<script setup>
definePageMeta({
    layout: 'authenticated', 
    middleware: ['auth']
})

useHead({
    title: 'Alumni Tracking | Network'
})
</script>

<style lang="scss" scoped>

</style>