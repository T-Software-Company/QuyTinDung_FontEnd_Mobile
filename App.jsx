/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// import 'react-native-gesture-handler'; // Đảm bảo import trước bất kỳ thư viện nào khác

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import RootNavigator from './src/navigators/RootNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {LanguageProvider} from './src/context/LanguageContext';
import './i18n';
import ThemeProvider from './src/context/ThemeContext';
import {AuthProvider} from './src/context/AuthContext';

class ErrorBoundary extends React.Component {
  state = {hasError: false};

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    console.error('Auth Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Something went wrong with authentication.</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

function App() {
  const queryClient = new QueryClient();

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <LanguageProvider>
              <AuthProvider>
                <RootNavigator />
              </AuthProvider>
            </LanguageProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

export default App;
