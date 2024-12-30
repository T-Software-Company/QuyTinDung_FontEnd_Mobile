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
import FieldInputLogin from '../components/FieldInputLogin/FieldInputLogin';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = ({navigation}) => {
  const [formData, setFormData] = useState({
    email: 'demo@gmail.com',
    password: '123456789',
  });
  const [invisible, setInvisible] = useState(true);
  const {theme} = useTheme();

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
    const {email, password} = formData;
    console.log("formData", formData);

    if (!email || !password) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Thông báo', 'Email không hợp lệ!');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Thông báo', 'Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    navigation.navigate('HomeTabs');
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
          <Text style={styles.title}>Đăng nhập</Text>

          <View>
            <FieldInputLogin
              name="Email / Số điện thoại"
              iconSource={AppIcons.email}
              placeholder="Email"
              keyboardType="email-address"
              onSetValue={value => handleChange('email', value)}
              value={formData.email}
              theme={theme}
            />

            <FieldInputLogin
              name="Mật khẩu"
              iconSource={AppIcons.password}
              placeholder="Mật khẩu"
              secureVisible={invisible}
              onSetValue={value => handleChange('password', value)}
              value={formData.password}
              theme={theme}
              touchEyes={true}
              onPressIcon={() => setInvisible(!invisible)}
            />
          </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.textButton}>Đăng nhập</Text>
            </TouchableOpacity>
            <View style={styles.optionsNew}>
              <Text style={{color: theme.noteText, fontSize: 14}}>
                Bạn đang là người mới.{' '}
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
                  Đăng ký
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
                Quên mật khẩu
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
