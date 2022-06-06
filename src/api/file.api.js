import httpClient from "./axios";


const uploadFile = (formData) => {
    return httpClient.post("/uploadfile/", formData)
}

export {
    uploadFile
}
