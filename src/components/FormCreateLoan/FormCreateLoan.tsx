/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Alert, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import DropdownComponent from '../DropdownComponent/DropdownComponent';
import InputBackground from '../InputBackground/InputBackground';
import {useTranslation} from 'react-i18next';
import i18n from '../../../i18n';
import {Theme} from '../../theme/colors';

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

interface FormData {
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

  const [formData, setFormData] = useState<FormData>({
    value: null,
    selectedRate: null,
    methodExtend: null,
    method: null,
  });

  const handleOnchange = (field: keyof FormData, value: any): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
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
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          const message =
            currentLanguage === 'vi' ? notification.vi : notification.en;
          // Handle showing notification message here
          Alert.alert(
            currentLanguage === 'vi' ? 'Thông báo' : 'Notification',
            message,
          );
        }}>
        <Text
          style={[styles.textWhite, {fontWeight: 'bold', textAlign: 'center'}]}>
          {t('formCreateLoan.submit')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormCreateLoan;
