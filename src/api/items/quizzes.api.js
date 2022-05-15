import httpClient from "../axios";

const ENDPOINT = "quiz/quizzes/";

const getQuiz = (quizId) => httpClient.get(ENDPOINT + quizId);

const getQuizzes = () => httpClient.get(ENDPOINT);

const createQuiz = (name, enter_code) => {
  if (enter_code !== "") {
    return httpClient.post(ENDPOINT, {
      name,
      enter_code,
    });
  }
  return httpClient.post(ENDPOINT, {
    name,
  });
};


export { getQuiz, getQuizzes, createQuiz };
