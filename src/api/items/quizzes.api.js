import httpClient from "../axios";

const ENDPOINT = "quiz/quizzes/";


const getQuiz = (quizId) => httpClient.get(ENDPOINT + quizId)

const getQuizzes = () => httpClient.get(ENDPOINT)

export {
    getQuiz,
    getQuizzes
}
