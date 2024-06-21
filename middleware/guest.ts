

export default defineNuxtRouteMiddleware((to, from) => {
    const {isLogin} = storeToRefs(useAuthStore())
    
    if(isLogin.value && process.client){
        return navigateTo({name: 'index'}, {replace: true})
    }
})