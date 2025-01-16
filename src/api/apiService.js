import {getAccessToken} from '../../tokenStorage';
import axiosInstance from './axiosInstance';

export const getUserData = async () => {
  try {
    const token = await getAccessToken();
    if (!token) {
      throw new Error('No access token found');
    }
    console.log('Token:', token);

    const response = await axiosInstance.get('/customers/profile', {
      headers: {
        Authorization: `Bearer ${token}`, // Changed from Bearer to OAuth
      },
    });

    console.log('User data:', response.data);

    return response.data;
  } catch (error) {
    console.log('Error fetching user data:', error);
    console.error('Error fetching user data:', error);
    throw error;
  }
};
