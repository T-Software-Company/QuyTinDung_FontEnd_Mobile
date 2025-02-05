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
import {
  LoanRequestBody,
  BorrowerType,
  LoanSecurityType,
  LoanCollateralType,
} from '../../api/types/loanRequest';
import {loanRequest} from '../../api/services/createLoan';

interface FormCreateLoanProps {
  theme: Theme;
}

interface RateItem {
  value: string;
  label: string;
  rate: string;
}

interface TargetItem {
  value: string;
  label: string;
}

interface FormData extends Omit<LoanRequestBody, 'application'> {
  value: string | null;
  selectedRate: RateItem | null;
  methodExtend: string | null;
  method: string | null;
}

interface NotificationType {
  vi: string;
  en: string;
}

const FormCreateLoan: React.FC<FormCreateLoanProps> = ({theme}) => {
  const currentLanguage = i18n.language;
  const {t} = useTranslation();
  const applicationId = '6ed5ada9-72dd-4a7a-a096-08a9071e613c';

  const notification: NotificationType = {
    vi: 'Bạn đã tạo khoản vay thành công.\nVui lòng chờ nhân viên hỗ trợ tư vấn và xác nhận.',
    en: 'Your loan has been created successfully.\nPlease wait for staff support and confirmation.',
  };

  const rates: RateItem[] = [
    {
      value: '1',
      label: currentLanguage === 'vi' ? '1 tháng' : '1 month',
      rate: '12%',
    },
    {
      value: '2',
      label: currentLanguage === 'vi' ? '3 tháng' : '3 months',
      rate: '10.5%',
    },
    {
      value: '3',
      label: currentLanguage === 'vi' ? '12 tháng' : '12 months',
      rate: '8%',
    },
  ];

  const target_loan: TargetItem[] = [
    {
      value: '1',
      label: currentLanguage === 'vi' ? 'Mua nhà' : 'Buy house',
    },
    {
      value: '2',
      label: currentLanguage === 'vi' ? 'Mua ô tô' : 'Buy car',
    },
    {
      value: '3',
      label: currentLanguage === 'vi' ? 'Vay tiêu dùng' : 'Consumer loan',
    },
  ];

  const frequency_pay: TargetItem[] = [
    {
      value: '1',
      label: currentLanguage === 'vi' ? 'Hàng tuần' : 'Weekly',
    },
    {
      value: '2',
      label: currentLanguage === 'vi' ? 'Hàng tháng' : 'Monthly',
    },
    {
      value: '3',
      label: currentLanguage === 'vi' ? '2 tháng' : '2 months',
    },
  ];

  const borrowerTypes = [
    {
      value: 'INDIVIDUAL',
      label: currentLanguage === 'vi' ? 'Cá nhân' : 'Individual',
    },
    {
      value: 'BUSINESS',
      label: currentLanguage === 'vi' ? 'Doanh nghiệp' : 'Business',
    },
  ];

  const securityTypes = [
    {
      value: 'MORTGAGE',
      label: currentLanguage === 'vi' ? 'Thế chấp' : 'Mortgage',
    },
    {
      value: 'UNSECURED',
      label: currentLanguage === 'vi' ? 'Tín chấp' : 'Unsecured',
    },
  ];

  const collateralTypes = [
    {
      value: 'VEHICLE',
      label: currentLanguage === 'vi' ? 'Phương tiện' : 'Vehicle',
    },
    {
      value: 'PROPERTY',
      label: currentLanguage === 'vi' ? 'Bất động sản' : 'Property',
    },
    {
      value: 'EQUIPMENT',
      label: currentLanguage === 'vi' ? 'Thiết bị' : 'Equipment',
    },
  ];

  const [formData, setFormData] = useState<FormData>({
    purpose: '',
    amount: 0,
    borrowerType: 'INDIVIDUAL',
    asset: '',
    loanSecurityType: 'UNSECURED',
    loanCollateralTypes: ['VEHICLE'],
    note: '',
    metadata: {
      key1: '',
      key2: '',
    },
    value: null,
    selectedRate: null,
    methodExtend: null,
    method: null,
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

      const loanData = {
        purpose: formData.purpose,
        amount: formData.amount,
        borrowerType: formData.borrowerType,
        asset: formData.asset,
        loanSecurityType: formData.loanSecurityType,
        loanCollateralTypes: formData.loanCollateralTypes,
        note: formData.note,
        metadata: {
          termRate: formData.selectedRate?.value || '',
          paymentFrequency: formData.method || '',
        },
      };

      const response = await loanRequest(applicationId, loanData);
      console.log('Loan request response:', response);

      if (response.code === 200) {
        Alert.alert(
          currentLanguage === 'vi' ? 'Thông báo' : 'Notification',
          currentLanguage === 'vi' ? notification.vi : notification.en,
        );
      }
    } catch (error) {
      console.error('Error creating loan request:', error);
      Alert.alert(
        currentLanguage === 'vi' ? 'Lỗi' : 'Error',
        currentLanguage === 'vi'
          ? 'Có lỗi xảy ra khi tạo khoản vay'
          : 'Error occurred while creating loan request',
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
          {t('formCreateLoan.loanAmount')}
        </Text>
        <InputBackground
          placeholder={t('formCreateLoan.loanRange')}
          keyboardType="numeric"
          onChangeText={(value: string) => handleOnchange('value', value)}
          value={formData.value ?? undefined}
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>{t('formCreateLoan.termRate')}</Text>
        <DropdownComponent
          value={formData.selectedRate?.value ?? null}
          data={rates}
          placeholder={t('formCreateLoan.selectTermRate')}
          onChange={(value: RateItem) => handleOnchange('selectedRate', value)}
        />

        {formData.selectedRate ? (
          <Text style={styles.rateText}>
            {currentLanguage === 'vi'
              ? `Lãi suất của kỳ hạn ${formData.selectedRate.label} là ${formData.selectedRate.rate}`
              : `Interest rate for ${formData.selectedRate.label} is ${formData.selectedRate.rate}`}
          </Text>
        ) : (
          <></>
        )}
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>{t('formCreateLoan.purpose')}</Text>
        <DropdownComponent
          value={formData.methodExtend}
          data={target_loan}
          placeholder={t('formCreateLoan.selectPurpose')}
          onChange={(value: TargetItem) =>
            handleOnchange('methodExtend', value.value)
          }
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {t('formCreateLoan.paymentFrequency')}
        </Text>
        <DropdownComponent
          value={formData.method ?? null}
          data={frequency_pay}
          placeholder={t('formCreateLoan.selectPaymentFrequency')}
          onChange={(value: TargetItem) =>
            handleOnchange('method', value.value)
          }
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {currentLanguage === 'vi' ? 'Số tiền vay' : 'Loan Amount'}
        </Text>
        <InputBackground
          placeholder={
            currentLanguage === 'vi' ? 'Nhập số tiền' : 'Enter amount'
          }
          keyboardType="numeric"
          onChangeText={(value: string) =>
            handleOnchange('amount', Number(value))
          }
          value={formData.amount.toString()}
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {currentLanguage === 'vi' ? 'Mục đích vay' : 'Loan Purpose'}
        </Text>
        <InputBackground
          placeholder={
            currentLanguage === 'vi' ? 'Nhập mục đích' : 'Enter purpose'
          }
          onChangeText={(value: string) => handleOnchange('purpose', value)}
          value={formData.purpose}
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {currentLanguage === 'vi' ? 'Loại người vay' : 'Borrower Type'}
        </Text>
        <DropdownComponent
          value={formData.borrowerType}
          data={borrowerTypes}
          placeholder={currentLanguage === 'vi' ? 'Chọn loại' : 'Select type'}
          onChange={(value: TargetItem) =>
            handleOnchange('borrowerType', value.value as BorrowerType)
          }
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {currentLanguage === 'vi' ? 'Tài sản' : 'Asset'}
        </Text>
        <InputBackground
          placeholder={
            currentLanguage === 'vi' ? 'Nhập tài sản' : 'Enter asset'
          }
          onChangeText={(value: string) => handleOnchange('asset', value)}
          value={formData.asset}
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {currentLanguage === 'vi' ? 'Hình thức bảo đảm' : 'Security Type'}
        </Text>
        <DropdownComponent
          value={formData.loanSecurityType}
          data={securityTypes}
          placeholder={
            currentLanguage === 'vi' ? 'Chọn hình thức' : 'Select type'
          }
          onChange={(value: TargetItem) =>
            handleOnchange('loanSecurityType', value.value as LoanSecurityType)
          }
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {currentLanguage === 'vi'
            ? 'Loại tài sản đảm bảo'
            : 'Collateral Type'}
        </Text>
        <DropdownComponent
          value={formData.loanCollateralTypes[0]}
          data={collateralTypes}
          placeholder={currentLanguage === 'vi' ? 'Chọn loại' : 'Select type'}
          onChange={(value: TargetItem) =>
            handleOnchange('loanCollateralTypes', [
              value.value as LoanCollateralType,
            ])
          }
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
            {t('formCreateLoan.submit')}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default FormCreateLoan;
