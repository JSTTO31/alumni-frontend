export type DepartmentType = {
    id: number,
    name: string,
}

export const useDepartmentStore = defineStore('department', () => {
    const departments : Ref<DepartmentType[]> = ref([])

    async function getAll(){
        if(departments.value.length > 0) return
        return await useApiFetch('/api/departments', {
            onResponse(event){
                if(!event.response.ok) return event;

                departments.value = event.response._data
            }
        })
    }

    return {departments, getAll}
})