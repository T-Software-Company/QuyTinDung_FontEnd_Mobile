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
import { RootStackParamList } from '../../navigators/RootNavigator';

interface FormCreateLoanPlanProps {
  theme: Theme;
  navigation: StackNavigationProp<RootStackParamList, 'CreateLoanPlan'>;
}

interface FormData extends Omit<CreateLoanPlanRequest, 'application'> {
  selectedLoanTerm: string | null;
}

const FormCreateLoanPlan: React.FC<FormCreateLoanPlanProps> = ({
  theme,
  navigation,
}) => {
  const currentLanguage = i18n.language;
  const {t} = useTranslation();
  const applicationId = '6ed5ada9-72dd-4a7a-a096-08a9071e613c';

  const loanTerms = [
    {
      value: '12 months',
      label: currentLanguage === 'vi' ? '12 tháng' : '12 months',
    },
    {
      value: '24 months',
      label: currentLanguage === 'vi' ? '24 tháng' : '24 months',
    },
    {
      value: '36 months',
      label: currentLanguage === 'vi' ? '36 tháng' : '36 months',
    },
  ];

  const [formData, setFormData] = useState<FormData>({
    loanNeeds: 'Expand business operations',
    totalCapitalRequirement: 0,
    ownCapital: 0,
    proposedLoanAmount: 0,
    monthlyIncome: 0,
    repaymentPlan: '',
    note: '',
    loanTerm: '',
    metadata: {
      key1: '',
      key2: '',
      key3: false,
    },
    selectedLoanTerm: null,
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

      const loanPlanData = {
        loanNeeds: formData.loanNeeds,
        totalCapitalRequirement: formData.totalCapitalRequirement,
        ownCapital: formData.ownCapital,
        proposedLoanAmount: formData.proposedLoanAmount,
        monthlyIncome: formData.monthlyIncome,
        repaymentPlan: formData.repaymentPlan,
        note: formData.note,
        loanTerm: formData.selectedLoanTerm || '',
        metadata: formData.metadata,
      };

      const response = await loanPlan(applicationId, loanPlanData);

      if (response.code === 201) {
        Alert.alert(
          currentLanguage === 'vi' ? 'Thông báo' : 'Notification',
          currentLanguage === 'vi'
            ? 'Tạo kế hoạch vay thành công'
            : 'Loan plan created successfully',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('CreateFinancialInfo'),
            },
          ],
        );
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
            ? 'Số tiền đề xuất vay'
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
          onChange={(item: any) =>
            handleOnchange('selectedLoanTerm', item.value)
          }
        />
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
