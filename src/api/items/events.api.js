import httpClient from "../axios";

const ENDPOINT = "qa/events/";

const getEvents = (limit = 100, orderBy = "created", desc = false) =>
  httpClient.get(
    ENDPOINT,
    {
      params: {
        limit: limit,
        order_by: orderBy,
        desc: desc,
      },
    }
  );

const getEvent = (eventId) => httpClient.get(ENDPOINT + eventId);

const createEvent = (eventName) =>
  httpClient.post(ENDPOINT, {
    name: eventName,
  });

const deleteEvent = (eventId) => httpClient.delete(ENDPOINT + eventId);

export { getEvent, getEvents, createEvent, deleteEvent };
