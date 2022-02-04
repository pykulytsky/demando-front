import httpClient from "../axios";


const ENDPOINT = 'qa/events/'

const getEvents = (limit=100, orderBy='created', desc=false) => httpClient.get(
    ENDPOINT + '?limit=' + limit + '&order_by=' + orderBy + '&desc=' + desc
)

const getEvent = (eventId) => httpClient.get(ENDPOINT + eventId)

const createEvent = (eventName) => httpClient.post(
    ENDPOINT,
    {
        name: eventName
    }
)

export {
    getEvent,
    getEvents,
    createEvent
}
