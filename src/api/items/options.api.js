import httpClient from "../axios";

const ENDPOINT = "quiz/options/";


const createOption = (title, isRight, stepID) => httpClient.post(ENDPOINT, {
    title,
    is_right: isRight,
    step: stepID
})

export {
    createOption
}
