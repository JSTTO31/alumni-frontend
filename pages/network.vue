<template>
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
                <suspense>
                    <nuxt-page></nuxt-page>
                    <template #fallback>
                        <v-row>
                            <v-col cols="4" v-for="n in 6">
                                <v-skeleton-loader type="card"></v-skeleton-loader>
                            </v-col>
                        </v-row>
                    </template>
                </suspense>
            </v-col>
    </v-container>
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