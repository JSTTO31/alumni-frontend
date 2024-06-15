

export default defineNuxtRouteMiddleware((to, from) => {
    const {user} = storeToRefs(useProfileStore())
    const {user:auth} = storeToRefs(useAuthStore())

    if(user.value?.id != auth.value?.id){
        return navigateTo('/')
    }

    if(user.value?.id == auth.value?.id && !auth.value?.verified_at){
        
    }  
})