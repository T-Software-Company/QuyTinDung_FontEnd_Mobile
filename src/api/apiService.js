import axiosInstance from './axiosInstance';

export const getUserData = async () => {
  try {
    const response = await axiosInstance.get('/customers/profile');
    return response?.data.result;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
