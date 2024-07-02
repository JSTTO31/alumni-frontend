import type { UserProfile } from "./useProfileStore";
import type { OptionsType } from "./useSearchStore";





export const useConnectionStore = defineStore('connection', () => {
    const connections : Ref<UserProfile[]> = ref([])
    const connections_options : Ref<OptionsType> = ref({} as OptionsType)
    const request_connections : Ref<UserProfile[]> = ref([])
    const request_connections_options : Ref<OptionsType> = ref({} as OptionsType)
    const {people} = storeToRefs(usePeopleStore())

    async function requestConnection(user: UserProfile){
        return await useApiFetch(`/api/user/${user.id}/connections/request`, {
            method: 'POST',
            onResponse(event){
                if(!event || !event.response.ok) return
                people.value = people.value.map(item => 
                    item.id == user.id ? ({...item, follow_accepted_at: new Date(), followed_at: new Date(), requested_at: new Date()}) : item
                ) 

                return event
            }   
        })
    }

    async function cancelRequestConnection(user: UserProfile){
        return await useApiFetch(`/api/user/${user.id}/connections/cancel`, {
            method: 'POST',
            onResponse(event){
                if(!event || !event.response.ok) return
                people.value = people.value.map(item => 
                    item.id == user.id ? ({...item, follow_accepted_at: null, followed_at: null, requested_at: null}) : item
                ) 

                return event
            }   
        })
    }

    async function confirm(user: UserProfile){
        return await useApiFetch(`/api/user/${user.id}/connections/confirm`, {
            method: 'POST',
            onResponse(event){
                if(!event || !event.response.ok) return
                people.value = people.value.map(item => 
                    item.id == user.id ? ({...item, request_accepted_at: new Date(), has_request_from: false, is_connected: true, follow_accepted_at: new Date(), followed_at: new Date()}) : item
                ) 
                request_connections.value = request_connections.value.map(item => 
                    item.id == user.id ? ({...item, request_accepted_at: new Date(), has_request_from: false, is_connected: true, follow_accepted_at: new Date(), followed_at: new Date()}) : item
                ) 
                

                return event
            }   
        })
    }

    async function disconnect(user: UserProfile){
        user = {...user, 'requested_at': null, 'is_connected': false}
        user.followed_at = null
        user.follow_accepted_at = null
        return await useApiFetch(`/api/user/${user.id}/connections/disconnect`, {
            method: 'POST',
            onResponse(event){
                if(!event || !event.response.ok) return

                people.value = people.value.map(item => 
                    item.id == user.id ? ({...item, follow_accepted_at: null, followed_at: null, requested_at: null, request_accepted_at: null}) : item
                ) 

                return event
            }   
        })
    }

    async function getConnected(email: string, query = {}){
        return await useApiFetch(`/api/${email}/connections`, {
            query,
            immediate: false,
            onResponse(event){
                if(!event || !event.response.ok) return
                connections.value.push(...event.response._data.users)
                connections_options.value = event.response._data.options
            }
        })
    }

    async function getRequestConnections(query = {}) {
        return await useApiFetch(`/api/connection-requests`, {
            query,
            immediate: false,
            onResponse(event){
                if(!event || !event.response.ok) return
                request_connections.value.push(...event.response._data.users)
                request_connections_options.value = event.response._data.options
            }
        })
    }

    async function personRemove(user: UserProfile){
        return await useApiFetch(`/api/${user.email}/removes`, {
            method: 'delete',
            async onResponse(event){
                people.value = people.value.filter(item => item.id != user.id)
                request_connections.value = request_connections.value.filter(item => item.id != user.id)
                return event
            }
        })
    }
    


    return {request_connections, request_connections_options, connections,
        connections_options, requestConnection, cancelRequestConnection, confirm, disconnect, getConnected, getRequestConnections, personRemove}
})