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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Register = ({navigation}) => {
  const [name, setName] = useState('demo');
  const [phone, setPhone] = useState('0123456789');
  const [email, setEmail] = useState('demo@gmail.com');
  const [password, setPassword] = useState('123456789');
  const [confirmPassword, setConfirmPassword] = useState('123456789');
  const [invisible, setInvisible] = useState(true);
  const [invisibleConfirm, setInvisibleConfirm] = useState(true);
  const {theme} = useTheme();

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
    icon: {
      position: 'absolute',
      left: 0,
      top: 0,
      tintColor: theme.iconColor,
    },
    iconEyesBtn: {
      position: 'absolute',
      right: 0,
    },
    iconEyes: {
      tintColor: theme.iconColor,
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
          <Text style={styles.title}>Đăng Ký</Text>

          <View>
            <View style={{marginBottom: 20}}>
              <Text style={styles.heading}>Họ và tên</Text>
              <View>
                <Image source={AppIcons.email} style={styles.icon} />
                <TextInput
                  placeholder="Họ và tên"
                  placeholderTextColor="#aaa"
                  keyboardType="email-address"
                  onChangeText={setName}
                  value={name}
                  style={styles.textInput}
                  autoCapitalize="none"
                />
              </View>
            </View>
            <View style={{marginBottom: 20}}>
              <Text style={styles.heading}>Số điện thoại</Text>
              <View>
                <Image
                  source={require('../../assets/images/phone-icon.png')}
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Số điện thoại"
                  placeholderTextColor="#aaa"
                  keyboardType="numeric"
                  onChangeText={setPhone}
                  value={phone}
                  style={styles.textInput}
                  autoCapitalize="none"
                />
              </View>
            </View>
            <View style={{marginBottom: 20}}>
              <Text style={styles.heading}>Email</Text>
              <View>
                <Image source={AppIcons.email} style={styles.icon} />
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#aaa"
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  value={email}
                  style={styles.textInput}
                  autoCapitalize="none"
                />
              </View>
            </View>
            <View style={{marginBottom: 20}}>
              <Text style={styles.heading}>Mật khẩu</Text>
              <View>
                <Image source={AppIcons.password} style={styles.icon} />
                <TextInput
                  placeholder="Mật khẩu"
                  placeholderTextColor="#aaa"
                  secureTextEntry={invisible}
                  onChangeText={setPassword}
                  value={password}
                  style={styles.textInput}
                />
                <TouchableOpacity
                  style={styles.iconEyesBtn}
                  onPress={() => setInvisible(!invisible)}>
                  {invisible ? (
                    <Image source={AppIcons.eyesOpen} style={styles.iconEyes} />
                  ) : (
                    <Image
                      style={[
                        styles.iconEyes,
                        {
                          bottom: Platform.OS === 'ios' ? 4 : 4,
                          paddingVertical: 0,
                          textAlignVertical: 'center',
                        },
                      ]}
                      source={AppIcons.eyesClose}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginBottom: 20}}>
              <Text style={styles.heading}>Xác nhận mật khẩu</Text>
              <View>
                <Image source={AppIcons.password} style={styles.icon} />
                <TextInput
                  placeholder="Xác nhận mật khẩu"
                  placeholderTextColor="#aaa"
                  secureTextEntry={invisibleConfirm}
                  onChangeText={setConfirmPassword}
                  value={confirmPassword}
                  style={styles.textInput}
                />
                <TouchableOpacity
                  style={styles.iconEyesBtn}
                  onPress={() => setInvisibleConfirm(!invisibleConfirm)}>
                  {invisibleConfirm ? (
                    <Image source={AppIcons.eyesOpen} style={styles.iconEyes} />
                  ) : (
                    <Image
                      style={[
                        styles.iconEyes,
                        {
                          bottom: Platform.OS === 'ios' ? 4 : 4,
                          paddingVertical: 0,
                          textAlignVertical: 'center',
                        },
                      ]}
                      source={AppIcons.eyesClose}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
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
