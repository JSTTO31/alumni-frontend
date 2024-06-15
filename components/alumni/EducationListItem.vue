<template>
     <div class="pa-0 d-flex mt-2 w-100" >
        <v-card variant="tonal" color="primaryVariant" class="d-flex text-h6 align-center justify-center rounded-circle" width="65" height="55">
            <v-icon size="30">mdi-school</v-icon>
        </v-card>
        <v-card flat class="w-100">
            <v-card-title class="text-subtitle-1 font-weight-bold pt-0 pr-0 d-flex w-100 align-center">
                <div>
                    <span>{{ education.school }}</span>
                    <div class="d-flex text-subtitle-2"> 
                        <span>{{ education.attainment }}</span>
                        <v-divider vertical class="mx-2"></v-divider>
                        <span><v-icon>mdi-calendar</v-icon> {{ new Date(education.graduated_at).toDateString().substring(4) }}</span>
                    </div>
                </div>
                <v-btn style="position: absolute;right: 0" icon="mdi-pencil" flat v-if="user && user.id == education.user_id" @click="$router.push({name: 'alumni-alumni-index-edit-educations', query: {id: education.id}})"></v-btn>
            </v-card-title>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import type { Education } from '~/stores/useProfileStore';
const {user} = storeToRefs(useAuthStore())
const props = defineProps<{education: Education}>();
const show = ref(false)


</script>

<style scoped>
.clickable-text:hover{
    color: #05668D;
    cursor: pointer;
}


.slide-y-enter-active,
.slide-y-leave-active {
  transition: all 0.26s;
}
.slide-y-enter-from,
.slide-y-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>