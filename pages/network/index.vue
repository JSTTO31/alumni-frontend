<template>
    <div >
        <suspense>
            <container-connection-request></container-connection-request>
            <template #fallback>
                    <div class="mb-5 mt-n5">
                        <v-skeleton-loader type="chip" class="bg-transparent px-0"></v-skeleton-loader>
                        <v-divider class="mb-3"></v-divider>
                        <v-row>
                            <v-col cols="4" v-for="n in 6" :key="n">
                                <div class="rounded-lg border" style="overflow:hidden">
                                    <v-skeleton-loader type="avatar, chip"></v-skeleton-loader>
                                    <v-skeleton-loader type="actions"></v-skeleton-loader>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
            </template>
        </suspense>
        <suspense>
            <container-people-you-may-know></container-people-you-may-know>
            <template #fallback>
                <div class="bg-white pa-5 rounded-lg border">
                    <v-skeleton-loader type="chip"></v-skeleton-loader>
                    <v-row>
                        <v-col cols="4" v-for="n in 6">
                            <v-skeleton-loader type="card"></v-skeleton-loader>
                        </v-col>
                    </v-row>
                </div>
            </template>
        </suspense>
    </div>
</template>

<script setup>


</script>

<style lang="scss" scoped>

</style>