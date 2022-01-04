import httpClient from "./axios";

const ENDPOINT = 'auth/users'

const getUsers = () => httpClient.get(ENDPOINT)



const getMe = () => httpClient.get(ENDPOINT + '/me')

const refreshToken = (password, username, isEmail) => {
    if (!isEmail) {
        return httpClient.post(ENDPOINT + '/refresh/',
        {
            username,
            password
        })
    }
    else {
        return httpClient.post(ENDPOINT + '/refresh/',
        {
            email: username,
            password
        })
    }
}

const register = (username, email, password) => {
    return httpClient.post(ENDPOINT, {
        username,
        email,
        password
    })

}

const getUser = (id) => {
    return httpClient.get(ENDPOINT + '/' + id)
    .then(response => response.data)
}

export {
    getUsers,
    getMe,
    refreshToken,
    register,
    getUser
}
