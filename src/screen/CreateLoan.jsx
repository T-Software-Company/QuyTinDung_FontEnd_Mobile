import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import React, {useState} from 'react';
import Header from '../components/Header/Header';
import FormCreateLoan from '../components/FormCreateLoan/FormCreateLoan';
import {useTheme} from '../context/ThemeContext';

const CreateLoan = ({navigation}) => {
  const {theme} = useTheme();

  return (
    <SafeAreaView style={[styles.view, {backgroundColor: theme.background}]}>
      <View style={styles.container}>
        {/* Heading */}

        <Header Navbar="CreateLoan" navigation={navigation} />

        {/* Body */}

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <FormCreateLoan theme={theme} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CreateLoan;

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
    paddingHorizontal: 20,
  },
 
});
