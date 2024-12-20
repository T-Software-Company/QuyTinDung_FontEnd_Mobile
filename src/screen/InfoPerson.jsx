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

import React, {useState} from 'react';

const InfoPerson = ({navigation}) => {
  const [number, setNumber] = useState(null);
  const [selectedTab, setSelectedTab] = useState('info');
  const [isEditable, setIsEditable] = useState(false);

  const infoPerson = {
    id: 1,
    name: 'Nguyễn Văn A',
    nameFund: 'Quỹ TDND Thành Đức',
    phone: '0912345678',
    address: 'Phước Long B, TP. Thủ Đức, TP. Hồ Chí Minh',
    email: 'abcd@gmail.com',
    sex: 'Nam',
    birthday: '01/07/1999',
    idcccd: '0123456789',
    startDayCccd: '22/07/2020',
    expireDayCccd: '22/07/2024',
    placeCccd: 'Cục trưởng cục cảnh sát',
    addressCccd: 'Thôn 7, Huyện Nam Hà, Tỉnh Hà Nam',
  };

  const handleSubmit = () => {
    Alert.alert('Thông báo', 'Cập nhật thành công');
    setIsEditable(false);
  };

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
            <Text style={styles.heading}>Thông tin cá nhân</Text>
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
              <View style={styles.boxAvatar}>
                <Image
                  style={styles.avatar}
                  source={require('../../assets/images/avatar.jpg')}
                />
                <Text style={styles.name}>Nguyễn Văn A</Text>
                <Text style={styles.nameTitle}>Quỹ TDND Châu Đức</Text>
              </View>

              <View style={styles.tabBar}>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    selectedTab === 'info' && styles.activeTab,
                  ]}
                  onPress={() => setSelectedTab('info')}>
                  <Text
                    style={[
                      styles.tabText,
                      selectedTab === 'info' && styles.tabTextActive,
                    ]}>
                    THÔNG TIN LIÊN HỆ
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    selectedTab === 'paper' && styles.activeTab,
                  ]}
                  onPress={() => setSelectedTab('paper')}>
                  <Text
                    style={[
                      styles.tabText,
                      selectedTab === 'paper' && styles.tabTextActive,
                    ]}>
                    GIẤY TỜ TÙY THÂN
                  </Text>
                </TouchableOpacity>
              </View>

              {selectedTab === 'info' ? (
                <View>
                  <View style={styles.boxInput}>
                    <Text style={styles.headingTitle}>SỐ ĐIỆN THOẠI</Text>
                    <TextInput
                      placeholder="Nhập số điện thoại của bạn"
                      placeholderTextColor="#aaa"
                      keyboardType="numeric"
                      onChangeText={setNumber}
                      value={infoPerson?.phone}
                      style={[
                        styles.textInput,
                        isEditable ? styles.textEdit : '',
                      ]}
                      editable={isEditable} // Chỉ cho phép focus khi `isEditable` là true
                    />
                  </View>

                  <View style={styles.boxInput}>
                    <Text style={styles.headingTitle}>EMAIL</Text>
                    <TextInput
                      placeholder="Nhập email của bạn"
                      placeholderTextColor="#aaa"
                      keyboardType="email-address"
                      onChangeText={setNumber}
                      value={infoPerson?.email}
                      style={[
                        styles.textInput,
                        isEditable ? styles.textEdit : '',
                      ]}
                      editable={isEditable} // Chỉ cho phép focus khi `isEditable` là true
                    />
                  </View>

                  <View style={styles.boxInput}>
                    <Text style={styles.headingTitle}>GIỚI TÍNH</Text>
                    <TextInput
                      placeholder="Chọn giới tính của bạn"
                      placeholderTextColor="#aaa"
                      onChangeText={setNumber}
                      value={infoPerson?.sex}
                      style={[
                        styles.textInput,
                        isEditable ? styles.textEdit : '',
                      ]}
                      editable={isEditable} // Chỉ cho phép focus khi `isEditable` là true
                    />
                  </View>

                  <View style={styles.boxInput}>
                    <Text style={styles.headingTitle}>NGÀY SINH</Text>
                    <TextInput
                      placeholder="Chọn ngày sinh của bạn"
                      placeholderTextColor="#aaa"
                      onChangeText={setNumber}
                      value={infoPerson?.birthday}
                      style={[
                        styles.textInput,
                        isEditable ? styles.textEdit : '',
                      ]}
                      editable={isEditable} // Chỉ cho phép focus khi `isEditable` là true
                    />
                  </View>

                  <View style={styles.boxInput}>
                    <Text style={styles.headingTitle}>ĐỊA CHỈ HIỆN TẠI</Text>
                    <TextInput
                      placeholder="Nhập địa chỉ hiện tại"
                      placeholderTextColor="#aaa"
                      keyboardType="numeric"
                      onChangeText={setNumber}
                      value={infoPerson?.address}
                      style={[
                        styles.textInput,
                        isEditable ? styles.textEdit : '',
                      ]}
                      editable={isEditable} // Chỉ cho phép focus khi `isEditable` là true
                    />
                  </View>
                </View>
              ) : (
                <View>
                  <View style={styles.boxInput}>
                    <Text style={styles.headingTitle}>SỐ CCCD</Text>
                    <TextInput
                      placeholder="Nhập số CCCD"
                      placeholderTextColor="#aaa"
                      keyboardType="numeric"
                      onChangeText={setNumber}
                      value={infoPerson?.idcccd}
                      style={[
                        styles.textInput,
                        isEditable ? styles.textEdit : '',
                      ]}
                      editable={isEditable} // Chỉ cho phép focus khi `isEditable` là true
                    />
                  </View>

                  <View style={styles.boxInput}>
                    <Text style={styles.headingTitle}>NƠI CẤP</Text>
                    <TextInput
                      placeholder="Nhập nơi cấp CCCD"
                      placeholderTextColor="#aaa"
                      onChangeText={setNumber}
                      value={infoPerson?.placeCccd}
                      style={[
                        styles.textInput,
                        isEditable ? styles.textEdit : '',
                      ]}
                      editable={isEditable} // Chỉ cho phép focus khi `isEditable` là true
                    />
                  </View>

                  <View style={styles.boxInput}>
                    <Text style={styles.headingTitle}>NGÀY CẤP</Text>
                    <TextInput
                      placeholder="Chọn ngày cấp CCCD"
                      placeholderTextColor="#aaa"
                      onChangeText={setNumber}
                      value={infoPerson?.startDayCccd}
                      style={[
                        styles.textInput,
                        isEditable ? styles.textEdit : '',
                      ]}
                      editable={isEditable} // Chỉ cho phép focus khi `isEditable` là true
                    />
                  </View>

                  <View style={styles.boxInput}>
                    <Text style={styles.headingTitle}>NGÀY HẾT HẠN</Text>
                    <TextInput
                      placeholder="Chọn ngày hết hạn CCCD"
                      placeholderTextColor="#aaa"
                      onChangeText={setNumber}
                      value={infoPerson?.expireDayCccd}
                      style={[
                        styles.textInput,
                        isEditable ? styles.textEdit : '',
                      ]}
                      editable={isEditable} // Chỉ cho phép focus khi `isEditable` là true
                    />
                  </View>

                  <View style={styles.boxInput}>
                    <Text style={styles.headingTitle}>ĐỊA CHỈ THƯỜNG TRÚ</Text>
                    <TextInput
                      placeholder="Nhập địa chỉ thường trú của bạn"
                      placeholderTextColor="#aaa"
                      onChangeText={setNumber}
                      value={infoPerson?.addressCccd}
                      style={[
                        styles.textInput,
                        isEditable ? styles.textEdit : '',
                      ]}
                      editable={isEditable} // Chỉ cho phép focus khi `isEditable` là true
                    />
                  </View>
                </View>
              )}
              <View style={styles.wrapBtn}>
                <TouchableOpacity
                  style={[styles.btn, styles.btnNormal]}
                  onPress={() => setIsEditable(true)}>
                  <Text
                    style={[
                      styles.textWhite,
                      {fontWeight: 'bold', textAlign: 'center', color: '#000'},
                    ]}>
                    Chỉnh sửa
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btn, styles.btnPrimary]}
                  onPress={handleSubmit}>
                  <Text
                    style={[
                      styles.textWhite,
                      {fontWeight: 'bold', textAlign: 'center'},
                    ]}>
                    Cập nhật
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default InfoPerson;

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
  boxAvatar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 9999,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
  },
  nameTitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#aaa',
  },

  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tab: {
    padding: 12,
    backgroundColor: '#ddd',
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#007BFF', // Màu nền khi tab được chọn
  },
  tabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  tabTextActive: {
    color: '#fff',
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
    fontSize: 12,
    marginBottom: 8,
    color: '#888',
  },
  textInput: {
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#888',
    paddingVertical: 0,
    textAlignVertical: 'center',
  },
  textEdit: {
    color: '#000',
  },

  placeholderStyle: {
    color: '#aaa',
    fontSize: 14,
  },

  selectedTextStyle: {
    color: '#000',
    fontSize: 14,
  },

  wrapBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },

  btn: {
    // flex: '1',
    width: '48%',
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },

  btnPrimary: {
    backgroundColor: '#007BFF',
  },

  btnNormal: {
    backgroundColor: '#ddd',
  },

  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },

  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    zIndex: 5000,
  },
  dropdownContainer: {
    borderColor: '#ccc',
    zIndex: 5000,
    position: 'absolute',
  },

  rateText: {
    marginTop: 12,
    fontSize: 14,
    color: '#007BFF',
  },
});
