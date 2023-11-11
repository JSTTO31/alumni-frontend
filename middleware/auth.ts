

export default defineNuxtRouteMiddleware((to, from) => {
    const {isLogin} = useAuthStore()
    
    if(!isLogin){
        return navigateTo({name: 'welcome'}, {replace: true})
    }
})