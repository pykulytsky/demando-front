import httpClient from "../axios";

const ENDPOINT = "quiz/quizzes/";

const getQuiz = (quizId) => httpClient.get(ENDPOINT + quizId);

const getQuizzes = () => httpClient.get(ENDPOINT);

const createQuiz = (name, enter_code, isPrivate, deleteAfterFinish) => {
  if (enter_code !== "") {
    return httpClient.post(ENDPOINT, {
      name,
      enter_code,
      is_private: isPrivate,
      delete_after_finish: deleteAfterFinish
    });
  }
  return httpClient.post(ENDPOINT, {
    name,
    is_private: isPrivate,
    delete_after_finish: deleteAfterFinish
  });
};


export { getQuiz, getQuizzes, createQuiz };
