<template>
    <div class="d-flex w-100 ">
       <div class="px-5 w-100">
           <PostCommentCard v-for="comment in comments" :key="comment.id" :comment="comment">
           </PostCommentCard>
           <div class="d-flex" v-if="status != 'idle' && options.next_cursor">
                <v-btn @click="execute" class="rounded-lg mx-auto" variant="outlined" color="primary" :loading="pending">See more comments</v-btn>
            </div>
            <div v-if="status != 'idle' && !options.next_cursor">
                <h4 class=" text-grey-darken-3 text-center mt-15">No more comment</h4>
            </div>
       </div>
   </div>
</template>

<script setup lang="ts">
const $comment = useCommentStore()
const {post} = storeToRefs(usePostStore())
const {comments, options} = storeToRefs(useCommentStore())
const {execute, pending, status} = await $comment.getAll({cursor: computed(() => options.value.next_cursor)})


comments.value = []
options.value = {} as OptionsType


await execute().then((response) => {
    comments.value.unshift(...(post.value?.comments || []))
    
    return response
})





</script>

<style scoped>

</style>