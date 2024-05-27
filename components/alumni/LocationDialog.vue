<template>
    <v-overlay class="d-flex align-start pt-15 justify-center" transition="slide-y-transition" :model-value="show"
        @click:outside="emits('update:show')" width="750">
        <v-card class="pa-3 rounded-lg mb-5 border" flat>
            <v-card-title class="font-weight-medium px-6 d-flex py-0 align-center">
                Location
                <v-spacer></v-spacer>
                <v-btn icon="mdi-close" flat @click="emits('update:show', false)"></v-btn>
            </v-card-title>
            <v-divider class="mx-6"></v-divider>
            <v-card-text>
                <div style="width:100%;list-style:none; transition: none;overflow:hidden;width:100%;height:500px;">
                    <div id="g-mapdisplay" style="height:100%; width:100%;"><iframe
                            style="height:100%;width:100%;border:0;" frameborder="0"
                            src="https://www.google.com/maps/embed/v1/place?q=malabon&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
                    </div><a class="embed-ded-maphtml" rel="nofollow" href="https://www.bootstrapskins.com/themes"
                        id="enable-maps-data">premium bootstrap themes</a>
                </div>
            </v-card-text>
        </v-card>
    </v-overlay>
</template>

<script setup>
const props = defineProps(['show'])
const emits = defineEmits(['update:show'])
const { user } = storeToRefs(useProfileStore())
</script>

<style scoped>
 #g-mapdisplay img {
    max-width: 100%;
    background: none !important;
    font-size: inherit;
    font-weight: inherit;
}
</style>