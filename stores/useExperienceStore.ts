type Form = {
    title: string,
    position: string,
    company_name: string,
    location: string,
    is_current: boolean,
    start_month: Object,
    end_date: Object | null,
    description: string,
}

type Experience = {
    id: number;
    user_id: number
    title: string,
    position: string,
    company_name: string,
    location: string,
    is_current: boolean,
    start_month: Object,
    end_date: Object | null,
    description: string,
}

export const useExperienceStore = defineStore('experience', () => {
    const experiences = ref<Experience[] | null>([] as Experience[])

    async function getAll(){
        try {
            const response = await useApiFetch('/api/experiences')
            const {data} = response;
            experiences.value = data.value as Experience[]
            return response;
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async function store(form: Form){
        try {
            const response = useApiFetch('/api/experiences', {
                method: 'POST',
                body: form
            })
            
            experiences.value?.unshift(response.data.value as Experience)

            return response
        } catch (error) {
            return Promise.reject(error)
        }
    }

    return {store, getAll, experiences}
})