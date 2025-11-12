import axios from "axios";

axios.defaults.baseURL= 'https://max-11-management.test/api'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Accept'] = 'application/json'

axios.interceptors.request.use(
    config => {
        console.log(`[Axios] Requesting: ${config.url}`)
        return config
    },
    error => Promise.reject(error)
)

export const axiosInstance = axios