import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/Header/Header';
import Table from '../components/Table/Table';
import BoxAdd from '../components/BoxAdd/BoxAdd';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../context/ThemeContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigators/RootNavigator';
import i18n from '../../i18n';

type LoanScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Loan'>;

interface LoanProps {
  navigation: LoanScreenNavigationProp;
}

interface Theme {
  background: string;
  text: string;
}

interface LoanBoxData {
  id: number;
  boxes: Array<{
    key: string;
    value: string;
  }>;
}

const Loan: React.FC<LoanProps> = ({navigation}) => {
  const {theme} = useTheme() as {theme: Theme};
  const {t} = useTranslation();
  const currentLanguage = i18n.language;

  const value =
    currentLanguage === 'vi'
      ? {
          purpose: 'Mua nhà',
          month: 'tháng',
          year: 'năm',
        }
      : {
          purpose: 'Buy a house',
          month: 'months',
          year: 'years',
        };

  const data: LoanBoxData[] = [
    {
      id: 1,
      boxes: [
        {key: t('loan.fields.loanAmount'), value: '100,000,000 đ'},
        {key: t('loan.fields.contractNumber'), value: '123-456-789'},
        {key: t('loan.fields.purpose'), value: value.purpose},
        {key: t('loan.fields.term'), value: `12 ${value.month}`},
        {key: t('loan.fields.rate'), value: `12%/${value.year}`},
        {key: t('loan.fields.principalPayment'), value: `6 ${value.month}`},
        {key: t('loan.fields.interestPayment'), value: `6 ${value.month}`},
        {key: t('loan.fields.effectiveDate'), value: '22/04/2024'},
        {key: t('loan.fields.dueDate'), value: '22/07/2024'},
      ],
    },
    {
      id: 2,
      boxes: [
        {key: t('loan.fields.loanAmount'), value: '200,000,000 đ'},
        {key: t('loan.fields.contractNumber'), value: '987-654-321'},
        {key: t('loan.fields.purpose'), value: value.purpose},
        {key: t('loan.fields.term'), value: `12 ${value.month}`},
        {key: t('loan.fields.rate'), value: `12%/${value.year}`},
        {key: t('loan.fields.principalPayment'), value: `6 ${value.month}`},
        {key: t('loan.fields.interestPayment'), value: `6 ${value.month}`},
        {key: t('loan.fields.effectiveDate'), value: '22/04/2024'},
        {key: t('loan.fields.dueDate'), value: '15/08/2024'},
      ],
    },
    {
      id: 3,
      boxes: [
        {key: t('loan.fields.loanAmount'), value: '300,000,000 đ'},
        {key: t('loan.fields.contractNumber'), value: '987-654-321'},
        {key: t('loan.fields.purpose'), value: value.purpose},
        {key: t('loan.fields.term'), value: `12 ${value.month}`},
        {key: t('loan.fields.rate'), value: `12%/${value.year}`},
        {key: t('loan.fields.principalPayment'), value: `6 ${value.month}`},
        {key: t('loan.fields.interestPayment'), value: `6 ${value.month}`},
        {key: t('loan.fields.status'), value: t('loan.fields.spending')},
      ],
    },
    {
      id: 4,
      boxes: [
        {key: t('loan.fields.loanAmount'), value: '300,000,000 đ'},
        {key: t('loan.fields.contractNumber'), value: '987-654-321'},
        {key: t('loan.fields.purpose'), value: value.purpose},
        {key: t('loan.fields.term'), value: `12 ${value.month}`},
        {key: t('loan.fields.rate'), value: `12%/${value.year}`},
        {key: t('loan.fields.principalPayment'), value: `6 ${value.month}`},
        {key: t('loan.fields.interestPayment'), value: `6 ${value.month}`},
        {key: t('loan.fields.effectiveDate'), value: '22/04/2024'},
        {key: t('loan.fields.dueDate'), value: '15/08/2024'},
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.view, {backgroundColor: theme.background}]}>
      <View style={styles.container}>
        <Header Navbar="Loan" navigation={navigation} />

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <BoxAdd
              title={t('loan.totalAssets')}
              number="100,000,000 đ"
              navigation={navigation}
              add="CreateLoan"
              addText={t('loan.add')}
            />

            <View style={styles.listSaves}>
              <Text style={[styles.headingList, {color: theme.text}]}>
                {t('loan.loanList')}
              </Text>

              <Table
                name="loan"
                data={data}
                navigation={navigation}
                detail="InfoLoan" // TypeScript will ensure this is correct
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Loan;

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
    paddingBottom: 20,
  },

  listSaves: {
    marginTop: 18,
  },
  headingList: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
