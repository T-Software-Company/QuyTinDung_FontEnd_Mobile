/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// import 'react-native-gesture-handler'; // Đảm bảo import trước bất kỳ thư viện nào khác

import React from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';

import RootNavigator from './src/navigators/RootNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {LanguageProvider} from './src/context/LanguageContext';
import './i18n';
import ThemeProvider from './src/context/ThemeContext';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  const queryClient = new QueryClient();

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LanguageProvider>
            <RootNavigator />
          </LanguageProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
