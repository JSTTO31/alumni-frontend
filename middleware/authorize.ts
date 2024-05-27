

export default defineNuxtRouteMiddleware((to, from) => {
    const {isLogin} = useAuthStore()
    
    if(process.server){
        return
    }
    
    if(!isLogin){
        return navigateTo({name: 'welcome'}, {replace: true})
    }
})