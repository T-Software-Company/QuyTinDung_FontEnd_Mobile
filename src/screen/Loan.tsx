import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header/Header';
import Table from '../components/Table/Table';
import BoxAdd from '../components/BoxAdd/BoxAdd';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../context/ThemeContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigators/RootNavigator';
import i18n from '../../i18n';
import {getApplications} from '../api/services/getApplicationsLoan';
import {RootState} from '../store/store';
import {useSelector} from 'react-redux';
import {Application} from '../api/types/getApplications';

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
    value: string | number;
  }>;
}

type AmountValue = string | number;

const parseAmount = (amount: AmountValue): number => {
  if (typeof amount === 'number') {
    return amount;
  }
  return Number(amount.replace(/[đ,\s]/g, '')) || 0;
};

const formatAmount = (amount: number): string => {
  return `${amount.toLocaleString('en-US')} đ`;
};

const Loan: React.FC<LoanProps> = ({navigation}) => {
  const {theme} = useTheme() as {theme: Theme};
  const {t} = useTranslation();
  const currentLanguage = i18n.language;
  const user = useSelector((state: RootState) => state.user.userData);
  const [loanData, setLoanData] = useState<Application[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        try {
          const applications = await getApplications(user.id);
          if (applications) {
            setLoanData(applications);
          }
        } catch (error) {
          console.error('Error fetching loan data:', error);
        }
      }
    };

    fetchData();
  }, [user]);

  console.log(loanData);

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
        {key: t('loan.fields.loanAmount'), value: formatAmount(100000000)},
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
        {key: t('loan.fields.loanAmount'), value: formatAmount(200000000)},
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
        {key: t('loan.fields.loanAmount'), value: formatAmount(300000000)},
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
        {key: t('loan.fields.loanAmount'), value: formatAmount(300000000)},
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

  const transformApiDataToTableFormat = (
    apiData: Application[],
  ): LoanBoxData[] => {
    return apiData.map((app, index) => ({
      id: index + 1,
      boxes: [
        {
          key: t('loan.fields.loanAmount'),
          value: app.amount ? `${app.amount} đ` : 'N/A',
        },
        {key: t('loan.fields.contractNumber'), value: app.id || 'N/A'},
        {key: t('loan.fields.purpose'), value: app.purpose || 'N/A'},
        {
          key: t('loan.fields.term'),
          value: app.loanTerm ? `${app.loanTerm} tháng` : 'N/A',
        },
        {
          key: t('loan.fields.rate'),
          value: app.interestRate ? `${app.interestRate}%/năm` : 'N/A',
        },
        {key: t('loan.fields.effectiveDate'), value: app.startDate || 'N/A'},
        {key: t('loan.fields.dueDate'), value: app.dueDate || 'N/A'},
        {key: t('loan.fields.status'), value: app.status || 'N/A'},
      ],
    }));
  };
  console.log(transformApiDataToTableFormat(loanData));

  const calculateTotalLoanAmount = (data: LoanBoxData[]): number => {
    return data.reduce((total, item) => {
      const loanAmount = item.boxes.find(
        box => box.key === t('loan.fields.loanAmount'),
      )?.value;

      if (loanAmount !== undefined) {
        return total + parseAmount(loanAmount);
      }
      return total;
    }, 0);
  };

  // Format the total amount with commas and currency symbol
  const totalLoanAmount = calculateTotalLoanAmount(data);

  console.log(totalLoanAmount);
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
              number={formatAmount(totalLoanAmount)} // Use the calculated total here
              navigation={navigation}
              add="LoadingWorkflowLoan"
              addText={t('loan.add')}
            />

            <View style={styles.listSaves}>
              <Text style={[styles.headingList, {color: theme.text}]}>
                {t('loan.loanList')}
              </Text>

              <Table
                name="loan"
                data={data} // Use loanData if available, fallback to mock data
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
