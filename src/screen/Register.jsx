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
} from 'react-native';
import React, {useState} from 'react';
import {AppIcons} from '../icons';
import {useTheme} from '../context/ThemeContext';
import FieldInputLogin from '../components/FieldInputLogin/FieldInputLogin';
import {useTranslation} from 'react-i18next';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Register = ({navigation}) => {
  const [formData, setFormData] = useState({
    name: 'demo',
    phone: '0123456789',
    email: 'demo@gmail.com',
    password: '123456789',
    confirmPassword: '123456789',
  });
  const [invisible, setInvisible] = useState(true);
  const [invisibleConfirm, setInvisibleConfirm] = useState(true);
  const {theme} = useTheme();
  const {t} = useTranslation();


  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Hàm kiểm tra định dạng email
  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex kiểm tra email
    return emailRegex.test(email);
  };

  // Hàm kiểm tra số điện thoại
  const isValidPhoneNumber = phone => {
    const phoneRegex = /^\d{10}$/; // Regex kiểm tra số điện thoại (10 số)
    return phoneRegex.test(phone);
  };

  const handleSubmit = () => {
    const {name, phone, email, password, confirmPassword} = formData;

    if (!name || !phone || !email || !password || !confirmPassword) {
      Alert.alert(t('notification.title'), t('register.errors.missingFields'));
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert(t('notification.title'), t('register.errors.invalidEmail'));
      return;
    }

    if (!isValidPhoneNumber(phone)) {
      Alert.alert(t('notification.title'), t('register.errors.invalidPhone'));
      return;
    }

    if (password.length < 6) {
      Alert.alert(t('notification.title'), t('register.errors.passwordLength'));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(t('notification.title'), t('register.errors.passwordMismatch'));
      return;
    }

    // Thay đổi cách navigate để truyền formData
    navigation.navigate('NotificationScan', { formData });
  };

  const styles = StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      width: '100%',
      height: '100%',
    },
    button: {
      backgroundColor: '#0066ff',
      padding: 20,
      alignItems: 'center',
      borderRadius: 16,
      marginTop: 20,
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
    optionsNew: {
      marginTop: 28,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            height: 'auto',
            paddingHorizontal: 20,
            marginTop: 0.1 * windowHeight,
          }}>
          <Text style={styles.title}>{t('register.title')}</Text>

          <View>
            <FieldInputLogin
              name={t('register.name')}
              iconSource={AppIcons.email}
              placeholder={t('register.name')}
              onSetValue={value => handleChange('name', value)}
              value={formData.name}
              theme={theme}
            />

            <FieldInputLogin
              name={t('register.phone')}
              iconSource={AppIcons.phone}
              placeholder={t('register.phone')}
              onSetValue={value => handleChange('phone', value)}
              value={formData.phone}
              theme={theme}
              keyboardType={'numeric'}
            />

            <FieldInputLogin
              name={t('register.email')}
              iconSource={AppIcons.email}
              placeholder={t('register.email')}
              onSetValue={value => handleChange('email', value)}
              value={formData.email}
              theme={theme}
              keyboardType={'email-address'}
            />
            <FieldInputLogin
              name={t('register.password')}
              iconSource={AppIcons.password}
              placeholder={t('register.password')}
              onSetValue={value => handleChange('password', value)}
              value={formData.password}
              theme={theme}
              secureVisible={invisible}
              onPressIcon={() => setInvisible(!invisible)}
              touchEyes={true}
            />
            <FieldInputLogin
              name={t('register.confirmPassword')}
              iconSource={AppIcons.password}
              placeholder={t('register.confirmPassword')}
              onSetValue={value => handleChange('confirmPassword', value)}
              value={formData.confirmPassword}
              theme={theme}
              secureVisible={invisibleConfirm}
              onPressIcon={() => setInvisibleConfirm(!invisibleConfirm)}
              touchEyes={true}
            />
          </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.textButton}>{t("register.submit")}</Text>
            </TouchableOpacity>
            <View style={styles.optionsNew}>
              <Text style={{color: theme.noteText, fontSize: 14}}>
                {t("register.haveAccount")}{' '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Text
                  style={{
                    color: theme.textActive,
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                  {t("register.login")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
