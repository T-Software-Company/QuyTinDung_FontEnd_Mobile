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

const Login = ({navigation}) => {
  const [email, setEmail] = useState('demo@gmail.com');
  const [password, setPassword] = useState('123456789');
  const [invisible, setInvisible] = useState(true);
  const {theme} = useTheme();

  // Hàm kiểm tra định dạng email
  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex kiểm tra email
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
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
    icon: {
      position: 'absolute',
      left: 0,
      top: 0,
      tintColor: theme.iconColor
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
      borderBottomColor: '#f4f4f4',
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
          <Text style={styles.title}>Đăng nhập</Text>

          <View>
            <View style={{marginBottom: 20}}>
              <Text style={styles.heading}>Email / Số điện thoại</Text>
              <View>
                <Image source={AppIcons.email} style={styles.icon} />
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={theme.noteText}
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
                  placeholderTextColor={theme.noteText}
                  secureTextEntry={invisible}
                  onChangeText={setPassword}
                  value={password}
                  style={styles.textInput}
                />
                <TouchableOpacity
                  style={styles.iconEyes}
                  onPress={() => setInvisible(!invisible)}>
                  {invisible ? (
                    <Image source={AppIcons.eyesOpen} style={{tintColor: theme.iconColor}} />
                  ) : (
                    <Image
                      style={{
                        bottom: Platform.OS === 'ios' ? 4 : 4,
                        paddingVertical: 0,
                        textAlignVertical: 'center',
                        tintColor: theme.iconColor
                      }}
                      source={AppIcons.eyesClose}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
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


