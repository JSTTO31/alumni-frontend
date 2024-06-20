import { useApiFetch } from "~/composables/useApiFetch";
import type {ProfileCover, ProfilePicture } from "./useProfileStore";

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
    general_information?: GeneralInformationType,
    views_count: number
}

export type GeneralInformationType = {
    id: number,
    'department': string,
    'school_branches': string,
    'student_number': string,
    'graduation_year': string,
    branch_name?: string,
    department_name?: string,
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
    const {user: userProfile} = storeToRefs(useProfileStore())
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
            immediate: false
        })
    }

    async function verifyEmail(codes: string){
        return await useApiFetch('/api/email/verification/verify', {
            method: 'post',
            immediate: false,
            body: {
                codes,
            },
            onResponse(event){
                if(!event.response.ok || !user.value) return;
                user.value.email_verified_at = new Date().toString()
            }
        })
    }

    async function submitGeneralInformation(informations: {student_number: string, department: string | null, school_branch: string | null, graduation_year: string}){
        return await useApiFetch('/api/general-informations', {
            method: 'POST',
            immediate: false,
            body: informations,
            onResponse(event){
                if(!event.response.ok || !user.value) return;
                user.value.general_information = event.response._data
                user.value.verified_at = new Date().toString()
                if(userProfile.value && user.value.id == userProfile.value.id){
                    userProfile.value.verified_at = new Date().toString()
                    userProfile.value.general_information = event.response._data
                }
            }
        })
    }

    return {login, fetchUser, logout, register, sendEmailVerification, verifyEmail, submitGeneralInformation, isLogin, user, }
})