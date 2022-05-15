import httpClient from "../axios";

const ENDPOINT = "quiz/steps/";

const createStep = (title, quizID) => httpClient.post(ENDPOINT, {
    title,
    quiz: quizID
})

export {
    createStep
}
