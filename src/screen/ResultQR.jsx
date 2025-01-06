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

const ResultQR = () => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const [form, setForm] = useState({});
  const {formData, qrData} = route.params;

  useEffect(() => {
    setForm({
      ...form,
      phone: formData.phone,
      email: formData.email,
      idCccd: qrData[0],
      name: qrData[1],
      birthday: qrData[2],
      gender: qrData[3],
      address: qrData[4],
      dateSupply: qrData[5],
    });
  }, [formData]);
  console.log('FORM DATA: ', formData);
  console.log('QR DATA: ', qrData);

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
      justifyContent: "space-between"
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
    }
  });

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        <Header Navbar="ConfirmInfo" navigation={navigation} />
        <ScrollView style={styles.body}>
          {/* Form data fields */}
          <FieldInputLogin
            name="Email"
            iconSource={AppIcons.email}
            value={form.email}
            editable={false}
            theme={theme}
          />
          <FieldInputLogin
            name="Số điện thoại"
            iconSource={AppIcons.phone}
            value={form.phone}
            editable={false}
            theme={theme}
          />
          <FieldInputLogin
            name="Số CCCD"
            iconSource={AppIcons.email}
            value={form.idCccd}
            editable={false}
            theme={theme}
          />

          <FieldInputLogin
            name="Họ và tên"
            iconSource={AppIcons.email}
            value={form.name}
            editable={false}
            theme={theme}
          />

          <FieldInputLogin
            name="Ngày sinh"
            iconSource={AppIcons.email}
            value={form.birthday}
            editable={false}
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
            name="Địa chỉ"
            iconSource={AppIcons.email}
            value={form.address}
            editable={false}
            theme={theme}
          />

          <FieldInputLogin
            name="Ngày cấp"
            iconSource={AppIcons.email}
            value={form.dateSupply}
            editable={false}
            theme={theme}
          />
        </ScrollView>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ResultQR;
