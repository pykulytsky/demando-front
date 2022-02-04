import httpClient from "../axios";

const ENDPOINT = '/qa/polls/'

const getPoll = (pollId) => httpClient.get(ENDPOINT + pollId)


export {
    getPoll
}
