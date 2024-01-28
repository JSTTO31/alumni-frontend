import type { UseFetchOptions } from "nuxt/app";


export function useApiLazyFetch <T>(path: string, options: UseFetchOptions<T> = {}){
    let headers: any = {}
    const token = useCookie('XSRF-TOKEN')

    if(token.value){
        headers['X-XSRF-TOKEN'] = token.value
    }

    if(process.server){
        headers = {...headers, ...useRequestHeaders(['referer', 'cookie'])}
    }

    return useLazyFetch("http://localhost:8000" + path, {
        credentials: "include",
        watch: false,
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            ...headers, 
            ...options?.headers
        },
        ...options
    });


}