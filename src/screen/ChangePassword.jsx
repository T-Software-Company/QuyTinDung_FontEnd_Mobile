import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Dropdown, SelectCountry} from 'react-native-element-dropdown';

import React, {useState} from 'react';

const ChangePassword = ({navigation}) => {
    const [currentPassword, setCurrentPassword] = useState("12345678")
  const [password, setPassword] = useState('123456789');
  const [confirmPassword, setConfirmPassword] = useState('123456789');
  const [invisibleCurrent, setInvisibleCurrent] = useState(true);
  const [invisible, setInvisible] = useState(true);
  const [invisibleConfirm, setInvisibleConfirm] = useState(true);

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        {/* Heading */}

        <View style={styles.containHeading}>
          <TouchableOpacity
            style={styles.borderArrow}
            onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/images/arrow-left.png')} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>Thay đổi mật khẩu</Text>
          </View>
          <TouchableOpacity style={[styles.borderArrow, styles.hidden]}>
            <Image
              source={require('../../assets/images/notification-icon.png')}
            />
          </TouchableOpacity>
        </View>

        {/* Body */}

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <View style={styles.form}>
              <View style={styles.note}>
                <Text style={styles.textNote}>
                  Để bảo vệ thông tin và ngăn ngừa người khác xâm nhập vào tài
                  khoản của bạn, hãy sử dụng mật khẩu mạnh và thay đổi mật khẩu
                  3 - 6 tháng/lần
                </Text>
                <View>
                  <Text style={styles.textNote}>
                    Một số điểm cần lưu ý để có mật khẩu mạnh:
                  </Text>
                  <View style={styles.listItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.textNote}>
                      Không sử dụng dẫy dễ đoán (dãy số tăng giảm, trùng nhau
                      hoặc ngày sinh).
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.textNote}>
                      Không dùng lại các mật khẩu đã sử dụng trước đó.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.boxInput}>
                <Text style={styles.headingTitle}>Mật khẩu hiện tại</Text>
                <View>
                  <TextInput
                    placeholder="Nhập mật khẩu hiện tại"
                    placeholderTextColor="#aaa"
                    secureTextEntry={invisibleCurrent}
                    onChangeText={setCurrentPassword}
                    value={currentPassword}
                    style={styles.textInput}
                  />
                  <TouchableOpacity
                    style={styles.iconEyes}
                    onPress={() => setInvisibleCurrent(!invisibleCurrent)}>
                    {invisibleCurrent ? (
                      <Image
                        source={require('../../assets/images/eyes-icon.png')}
                      />
                    ) : (
                      <Image
                        style={{
                          bottom: Platform.OS === 'ios' ? 4 : 4,
                          paddingVertical: 0,
                          textAlignVertical: 'center',
                        }}
                        source={require('../../assets/images/eyesclose-icon.png')}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.boxInput}>
                <Text style={styles.headingTitle}>Mật khẩu mới</Text>
                <View>
                  <TextInput
                    placeholder="Nhập mật khẩu mới"
                    placeholderTextColor="#aaa"
                    secureTextEntry={invisible}
                    onChangeText={setPassword}
                    value={password}
                    style={styles.textInput}
                  />
                  <TouchableOpacity
                    style={styles.iconEyes}
                    onPress={() => setInvisible(!invisible)}>
                    {invisible ? (
                      <Image
                        source={require('../../assets/images/eyes-icon.png')}
                      />
                    ) : (
                      <Image
                        style={{
                          bottom: Platform.OS === 'ios' ? 4 : 4,
                          paddingVertical: 0,
                          textAlignVertical: 'center',
                        }}
                        source={require('../../assets/images/eyesclose-icon.png')}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.boxInput}>
                <Text style={styles.headingTitle}>Xác nhận mật khẩu mới</Text>
                <View>
                  <TextInput
                    placeholder="Nhập lại mật khẩu mới"
                    placeholderTextColor="#aaa"
                    secureTextEntry={invisibleConfirm}
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                    style={styles.textInput}
                  />
                  <TouchableOpacity
                    style={styles.iconEyes}
                    onPress={() => setInvisibleConfirm(!invisibleConfirm)}>
                    {invisibleConfirm ? (
                      <Image
                        source={require('../../assets/images/eyes-icon.png')}
                      />
                    ) : (
                      <Image
                        style={{
                          bottom: Platform.OS === 'ios' ? 4 : 4,
                          paddingVertical: 0,
                          textAlignVertical: 'center',
                        }}
                        source={require('../../assets/images/eyesclose-icon.png')}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.btn}
                onPress={() =>
                  Alert.alert('Thông báo', 'Thay đổi mật khẩu thành công')
                }>
                <Text
                  style={[
                    styles.textWhite,
                    {fontWeight: 'bold', textAlign: 'center'},
                  ]}>
                  Thay đổi
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    width: '100%',
    height: '100%',
  },

  containHeading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e1e2d',
  },
  borderArrow: {
    width: 42,
    height: 42,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  body: {
    marginTop: 16,
    paddingHorizontal: 20,
  },

  textWhite: {
    color: 'white',
  },
  textPrimary: {
    color: '#007BFF',
  },
  iconPrimary: {
    tintColor: '#007BFF',
  },

  boxInput: {
    marginBottom: 12,
  },

  headingTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    height: 40,
    paddingLeft: 15,
    paddingRight: 50,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#1e1e2d',
    paddingVertical: 0,
    textAlignVertical: 'center',
  },

  btn: {
    width: '100%',
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },

  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },

  note: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginBottom: 12,
  },

  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  bullet: {
    color: '#888',
    fontSize: 24,
    marginRight: 8,
  },
  textNote: {
    color: '#888',
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  iconEyes: {
    position: 'absolute',
    right: 16,
    top: 12,
  },
});
