import React, {createContext, useState, useContext, useEffect} from 'react';
import {AuthContextType, UserData} from '../types/auth.types';
import {authService} from '../services/auth.service';
import {getAccessToken, isTokenExpired} from '../../tokenStorage';
import {navigationRef} from '../navigators/RootNavigator';
import {CommonActions} from '@react-navigation/native';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    authService.setLogoutCallback(() => setIsAuthenticated(false));
    checkAuthState();

    // Không cần interval check vì đã có axiosInstance handling refresh token
  }, []);

  const checkAuthState = async () => {
    try {
      const token = await getAccessToken();
      if (token && !isTokenExpired(token)) {
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error('Auth state check failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    loading,
    error,
    login: async (username, password) => {
      setLoading(true);
      try {
        const success = await authService.login(username, password);
        if (success) {
          setIsAuthenticated(true);
          return true;
        }
        return false;
      } catch (err: any) {
        setError(err.message);
        setIsAuthenticated(false);
        return false;
      } finally {
        setLoading(false);
      }
    },
    logout: async () => {
      try {
        // 1. Set auth state to false first
        setIsAuthenticated(false);

        // 2. Small delay to let UI update
        await new Promise(resolve => setTimeout(resolve, 10));

        // 3. Reset navigation with custom transition
        navigationRef.current?.dispatch(
          CommonActions.reset({
            routes: [{name: 'Login'}],
            index: 0,
          }),
        );

        // 4. Clear tokens after navigation starts
        await authService.logout();
      } catch (error) {
        console.error('Logout error:', error);
      }
    },
    refreshToken: authService.refreshToken.bind(authService),
    register: async (userData: UserData) => {
      setLoading(true);
      try {
        return await authService.register(userData);
      } catch (err: any) {
        setError(err.message);
        return false;
      } finally {
        setLoading(false);
      }
    },
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
