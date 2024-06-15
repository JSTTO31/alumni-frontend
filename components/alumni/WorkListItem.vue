<template>
     <div class="pa-0 d-flex mt-2 w-100" >
        <v-card variant="tonal" color="primary" class="d-flex text-h6 align-center justify-center rounded-lg" width="65" height="55">
            <v-icon size="30">mdi-briefcase-outline</v-icon>
        </v-card>
        <v-card flat class="w-100">
            <v-card-title class=" pt-0 pr-0 d-flex text-subtitle-1 d-flex font-weight-bold w-100 align-center">
                <div>
                    <span class="clickable-text" @click="gotoWebsite" v-if="work.company_website">{{ work.company_name }} <v-icon size="20">mdi-open-in-new</v-icon></span>
                    <span v-else>{{ work.company_name }}</span>
                    <div class="d-flex text-subtitle-2"> 
                        <span>{{ work.position_title }}</span>
                        <v-divider vertical class="mx-2"></v-divider>
                        <span v-if="!work.to"><v-icon>mdi-calendar</v-icon> {{ new Date(work.from).toDateString().substring(4) }} &middot; Present</span>
                        <span v-else><v-icon>mdi-calendar</v-icon> {{ new Date(work.from).toDateString().substring(4) }} &middot; {{ new Date(work.to).toDateString().substring(4) }}</span>
                    </div>
                </div>
                <v-spacer></v-spacer>
                <v-btn style="position: absolute;right: 0" icon="mdi-pencil" flat v-if="user && user.id == work.user_id" @click="$router.push({name: 'alumni-alumni-index-edit-works', query: {id: work.id}})"></v-btn>
            </v-card-title>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import type { Work } from '~/stores/useProfileStore';
const {user} = storeToRefs(useProfileStore());
const props = defineProps<{work: Work}>();
const show = ref(false)

function gotoWebsite(){
    window.open(props.work.company_website, "_blank")
}
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