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
import {LanguageProvider} from './context/LanguageContext';
import './i18n';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <LanguageProvider>
        <RootNavigator />
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

export default App;
