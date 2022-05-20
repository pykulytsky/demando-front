import axios from "axios";

const httpClient = axios.create({
    baseURL: "http://localhost:8000",
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
