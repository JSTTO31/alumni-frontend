

export default defineNuxtRouteMiddleware((to, from) => {
    const {user} = storeToRefs(useProfileStore())
    const {user:auth} = storeToRefs(useAuthStore())
    if(process.server) return
    if(user.value?.id != auth.value?.id){
        if(!from.params.alumni) return navigateTo('/')
        //@ts-ignore
        return navigateTo({name: 'alumni-alumni', params: {alumni: from.params.alumni}})
    }
})