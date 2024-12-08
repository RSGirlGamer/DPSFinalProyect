const COMMENTS_API_URL = 'http://localhost:5000/api/comments';

export const addComment = async (commentData) => {
  try {
    const response = await axios.post(COMMENTS_API_URL, commentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCommentsByEvent = async (eventId) => {
  try {
    const response = await axios.get(`${COMMENTS_API_URL}/${eventId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
