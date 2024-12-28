import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import React from 'react';
import Header from '../components/Header/Header';
import FormCreateSave from '../components/FormCreateSave/FormCreateSave';
import {useTheme} from '../context/ThemeContext';
const SentSave = ({navigation}) => {
  const {theme} = useTheme();
  return (
    <SafeAreaView style={[styles.view, {backgroundColor: theme.background}]}>
      <View style={styles.container}>
        {/* Heading */}

        <Header Navbar="SentSave" navigation={navigation} />

        {/* Body */}

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <FormCreateSave />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SentSave;

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
