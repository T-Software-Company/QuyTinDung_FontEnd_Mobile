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
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {AppIcons} from '../icons';
import {useTheme} from '../context/ThemeContext';
import {useTranslation} from 'react-i18next';
import FieldInputLogin from '../components/FieldInputLogin/FieldInputLogin';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [idCccd, setIdCccd] = useState('');
  const {theme} = useTheme();
  const {t} = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    idCccd: '',
  });

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

  const handleSubmit = () => {
    Alert.alert(t('forgetPassword.notification'), t('forgetPassword.otpSent'));
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
      lineHeight: 48,
      marginBottom: 38,
    },
    icon: {
      position: 'absolute',
      left: 0,
      top: 0,
      tintColor: theme.iconColor,
    },
    iconEyes: {
      position: 'absolute',
      right: 0,
    },
    heading: {
      fontSize: 14,
      marginBottom: 16,
      color: theme.noteText,
    },
    textInput: {
      borderBottomColor: theme.noteText,
      borderBottomWidth: 1,
      height: 32,
      paddingLeft: 40,
      paddingRight: 30,
      paddingBottom: 10,
      color: theme.text,
      paddingVertical: 0,
      textAlignVertical: 'center',
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
          <Text style={styles.title}>{t('forgetPassword.title')}</Text>

          <View>
            <FieldInputLogin
              name={t('forgetPassword.email')}
              iconSource={AppIcons.email}
              placeholder={t('forgetPassword.email')}
              onSetValue={value => handleChange('email', value)}
              value={formData.email}
              theme={theme}
              keyboardType={'email-address'}
            />
            <FieldInputLogin
              name={t('forgetPassword.identityNumber')}
              iconSource={AppIcons.password}
              placeholder={t('forgetPassword.identityNumber')}
              onSetValue={value => handleChange('idCccd', value)}
              value={formData.idCccd}
              theme={theme}
              keyboardType={'numeric'}
            />
          </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.textButton}>
                {t('forgetPassword.submit')}
              </Text>
            </TouchableOpacity>
            <View style={styles.optionsNew}>
              <Text style={{color: theme.noteText, fontSize: 14}}>
                {t('forgetPassword.remember')}{' '}
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
                  {t('forgetPassword.login')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgetPassword;
