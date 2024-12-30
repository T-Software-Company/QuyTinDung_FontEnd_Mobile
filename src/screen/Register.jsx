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
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Thông báo', 'Email không hợp lệ!');
      return;
    }

    if (!isValidPhoneNumber(phone)) {
      Alert.alert('Thông báo', 'Số điện thoại không hợp lệ!');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Thông báo', 'Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Thông báo', 'Mật khẩu và xác nhận mật khẩu không khớp!');
      return;
    }

    Alert.alert(
      'Thông báo',
      'Đăng ký thành công!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'), // Chuyển hướng đến trang Success
        },
      ],
      {cancelable: false},
    );
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
          <Text style={styles.title}>Đăng Ký</Text>

          <View>
            <FieldInputLogin
              name={'Họ và tên'}
              iconSource={AppIcons.email}
              placeholder={'Họ và tên'}
              onSetValue={value => handleChange('name', value)}
              value={formData.name}
              theme={theme}
            />

            <FieldInputLogin
              name={'Số điện thoại'}
              iconSource={AppIcons.phone}
              placeholder={'Số điện thoại'}
              onSetValue={value => handleChange('phone', value)}
              value={formData.phone}
              theme={theme}
              keyboardType={'numeric'}
            />

            <FieldInputLogin
              name={'Email'}
              iconSource={AppIcons.email}
              placeholder={'Email'}
              onSetValue={value => handleChange('email', value)}
              value={formData.email}
              theme={theme}
              keyboardType={'email-address'}
            />
            <FieldInputLogin
              name={'Mật khẩu'}
              iconSource={AppIcons.password}
              placeholder={'Mật khẩu'}
              onSetValue={value => handleChange('password', value)}
              value={formData.password}
              theme={theme}
              secureVisible={invisible}
              onPressIcon={() => setInvisible(!invisible)}
              touchEyes={true}
            />
            <FieldInputLogin
              name={'Xác nhận mật khẩu'}
              iconSource={AppIcons.password}
              placeholder={'Xác nhận mật khẩu'}
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
              <Text style={styles.textButton}>Đăng Ký</Text>
            </TouchableOpacity>
            <View style={styles.optionsNew}>
              <Text style={{color: theme.noteText, fontSize: 14}}>
                Bạn đã có tài khoản.{' '}
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
                  Đăng nhập
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
