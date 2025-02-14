/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import InputBackground from '../InputBackground/InputBackground';
import {useTranslation} from 'react-i18next';
import i18n from '../../../i18n';
import {Theme} from '../../theme/colors';
import {financialInfo} from '../../api/services/createLoan';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigators/RootNavigator';

interface FormCreateFinancialInfoProps {
  theme: Theme;
  navigation: StackNavigationProp<RootStackParamList, 'CreateFinancialInfo'>;
  appId: string;
}

interface FormData {
  jobTitle: string;
  companyName: string;
  companyAddress: string;
  hasMarried: boolean;
  totalIncome: number;
  monthlyExpense: number;
  monthlySaving: number;
  monthlyDebt: number;
  monthlyLoanPayment: number;
  files: string[];
}

const FormCreateFinancialInfo: React.FC<FormCreateFinancialInfoProps> = ({
  theme,
  navigation,
  appId,
}) => {
  const currentLanguage = i18n.language;
  const {t} = useTranslation();

  const [formData, setFormData] = useState<FormData>({
    jobTitle: '',
    companyName: '',
    companyAddress: '',
    hasMarried: false,
    totalIncome: 0,
    monthlyExpense: 0,
    monthlySaving: 0,
    monthlyDebt: 0,
    monthlyLoanPayment: 0,
    files: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleOnchange = (field: keyof FormData, value: any): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await financialInfo(appId, formData);

      if (response) {
        navigation.navigate('CreditRating', {appId});
      }
    } catch (error) {
      console.error('Error submitting financial info:', error);
      Alert.alert(t('notification.title'), t('formCreateLoan.financialInfo.submitError'));
    } finally {
      setIsLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    boxInput: {
      marginBottom: 12,
    },
    headingTitle: {
      fontWeight: 'bold',
      marginBottom: 8,
      color: theme.text,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    btn: {
      width: '100%',
      backgroundColor: '#007BFF',
      padding: 12,
      borderRadius: 12,
      marginTop: 8,
    },
    textWhite: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>{t('formCreateLoan.financialInfo.jobTitle')}</Text>
        <InputBackground
          placeholder={t('formCreateLoan.financialInfo.jobTitlePlaceholder')}
          onChangeText={(value: string) => handleOnchange('jobTitle', value)}
          value={formData.jobTitle}
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {t('formCreateLoan.financialInfo.companyName')}
        </Text>
        <InputBackground
          placeholder={t('formCreateLoan.financialInfo.companyNamePlaceholder')}
          onChangeText={(value: string) => handleOnchange('companyName', value)}
          value={formData.companyName}
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {t('formCreateLoan.financialInfo.companyAddress')}
        </Text>
        <InputBackground
          placeholder={t('formCreateLoan.financialInfo.companyAddressPlaceholder')}
          onChangeText={(value: string) =>
            handleOnchange('companyAddress', value)
          }
          value={formData.companyAddress}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.headingTitle}>{t('formCreateLoan.financialInfo.hasMarried')}</Text>
        <Switch
          value={formData.hasMarried}
          onValueChange={value => handleOnchange('hasMarried', value)}
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {t('formCreateLoan.financialInfo.totalIncome')}
        </Text>
        <InputBackground
          placeholder={t('formCreateLoan.financialInfo.totalIncomePlaceholder')}
          keyboardType="numeric"
          onChangeText={(value: string) =>
            handleOnchange('totalIncome', Number(value))
          }
          value={formData.totalIncome.toString()}
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {t('formCreateLoan.financialInfo.monthlyExpense')}
        </Text>
        <InputBackground
          placeholder={t('formCreateLoan.financialInfo.monthlyExpensePlaceholder')}
          keyboardType="numeric"
          onChangeText={(value: string) =>
            handleOnchange('monthlyExpense', Number(value))
          }
          value={formData.monthlyExpense.toString()}
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {t('formCreateLoan.financialInfo.monthlySaving')}
        </Text>
        <InputBackground
          placeholder={t('formCreateLoan.financialInfo.monthlySavingPlaceholder')}
          keyboardType="numeric"
          onChangeText={(value: string) =>
            handleOnchange('monthlySaving', Number(value))
          }
          value={formData.monthlySaving.toString()}
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {t('formCreateLoan.financialInfo.monthlyDebt')}
        </Text>
        <InputBackground
          placeholder={t('formCreateLoan.financialInfo.monthlyDebtPlaceholder')}
          keyboardType="numeric"
          onChangeText={(value: string) =>
            handleOnchange('monthlyDebt', Number(value))
          }
          value={formData.monthlyDebt.toString()}
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {t('formCreateLoan.financialInfo.monthlyLoanPayment')}
        </Text>
        <InputBackground
          placeholder={t('formCreateLoan.financialInfo.monthlyLoanPaymentPlaceholder')}
          keyboardType="numeric"
          onChangeText={(value: string) =>
            handleOnchange('monthlyLoanPayment', Number(value))
          }
          value={formData.monthlyLoanPayment.toString()}
        />
      </View>

      <TouchableOpacity
        style={[styles.btn, isLoading && {opacity: 0.7}]}
        onPress={handleSubmit}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.textWhite}>{t('formCreateLoan.financialInfo.submit')}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default FormCreateFinancialInfo;
