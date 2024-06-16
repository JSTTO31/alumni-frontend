export type SchoolBranch = {
    id: number,
    name: string,
}

export const useSchoolBrancheStore = defineStore('school-brance', () => {
    const schoolBranches : Ref<SchoolBranch[]> = ref([])

    async function getAll(){
        if(schoolBranches.value.length > 0) return
        return await useApiFetch('/api/school_branches', {
            onResponse(event){
                if(!event.response.ok) return event;

                schoolBranches.value = event.response._data
            }
        })
    }

    return {schoolBranches, getAll}
})