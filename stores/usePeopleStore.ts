import type { UserProfile } from "./useProfileStore"
import type { OptionsType } from "./useSearchStore"


export const usePeopleStore = defineStore('people', () => {
    const people : Ref<UserProfile[]> = ref([])
    const options : Ref<OptionsType> = ref({} as OptionsType)

    async function getAll(body = {}){
        return await useApiFetch('/api/people-you-may-know', {
            immediate: false,
            onResponse(event){
                if(!event || !event.response.ok) return event;
                people.value.push(...event.response._data.users)
                options.value = event.response._data.options
                return event
            }
        })
    }

    return {people, options, getAll}
})