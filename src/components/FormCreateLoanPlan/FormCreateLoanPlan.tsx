/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import DropdownComponent from '../DropdownComponent/DropdownComponent';
import InputBackground from '../InputBackground/InputBackground';
import {useTranslation} from 'react-i18next';
import i18n from '../../../i18n';
import {Theme} from '../../theme/colors';
import {CreateLoanPlanRequest} from '../../api/types/loanPlan';
import {loanPlan} from '../../api/services/createLoan';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigators/RootNavigator';

interface FormCreateLoanPlanProps {
  theme: Theme;
  navigation: StackNavigationProp<RootStackParamList, 'CreateLoanPlan'>;
  appId: string;
}

interface FormData extends Omit<CreateLoanPlanRequest, 'application'> {
  selectedLoanTerm: number | undefined;
}

interface LoanTermOption {
  value: number; // Changed from string to number
  label: string;
  interest: number; // Changed from string to number
}

const FormCreateLoanPlan: React.FC<FormCreateLoanPlanProps> = ({
  theme,
  navigation,
  appId,
}) => {
  const currentLanguage = i18n.language;
  const {t} = useTranslation();

  const loanTerms: LoanTermOption[] = [
    {
      value: 12,
      label: currentLanguage === 'vi' ? '12 tháng' : '12 months',
      interest: 15,
    },
    {
      value: 24,
      label: currentLanguage === 'vi' ? '24 tháng' : '24 months',
      interest: 12,
    },
    {
      value: 36,
      label: currentLanguage === 'vi' ? '36 tháng' : '36 months',
      interest: 10,
    },
  ];

  const [formData, setFormData] = useState<FormData>({
    totalCapitalRequirement: 0,
    ownCapital: 0,
    proposedLoanAmount: 0,
    interestRate: 0,
    monthlyIncome: 0,
    repaymentPlan: '',
    note: '',
    loanTerm: 0,
    metadata: {
      key1: '',
      key2: '',
      key3: false,
    },
    selectedLoanTerm: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState<number | undefined>(
    undefined,
  );

  const handleOnchange = (field: keyof FormData, value: any): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    if (field === 'selectedLoanTerm') {
      const selectedTerm = loanTerms.find(term => term.value === value);
      setSelectedInterest(selectedTerm?.interest || undefined);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const loanPlanData = {
        totalCapitalRequirement: formData.totalCapitalRequirement,
        ownCapital: formData.ownCapital,
        proposedLoanAmount: formData.proposedLoanAmount,
        monthlyIncome: formData.monthlyIncome,
        repaymentPlan: formData.repaymentPlan,
        note: formData.note,
        loanTerm: formData.selectedLoanTerm || 0, // Ensure it's a number
        interestRate: selectedInterest, // Already a number
        metadata: formData.metadata,
      };
      console.log('loanPlanData', loanPlanData);

      const response = await loanPlan(appId, loanPlanData);

      if (response) {
        navigation.navigate('CreateFinancialInfo', {appId});
      }
    } catch (error) {
      console.error('Error creating loan plan:', error);
      Alert.alert(
        currentLanguage === 'vi' ? 'Lỗi' : 'Error',
        currentLanguage === 'vi'
          ? 'Có lỗi xảy ra khi tạo kế hoạch vay'
          : 'Error occurred while creating loan plan',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const styles = StyleSheet.create({
    boxInput: {
      marginBottom: 12,
    },

    headingTitle: {
      fontWeight: 'bold',
      marginBottom: 8,
      color: theme.text,
    },
    textInput: {
      backgroundColor: '#f4f4f4',
      borderRadius: 8,
      height: 40,
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 10,
      paddingBottom: 10,
      color: '#000',
      paddingVertical: 0,
      textAlignVertical: 'center',
    },

    placeholderStyle: {
      color: '#aaa',
      fontSize: 14,
    },

    selectedTextStyle: {
      color: '#000',
      fontSize: 14,
    },

    btn: {
      width: '100%',
      backgroundColor: '#007BFF',
      padding: 12,
      borderRadius: 12,
      marginTop: 8,
    },

    hidden: {
      opacity: 0,
      pointerEvents: 'none',
    },

    dropdown: {
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      height: 50,
      zIndex: 5000,
    },
    dropdownContainer: {
      borderColor: '#ccc',
      zIndex: 5000,
      position: 'absolute',
    },

    rateText: {
      marginTop: 12,
      fontSize: 14,
      color: '#007BFF',
    },
    textWhite: {
      color: 'white',
    },
  });

  return (
    <View>
      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {currentLanguage === 'vi'
            ? 'Tổng vốn yêu cầu'
            : 'Total Capital Requirement'}
        </Text>
        <InputBackground
          placeholder={
            currentLanguage === 'vi' ? 'Nhập số tiền' : 'Enter amount'
          }
          keyboardType="numeric"
          onChangeText={(value: string) =>
            handleOnchange('totalCapitalRequirement', Number(value))
          }
          value={formData.totalCapitalRequirement.toString()}
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {currentLanguage === 'vi' ? 'Vốn tự có' : 'Own Capital'}
        </Text>
        <InputBackground
          placeholder={
            currentLanguage === 'vi' ? 'Nhập số tiền' : 'Enter amount'
          }
          keyboardType="numeric"
          onChangeText={(value: string) =>
            handleOnchange('ownCapital', Number(value))
          }
          value={formData.ownCapital.toString()}
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {currentLanguage === 'vi'
            ? 'Đề xuất hạn mức vay'
            : 'Proposed Loan Amount'}
        </Text>
        <InputBackground
          placeholder={
            currentLanguage === 'vi' ? 'Nhập số tiền' : 'Enter amount'
          }
          keyboardType="numeric"
          onChangeText={(value: string) =>
            handleOnchange('proposedLoanAmount', Number(value))
          }
          value={formData.proposedLoanAmount.toString()}
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {currentLanguage === 'vi' ? 'Thu nhập hàng tháng' : 'Monthly Income'}
        </Text>
        <InputBackground
          placeholder={
            currentLanguage === 'vi' ? 'Nhập thu nhập' : 'Enter income'
          }
          keyboardType="numeric"
          onChangeText={(value: string) =>
            handleOnchange('monthlyIncome', Number(value))
          }
          value={formData.monthlyIncome.toString()}
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {currentLanguage === 'vi' ? 'Kỳ hạn vay' : 'Loan Term'}
        </Text>
        <DropdownComponent
          value={formData.selectedLoanTerm}
          data={loanTerms}
          placeholder={currentLanguage === 'vi' ? 'Chọn kỳ hạn' : 'Select term'}
          onChange={(item: LoanTermOption) =>
            handleOnchange('selectedLoanTerm', item.value)
          }
        />
        {selectedInterest && (
          <Text style={styles.rateText}>
            {currentLanguage === 'vi'
              ? `Lãi suất kỳ hạn vay ${
                  loanTerms.find(
                    term => term.value === formData.selectedLoanTerm,
                  )?.label || ''
                }: ${selectedInterest}%`
              : `Interest rate for ${
                  loanTerms.find(
                    term => term.value === formData.selectedLoanTerm,
                  )?.label || ''
                }: ${selectedInterest}%`}
          </Text>
        )}
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {currentLanguage === 'vi' ? 'Kế hoạch trả nợ' : 'Repayment Plan'}
        </Text>
        <InputBackground
          placeholder={
            currentLanguage === 'vi' ? 'Nhập kế hoạch' : 'Enter plan'
          }
          onChangeText={(value: string) =>
            handleOnchange('repaymentPlan', value)
          }
          value={formData.repaymentPlan}
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {currentLanguage === 'vi' ? 'Ghi chú' : 'Note'}
        </Text>
        <InputBackground
          placeholder={currentLanguage === 'vi' ? 'Nhập ghi chú' : 'Enter note'}
          onChangeText={(value: string) => handleOnchange('note', value)}
          value={formData.note}
        />
      </View>

      <TouchableOpacity
        style={[styles.btn, isLoading && {opacity: 0.7}]}
        onPress={handleSubmit}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text
            style={[
              styles.textWhite,
              {fontWeight: 'bold', textAlign: 'center'},
            ]}>
            {t('formCreateLoan.next')}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default FormCreateLoanPlan;
