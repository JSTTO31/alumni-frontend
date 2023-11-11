

export default defineNuxtRouteMiddleware((to, from) => {
    const $auth = useAuthStore()

    if($auth.isLogin){
        return navigateTo({name: 'index'}, {replace: true})
    }
})