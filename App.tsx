/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// import 'react-native-gesture-handler'; // Đảm bảo import trước bất kỳ thư viện nào khác


import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';

import RootNavigator from './src/navigators/RootNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <SafeAreaProvider style={{flex: 1, paddingTop: 12}}>
      <RootNavigator />
    </SafeAreaProvider>
  );
}

export default App;
