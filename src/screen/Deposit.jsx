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

const Deposit = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        {/* Heading */}

        <Header Navbar="Deposit" navigation={navigation} />

        {/* Body */}
        <View style={styles.body}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}>
            <FormDeposit />
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
    backgroundColor: 'white',
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
  btn: {
    width: '100%',
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 12,
    marginTop: 20,
  },
  textWhite: {
    color: 'white',
  },
});
