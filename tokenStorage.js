import AsyncStorage from '@react-native-async-storage/async-storage';

const initStorage = async () => {
  try {
    // Check if AsyncStorage is available
    await AsyncStorage.getItem('test');
    return true;
  } catch (error) {
    console.error('AsyncStorage is not available:', error);
    return false;
  }
};

export const saveAccessToken = async (token) => {
  if (!token) return;
  try {
    await AsyncStorage.setItem('accessToken', token);
  } catch (error) {
    console.error('Error saving access token:', error);
    throw error;
  }
};

export const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    return token || null;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

export const removeAccessToken = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
  } catch (error) {
    console.error('Error removing access token:', error);
  }
};

export const saveRefreshToken = async (token) => {
  try {
    await AsyncStorage.setItem('refreshToken', token);
  } catch (error) {
    console.error('Error saving refresh token:', error);
  }
};

export const getRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem('refreshToken');
  } catch (error) {
    console.error('Error retrieving refresh token:', error);
    return null;
  }
};

export const clearTokens = async () => {
  try {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
  } catch (error) {
    console.error('Error clearing tokens:', error);
  }
};

// Initialize storage on import
initStorage().catch(console.error);
