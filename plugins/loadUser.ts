import { useAuthStore } from "~/stores/useAuthStore"


export default defineNuxtPlugin(async (nuxtApp) => {
    const $auth = useAuthStore()
    const {isLogin}= storeToRefs(useAuthStore())
    if(!isLogin.value){
        await $auth.fetchUser()
    }
})