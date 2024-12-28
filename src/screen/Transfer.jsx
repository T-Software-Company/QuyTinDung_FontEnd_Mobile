import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';

import React from 'react';
import Header from '../components/Header/Header';
import FormTransfer from '../components/FormTransfer/FormTransfer';
import {useTranslation} from 'react-i18next';
import {t} from 'i18next';
import {useTheme} from '../context/ThemeContext'; // Import ThemeContext

const Transfer = ({navigation}) => {
  const {t} = useTranslation();
  const {theme} = useTheme(); // Use ThemeContext

  const styles = StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: theme.background,
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
      backgroundColor: theme.backgroundBox,
    },

    fixedBox: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.background,
      paddingVertical: 10,
      paddingHorizontal: 20,
      zIndex: 10,
    },
    wrap: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    wrapTotal: {
      flexDirection: 'column',
      gap: 8,
    },
    totalTitle: {
      color: theme.noteText,
      fontSize: 12,
    },
    totalMoney: {
      fontWeight: 'bold',
      color: theme.text,
    },
    btnTotal: {
      backgroundColor: '#007BFF',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 999,
    },
    textBtn: {
      color: 'white',
      textAlign: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        {/* Heading */}

        <Header Navbar="Transfer" navigation={navigation} />

        {/* Body */}
        <View style={styles.body}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}>
            <FormTransfer />
          </ScrollView>

          {/* Một thành phần cố định */}
          <View style={styles.fixedBox}>
            <View style={styles.wrap}>
              <View style={styles.wrapTotal}>
                <Text style={styles.totalTitle}>Tổng tiền</Text>
                <Text style={styles.totalMoney}>0 VND</Text>
              </View>
              <View>
                <TouchableOpacity style={styles.btnTotal}>
                  <Text style={styles.textBtn}>Tiếp tục</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Transfer;
