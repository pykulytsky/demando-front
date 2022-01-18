import httpClient from "../axios";


const ENDPOINT = 'qa/events/'

const getEvents = () => httpClient.get(ENDPOINT)

const getEvent = (eventId) => httpClient.get(ENDPOINT + eventId)


export {
    getEvent,
    getEvents
}
