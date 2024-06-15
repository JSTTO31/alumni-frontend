

export default defineNuxtRouteMiddleware((to, from) => {
    const {isLogin} = storeToRefs(useAuthStore())

    if(isLogin.value){
        return navigateTo({name: 'index'}, {replace: true})
    }
})