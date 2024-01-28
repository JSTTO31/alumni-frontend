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
    viewers_count: number
    connections_count: number
    viewers: User[]
    batchmates: User[]
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
    const loading = ref(false)

    const authorize = computed(() => user.value && user.value.id == (userAuth.value?.id || -1))

    async function editAbout(paragraph: string){
        return await useApiFetch('/api/title-paragraphs', {
            method: 'POST',
            body: {paragraph, type: 'about', title: 'about'},
            onResponse(event){
                //@ts-ignore
                user.value.about = event.response._data
            }
        }) 
    }

    async function getProfile(email: string){
        loading.value = true
        return await useApiLazyFetch(`/api/user/${email}/profiles`, {
            onResponse: event => (user.value = event.response._data, loading.value = false)
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


    return {user, information, editAbout, getProfile, add_information, toggleFollow, requestConnection, cancelRequestConnection,disconnect, confirm,authorize, loading}
})