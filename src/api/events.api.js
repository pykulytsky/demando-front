import httpClient from './axios'

const ENDPOINT = '/qa/events'


const getEvents = () => httpClient.get(ENDPOINT)


export {
    getEvents
}
