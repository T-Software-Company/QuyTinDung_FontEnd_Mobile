import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header/Header';
import FieldInputLogin from '../components/FieldInputLogin/FieldInputLogin';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../context/ThemeContext';
import {AppIcons} from '../icons';
import {useAuth} from '../context/AuthContext';

const ResultQR = () => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const [form, setForm] = useState({
    firstName: 'Duc',
    lastName: 'Pham',
    fullName: 'Pham Duc',
    identifyId: '123456789',

    // info
    gender: 'Nam',
    ethnicity: 'Kinh',
    religion: 'Không',
    dateOfBirth: '01/01/1990',
    nationality: 'Việt Nam',
    placeOfBirth: 'Hà Nội',
    permanentAddress: 'Hà Nội',
    issueDate: '01/01/2021',
    expirationDate: '01/01/2026',
    issuingAuthority: 'Công an Hà Nội',
    frontPhotoUrl: 'https://i.imgur',
    backPhotoUrl: 'https://i.imgur',
    legalDocType: 'CCCD',
  });
  const {formData, qrData} = route.params;
  const {register, loading, error} = useAuth();
  useEffect(() => {
    if (form.fullName) {
      const nameParts = form.fullName.split(' ');
      const lastName = nameParts[0];
      const firstName = nameParts.slice(1).join(' ');

      setForm(prev => ({
        ...prev,
        firstName,
        lastName,
      }));
    }
  }, [form.fullName]);

  console.log('FORM: ', form);

  useEffect(() => {
    setForm({
      ...form,
      username: formData.phone,
      password: formData.password,
      identifyId: qrData[0],
      fullName: qrData[1],
      dateOfBirth: qrData[2],
      gender: qrData[3],
      permanentAddress: qrData[4],
      issueDate: qrData[5],
    });
  }, [formData]);
  console.log('FORM DATA: ', formData);
  console.log('QR DATA: ', qrData);

  const handleRegister = async () => {
    const userData = {
      ...form,
    };
    console.log('User data:', userData);

    const result = await register(userData);
    console.log('Result:', result);
    // if (result) {
    //   navigation.navigate('Login'); // Navigate to home on success
    // }
  };

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
  });

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        <Header Navbar="ConfirmInfo" navigation={navigation} />
        <ScrollView style={styles.body}>
          {/* Form data fields */}

          <FieldInputLogin
            name="Số CCCD"
            iconSource={AppIcons.email}
            value={form.identifyId}
            editable={false}
            theme={theme}
          />

          <FieldInputLogin
            name="Họ và tên"
            iconSource={AppIcons.email}
            value={form.fullName}
            editable={false}
            theme={theme}
          />

          <FieldInputLogin
            name="Ngày sinh"
            iconSource={AppIcons.email}
            value={form.dateOfBirth}
            editable={false}
            theme={theme}
          />

          <FieldInputLogin
            name="Nơi sinh"
            iconSource={AppIcons.email}
            value={form.placeOfBirth}
            editable={true}
            theme={theme}
          />

          <FieldInputLogin
            name="Giới tính"
            iconSource={AppIcons.email}
            value={form.gender}
            editable={false}
            theme={theme}
          />

          <FieldInputLogin
            name="Địa chỉ thường trú"
            iconSource={AppIcons.email}
            value={form.permanentAddress}
            editable={false}
            theme={theme}
          />

          <FieldInputLogin
            name="Ngày cấp"
            iconSource={AppIcons.email}
            value={form.issueDate}
            editable={false}
            theme={theme}
          />

          <FieldInputLogin
            name="Ngày hết hạn"
            iconSource={AppIcons.email}
            value={form.expirationDate}
            editable={true}
            theme={theme}
          />

          <FieldInputLogin
            name="Nơi cấp"
            iconSource={AppIcons.email}
            value={form.issuingAuthority}
            editable={true}
            theme={theme}
          />

          <FieldInputLogin
            name="Tôn giáo"
            iconSource={AppIcons.email}
            value={form.religion}
            editable={true}
            theme={theme}
          />

          <FieldInputLogin
            name="Dân tộc"
            iconSource={AppIcons.email}
            value={form.ethnicity}
            editable={true}
            theme={theme}
          />

          <FieldInputLogin
            name="Quốc tịch"
            iconSource={AppIcons.email}
            value={form.nationality}
            editable={true}
            theme={theme}
          />

          {error && <Text style={styles.errorText}>{error}</Text>}
        </ScrollView>
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? 'Đang xử lý...' : 'Đăng ký'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ResultQR;
