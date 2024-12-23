import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import DropdownComponent from '../DropdownComponent/DropdownComponent';
import InputBackground from '../InputBackground/InputBackground';
import {useTranslation} from 'react-i18next';
import i18n from '../../../i18n';

const FormCreateSave = () => {
  const currentLanguage = i18n.language;

  const [value, setValue] = useState(null);
  const {t} = useTranslation();
  const rates = [
    {
      value: '1',
      label: `5 ${t('formCreateSave.month')}`,
      rate: '4%',
    },
    {
      value: '2',
      label: `8  ${t('formCreateSave.month')}`,
      rate: '5%',
    },

    {
      value: '3',
      label: `12  ${t('formCreateSave.month')}`,
      rate: '5.5%',
    },
  ];

  const method_extend = [
    {
      value: '1',
      label: 'Gộp cả lãi',
    },
    {
      value: '2',
      label: 'Trả lãi gốc',
    },

    {
      value: '3',
      label: 'Trả lãi hàng tháng',
    },
  ];

  const method_pay = [
    {
      value: '1',
      label: 'Online',
    },
    {
      value: '2',
      label: `${t('formCreateSave.staff')}`,
    },
  ];

  const [selectedRate, setSelectedRate] = useState(null);
  const [methodExtend, setMethodExtend] = useState(null);
  const [method, setMethod] = useState(null);

  return (
    <View style={styles.form}>
      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {t('formCreateSave.depositAmount')}
        </Text>
        <InputBackground
          value={value}
          onChange={setValue}
          placeholder={t('formCreateSave.depositRange')}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>{t('formCreateSave.termRate')}</Text>
        <DropdownComponent
          data={rates}
          placeholder={t('formCreateSave.selectTermRate')}
          value={selectedRate?.value}
          onChange={value => {
            setSelectedRate(value);
          }}
        />

        {selectedRate ? (
          <Text style={styles.rateText}>
           {currentLanguage === "vi" ? `Lãi suất của kỳ hạn ${selectedRate.label} là ${selectedRate.rate}` : 
           `Interest rate for ${selectedRate.label} is ${selectedRate.rate}`
           }
          </Text>
        ) : (
          <></>
        )}
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {t('formCreateSave.renewalMethod')}
        </Text>

        <DropdownComponent
          data={method_extend}
          placeholder={t('formCreateSave.renewalOptions')}
          value={methodExtend?.value}
          onChange={value => {
            setMethodExtend(value);
          }}
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {t('formCreateSave.paymentMethod')}
        </Text>
        <DropdownComponent
          data={method_pay}
          placeholder={t('formCreateSave.selectPaymentMethod')}
          value={method}
          onChange={value => {
            setMethod(value);
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => Alert.alert('Thông báo', 'Bạn đã gửi thành công')}>
        <Text
          style={[styles.textWhite, {fontWeight: 'bold', textAlign: 'center'}]}>
          {t('formCreateSave.submit')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormCreateSave;

const styles = StyleSheet.create({
  boxInput: {
    marginBottom: 12,
  },

  headingTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
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

  rateText: {
    marginTop: 12,
    fontSize: 14,
    color: '#007BFF',
  },
  textWhite: {
    color: 'white',
  },
});
