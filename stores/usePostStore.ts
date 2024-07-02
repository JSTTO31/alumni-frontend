import type { Comment } from "./post/useCommentStore";
import type { User } from "./useAuthStore";
import type { UserProfile } from "./useProfileStore";
import type { OptionsType } from "./useSearchStore";

export type Post = {
    id: string,
    user: UserProfile,
    title: string,
    comment:  Comment
    comments:  Comment[]
    privacy: 'public' | 'private' | 'connected'
    reacted: Reaction | null;
    views: number;
    view: boolean;
    reaction: Reaction[]
    reactions_count: number;
    comments_count: number
    created_at: string;
    updated_at: string;
    data: PostText | Post
    post_saved?: PostSaved | null
    hide?: Hide | null
    report?: Report | null
    postable_type: string
    shares_count: number
}

export type PostSaved = {
    id: number,
    user_id: number;
    saveable_id: string
    saveable_type: string
}

export type Hide = {
    id: number,
    user_id: number;
    hideable_id: string
    hideable_type: string
}

export type Report = {
    id: number,
    user_id: number,
    reportable_id: string
    reportable_type: string
}



export type PostText = {
    id: number,
    content: string,
}

type Info = {
    text: string, 
    privacy: String
}

export type Reaction = {
    id: number;
    mark_id: number;
    user_id: number;
    type: string;
    created_at: string;
    updated_at: string;
}




export const usePostStore = defineStore('posts', () => {
    const posts = ref([] as Post[])
    const options : Ref<OptionsType> = ref({} as OptionsType)
    const post = ref<Post| null>(null)

    async function createPostText(informations: {title: string, privacy: string, content: string}){
        return await useApiFetch('/api/post/texts', {
            method: 'POST',
            body: informations,
            immediate: false,
            onResponse(event){
                if(!event.response.ok) return event;
                posts.value.unshift(event.response._data);
            }
        })
    }
    
    async function share(post_id: string, information: any){
        return await useApiFetch(`/api/post/${post_id}/shares`, {
            method: 'POST',
            body: information,
            immediate: false,
            onResponse(event){
                if(!event.response.ok) return event;
                posts.value.unshift(event.response._data);
            }
        })
    }

    async function store(information: Info ){
        try {
            const response = await useApiFetch('/api/posts', {
                method: 'POST',
                body: information,
                immediate: false,
            })
            
            

            return response;
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async function destroy(post_id: string){
        try {
            const response = await useApiFetch('/api/posts/' + post_id, {
                method: 'delete',
                immediate: false,
                onResponse(event){
                    if(!event.response.ok) return event;
                    posts.value = posts.value.filter(item => item.id != post_id)
                    if(post.value){
                        post.value = null
                    }
                    return event;
                }
            })
            
            

            return response;
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async function getAll(query: {}){
        return await useApiFetch('/api/posts', {
            query,
            immediate: false,
            onResponse(event){
                if(!event.response.ok) return event;
                options.value = event.response._data.options
                posts.value.push(...event.response._data.posts)
            }
        })
    }

    async function getById(id: string){
        return await useApiFetch('/api/posts/' + id, {
            onResponse(event){
                if(!event.response.ok) return
                post.value = event.response._data
                return event
            }
        })
    }

    async function save(post_id: string){
        const findPost = posts.value.find(item => item.id == post_id) || post.value;

        if(!findPost) return

        if(!findPost?.post_saved){
            return await useApiFetch(`/api/post/${post_id}/saves`, {
                method: 'POST',
                onResponse(event){
                    if(!event.response.ok) return event;
                    findPost.post_saved = event.response._data
                    return event;
                }
            })
        }else{
            return await useApiFetch(`/api/post/${post_id}/saves/` + findPost.post_saved.id, {
                method: 'DELETE',
                onResponse(event){
                    if(!event.response.ok) return event;
                    findPost.post_saved = null
                    return event;
                }
            })
        }
    }

    async function hide(post_id: string){
        const findPost = posts.value.find(item => item.id == post_id);

        if(!findPost?.hide){
            return await useApiFetch(`/api/post/${post_id}/hides`, {
                method: 'POST',
                onResponse(event){
                    if(!event.response.ok) return event;
                    const findPost = posts.value.find(item => item.id == post_id);
    
                    if(findPost){
                        findPost.hide = event.response._data
                    }
            
                    return event;
                }
            })
        }else{
            return await useApiFetch(`/api/post/${post_id}/hides/` + findPost.hide.id, {
                method: 'DELETE',
                onResponse(event){
                    if(!event.response.ok) return event;
                    const findPost = posts.value.find(item => item.id == post_id);
    
                    if(findPost){
                        findPost.hide = null
                    }
            
                    return event;
                }
            })
        }
    }

    async function report(post_id: string, information: any){
        return await useApiFetch(`/api/post/${post_id}/reports`, {
            method: 'post',
            immediate: false,
            body: information,
            onResponse(event){
                if(!event.response.ok) return event;
                const findPost = posts.value.find(item => item.id == post_id);

                if(findPost){
                    findPost.report = event.response._data
                }
        
                return event;
            }
        })
    }

    async function post_reaction(id: string){
        const find_post : Post = posts.value.find((item: Post) => item.id == id) as Post || post.value

        if(find_post.reacted && find_post){
            const reaction_id = find_post.reacted.id
    
            return await useApiFetch(`/api/post/${id}/reactions/${reaction_id}`, {
                method: 'delete',
                onResponse(event){
                    if(!event.response.ok) return event;
                    const exists = posts.value.find(item => item.id == id)

                    if(find_post){
                        find_post.reactions_count -=  1
                        find_post.reacted = null;
                    }

                    if(exists && post.value){
                        post.value.reactions_count -=  1
                        post.value.reacted = null;
                    }

                    return event
                }
            })
        }else{
            return await useApiFetch(`/api/post/${id}/reactions`, {
                method: 'post',
                body: {type: 'heart'},
                onResponse(event){
                    if(!event.response.ok) return event;
                    const exists = posts.value.find(item => item.id == id)

                    if(find_post){
                        find_post.reactions_count +=  1
                        find_post.reacted = event.response._data
                    }

                    if(exists && post.value){
                        post.value.reactions_count +=  1
                        post.value.reacted = event.response._data
                    }


                    return event
                }
            })
        }
    
        
    }

    async function add_view(post_id: string){
        const current_post = posts.value.find((item: Post) => item.id == post_id)
        
        if(current_post?.view){
            return
        }
        
        //@ts-ignore
        current_post.view = true
        try {
            const response = await useApiFetch(`/api/post/${post_id}/views`, {
                method: 'POST'
            })

            return response
        } catch (error) {
            return Promise.reject(error)
        }
    }

    return {
        posts, 
        post, 
        options,
        store, 
        getAll, 
        post_reaction,
        add_view,
        getById,
        createPostText, 
        save,
        hide,
        report,
        share,
        destroy
    }
})