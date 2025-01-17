import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import keycloakConfig from '../../keycloakConfig';
import {
  saveAccessToken,
  saveRefreshToken,
  clearTokens,
  getRefreshToken,
  getAccessToken,
} from '../../tokenStorage';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  needsAccountSetup: boolean;
  login: (
    username: string,
    password: string,
  ) => Promise<boolean | {needsSetup: boolean}>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  register: (userData: UserData) => Promise<boolean>;
}

interface UserData {
  phone: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  signatureImage?: string;
  identifyId: string;
  ethnicity?: string;
  religion?: string;
  gender: string;
  dateOfBirth: string;
  nationality?: string;
  placeOfBirth?: string;
  permanentAddress?: string;
  issueDate: string;
  expirationDate: string;
  issuingAuthority?: string;
  legalDocType?: string;
  frontImage?: string;
  backImage?: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

const validateToken = async (token: string): Promise<boolean> => {
  try {
    const response = await axios.get(
      `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // console.log('Token validation response:', response);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

// Add this helper function before AuthProvider
const convertDateFormat = (dateStr: string): string => {
  // eslint-disable-next-line curly
  if (!dateStr) return '';

  // If the date is already in ISO format (YYYY-MM-DD)
  if (dateStr.includes('-')) {
    return `${dateStr}T00:00:00Z`;
  }

  // If the date is in DD/MM/YYYY format
  try {
    const [day, month, year] = dateStr.split('/');
    // eslint-disable-next-line curly
    if (!day || !month || !year) return dateStr;

    const paddedMonth = month.padStart(2, '0');
    const paddedDay = day.padStart(2, '0');

    return `${year}-${paddedMonth}-${paddedDay}T00:00:00Z`;
  } catch (error) {
    console.error('Date conversion error:', error);
    return dateStr;
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [needsAccountSetup, setNeedsAccountSetup] = useState<boolean>(false);

  const checkAuthState = async (): Promise<void> => {
    try {
      setLoading(true);
      const token = await getAccessToken();
      if (token) {
        const isValid = await validateToken(token);
        if (isValid) {
          setIsAuthenticated(true);
          return;
        }
        // Token invalid, try refresh
        const refreshed = await refreshToken();
        if (refreshed) {
          setIsAuthenticated(true);
          return;
        }
      }
      setIsAuthenticated(false);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const error = err as Error;
      console.error('Auth state check failed:', error);
      setError(error.message);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (
    username: string,
    password: string,
  ): Promise<boolean | {needsSetup: boolean}> => {
    setLoading(true);
    setError(null); // Reset error state

    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'password');
      params.append('client_id', keycloakConfig.clientId);
      params.append('client_secret', keycloakConfig.clientSecret);
      params.append('username', username);
      params.append('password', password);
      params.append('scope', 'openid');
      console.log(params.toString());
      const response = await axios({
        method: 'post',
        url: `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: params.toString(),
      });

      console.log('Login response:', response);
      if (response.data.access_token) {
        await saveAccessToken(response.data.access_token);
        await saveRefreshToken(response.data.refresh_token);

        // Validate token immediately after receiving
        const isValid = await validateToken(response.data.access_token);
        if (!isValid) {
          throw new Error('Invalid token received');
        }

        setIsAuthenticated(true);
        setError(null);
        setNeedsAccountSetup(false);
        return true;
      }
      throw new Error('No access token in response');
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const error = err as any; // using any here because axios errors have additional properties
      console.log('Login error:', error.response);
      setError(error.message);
      console.log(error.response.data);
      if (error.response?.data?.error === 'invalid_grant') {
        if (
          error.response?.data?.error_description ===
          'Account is not fully set up'
        ) {
          setNeedsAccountSetup(true);
          setIsAuthenticated(true);
          return {needsSetup: true};
        }
      }

      setError(error.response?.data?.error_description || error.message);
      setIsAuthenticated(false);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: UserData): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // Transform data to match API requirements
      const transformedData = {
        username: userData.phone,
        password: userData.password,
        email: userData.email,
        phone: userData.phone,
        firstName: userData.firstName,
        lastName: userData.lastName,
        address: JSON.parse(userData.address),
        signaturePhoto: userData.signatureImage,
        identityInfo: {
          identifyId: userData.identifyId,
          fullName: `${userData.lastName} ${userData.firstName}`, // Combine first and last name
          ethnicity: userData.ethnicity || '',
          religion: userData.religion || '',
          gender: userData.gender === 'Nam' ? 'MALE' : 'FEMALE',
          dateOfBirth: convertDateFormat(userData.dateOfBirth),
          nationality: userData.nationality || 'VN',
          placeOfBirth: userData.placeOfBirth || '',
          permanentAddress: userData.permanentAddress || '',
          issueDate: convertDateFormat(userData.issueDate),
          expirationDate: convertDateFormat(userData.expirationDate),
          issuingAuthority: userData.issuingAuthority || '',
          legalDocType: userData.legalDocType || 'CCCD',
          frontPhotoUrl: userData.frontImage || '',
          backPhotoUrl: userData.backImage || '',
        },
      };

      // Debug log
      console.log(transformedData);

      const response = await axios({
        method: 'post',
        url: 'https://tsoftware.store/api/v1/customers',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        data: transformedData,
      });

      console.log('Registration response:', response.data);

      if (response.status === 200) {
        return true;
      }

      throw new Error('Registration failed');
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const error = err as any; // using any here because axios errors have additional properties
      console.error('Registration response:', error.response);
      console.error('Registration error:', error.response?.data);
      console.error('Request data that caused error:', error.config?.data);
      setError(error.response?.data?.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const currentRefreshToken = await getRefreshToken();
      if (!currentRefreshToken) {
        throw new Error('No refresh token available');
      }

      const params = new URLSearchParams();
      params.append('grant_type', 'refresh_token');
      params.append('client_id', keycloakConfig.clientId);
      params.append('refresh_token', currentRefreshToken);

      const response = await axios({
        method: 'post',
        url: `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: params.toString(),
      });

      if (response.data.access_token) {
        await saveAccessToken(response.data.access_token);
        await saveRefreshToken(response.data.refresh_token);
        return true;
      }
      return false;
      // eslint-disable-next-line no-catch-shadow, @typescript-eslint/no-shadow
    } catch (error) {
      console.error('Token refresh failed:', error);
      await clearTokens();
      return false;
    }
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    loading,
    error,
    needsAccountSetup,
    login,
    logout: async (): Promise<void> => {
      setLoading(true);
      try {
        await clearTokens();
        setIsAuthenticated(false);
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const error = err as Error;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    refreshToken,
    register,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
