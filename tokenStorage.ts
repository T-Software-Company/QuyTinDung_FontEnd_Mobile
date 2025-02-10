import AsyncStorage from '@react-native-async-storage/async-storage';

interface StorageError extends Error {
  code?: string;
}

const TOKEN_KEYS = {
  ACCESS: 'accessToken',
  REFRESH: 'refreshToken',
} as const;

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
    await AsyncStorage.setItem(TOKEN_KEYS.ACCESS, token);
  } catch (error) {
    const storageError = error as StorageError;
    console.error('Error saving access token:', storageError);
    throw storageError;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEYS.ACCESS);
  } catch (error) {
    const storageError = error as StorageError;
    console.error('Error getting access token:', storageError);
    return null;
  }
};

export const removeAccessToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEYS.ACCESS);
  } catch (error: unknown) {
    const storageError = error as StorageError;
    console.error('Error removing access token:', storageError);
  }
};

export const saveRefreshToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEYS.REFRESH, token);
  } catch (error: unknown) {
    const storageError = error as StorageError;
    console.error('Error saving refresh token:', storageError);
  }
};

export const getRefreshToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEYS.REFRESH);
  } catch (error: unknown) {
    const storageError = error as StorageError;
    console.error('Error retrieving refresh token:', storageError);
    return null;
  }
};

export const clearTokens = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([TOKEN_KEYS.ACCESS, TOKEN_KEYS.REFRESH]);
  } catch (error: unknown) {
    const storageError = error as StorageError;
    console.error('Error clearing tokens:', storageError);
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const [, payload] = token.split('.');
    const decoded = JSON.parse(atob(payload));
    console.log('Decoded token:', decoded);
    const exp = decoded.exp * 1000; // Convert to milliseconds
    return Date.now() > exp;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true;
  }
};

// Initialize storage on import
initStorage().catch(console.error);
