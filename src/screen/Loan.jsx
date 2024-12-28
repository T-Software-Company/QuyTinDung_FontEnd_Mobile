import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header from '../components/Header/Header';
import Table from '../components/Table/Table';
import BoxAdd from '../components/BoxAdd/BoxAdd';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../context/ThemeContext';

const Save = ({navigation}) => {
  const {theme} = useTheme();
  const {t} = useTranslation();

  const data = [
    {
      id: 1,
      boxes: [
        {key: `${t('loan.loanAmount')}`, value: '100.000.000 đ'},
        {key: `${t('loan.contractNumber')}`, value: '123-456-789'},
        {key: `${t('loan.dueDate')}`, value: '22/07/2024'},
      ],
    },
    {
      id: 2,
      boxes: [
        {key: `${t('loan.loanAmount')}`, value: '200.000.000 đ'},
        {key: `${t('loan.contractNumber')}`, value: '987-654-321'},
        {key: `${t('loan.dueDate')}`, value: '15/08/2024'},
      ],
    },
    {
      id: 3,
      boxes: [
        {key: `${t('loan.loanAmount')}`, value: '300.000.000 đ'},
        {key: `${t('loan.contractNumber')}`, value: '987-654-321'},
        {key: `${t('loan.dueDate')}`, value: '15/08/2024'},
      ],
    },
  ];

  return (
    <SafeAreaView
      style={[styles.view, {backgroundColor: theme.background}]}>
      <View style={styles.container}>
        {/* Heading */}

        <Header Navbar="Loan" navigation={navigation} />

        {/* Body */}

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <BoxAdd
              title={t('loan.totalAssets')}
              number="100.000.000 đ"
              navigation={navigation}
              add="CreateLoan"
              addText={t('loan.add')}
            />

            <View style={styles.listSaves}>
              <Text
                style={[styles.headingList, {color: theme.text}]}>
                {t('loan.loanList')}
              </Text>

              <Table
                name="loan"
                data={data}
                navigation={navigation}
                detail="InfoLoan"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Save;

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    width: '100%',
    height: '100%',
  },

  body: {
    marginTop: 32,
    paddingHorizontal: 20,
  },

  listSaves: {
    marginTop: 18,
  },
  headingList: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
