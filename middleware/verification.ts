

export default defineNuxtRouteMiddleware((to, from) => {
    const {user} = storeToRefs(useProfileStore())
    const {user:auth} = storeToRefs(useAuthStore())
    if(process.server) return
    if(!auth.value){
        return navigateTo('/auth/login')
    }

    if(user.value?.id != auth.value?.id){
        if(!from.params.alumni) return navigateTo('/')
        //@ts-ignore
        return navigateTo({name: 'alumni-alumni', params: {alumni: from.params.alumni}})
    }

    if(!auth.value.email_verified_at && to.name == 'alumni-alumni-verification-alumni'){
        return navigateTo({name: 'alumni-alumni-verification-email'});
    }  
})