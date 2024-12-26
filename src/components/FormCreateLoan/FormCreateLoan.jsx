import {StyleSheet, Text, View, Alert, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import DropdownComponent from '../DropdownComponent/DropdownComponent';
import InputBackground from '../InputBackground/InputBackground';
import {useTranslation} from 'react-i18next';
import i18n from '../../../i18n';

const FormCreateLoan = () => {
  const currentLanguage = i18n.language;

  const [number, setNumber] = useState(null);

  const {t} = useTranslation();

  const rates = [
    {
      value: '1',
      label: '1 tháng',
      rate: '12%',
    },
    {
      value: '2',
      label: '3 tháng',
      rate: '10.5%',
    },

    {
      value: '3',
      label: '12 tháng',
      rate: '8%',
    },
  ];

  const target_loan = [
    {
      value: '1',
      label: 'Mua nhà',
    },
    {
      value: '2',
      label: 'Mua ô tô',
    },

    {
      value: '3',
      label: 'Vay tiêu dùng',
    },
  ];

  const frequency_pay = [
    {
      value: '1',
      label: 'Hàng tuần',
    },
    {
      value: '2',
      label: 'Hàng tháng',
    },
    {
      value: '3',
      label: '2 tháng',
    },
  ];

  const [selectedRate, setSelectedRate] = useState(null);
  const [methodExtend, setMethodExtend] = useState(null);
  const [method, setMethod] = useState(null);
  return (
    <View style={styles.form}>
      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {t('formCreateLoan.loanAmount')}
        </Text>
        <InputBackground
          placeholder={t('formCreateLoan.loanRange')}
          keyboardType="numeric"
          onChange={setNumber}
          value={number}
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>{t('formCreateLoan.termRate')}</Text>
        <DropdownComponent
          value={selectedRate?.value}
          data={rates}
          placeholder={t('formCreateLoan.selectTermRate')}
          onChange={value => {
            setSelectedRate(value);
          }}
        />

        {selectedRate ? (
          <Text style={styles.rateText}>
            {currentLanguage === 'vi'
              ? `Lãi suất của kỳ hạn ${selectedRate.label} là ${selectedRate.rate}`
              : `Interest rate for ${selectedRate.label} is ${selectedRate.rate}`}
          </Text>
        ) : (
          <></>
        )}
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>{t('formCreateLoan.purpose')}</Text>
        <DropdownComponent
          value={methodExtend}
          data={target_loan}
          placeholder={t('formCreateLoan.selectPurpose')}
          onChange={value => {
            setMethodExtend(value);
          }}
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {t('formCreateLoan.paymentFrequency')}
        </Text>
        <DropdownComponent
          value={method}
          data={frequency_pay}
          placeholder={t('formCreateLoan.selectPaymentFrequency')}
          onChange={value => {
            setMethod(value);
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          Alert.alert(
            'Thông báo',
            'Bạn đã tạo khoản vay thành công.\nVui lòng chờ nhân viên hỗ trợ tư vấn và xác nhận.',
          )
        }>
        <Text
          style={[styles.textWhite, {fontWeight: 'bold', textAlign: 'center'}]}>
          {t('formCreateLoan.submit')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormCreateLoan;

const styles = StyleSheet.create({
  boxInput: {
    marginBottom: 12,
  },

  headingTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
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
