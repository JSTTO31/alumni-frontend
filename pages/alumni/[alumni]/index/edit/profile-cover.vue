<template>
    <v-card class="rounded-lg py-3 px-4">
        <v-form @submit.prevent="save">
            <v-card-title class="d-flex align-center">
                Edit Profile Cover
                <v-spacer></v-spacer>
                <v-btn flat icon="mdi-close" @click="$router.push({ name: 'alumni-alumni' })"></v-btn>
            </v-card-title>
            <v-card-text>
                <v-card height="350" class="d-flex align-center border justify-center bg-grey-darken-2" flat>
                    <!-- Back -->
                    <v-card flat class=" d-flex align-center w-100 justify-center pa-0 rounded-0" style="overflow: visible;filter: brightness(50%)" height="200">
                        <img :src="!!url ? url : user?.cover" :style="{transform: `translateY(${translateY}%)`}" class="w-100 ma-0" />
                    </v-card>
                    <!-- Front -->
                    <v-card style="position: absolute" flat class=" d-flex align-center w-100 justify-center pa-0 rounded-0 g bg-grey-darken-4" height="200">
                        <img :src="!!url ? url : user?.cover" :style="{transform: `translateY(${translateY}%)`}" class="w-100 ma-0" />
                    </v-card>
                </v-card>
                <div class="mt-5">
                    <v-slider class="px-0 mt-5" thumb-label v-model="$v.styles.translateY.$model"></v-slider>
                    <v-text-field v-model="$v.image.$model" @change="changeCover" type="file" variant="outlined"
                    accept="image/*"></v-text-field>
                </div>
            </v-card-text>
            <v-card-actions class="px-6">
                <v-spacer></v-spacer>
                <v-btn type="submit" class="text-capitalize px-6" color="primary" variant="flat" :loading="loading"
                :disabled="!$v.$anyDirty || !!(!user?.profile_cover && !informations.image)">Save</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
const $profile = useProfileStore()
const router = useRouter()
const loading = ref(false)
const {user} = storeToRefs(useProfileStore())
const url = ref()
const informations = reactive({
  image: null,
  styles: {
    //@ts-ignore
    translateY: user.value?.profile_cover?.data.styles.translateY || 50,
  },
});
const translateY = computed(() => (informations.styles.translateY / 50 * 100 - 100) )
const rules = {
  image: {},
  styles: {
    translateY: {},
  },
};
const $v = useVuelidate(rules, informations);

function changeCover(e: any){
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        url.value = reader.result as string;
    };
    //@ts-ignore
    informations.image = file
    reader.readAsDataURL(file);
}

async function save(){
    if (!(await $v.value.$validate())) {
        return;
    }

    loading.value = true;

    await $profile.changeCover(informations);

    loading.value = false;
    router.push({ name: "alumni-alumni" });
}
</script>

<style scoped>
.empty-background {
    background-color: #c5dee9;
    opacity: 1;
    background-image:  linear-gradient(135deg, #05668dbe 25%, transparent 25%), linear-gradient(225deg, #05668dbe 25%, transparent 25%), linear-gradient(45deg, #05668dbe 25%, transparent 25%), linear-gradient(315deg, #05668dbe 25%, #c5dee9 25%);
    background-position:  40px 0, 40px 0, 0 0, 0 0;
    background-size: 80px 80px;
    background-repeat: repeat;
}
</style>