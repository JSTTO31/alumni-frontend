import { useAuthStore } from "~/stores/useAuthStore"


export default defineNuxtPlugin(async (nuxtApp) => {
    if(process.client){
        const $auth = useAuthStore()
        await $auth.fetchUser().then((response) => {
            console.log(response);
        })
    }
    
    
    
}) 