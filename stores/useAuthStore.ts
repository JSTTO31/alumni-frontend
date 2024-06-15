import { useApiFetch } from "~/composables/useApiFetch";
import type { ContactInformation, Image, PersonalInformation, ProfileCover, ProfilePicture } from "./useProfileStore";

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    alumni_information: AlumniInformation
    about: any;
    picture?: string;
    cover?: string
    profile_picture: ProfilePicture
    profile_cover: ProfileCover,
    verified_at: string,
    email_verified_at: string,
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

type AlumniInformation = {
    "id": number,
    "student_number": string,
    "first_name": string,
    "middle_name": string,
    "last_name": string,
    "nationality": string,
    "gender": string,
    "marital_status": string,
    "phone_number": string,
    "email": string,
    "birthday": string,
    "created_at": string,
    "updated_at": string
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const isLogin = computed(() => !!user.value)

    async function fetchUser(){
        const { data, error } = await useApiFetch("/api/user");
        if(data.value){
            user.value = data.value as User
        }
    }

    async function login(credentials: Credential){
        await useApiFetch("/sanctum/csrf-cookie");

        const login = await useApiFetch("/login", {
            body: credentials,
            method: "POST",
            immediate: false,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': useCookie('XSRF-TOKEN')
            }
        });

        return login
    }


    async function register(info: Information){
        await useApiFetch("/sanctum/csrf-cookie")

        const response = await useApiFetch('/register', {
            method: 'POST',
            body: info,
        })

        

        return response
    }

    async function logout(){
        await useApiFetch("/logout", {
            method: 'POST',
        })

        window.location.reload();
    }

    async function sendEmailVerification(){
        return await useApiFetch('/api/email/verification/send', {
            method:'post',
        })
    }

    async function verifyEmail(codes: string){
        return await useApiFetch('/api/email/verification/verify', {
            method: 'post',
            body: {
                codes,
            }
        })
    }

    return {login, fetchUser, logout, register, sendEmailVerification, verifyEmail, isLogin, user, }
})