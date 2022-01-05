import axios from "axios";


const httpClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

const getAuthToken = () => {
    let token =  localStorage.getItem('token')
    if (token) {
        token = 'Bearer ' + token
    }

    return token
}

httpClient.interceptors.request.use(config => {
    config.headers['Authorization'] = getAuthToken()
    return config
})

export default httpClient;
