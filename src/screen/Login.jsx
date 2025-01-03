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
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {AppIcons} from '../icons';
import {useTheme} from '../context/ThemeContext';
import FieldInputLogin from '../components/FieldInputLogin/FieldInputLogin';
import {useTranslation} from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = ({navigation}) => {
  const [formData, setFormData] = useState({
    email: 'admin@gmail.com',
    password: '123456789',
  });
  const [invisible, setInvisible] = useState(true);
  const {theme} = useTheme();
  const {t} = useTranslation();
  const { login, loading, error } = useAuth();

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

  const handleSubmit = async () => {
    const {email, password} = formData;

    // Validation checks
    if (!email || !password) {
      Alert.alert(t('notification.title'), t('login.errors.missingFields'));
      return;
    }

    // if (!isValidEmail(email)) {
    //   Alert.alert(t('notification.title'), t('login.errors.invalidEmail'));
    //   return;
    // }

    // if (password.length < 6) {
    //   Alert.alert(t('notification.title'), t('login.errors.passwordLength'));
    //   return;
    // }

    const result = await login(email, password);
    
    
    if (result === true) {
      navigation.navigate('HomeTabs');
    } else if (error) {
      Alert.alert(t('notification.title'), "sai");
    }
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
    buttonDisabled: {
      opacity: 0.7,
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
          <Text style={styles.title}>{t('login.title')}</Text>

          <View>
            <FieldInputLogin
              name={t('login.username')}
              iconSource={AppIcons.email}
              placeholder={t('login.username')}
              keyboardType="email-address"
              onSetValue={value => handleChange('email', value)}
              value={formData.email}
              theme={theme}
            />

            <FieldInputLogin
              name={t('login.password')}
              iconSource={AppIcons.password}
              placeholder={t('login.password')}
              secureVisible={invisible}
              onSetValue={value => handleChange('password', value)}
              value={formData.password}
              theme={theme}
              touchEyes={true}
              onPressIcon={() => setInvisible(!invisible)}
            />
          </View>
          <View>
            <TouchableOpacity 
              style={[styles.button, loading && styles.buttonDisabled]} 
              onPress={handleSubmit}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.textButton}>{t('login.submit')}</Text>
              )}
            </TouchableOpacity>
            <View style={styles.optionsNew}>
              <Text style={{color: theme.noteText, fontSize: 14}}>
                {t('login.newUser')}{' '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Register');
                }}>
                <Text
                  style={{
                    color: theme.textActive,
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                  {t('login.register')}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ForgetPassword');
              }}>
              <Text
                style={{
                  color: theme.textActive,
                  fontWeight: 'bold',
                  fontSize: 14,
                  textAlign: 'center',
                  marginTop: 20,
                }}>
                {t("login.forgotPassword")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
