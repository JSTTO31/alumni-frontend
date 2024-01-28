import type { UserProfile } from "./useProfileStore";





export const useConnectionStore = defineStore('connection', () => {

    const actions_default = {
        onRequest(){},
        onResponse(){},
        onResponseError(){},
        onRequestError(){},
    }

    
    async function requestConnection(user: UserProfile, actions = {...actions_default}){
        await useApiFetch(`/api/user/${user.id}/connections/request`, {method: 'POST', ...actions})
    }

    async function cancelRequestConnection(user: UserProfile, actions = {...actions_default}){
        await useApiFetch(`/api/user/${user.id}/connections/cancel`, {method: 'POST', ...actions})
    }

    async function confirm(user: UserProfile, actions = {...actions_default}){
        await useApiFetch(`/api/user/${user.id}/connections/confirm`, {method: 'POST', ...actions,})
    }

    async function disconnect(user: UserProfile, actions = {...actions_default}){
        user = {...user, 'requested_at': null, 'is_connected': false}
        user.followed_at = null
        user.follow_accepted_at = null
        await useApiFetch(`/api/user/${user.id}/connections/disconnect`, {method: 'POST', ...actions})
    }

    async function getConnected(email: string, query = {}, actions = {...actions_default}){
        return await useApiFetch(`/api/${email}/connections`, {query, ...actions})
    }

    async function getRequestConnections(user: UserProfile, query = {}, actions = {...actions_default}) {
        return await useApiFetch(`/api/${user.email}/connection-requests`, {query, ...actions})
    }
    


    return {requestConnection, cancelRequestConnection, confirm, disconnect, getConnected, getRequestConnections}
})