

export default defineNuxtRouteMiddleware((to, from) => {
    const {isLogin} = storeToRefs(useAuthStore())
    if(process.server) return
    if(isLogin.value){
        return navigateTo({name: 'index'}, {replace: true})
    }
})