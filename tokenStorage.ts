import AsyncStorage from '@react-native-async-storage/async-storage';

const initStorage = async (): Promise<boolean> => {
  try {
    await AsyncStorage.getItem('test');
    return true;
  } catch (error: unknown) {
    console.error('AsyncStorage is not available:', error);
    return false;
  }
};

export const saveAccessToken = async (token: string): Promise<void> => {
  if (!token) return;
  try {
    await AsyncStorage.setItem('accessToken', token);
  } catch (error: unknown) {
    console.error('Error saving access token:', error);
    throw error;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    return token || null;
  } catch (error: unknown) {
    console.error('Error getting access token:', error);
    return null;
  }
};

export const removeAccessToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('accessToken');
  } catch (error: unknown) {
    console.error('Error removing access token:', error);
  }
};

export const saveRefreshToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('refreshToken', token);
  } catch (error: unknown) {
    console.error('Error saving refresh token:', error);
  }
};

export const getRefreshToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('refreshToken');
  } catch (error: unknown) {
    console.error('Error retrieving refresh token:', error);
    return null;
  }
};

export const clearTokens = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
  } catch (error: unknown) {
    console.error('Error clearing tokens:', error);
  }
};

// Initialize storage on import
initStorage().catch(console.error);
