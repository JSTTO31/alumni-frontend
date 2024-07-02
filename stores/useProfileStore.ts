import section from "./profile/section";
import type { GeneralInformationType } from "./useAuthStore";
import { useConnectionStore } from "./useConnectionStore";


export type UserProfile = {
    id: number;
    name: string
    email: string;
    password: string;
    alumni_information: AlumniInformation,
    department: any;
    informations: {label: string, type: string, content: ''}
    about: any;
    followed_at: Date | null;
    follow_accepted_at: Date | null;
    requested_at: Date | null;
    request_accepted_at: Date | null;
    has_request_from: boolean
    is_connected: boolean
    views_count: number
    connections_count: number
    viewers: User[]
    batchmates: User[]
    personal_information?: PersonalInformation
    contact_information: ContactInformation
    works: Work[],
    work: Work,
    skills: Skill[]
    educations: Education[]
    certifications: Certification[],
    images: Image[],
    links: Link[],
    picture: string,
    cover: string,
    profile_picture?: ProfilePicture,
    profile_cover?: ProfileCover,
    verified_at: string,
    general_information: GeneralInformationType
    reactions_count: number;
    comments_count: number;
    shares_count: number;
    posts?: Post[] | null 

}

export type ProfilePicture = {
    "id": string,
    "user_id": string,
    "data": {styles: {scale: number}, selected_frame: number},
    "location": string,
    "type": string,
}

export type ProfileCover = {
    "id": string,
    "user_id": string,
    "data": {styles: {translateY: number}},
    "location": string,
    "type": string,
}

export type About = {
    "id": string,
    "user_id": string,
    "paragraph": string
}


export type Link = {
    "id": number,
    "user_id": number,
    "title": string,
    "location": string,
}

export type Image = {
    "id": string,
    "user_id": string,
    "data": {title: string},
    "location": string,
    "type": string,
}

export type Certification = {
    "id": number,
    "user_id": number,
    "name": string,
    "issuing_organization": string,
    "issue_date": string,
}

export type Education = {
    id: number,
    user_id: number,
    "attainment": string,
    "school": string,
    "field": string,
    "major": string,
    "graduated_at": string
}


export type Skill = {
    id: string,
    "name": string,
    "years": number,
    "certification": string,
    "proficiency": number,
    "pinned": boolean,
}

export type Work = {
    id: number,
    user_id: number,
    'company_name': string,
    'company_website': string,
    'position_title': string,
    'position_level': string,
    'industry': string,
    'specialization': string,
    'description': string,
    'current': boolean,
    'from': string,
    'to': string,
}

export type ContactInformation = {
    'id': string,
    'user_id': string,
    'mobile_number': string,
    'home_number': string,
    'work_number': string,
    'address': string,
    'region': string,
    'city': string,
    'postal_code': string,
    'facebook': string,
    'twitter': string,
    'linkedin': string,
}

