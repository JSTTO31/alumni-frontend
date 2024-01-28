<script setup>
const {post} = storeToRefs(usePostStore())
</script>

<template>
    <v-dialog width="650" :model-value="!!post" @click:outside="post = null">
        <v-card class="rounded-lg" v-if="post">
            <div class="py-3">
                <h3 class="text-center">{{ post.user.name }}'s Post</h3>
            </div>
            <v-divider></v-divider>
            {{ post }}
        </v-card>
    </v-dialog>
</template>



<style scoped>

</style>