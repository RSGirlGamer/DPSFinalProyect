const EVENTS_API_URL = 'http://localhost:5000/api/events';

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(EVENTS_API_URL, eventData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllEvents = async () => {
  try {
    const response = await axios.get(EVENTS_API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getEventById = async (eventId) => {
  try {
    const response = await axios.get(`${EVENTS_API_URL}/${eventId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
