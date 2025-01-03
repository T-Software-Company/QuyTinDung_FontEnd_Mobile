import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert
} from 'react-native';

import React from 'react';
import Header from '../components/Header/Header';
import FormDeposit from '../components/FormDeposit/FormDeposit';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../context/ThemeContext';
import i18n from '../../i18n';


const Deposit = ({navigation}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const currentLanguage = i18n.language;


  return (
    <SafeAreaView style={[styles.view, {backgroundColor: theme.background}]}>
      <View style={styles.container}>
        {/* Heading */}

        <Header Navbar="Deposit" navigation={navigation} />

        {/* Body */}
        <View style={styles.body}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}>
            <FormDeposit theme={theme}/>
          </ScrollView>
          
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Deposit;

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    width: '100%',
    height: '100%',
  },

  body: {
    marginTop: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
});
