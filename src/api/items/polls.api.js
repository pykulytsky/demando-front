import httpClient from "../axios";

const ENDPOINT = '/qa/polls/'

const getPoll = (pollId) => {
    return httpClient.get(ENDPOINT + pollId)
    .then(response => {
        return response.data
    })
}

const getPolls = () => httpClient.get(ENDPOINT)

const createPoll = (name, timeLimit, allowedVotes) => {
    let data = {
        name
    }
    if(timeLimit) {
        data = Object.assign(data, {
            limited_time: true,
            time_to_vote: timeLimit
        })
    }
    if(allowedVotes > 1) {
        data = Object.assign(data, {
            multiply_votes: true,
            allowed_votes: allowedVotes,
        })
    }
    console.log(data)
    return httpClient.post(ENDPOINT, data)
}

const createOption = (name, pollPK) => httpClient.post("/qa/options/", {
    name,
    poll: pollPK
})

export {
    getPoll,
    getPolls,
    createPoll,
    createOption
}
