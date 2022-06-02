import httpClient from "../axios";


const ENDPOINT = 'qa/questions/'

const getQuestions = () => httpClient.get(ENDPOINT)

const getQuestion = (questionId) => httpClient.get(ENDPOINT + questionId)

const createQuestion = (eventId, body) => httpClient.post(
    ENDPOINT,
    {
        event: eventId,
        body
    }
)

const patchQuestion = (args, questionId) => httpClient.patch(ENDPOINT + questionId, args)

const deleteQuestion = (questionId) => httpClient.delete(ENDPOINT + questionId)

const likeQuestion = (questionId) => httpClient.patch(ENDPOINT + questionId + '/like/' )

export {
    getQuestions,
    getQuestion,
    patchQuestion,
    createQuestion,
    deleteQuestion,
    likeQuestion
}
