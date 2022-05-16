import httpClient from "../axios";

const ENDPOINT = '/qa/polls/'

const getPoll = (pollId) => {
    return httpClient.get(ENDPOINT + pollId)
    .then(response => {
        return response.data
    })
}

const getPolls = () => httpClient.get(ENDPOINT)

export {
    getPoll,
    getPolls
}
