import { useAuthStore } from "~/stores/useAuthStore"


export default defineNuxtPlugin({
    name: 'load-user',
    enforce: 'post',
    async setup(NuxtApp){
        const $auth = useAuthStore()
        await $auth.fetchUser()
    }
})