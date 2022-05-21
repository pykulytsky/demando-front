import httpClient from "../axios";

const ENDPOINT = "quiz/anon_users/";


const getAnonUsers = () => httpClient.get(ENDPOINT)


export {
    getAnonUsers
}
