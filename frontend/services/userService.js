const USERS_API_URL = 'http://localhost:5000/api/users';

export const getAllUsers = async () => {
  try {
    const response = await axios.get(USERS_API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
