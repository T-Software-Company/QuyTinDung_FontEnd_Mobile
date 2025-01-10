import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header/Header';
import InputBorder from '../components/InputBorder/InputBorder';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../context/ThemeContext';
import {AppIcons} from '../icons';
import {useAuth} from '../context/AuthContext';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  launchImageLibrary,
} from 'react-native-image-picker';
import UploadImage from '../components/UploadImage/UploadImage';
import {uploadImage} from '../api/uploadImage';

const ResultQR = () => {
  const {theme} = useTheme();
  const {t, i18n} = useTranslation(); // Add i18n from useTranslation
  const route = useRoute();
  const navigation = useNavigation();
  // const {formDataAddress, formDataUser, qrData} = route.params;
  const {register, loading, error} = useAuth();
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [signatureImage, setSignatureImage] = useState(null);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [tempDate, setTempDate] = useState(null);
  const [showAndroidPicker, setShowAndroidPicker] = useState(false);
  const [show, setShow] = useState(false);

  const hideDatePicker = () => setDatePickerVisible(false);

  const formatDate = date => {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${d.getFullYear()}`;
  };

  // Fixed input fields translations
  const inputFields = useMemo(
    () => [
      {
        name: 'identifyId',
        label: t('register.resultScreen.identityNumber'),
        notChange: true,
      },
      {
        name: 'fullName',
        label: t('register.resultScreen.name'),
        notChange: true,
      },
      {
        name: 'dateOfBirth',
        label: t('register.resultScreen.dateOfBirth'),
        notChange: true,
      },
      {
        name: 'gender',
        label: t('register.resultScreen.gender'),
        notChange: true,
      },
      {
        name: 'permanentAddress',
        label: t('register.resultScreen.identityHome'),
        notChange: true,
      },
      {
        name: 'issueDate',
        label: t('register.resultScreen.identitySupplyDay'),
        notChange: true,
      },
      {
        name: 'expirationDate',
        label: t('register.resultScreen.identityDueDay'),
        isDate: true,
        iconSource: AppIcons.email,
        onPress: () => showDatePicker('expirationDate'),
        pointerEvents: 'none',
      },
      {
        name: 'issuingAuthority',
        label: t('register.resultScreen.identityAddress'),
      },
      {
        name: 'placeOfBirth',
        label: t('register.resultScreen.placeOfBirth'),
      },
      {
        name: 'religion',
        label: t('register.resultScreen.religion'),
      },
      {
        name: 'ethnicity',
        label: t('register.resultScreen.ethnicity'),
      },
      {
        name: 'nationality',
        label: t('register.resultScreen.nationality'),
      },
    ],
    [t],
  );

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        placeOfBirth: Yup.string().required(t('register.resultScreen.validationErrors.placeOfBirth')),
        expirationDate: Yup.string().required(t('register.resultScreen.validationErrors.expirationDate')),
        issuingAuthority: Yup.string().required(t('register.resultScreen.validationErrors.issuingAuthority')),
        religion: Yup.string().required(t('register.resultScreen.validationErrors.religion')),
        ethnicity: Yup.string().required(t('register.resultScreen.validationErrors.ethnicity')),
        nationality: Yup.string().required(t('register.resultScreen.validationErrors.nationality')),
        signatureImage: Yup.string().required(t('register.resultScreen.validationErrors.signatureImage')),
        frontImage: Yup.string().required(t('register.resultScreen.validationErrors.frontImage')),
        backImage: Yup.string().required(t('register.resultScreen.validationErrors.backImage')),
      }),
    [t],
  );

  const splitName = useCallback(fullName => {
    if (!fullName) return {lastName: '', firstName: ''};
    const parts = fullName.trim().split(' ');
    const lastName = parts[0];
    const firstName = parts.slice(1).join(' ');
    return {lastName, firstName};
  }, []);

  const initialValues = useMemo(() => {
    // const {lastName, firstName} = splitName(qrData[2]);
    return {
      // address: {
      //   ...formDataAddress,
      // },
      // ...formDataUser,
      // firstName,
      // lastName,

      identifyId: '12345679999',
      fullName: 'Phạm Văn A',
      dateOfBirth: '01/01/1990',
      gender: 'Nam',
      permanentAddress: 'Hà Nội',
      issueDate: '01/01/2021',
      // identifyId: qrData[0] || '',
      // fullName: qrData[2] || '',
      // dateOfBirth: qrData[3] || '',
      // gender: qrData[4],
      // permanentAddress: qrData[5] || '',
      // issueDate: qrData[6] || '',
      ethnicity: 'Kinh',
      religion: 'Không',
      nationality: 'Việt Nam',
      placeOfBirth: '',
      expirationDate: '',
      issuingAuthority: '',
      legalDocType: 'CCCD',
      signatureImage: '',
      frontImage: '',
      backImage: '',
    };
  // }, [qrData, formDataUser, formDataAddress, splitName]);
  }, []);

  // Update Alert messages to use translations
  const handleSubmit = useCallback(
    async (values, {setSubmitting}) => {
      try {
        console.log('Registering with data:', values); // Debug log
        const result = await register(values);
        console.log('Register result:', result); // Debug log
        if (result) {
          // navigation.navigate('Login');
          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        }
      } catch (error) {
        Alert.alert(t('register.resultScreen.title'), error.message);
      } finally {
        setSubmitting(false);
      }
    },
    [register, navigation, t],
  );

  const styles = StyleSheet.create({
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

    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      color: '#333',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: '#f5f5f5',
    },
    backButton: {
      padding: 10,
      marginBottom: 20,
    },
    backText: {
      fontSize: 16,
      color: '#007AFF',
    },
    button: {
      backgroundColor: theme.buttonSubmit,
      padding: 20,
      borderRadius: 16,
      alignItems: 'center',
      marginHorizontal: 20,
      marginBottom: 12,
      marginTop: 12,
    },
    buttonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
      textAlign: 'center',
    },
    buttonDisabled: {
      opacity: 0.7,
    },
    datePickerContainer: {
      backgroundColor: 'white',
      borderRadius: 12,
      height: Platform.OS === 'ios' ? 260 : 'auto',
    },
    datePickerOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    datePickerContainer: {
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 20,
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    datePickerWrapper: {
      height: 200,
      justifyContent: 'center',
    },
    datePickerButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 20,
    },
    datePickerButton: {
      padding: 10,
      minWidth: 100,
      alignItems: 'center',
    },
    datePickerButtonText: {
      color: theme.buttonSubmit,
      fontSize: 16,
      fontWeight: '500',
    },
    imagePickerContainer: {
      marginBottom: 20,
    },
    imagePickerLabel: {
      fontSize: 14,
      marginBottom: 8,
      color: theme.noteText,
    },
    imagePickerButton: {
      borderWidth: 1,
      borderColor: theme.noteText,
      borderRadius: 8,
      padding: 12,
      alignItems: 'center',
    },
    selectedImage: {
      width: '100%',
      height: 200,
      marginTop: 8,
      borderRadius: 8,
    },
  });

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        <Header Navbar="ConfirmInfo" navigation={navigation} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({
            handleSubmit,
            values,
            setFieldValue,
            errors,
            touched,
            isSubmitting,
          }) => {
            // Define showDatePicker function
            const showDatePicker = fieldName => {
              if (Platform.OS === 'android') {
                setShow(true); // Sử dụng state mới để kiểm soát việc hiển thị
              }
              setSelectedField(fieldName);
              setDatePickerVisible(true);
              setTempDate(new Date(values[fieldName] || Date.now()));
            };

            // Map fields with showDatePicker
            const fieldConfigs = inputFields.map(field => {
              if (field.name === 'expirationDate') {
                return {
                  ...field,
                  onPress: () => showDatePicker('expirationDate'),
                };
              }
              return field;
            });

            // Update image picker error handling
            const selectImage = async type => {
              const options = {
                mediaType: 'photo',
                quality: 0.8,
                selectionLimit: 1,
              };

              try {
                const response = await launchImageLibrary(options);
                console.log('Image picker response:', response); // Debug log

                if (response.didCancel) {
                  console.log('User cancelled image picker');
                  return;
                }

                if (response.errorCode) {
                  console.log('ImagePicker Error:', response.errorMessage);
                  Alert.alert(
                    t('register.resultScreen.title'),
                    t('register.resultScreen.imageError'),
                  );
                  return;
                }

                if (response.assets && response.assets[0]) {
                  const image = response.assets[0];
                  try {
                    // Upload image to server
                    const uploadResult = await uploadImage(image);
                    const imageUrl = uploadResult.url; // Adjust based on your API response

                    console.log('Uploaded image URL:', imageUrl); // Debug log
                    // Update state and form values with server URL
                    switch (type) {
                      case 'signature':
                        setSignatureImage({...image, uri: imageUrl});
                        setFieldValue('signatureImage', imageUrl);
                        break;
                      case 'front':
                        setFrontImage({...image, uri: imageUrl});
                        setFieldValue('frontImage', imageUrl);
                        break;
                      case 'back':
                        setBackImage({...image, uri: imageUrl});
                        setFieldValue('backImage', imageUrl);
                        break;
                    }
                  } catch (uploadError) {
                    // console.error(
                    //   'Error uploading image:',
                    //   uploadError.message || uploadError,
                    // );
                    Alert.alert(
                      t('register.resultScreen.title'),
                      t('register.resultScreen.imageError'),
                    );
                  }
                }
              } catch (error) {
                console.error('Error in image picker:', error);
                Alert.alert(
                  t('register.resultScreen.title'),
                  t('register.resultScreen.imageError'),
                );
              }
            };

            // Update validation error alerts
            const onSubmitPress = (values, handleSubmit) => {
              validationSchema
                .validate(values, {abortEarly: false})
                .catch(error => {
                  if (error.inner && error.inner.length > 0) {
                    Alert.alert(t('register.resultScreen.title'), error.inner[0].message);
                  }
                });
              handleSubmit();
            };

            return (
              <>
                <ScrollView style={styles.body}>
                  {fieldConfigs.map((field, index) => (
                    <InputBorder
                      key={index}
                      name={field.label}
                      iconSource={AppIcons.email}
                      value={
                        field.name === 'expirationDate'
                          ? formatDate(values[field.name])
                          : values[field.name]
                      }
                      onSetValue={value => {
                        if (!field.notChange) {
                          setFieldValue(field.name, value);
                        }
                      }}
                      error={touched[field.name] && errors[field.name]}
                      theme={theme}
                      onPress={field.onPress}
                      pointerEvents={field.pointerEvents}
                      notChange={field.notChange}
                    />
                  ))}
                  <UploadImage
                    title={t('register.resultScreen.signatureImage')}
                    theme={theme}
                    typeImage={signatureImage}
                    onSelectImage={() => selectImage('signature')}
                    touched={touched?.signatureImage}
                    errors={errors?.signatureImage}
                  />

                  <UploadImage
                    title={t('register.resultScreen.frontImage')}
                    theme={theme}
                    typeImage={frontImage}
                    onSelectImage={() => selectImage('front')}
                    touched={touched?.frontImage}
                    errors={errors?.frontImage}
                  />

                  <UploadImage
                    title={t('register.resultScreen.backImage')}
                    theme={theme}
                    typeImage={backImage}
                    onSelectImage={() => selectImage('back')}
                    touched={touched?.backImage}
                    errors={errors?.backImage}
                  />
                </ScrollView>

                {Platform.OS === 'ios' ? (
                  // iOS DatePicker
                  isDatePickerVisible && tempDate && (
                    <View style={styles.datePickerOverlay}>
                      <View style={styles.datePickerContainer}>
                        <View style={styles.datePickerWrapper}>
                          <DateTimePicker
                            value={tempDate}
                            mode="date"
                            display="spinner"
                            onChange={(event, date) => {
                              if (date) {
                                setTempDate(date);
                              }
                            }}
                            minimumDate={new Date()}
                            locale={i18n.language === 'vi' ? 'vi-VN' : 'en-US'} // Set locale based on current language
                            textColor="black"
                          />
                        </View>
                        <View style={styles.datePickerButtons}>
                          <TouchableOpacity
                            style={styles.datePickerButton}
                            onPress={() => setDatePickerVisible(false)}>
                            <Text style={styles.datePickerButtonText}>
                              {t('register.resultScreen.datePicker.cancel')}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.datePickerButton}
                            onPress={() => {
                              const formattedDate = tempDate
                                .toISOString()
                                .split('T')[0];
                              setFieldValue(selectedField, formattedDate);
                              setDatePickerVisible(false);
                            }}>
                            <Text style={styles.datePickerButtonText}>
                              {t('register.resultScreen.datePicker.confirm')}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  )
                ) : (
                  // Android DatePicker
                  show && (
                    <DateTimePicker
                      value={tempDate || new Date()}
                      mode="date"
                      is24Hour={true}
                      display="spinner"
                      onChange={(event, date) => {
                        setShow(false); // Ẩn picker sau khi chọn
                        if (event.type === 'set' && date) {
                          const formattedDate = date
                            .toISOString()
                            .split('T')[0];
                          setFieldValue(selectedField, formattedDate);
                          setTempDate(date);
                        }
                      }}
                      minimumDate={new Date()}
                      locale={i18n.language === 'vi' ? 'vi-VN' : 'en-US'} // Set locale for Android too
                    />
                  )
                )}

                <TouchableOpacity
                  style={[styles.button, isSubmitting && styles.buttonDisabled]}
                  disabled={isSubmitting}
                  onPress={() => onSubmitPress(values, handleSubmit)}>
                  <Text style={styles.buttonText}>
                    {isSubmitting ? t('register.resultScreen.processing') : t('register.resultScreen.submit')}
                  </Text>
                </TouchableOpacity>
              </>
            );
          }}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default ResultQR;
