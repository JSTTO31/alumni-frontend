

export const useBatchmateStore = defineStore('batchmates', () => {
    const batchmates : Ref<UserProfile[]> = ref([])
    const options : Ref<OptionsType> = ref({} as OptionsType)

    async function getAll(email: string, ){
        return await useApiFetch(`/api/${email}/batchmates`, {
            immediate: false,
            onResponse(event){
                if(!event || !event.response.ok) return event;
                batchmates.value.push(...event.response._data.users)
                options.value = event.response._data.options
                return event
            }
        })
    }

    return {batchmates, options, getAll}
})