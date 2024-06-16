

export default defineNuxtRouteMiddleware((to, from) => {
    const {isLogin} = storeToRefs(useAuthStore())
    const {user} = storeToRefs(useAuthStore())
    if(process.server) return
    if(!isLogin.value){
        return navigateTo({name: 'auth-login'}, {replace: true})
    }
})