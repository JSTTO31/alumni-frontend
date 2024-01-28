<script setup lang="ts">
const props = defineProps(['medias'])
const emits = defineEmits(['update:medias'])
const file = ref()
const showFileDialog = () => {
    file.value.click()
}
const url = ref()
const convertToUrl = (file: File) => {
    const reader = new FileReader()

    reader.onload = () => {
        url.value = reader.result
    }

    reader.readAsDataURL(file)
}

const onChange = (e: Event) => {
    //@ts-ignore
    convertToUrl(e.target.files[0])
}

onMounted(() => {
    if(props.medias){
        convertToUrl(props.medias)
    }
})

</script>
<template>
    <slot name="activator" @click="showFileDialog" v-if="false"></slot>
    <input type="file" multiple hidden @change="onChange" accept=".png,.jpeg,.jpg" formenctype="multipart/form-data" ref="file">
    <div v-if="url">
        <v-img :src="url"></v-img>
    </div>
</template>



<style scoped>

</style>