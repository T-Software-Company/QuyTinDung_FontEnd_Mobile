import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Platform,
  Dimensions,
  Image,
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
  ImageLibraryOptions,
} from 'react-native-image-picker';

const ResultQR = () => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const {formData, qrData} = route.params;
  const {register, loading, error} = useAuth();
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const showDatePicker = fieldName => {
    setSelectedField(fieldName);
    setDatePickerVisible(true);
  };
  const hideDatePicker = () => setDatePickerVisible(false);

  const formatDate = date => {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${d.getFullYear()}`;
  };

  // Input Fields Configuration
  const inputFields = useMemo(
    () => [
      {
        name: 'identifyId',
        label: 'Số CCCD',
        editable: false,
      },
      {
        name: 'fullName',
        label: 'Họ và tên',
        editable: false,
      },
      {
        name: 'dateOfBirth',
        label: 'Ngày sinh',
        editable: false,
      },

      {
        name: 'gender',
        label: 'Giới tính',
        editable: false,
      },
      {
        name: 'permanentAddress',
        label: 'Địa chỉ thường trú',
        editable: false,
      },
      {
        name: 'issueDate',
        label: 'Ngày cấp',
        editable: false,
      },
      {
        name: 'expirationDate',
        label: 'Ngày hết hạn',
        editable: false,
        isDate: true,
        iconSource: AppIcons.email, // Add calendar icon if you have one
        onPress: () => {
          console.log('Opening date picker'); // For debugging
          showDatePicker('expirationDate');
        },
        pointerEvents: 'none',
        editable: true,
      },
      {
        name: 'issuingAuthority',
        label: 'Nơi cấp',
        editable: true,
      },
      {
        name: 'placeOfBirth',
        label: 'Nơi sinh',
        editable: true,
      },
      {
        name: 'religion',
        label: 'Tôn giáo',
        editable: true,
      },
      {
        name: 'ethnicity',
        label: 'Dân tộc',
        editable: true,
      },
      {
        name: 'nationality',
        label: 'Quốc tịch',
        editable: true,
      },
    ],
    [],
  );

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        placeOfBirth: Yup.string().required('Vui lòng nhập nơi sinh'),
        expirationDate: Yup.string().required('Vui lòng nhập ngày hết hạn'),
        issuingAuthority: Yup.string().required('Vui lòng nhập nơi cấp'),
        religion: Yup.string().required('Vui lòng nhập tôn giáo'),
        ethnicity: Yup.string().required('Vui lòng nhập dân tộc'),
        nationality: Yup.string().required('Vui lòng nhập quốc tịch'),
        frontImage: Yup.string().required('Vui lòng chọn ảnh mặt trước CCCD'),
        backImage: Yup.string().required('Vui lòng chọn ảnh mặt sau CCCD'),
      }),
    [],
  );

  const splitName = useCallback(fullName => {
    if (!fullName) return {lastName: '', firstName: ''};
    const parts = fullName.trim().split(' ');
    const lastName = parts[0];
    const firstName = parts.slice(1).join(' ');
    return {lastName, firstName};
  }, []);

  const initialValues = useMemo(() => {
    const {lastName, firstName} = splitName(qrData[1]);
    return {
      firstName,
      lastName,
      fullName: qrData[1] || '',
      identifyId: qrData[0] || '',
      gender: qrData[3] || '',
      ethnicity: 'Kinh',
      religion: 'Không',
      dateOfBirth: qrData[2] || '',
      nationality: 'Việt Nam',
      placeOfBirth: '',
      permanentAddress: qrData[4] || '',
      issueDate: qrData[5] || '',
      expirationDate: '',
      issuingAuthority: '',
      username: formData?.phone || '',
      password: formData?.password || '',
      legalDocType: 'CCCD',
      frontImage: '',
      backImage: '',
    };
  }, [qrData, formData, splitName]);

  const handleSubmit = useCallback(
    async (values, {setSubmitting}) => {
      try {
        console.log('Registering with data:', values); // Debug log
        const result = await register(values);
        console.log('Register result:', result); // Debug log
        if (result) {
          navigation.navigate('Login');
        }
      } catch (error) {
        Alert.alert('Thông báo', error.message);
      } finally {
        setSubmitting(false);
      }
    },
    [register, navigation],
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
      marginBottom: 16,
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
                  Alert.alert('Lỗi', 'Không thể chọn ảnh, vui lòng thử lại');
                  return;
                }

                if (response.assets && response.assets[0]) {
                  const image = response.assets[0];
                  if (type === 'front') {
                    setFrontImage(image);
                    setFieldValue('frontImage', image.uri);
                  } else {
                    setBackImage(image);
                    setFieldValue('backImage', image.uri);
                  }
                }
              } catch (error) {
                console.error('Error in image picker:', error);
                Alert.alert('Lỗi', 'Không thể chọn ảnh, vui lòng thử lại');
              }
            };

            return (
              <>
                <ScrollView style={styles.body}>
                  {inputFields.map((field, index) => (
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
                        if (field.editable) {
                          setFieldValue(field.name, value);
                        }
                      }}
                      error={touched[field.name] && errors[field.name]}
                      editable={field.editable}
                      theme={theme}
                      onPress={field.onPress}
                      pointerEvents={field.pointerEvents}
                    />
                  ))}

                  <View style={styles.imagePickerContainer}>
                    <Text style={styles.imagePickerLabel}>
                      Ảnh mặt trước CCCD
                    </Text>
                    <TouchableOpacity
                      style={styles.imagePickerButton}
                      onPress={() => selectImage('front')}>
                      <Text style={{color: theme.text}}>
                        {frontImage ? 'Thay đổi ảnh' : 'Chọn ảnh'}
                      </Text>
                    </TouchableOpacity>
                    {frontImage && (
                      <Image
                        source={{uri: frontImage.uri}}
                        style={styles.selectedImage}
                        resizeMode="cover"
                      />
                    )}
                    {touched.frontImage && errors.frontImage && (
                      <Text style={styles.errorText}>{errors.frontImage}</Text>
                    )}
                  </View>

                  <View style={styles.imagePickerContainer}>
                    <Text style={styles.imagePickerLabel}>
                      Ảnh mặt sau CCCD
                    </Text>
                    <TouchableOpacity
                      style={styles.imagePickerButton}
                      onPress={() => selectImage('back')}>
                      <Text style={{color: theme.text}}>
                        {backImage ? 'Thay đổi ảnh' : 'Chọn ảnh'}
                      </Text>
                    </TouchableOpacity>
                    {backImage && (
                      <Image
                        source={{uri: backImage.uri}}
                        style={styles.selectedImage}
                        resizeMode="cover"
                      />
                    )}
                    {touched.backImage && errors.backImage && (
                      <Text style={styles.errorText}>{errors.backImage}</Text>
                    )}
                  </View>
                </ScrollView>

                {isDatePickerVisible && (
                  <View style={styles.datePickerOverlay}>
                    <View style={styles.datePickerContainer}>
                      <View style={styles.datePickerWrapper}>
                        {Platform.OS === 'ios' ? (
                          <DateTimePicker
                            value={
                              values[selectedField]
                                ? new Date(values[selectedField])
                                : new Date()
                            }
                            mode="date"
                            display="spinner"
                            onChange={(event, date) => {
                              if (date) {
                                setFieldValue(
                                  selectedField,
                                  date.toISOString(),
                                );
                              }
                            }}
                            minimumDate={new Date()}
                            locale="vi-VN"
                            textColor="black"
                          />
                        ) : (
                          <DateTimePicker
                            value={
                              values[selectedField]
                                ? new Date(values[selectedField])
                                : new Date()
                            }
                            mode="date"
                            display="default"
                            onChange={(event, date) => {
                              if (event.type === 'set' && date) {
                                setFieldValue(
                                  selectedField,
                                  date.toISOString(),
                                );
                                setDatePickerVisible(false);
                              } else {
                                setDatePickerVisible(false);
                              }
                            }}
                            minimumDate={new Date()}
                          />
                        )}
                      </View>
                      {Platform.OS === 'ios' && (
                        <View style={styles.datePickerButtons}>
                          <TouchableOpacity
                            style={styles.datePickerButton}
                            onPress={() => setDatePickerVisible(false)}>
                            <Text style={styles.datePickerButtonText}>Hủy</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.datePickerButton}
                            onPress={() => setDatePickerVisible(false)}>
                            <Text style={styles.datePickerButtonText}>
                              Xác nhận
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>
                )}

                <TouchableOpacity
                  style={[styles.button, isSubmitting && styles.buttonDisabled]}
                  disabled={isSubmitting}
                  onPress={() => {
                    validationSchema
                      .validate(values, {abortEarly: false})
                      .catch(error => {
                        if (error.inner && error.inner.length > 0) {
                          Alert.alert('Thông báo', error.inner[0].message);
                        }
                      });
                    handleSubmit();
                  }}>
                  <Text style={styles.buttonText}>
                    {isSubmitting ? 'Đang xử lý...' : 'Đăng ký'}
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
