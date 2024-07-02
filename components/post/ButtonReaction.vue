<template>
    <v-btn :loading="loading" flat class="text-capitalize mr-3" variant="text" color="#1f6e8c"
        prepend-icon="mdi-heart" @click.stop="toggleReaction" v-if="post.reacted">
        Heart
        <v-chip size="small" class="ml-5" v-if="post.reactions_count > 0">{{ post.reactions_count }}
        </v-chip>
    </v-btn>
    <v-btn :loading="loading" flat class="text-capitalize mr-3" variant="text" prepend-icon="mdi-heart-outline"
        @click.stop="toggleReaction" v-else>
        Heart <v-chip size="small" class="ml-5" v-if="post.reactions_count > 0">{{ post.reactions_count }}
        </v-chip>
    </v-btn>
</template>

<script setup lang="ts">
const props = defineProps<{post: Post}>()
const $post = usePostStore()
const loading = ref(false);

async function toggleReaction(){
    loading.value = true
    await $post.post_reaction(props.post.id)
    loading.value = false

}
</script>

<style scoped>

</style>