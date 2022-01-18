import httpClient from "../axios";


const ENDPOINT = 'qa/questions/'

const getQuestions = () => httpClient.get(ENDPOINT)

const getQuestion = (questionId) => httpClient.get(ENDPOINT + questionId)

const patchQuestion = (args, questionId) => httpClient.patch(ENDPOINT + questionId, args)

export {
    getQuestions,
    getQuestion,
    patchQuestion
}
