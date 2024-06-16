<template>
    <v-hover v-slot="{props, isHovering}">
        <v-card v-bind="props" rounded color="primary" class="d-flex flex-column mt-2 rounded-lg"  flat variant="tonal" height="155" >
            <div class="h-100 w-100 d-flex align-center justify-center">
                <v-icon size="55">mdi-link-variant</v-icon>
            </div>
            <div class="bg-grey pa-2">
                {{ link.title }}
            </div>
            <v-overlay contained class="d-flex align-center justify-center" :model-value="!!isHovering">
                <div class="d-flex" style="gap: 5px">
                    <v-btn class="text-white" variant="outlined" @click.stop="$router.push({name: 'alumni-alumni-index-authorize-edit-links', query: {id: link.id}})" v-if="user?.id == auth?.id" rounded>Edit</v-btn>
                    <v-btn class="text-white" variant="outlined" @click.stop="gotoLink" rounded>View</v-btn>
                </div>
            </v-overlay>
        </v-card>
    </v-hover>
</template>

<script setup lang="ts">
const props = defineProps(['link'])
const {user:auth} = storeToRefs(useAuthStore())
const {user} = storeToRefs(useProfileStore())
function gotoLink(){
    window.open(props.link.location, "_blank")
}
</script>

<style scoped>

</style>