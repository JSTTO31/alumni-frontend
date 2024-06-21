import type { UseFetchOptions } from "nuxt/app";


export function useApiFetch <T>(path: string, options: UseFetchOptions<T> = {}){
    let headers: any = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
    const token = useCookie('XSRF-TOKEN')
    const $notification = useNotificationStore()

    if(token.value){
        headers['X-XSRF-TOKEN'] = token.value
    }

    if(process.server){
        headers = {...headers, ...useRequestHeaders(['referer', 'cookie'])}
    }

    return useFetch("http://localhost:8000" + path, {
        credentials: "include",
        watch: false,
        headers: {
            ...headers, 
            ...options?.headers
        },
        ...options,
        onRequestError(event){
            return event;
        },
        onResponseError(event){
            if(event.response.status == 401){
                $notification.addNotification({
                    "id": 6,
                    "title": "Unauthorized Access",
                    "message": "You don't have permission to access this page. Please check if you are logged in with the correct credentials. If the issue persists, contact support. We apologize for the inconvenience.",
                    "type": "error"
                })
            }

            if(event.response.status == 500){
                $notification.addNotification({
                    "title": "Internal Server Error",
                    "message": "Something went wrong on our end. Please try refreshing the page or come back later. If the issue persists, contact support. We apologize for the inconvenience.",
                    "type": "error"
                })
            }

            if(event.response.status == 429){
                $notification.addNotification({
                    "title": "Too Many Request",
                    "message": " You have made too many requests in a short period of time. To ensure fair usage and server stability, please wait a while before trying again. We appreciate your understanding and patience.",
                    "type": "error"
                })
            }

            if(event.response.status == 429){
                $notification.addNotification({
                    "title": "Too Many Request",
                    "message": " You have made too many requests in a short period of time. To ensure fair usage and server stability, please wait a while before trying again. We appreciate your understanding and patience.",
                    "type": "error"
                })
            }



           


            return event
        }
    });


}