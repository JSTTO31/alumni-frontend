import type { Hide, Report } from "../usePostStore"
import type { OptionsType } from "../useSearchStore"

export type Comment = {
    id: number,
    user:User,
    post_id: string,
    user_id: number,
    text: string,
    replies:  Reply[]
    reaction: Reaction[]
    reacted?: Reaction | null
    reactions_count: number,
    replies_count: number
    hide?: Hide | null,
    report?: Report | null
    options?: OptionsType | null
    created_at: string;
    updated_at: string
}

export type Reply = {
    id: number,
    user:User,
    comment_id: number,
    reply_from: number,
    reply_to: number,
    text: string,
    reactions_count: number
    reacted?: Reaction | null
    report?: Report | null,
    hide?: Hide | null
    created_at: string;
    updated_at: string
}


export const useCommentStore = defineStore('post-comment', () => {
    const comments : Ref<Comment[]> = ref([])
    const options : Ref<OptionsType> = ref({} as OptionsType)
    const {post} = storeToRefs(usePostStore())

    async function create(text: string){
        if(!post.value) return

        return await useApiFetch(`/api/post/${post.value.id}/comments`, {
            method: 'POST',
            body: {text},
            immediate: false,
            onResponse(event){
                if(!event.response.ok) return event;
                
                comments.value.unshift(event.response._data)

                if(post.value){
                    post.value.comments_count += 1;
                }

                return event
    
            }
        })
    }

    async function destroy(comment_id: number){
        return await useApiFetch(`/api/post/${post.value?.id}/comments/` + comment_id, {
            method: 'DELETE',
            immediate: false,
            onResponse(event){
                if(!event.response.ok) return event;
                comments.value = comments.value.filter(item => item.id != comment_id);
                return event
    
            }
        })
    }

    async function reaction(comment_id: number){
        const find_comment = comments.value.find(item => item.id == comment_id);
        if(find_comment){
        
            if(!find_comment.reacted){
                return await useApiFetch(`/api/comment/${comment_id}/reactions`, {
                    method: 'post',
                    body: {type: 'heart'},
                    onResponse(event){
                        find_comment.reacted = event.response._data
                        find_comment.reactions_count += 1
                        return event;
                    }
                })
            }else{
                return await useApiFetch(`/api/comment/${comment_id}/reactions/` + find_comment.reacted.id, {
                    method: 'delete',
                    onResponse(event){
                        find_comment.reacted = null
                        find_comment.reactions_count -= 1

                        return event;
                    }
                })
            }
        }
    }

    async function getAll(query = {}){
        return useApiFetch(`/api/post/${post.value?.id}/comments`, {
            immediate: false,
            query,
            onResponse(event){
                if(!event.response.ok) return event;
                comments.value.push(...event.response._data.comments)
                options.value = event.response._data.options as OptionsType
                return event
            }
        })
    }

    async function getAllReplies(comment_id: number){

        return useApiFetch(`/api/comment/${comment_id}/replies`, {
            immediate: false,
            onResponse(event){
                if(!event.response.ok) return event;
                const find_comment = comments.value.find(item => item.id == comment_id);

                if(find_comment){
                    find_comment.options = event.response._data.options;
                    find_comment.replies.push(...event.response._data.replies)
                }

                return event
            }
        })
    }

    async function hide(comment_id: number){
        if(post.value){
            const find_comment = comments.value.find(item => item.id == comment_id);
            if(find_comment){
                if(!find_comment.hide){
                    return await useApiFetch(`/api/comment/${comment_id}/hides`, {
                        method: 'post',
                        onResponse(event){
                            find_comment.hide = event.response._data
                            return event;
                        }
                    })
                }else{
                    return await useApiFetch(`/api/comment/${comment_id}/hides/` + find_comment.hide.id, {
                        method: 'delete',
                        onResponse(event){
                            find_comment.hide = null 

                            return event;
                        }
                    })
                }
            }
        }
    }

    async function report(comment_id: number, information: any){
        return await useApiFetch(`/api/comment/${comment_id}/reports`, {
            method: 'POST',
            body: information,
            immediate: false,
            onResponse(event){
                if(!event.response.ok) return event;
                const findComment = comments.value.find(item => item.id == comment_id)
                if(findComment){
                    findComment.report = event.response._data

                }
                return event;
            }
        })
    }

    async function reply_reaction(comment_id: number, reply_id: number){
        const find_comment = comments.value.find(item => item.id == comment_id);
        if(!find_comment) return
        const find_reply = find_comment.replies.find(item => item.id == reply_id);
        if(!find_reply) return

        if(!find_reply.reacted){
            return await useApiFetch(`/api/comment/${reply_id}/reactions`, {
                method: 'post',
                body: {type: 'heart'},
                onResponse(event){
                    find_reply.reacted = event.response._data
                    find_reply.reactions_count += 1
                    return event;
                }
            })
        }else{
            return await useApiFetch(`/api/comment/${comment_id}/reactions/` + find_reply.reacted.id, {
                method: 'delete',
                onResponse(event){
                    find_reply.reacted = null
                    find_reply.reactions_count -= 1

                    return event;
                }
            })
        }
    }

    async function reply_report(comment_id: number, reply_id: number, information: any){
        return await useApiFetch(`/api/comment/${reply_id}/reports`, {
            method: 'POST',
            body: information,
            immediate: false,
            onResponse(event){
                if(!event.response.ok) return event;
                const find_comment = comments.value.find(item => item.id == comment_id);
                if(!find_comment) return event
                const find_reply = find_comment.replies.find(item => item.id == reply_id);
                if(!find_reply) return event
                find_reply.report = event.response._data
                return event;
            }
        })
    }

    async function reply_hide(comment_id: number, reply_id: number){
        const find_comment = comments.value.find(item => item.id == comment_id);
        if(!find_comment) return
        const find_reply = find_comment.replies.find(item => item.id == reply_id);
        if(!find_reply) return

        if(!find_reply.hide){
            return await useApiFetch(`/api/comment/${comment_id}/hides`, {
                method: 'post',
                onResponse(event){
                    find_reply.hide = event.response._data
                    return event;
                }
            })
        }else{
            return await useApiFetch(`/api/comment/${comment_id}/hides/` + find_reply.hide.id, {
                method: 'delete',
                onResponse(event){
                    find_reply.hide = null 

                    return event;
                }
            })
        }
    }

    async function reply_create(comment_id: number, text: string){
        return await useApiFetch(`/api/comment/${comment_id}/replies`, {
            method: 'POST',
            body: {text},
            onResponse(event){
                if(!event.response.ok) return event;
                const find_comment = comments.value.find(item => item.id == comment_id);

                if(find_comment){
                    find_comment.replies.unshift(event.response._data)
                    find_comment.replies_count += 1;
                }

                return event
            }
        })
    }

    async function reply_destroy(comment_id: number, reply_id: number){
        return await useApiFetch(`/api/comment/${comment_id}/replies/` + reply_id, {
            method: 'DELETE',
            immediate: false,
            onResponse(event){
                if(!event.response.ok) return event;
                const findComment = comments.value.find(item => item.id == comment_id);
                if(findComment){
                    findComment.replies = findComment.replies.filter(item => item.id != reply_id);
                    findComment.replies_count -= 1
                }
                return event
    
            }
        })
    }
    
    return {comments, options, create, reaction, getAll, hide, report, reply_reaction, reply_report, reply_hide, getAllReplies, reply_create, destroy, reply_destroy}
})