

export default defineNuxtRouteMiddleware((to, from) => {
    const {isLogin} = storeToRefs(useAuthStore())
    const {user} = storeToRefs(useAuthStore())

    if(!isLogin.value){
        return navigateTo({name: 'auth-login'}, {replace: true})
    }
})