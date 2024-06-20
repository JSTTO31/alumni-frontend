import type { User } from "next-auth";
import type { Post } from "./usePostStore";

export type OptionsType = {
    path: string,
    per_page: number,
    next_cursor: null | string,
    next_page_url: null | string,
    prev_cursor: null | string,
    prev_page_url: null | string,
    count?:number
}

export const useSearchStore  = defineStore('search', () => {
    const basic_people = ref<User[]>([])
    const people = ref<User[]>([])
    const posts = ref<Post[]>([])
    const paginated_people = ref({} as any)
    const {user} = storeToRefs(useAuthStore())

    async function getBasicPeople(search: string){
        try {
            const response = await useApiFetch(`/api/search?search=${search}&&filter=basic-people`)
            const {data} = response
            basic_people.value = data.value as User[]

            return response;    
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async function getAll(search: string){
        try {
            const response = await useApiFetch('/api/search?search=' + search)
            const {data} = response;
            //@ts-ignore
            people.value = data.value.people
            //@ts-ignore
            posts.value = data.value.posts
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async function getPaginatedPeople(query: Object){
        try {
            const response = await useApiFetch('/api/search', {
                query: {
                    filter: 'people',
                    ...query
                }
            })
            paginated_people.value = response.data
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async function getPeopleYouMayKnow(query: Object){
        if(!user.value) return
        return await useApiFetch(`/api/${user.value.email}/people-you-may-know`, { 
            query: {...query}
        })
    }

    return {getBasicPeople, getAll, getPaginatedPeople, getPeopleYouMayKnow, paginated_people, people, basic_people}
})