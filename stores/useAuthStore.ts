import { useApiFetch } from "~/composables/useApiFetch";

type User = {
    email: string;
    password: string
}

type Credential = {
    email: string;
    password: string
}

type Information = {
    email: string;
    password: string,
    password_confirmation: string;
    name: string;
    student_number: string
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const isLogin = computed(() => !!user.value)

    async function fetchUser(){
        const { data } = await useApiFetch("/api/user");
        user.value = data.value as User
    }

    async function login(credentials: Credential){
        await useApiFetch("/sanctum/csrf-cookie");

        const login = await useApiFetch("/login", {
            body: credentials,
            method: "POST",
        });

        if(login.status.value == 'success'){
            window.location.reload();
        }

       
        return login
    }


    async function register(info: Information){
        await useApiFetch("/sanctum/csrf-cookie")

        // const register = useApiFetch()
    }

    async function logout(){
        await useApiFetch("/logout", {
            method: 'POST',
        })

        window.location.reload();
    }

    return {login, fetchUser, logout, isLogin, user}
})