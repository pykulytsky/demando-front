import axios from "axios";
import router from "../router/index";

const httpClient = axios.create({
    baseURL: "https://demando-backend.onrender.com",
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

httpClient.interceptors.response.use((response) => response, (error) => {
    try {
        if(error.response.status > 499 && error.response.status < 600 ) {
         router.push("/505")
        }
    } catch {
        router.push("/505")
    }
    return Promise.reject(error);
})


export default httpClient;
