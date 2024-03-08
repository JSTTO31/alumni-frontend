import type { User } from "./useAuthStore";

export type Post = {
    id: number,
    user: User,
    text: string,
    comment:  Comment
    comments:  Comment[]
    privacy: 'public' | 'private' | 'connected'
    reacted: Reaction;
    views: number;
    view: boolean;
    reaction: Reaction[]
    reactions_count: number;
    comments_count: number
    created_at: string;
    updated_at: string;
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

export type Comment = {
    id: number,
    post_id: number,
    user_id: number,
    text: string,
    replies:  Reply[]
    reaction: Reaction[]
    reacted: Reaction
    replies_count: number
    created_at: string;
    updated_at: string
}

export type Reply = {
    id: number,
    comment_id: number,
    reply_from: number,
    reply_to: number,
    text: string,
    reactions_count: number
    reacted: Reaction
    created_at: string;
    updated_at: string
}

export const usePostStore = defineStore('posts', () => {
    const posts = ref([] as Post[])
    const post = ref<Post| null>(null)

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

    async function getAll(){
        try {
            const response = await useApiFetch('/api/posts')
            //@ts-ignore
            posts.value = [...posts.value, ...response.data.value || []]
            return response
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async function getById(id: number){
        try {
            const response = await useApiFetch('/api/posts/' + id)
            //@ts-ignore
            post.value = response.data.value
            return response
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async function add_comment(post_id: number, text: string){
        try {
            const response = await useApiFetch(`/api/post/${post_id}/comments`, {
                method: 'POST',
                body: {text}
            })

            const internal_post = posts.value.find((item: Post) => item.id == post_id)
            //@ts-ignore
            internal_post.comments.push(response.data.value)
            //@ts-ignore
            internal_post.comments_count += 1;

            if(post.value && post.value.id == post_id){
                //@ts-ignore
                post.value.comments.push(response.data.value)
                //@ts-ignore
                post.value.comments_count += 1;
            }
            

            return response;
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async function add_reply(comment: Comment, text: string){
        
        try {
            const response = await useApiFetch(`/api/post/${comment.post_id}/comments`, {
                method: 'post',
                body: {
                    text,
                    comment_id: comment.id 
                }
            })

            const reply : any = response.data.value
            const find_post = posts.value.find((item: Post) => item.id == comment.post_id)
            //@ts-ignore
            find_post.comments = find_post.comments.map(
                (item: Comment) => item.id == comment.id ? {...item, replies: [...item.replies, reply], replies_count: item.replies_count + 1} : item
            )

            //@ts-ignore
            find_post.comments_count += 1;


            if(post.value && post.value.id == comment.post_id){
                //@ts-ignore
                post.value.comments = post.value.comments.map(
                    (item: Comment) => item.id == comment.id ? {...item, replies: [...item.replies, reply], replies_count: item.replies_count + 1} : item
                )

                //@ts-ignore
                post.value.comments_count += 1;
            }
            
            


            return response;

        } catch (error) {
            return Promise.reject(error)
        }
    }

    async function post_reaction(id: number){
        const {user} = storeToRefs(useAuthStore())
        const find_post : any = posts.value.find((item: Post) => item.id == id)
        if(find_post.reacted){
            find_post.reacted = null
            find_post.reactions_count = find_post.reactions_count - 1
        }else{
            find_post.reactions_count = find_post.reactions_count + 1
            find_post.reacted = user.value 
        }
        

        return await toggle_reaction(id, "post")
    }

    async function comment_reaction(post_id: number, comment_id: number){
        const {user} = storeToRefs(useAuthStore())
        
        const find_post = posts.value.find((item: Post) => item.id == post_id)
        //@ts-ignore
        find_post.comments = find_post.comments.map((item: Comment) => comment_id == item.id ? item.reacted ? {...item, reacted: null, reactions_count: item.reactions_count - 1} : {...item, reacted: user.value, reactions_count: item.reactions_count + 1} : item)

        return await toggle_reaction(comment_id, "comment")
    }

    async function reply_reaction(parent_comment: Comment, reply_id: number){
        const {user} = storeToRefs(useAuthStore())
        
        const find_post : any = posts.value.find((item: Post) => item.id ==   parent_comment.post_id);
        const comment : any = find_post.comments.find((item: Comment) => item.id == parent_comment.id)
        comment.replies = comment.replies.map((item: Reply) => item.id == reply_id ? item.reacted ? {...item, reacted: null, reactions_count: item.reactions_count - 1} : {...item, reacted: user.value, reactions_count: item.reactions_count + 1} : item)

        return await toggle_reaction(reply_id, "comment")
    }

    async function toggle_reaction(id: number, type: string){
        try {
            const response = useApiFetch('/api/reaction/add', {
                method: 'post',
                body: {id, type}
            })
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async function add_view(post_id: number){
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
        store, 
        getAll, 
        add_comment,
        add_reply,
        post_reaction,
        comment_reaction,
        reply_reaction,
        add_view,
        getById
    }
})