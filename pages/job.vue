<template>
    <NuxtPage></NuxtPage>
</template>

<script setup>
definePageMeta({
    middleware: ['auth'],
    layout: 'authenticated'
})
</script>

<style lang="scss" scoped>

</style>