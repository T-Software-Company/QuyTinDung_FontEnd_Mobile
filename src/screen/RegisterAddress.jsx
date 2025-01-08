import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useMemo, useCallback} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {AppIcons} from '../icons';
import {useTheme} from '../context/ThemeContext';
import InputBorder from '../components/InputBorder/InputBorder';
import {useTranslation} from 'react-i18next';
import Header from '../components/Header/Header';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RegisterAddress = ({navigation, route}) => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const previousFormData = route.params?.formDataUser || {};

  // Validation Schema
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        country: Yup.string()
          .trim()
          .required(t('registerAddress.errors.country')),
        cityProvince: Yup.string()
          .trim()
          .required(t('registerAddress.errors.cityProvince')),
        district: Yup.string()
          .trim()
          .required(t('registerAddress.errors.district')),
        wardOrCommune: Yup.string()
          .trim()
          .required(t('registerAddress.errors.wardOrCommune')),
        streetAddress: Yup.string()
          .trim()
          .required(t('registerAddress.errors.streetAddress')),
      }),
    [t],
  );

  // Handle Form Submission
  const handleSubmit = useCallback(
    values => {
      navigation.navigate('NotificationScan', {
        formDataAddress: {
          ...values,
        },
        formDataUser: previousFormData,
      });
    },
    [navigation, previousFormData, validationSchema, t],
  );

  // Input Fields Configuration
  const inputFields = useMemo(
    () => [
      {
        name: 'country',
        label: 'Quốc gia',
        placeholder: 'Nhập quốc gia',
      },
      {
        name: 'cityProvince',
        label: 'Tỉnh/Thành phố',
        placeholder: 'Nhập tỉnh/thành phố',
      },
      {
        name: 'district',
        label: 'Quận/Huyện',
        placeholder: 'Nhập quận/huyện',
      },
      {
        name: 'wardOrCommune',
        label: 'Phường/Xã',
        placeholder: 'Nhập phường/xã',
      },
      {
        name: 'streetAddress',
        label: 'Nhập số nhà, tên đường',
        placeholder: 'Nhập số nhà, tên đường',
      },
    ],
    [],
  );

  // Styles
  const styles = useMemo(
    () =>
      StyleSheet.create({
        view: {
          flex: 1,
          backgroundColor: theme.background,
        },
        container: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
        body: {
          paddingTop: 8,
          marginTop: 12,
          paddingHorizontal: 20,
          paddingBottom: 8,
        },
        button: {
          backgroundColor: theme.buttonSubmit,
          padding: 20,
          alignItems: 'center',
          borderRadius: 16,
          marginHorizontal: 20,
          marginBottom: 16,
        },
        title: {
          color: theme.text,
          fontSize: 32,
          lineHeight: 32,
          marginBottom: 38,
        },

        textButton: {
          color: '#fff',
          fontSize: 14,
          fontWeight: 'bold',
        },
      }),
    [theme],
  );

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        <Header Navbar="ConfirmAddress" navigation={navigation} />

        <Formik
          initialValues={{
            country: 'Vietnam',
            cityProvince: 'Saigon',
            district: 'Quan 1',
            wardOrCommune: 'Phuong 1',
            streetAddress: 'Hoang Sa',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({
            handleSubmit,
            values,
            setFieldValue,
            errors,
            touched,
            setTouched,
            isSubmitting,
            resetForm,
          }) => (
            <>
              <ScrollView style={styles.body}>
                <View>
                  {inputFields.map((field, index) => (
                    <InputBorder
                      key={index}
                      name={field.label}
                      iconSource={AppIcons.location}
                      placeholder={field.placeholder}
                      onSetValue={value => {
                        setFieldValue(field.name, value);
                        setTouched({...touched, [field.name]: true});
                      }}
                      value={values[field.name]}
                      theme={theme}
                      error={errors[field.name]}
                    />
                  ))}
                </View>
              </ScrollView>

              <View>
                <TouchableOpacity
                  style={[styles.button, isSubmitting && {opacity: 0.7}]}
                  disabled={isSubmitting}
                  onPress={() => {
                    validationSchema
                      .validate(values, {abortEarly: false})
                      .catch(error => {
                        if (error.inner && error.inner.length > 0) {
                          Alert.alert(t('Thông báo'), error.inner[0].message);
                        }
                      });
                    handleSubmit();
                    resetForm({ values }); // Add this line to reset the submission state
                  }}>
                  <Text style={styles.textButton}>
                    {isSubmitting
                      ? t('registerAddress.submitting')
                      : t('registerAddress.submit')}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default RegisterAddress;