export type PersonalInformation = {
    "id": number,
    "user_id": number,
    "first_name": string,
    "middle_name": string,
    "last_name": string,
    "nationality": string,
    "gender": string,
    "age": number,
    "civil_status": string,
    "birthday": string,
    "created_at": string,
    "updated_at": string
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

export const useProfileStore = defineStore('profile', () => {
    const $connection = useConnectionStore()
    const user = ref<null|UserProfile>(null)
    const information = ref([])
    const {user: userAuth} = storeToRefs(useAuthStore())

    // const authorize = computed(() => user.value && user.value.id == (userAuth.value?.id || -1))

    async function getProfile(email: string){
        return await useApiLazyFetch(`/api/user/${email}/profiles`, {
            onResponse(event){
                user.value = event.response._data
                return event
            }
        })
    }

    async function add_information(informations: Information[]){
        return await useApiFetch('/api/informations', {
            method: 'post',
            body: {informations},
            onResponse(event){
                user.value = event.response._data
            }
        })
    }

    async function toggleFollow(){
        if(!user.value) return

        if(user.value.followed_at){
            user.value.followed_at = null
            user.value.follow_accepted_at = null
        }else{
            user.value.followed_at = new Date()
            user.value.follow_accepted_at = new Date()
        }

        return await useApiFetch(`/api/user/${user.value.id}/follows`, {
            method: 'POST',
        })
    }

    async function requestConnection(){
        if(!user.value)return;
        user.value = {...user.value, 'requested_at': new Date()}
        user.value.followed_at = new Date()
        user.value.follow_accepted_at = new Date()
        //@ts-ignore
        await $connection.requestConnection(user.value)
    }

    async function cancelRequestConnection(){
        if(!user.value)return;
        user.value = {...user.value, 'requested_at': null}
        user.value.followed_at = null
        user.value.follow_accepted_at = null
        await $connection.cancelRequestConnection(user.value)
    }

    async function confirm(){
        if(!user.value)return;
        user.value = {...user.value, has_request_from: false, is_connected: true}
        user.value.request_accepted_at = new Date()
        user.value.followed_at = new Date()
        user.value.follow_accepted_at = new Date()
        await $connection.confirm(user.value)
    }

    async function disconnect(){
        if(!user.value)return;
        user.value = {...user.value, 'requested_at': null, 'is_connected': false}
        user.value.followed_at = null
        user.value.follow_accepted_at = null
        await $connection.disconnect(user.value)
    }

    async function addPersonalInformation(informations: any){
        return await useApiFetch("/api/personal_informations", {
            method: 'POST',
            body: {...informations},
            onResponse(event){
                if(!user.value || !event.response.ok) return event

                user.value.personal_information = event.response._data
            }
        })
    }

    async function editPersonalInformation(informations: any){
        return await useApiFetch("/api/personal_informations/" + user.value?.personal_information?.id, {
            method: 'PUT',
            body: {...informations},
            onResponse(event){
                if(!user.value || !event.response.ok) return event

                user.value.personal_information = event.response._data
            }
        })
    }

    async function addContactInformation(informations: any){
        return await useApiFetch("/api/contact_informations", {
            method: 'POST',
            body: {...informations},
            onResponse(event){
                if(!user.value || !event.response.ok) return event

                user.value.contact_information = event.response._data
            }
        })
    }

    async function editContactInformation(informations: any){
        return await useApiFetch("/api/contact_informations/" + user.value?.contact_information.id, {
            method: 'PUT',
            body: {...informations},
            onResponse(event){
                if(!user.value || !event.response.ok) return event
                user.value.contact_information = event.response._data
            }
        })
    }

    async function changeProfile(informations: any){
        const formData = new FormData();
        formData.append('image', informations.image)

        return await useApiFetch("/api/pictures", {
            method: 'POST',
            body: {...formData, styles: JSON.stringify(informations.styles), selected_frame: informations.selected_frame},
            onResponse(event){
                if(!user.value || !event.response.ok) return event
                user.value.picture = event.response._data.picture
                user.value.profile_picture = event.response._data.profile_picture
                const {user: auth} = storeToRefs(useAuthStore())
                
                if(auth.value?.id == user.value.id){
                    auth.value.picture = event.response._data.picture
                    auth.value.profile_picture = event.response._data.profile_picture
                }
            }
        })
    }

    async function changeCover(informations: any){
        const formData = new FormData();
        formData.append('image', informations.image)

        return await useApiFetch("/api/covers", {
            method: 'POST',
            body: {...formData, styles: JSON.stringify(informations.styles)},
            onResponse(event){
                if(!user.value || !event.response.ok) return event
                user.value.cover = event.response._data.cover
                user.value.profile_cover = event.response._data.profile_cover
                const {user: auth} = storeToRefs(useAuthStore())
                
                if(auth.value && auth.value.id == user.value.id){
                    auth.value.cover = event.response._data.cover
                    auth.value.profile_cover = event.response._data.profile_cover
                }
            }
        })
    }



    return {
        user, information, getProfile, add_information, toggleFollow, requestConnection, cancelRequestConnection,disconnect, confirm, addPersonalInformation, editPersonalInformation, addContactInformation, editContactInformation, ...section(user), changeProfile, changeCover
    }
})