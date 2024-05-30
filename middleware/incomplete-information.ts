

export default defineNuxtRouteMiddleware((to, from) => {
    const {user} = storeToRefs(useAuthStore())
    
    if(process.server){
        return
    }
    
})