import httpClient from "../axios";

const ENDPOINT = "quiz/quizzes/";

const getQuiz = (quizId) => httpClient.get(ENDPOINT + quizId);

const getQuizzes = () => httpClient.get(ENDPOINT);

const createQuiz = (name, enter_code, isPrivate, deleteAfterFinish, secondsPerAnswer) => {
  if (enter_code !== "") {
    return httpClient.post(ENDPOINT, {
      name,
      enter_code,
      is_private: isPrivate,
      delete_after_finish: deleteAfterFinish,
      seconds_per_answer: secondsPerAnswer
    });
  }
  return httpClient.post(ENDPOINT, {
    name,
    is_private: isPrivate,
    delete_after_finish: deleteAfterFinish
  });
};

const patchQuizCover = (quizID ,coverSrc) => httpClient.patch(ENDPOINT + quizID, {
  cover: coverSrc
})


export { getQuiz, getQuizzes, createQuiz, patchQuizCover };
