const ATTENDEES_API_URL = 'http://localhost:5000/api/attendees';

export const addAttendee = async (attendeeData) => {
  try {
    const response = await axios.post(ATTENDEES_API_URL, attendeeData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAttendeesByEvent = async (eventId) => {
  try {
    const response = await axios.get(`${ATTENDEES_API_URL}/${eventId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
