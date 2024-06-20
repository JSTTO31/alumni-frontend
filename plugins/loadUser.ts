import { useAuthStore } from "~/stores/useAuthStore"


export default defineNuxtPlugin((nuxtApp) => {
    const $auth = useAuthStore()
    $auth.fetchUser()          
}) 