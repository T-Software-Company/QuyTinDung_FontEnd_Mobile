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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [idCccd, setIdCccd] = useState('');
  const {theme} = useTheme();

  // Hàm kiểm tra định dạng email
  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex kiểm tra email
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    Alert.alert('Thông báo', 'Chúng tôi đã gửi OTP về số điện thoại của bạn');
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
          <Text style={styles.title}>Quên mật khẩu</Text>

          <View>
            <View style={{marginBottom: 20}}>
              <Text style={styles.heading}>Email / Số điện thoại</Text>
              <View>
                <Image
                  source={require('../../assets/images/email-icon.png')}
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Email / Số điện thoại"
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
              <Text style={styles.heading}>Số CCCD của bạn</Text>
              <View>
                <Image
                  source={require('../../assets/images/password-icon.png')}
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Nhập CCCD"
                  placeholderTextColor="#aaa"
                  keyboardType="numeric"
                  onChangeText={setIdCccd}
                  value={idCccd}
                  style={styles.textInput}
                />
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.textButton}>Quên mật khẩu</Text>
            </TouchableOpacity>
            <View style={styles.optionsNew}>
              <Text style={{color: theme.noteText, fontSize: 14}}>
                Bạn đã nhớ lại mật khẩu.{' '}
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

export default ForgetPassword;
