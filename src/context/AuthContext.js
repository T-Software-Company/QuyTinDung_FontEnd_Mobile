import React, {createContext, useState, useContext, useEffect} from 'react';
import {authorize, refresh} from 'react-native-app-auth';
import keycloakConfig from '../../keycloakConfig';
import {
  saveAccessToken,
  saveRefreshToken,
  clearTokens,
  getRefreshToken,
  getAccessToken,
} from '../../tokenStorage';
import axios from 'axios';

const AuthContext = createContext(null);

const validateToken = async token => {
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

export const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [needsAccountSetup, setNeedsAccountSetup] = useState(false);

  const checkAuthState = async () => {
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
    } catch (error) {
      console.error('Auth state check failed:', error);
      setError(error.message);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthState();
  }, []);

  const login = async (username, password) => {
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

      // console.log('Login response:', response);
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
    } catch (error) {
      // console.log('Login error:', error);
      setError(error);
      // console.log(error.response.data);
      if (error.response?.data?.error === 'invalid_grant') {
        if (error.response?.data?.error_description === 'Account is not fully set up') {
          setNeedsAccountSetup(true);
          setIsAuthenticated(true);
          return { needsSetup: true };
        }
      }

      setError(error.response?.data?.error_description || error.message);
      setIsAuthenticated(false);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
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
    } catch (error) {
      console.error('Token refresh failed:', error);
      await clearTokens();
      return false;
    }
  };

  const contextValue = {
    isAuthenticated,
    loading,
    error,
    needsAccountSetup,
    login,
    logout: async () => {
      setLoading(true);
      try {
        await clearTokens();
        setIsAuthenticated(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    refreshToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
