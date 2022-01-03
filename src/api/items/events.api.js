import httpClient from "../axios";


const ENDPOINT = 'qa/events'

const getEvent = (eventId) => httpClient.get(ENDPOINT + '/' + eventId)


export {
    getEvent
}
