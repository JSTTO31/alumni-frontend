
export type Post = {
    id: number,
    user: {},
    text: string,
    comment:  Comment
    comments:  Comment[]
    privacy: 'public' | 'private' | 'connected'
    created_at: string;
    updated_at: string
}

type Info = {
    text: string, 
    privacy: 'public' | 'private' | 'connected'
}

export type Comment = {
    id: number,
    post_id: number,
    user_id: number,
    text: string,
    created_at: string;
    updated_at: string
}

export const usePostStore = defineStore('posts', () => {
    const posts = ref()
    const post = ref()

    async function store(information: Info ){
        try {
            const response = await useApiFetch('/api/posts', {
                method: 'POST',
                body: information
            })

            posts.value.push(response.data.value)

            return response;
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async function getAll(){
        try {
            const response = await useApiFetch('/api/posts')
            posts.value = response.data.value
            return response
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async function add_comment(post: Post, text: string){
        try {
            const response = await useApiFetch(`/api/post/${post.id}/comments`, {
                method: 'POST',
                body: {text}
            })

            const internal_post = posts.value.find((item: Post) => item.id == post.id)

            internal_post.comments.push(response.data.value)

            return response;
        } catch (error) {
            return Promise.reject(error)
        }
    }


    return {posts, post, store, getAll, add_comment}
})