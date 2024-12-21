import {
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from 'react-native';
import React, {useRef} from 'react';
import Header from '../components/Header/Header';
// import { Modalize } from 'react-native-modalize';

const Setting = ({navigation}) => {
  // const modalizeRef = useRef(null);

  // const openBottomSheet = () => {
  //   modalizeRef.current?.open();
  // };

  // const closeBottomSheet = () => {
  //   modalizeRef.current?.close();
  // };
  const phoneNumber = '1234567890'; // Thay bằng số điện thoại bạn muốn

  const confirmAndMakeCall = () => {
    Alert.alert(
      'Xác nhận cuộc gọi',
      `Bạn có muốn gọi đến số ${phoneNumber} không?`,
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: () => makeCall(),
        },
      ],
      {cancelable: true},
    );
  };

  const makeCall = () => {
    Linking.openURL(`tel:${phoneNumber}`).catch(err => {
      console.error('Failed to make a call', err);
    });
  };
  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        {/* Heading */}

        <Header Navbar="Setting" navigation={navigation} />

        {/* Body */}

        <View style={styles.containBody}>
          <View style={styles.boxContent}>
            <Text style={styles.title}>THÔNG TIN CHUNG</Text>
            <View style={styles.wrapContent}>
              <TouchableOpacity
                style={styles.wrapButton}
                onPress={() => navigation.navigate('InfoPerson')}>
                <Text style={styles.textButton}>Thông tin cá nhân</Text>
                <View style={styles.wrapText}>
                  <View style={styles.wrapIcon}>
                    <Image
                      source={require('../../assets/images/arrow-right.png')}
                    />
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.wrapButton}
                onPress={() => navigation.navigate('LanguageSetting')}>
                <Text style={styles.textButton}>Ngôn ngữ</Text>
                <View style={styles.wrapText}>
                  <Text style={styles.textOption}>Tiếng Việt</Text>
                  <View style={styles.wrapIcon}>
                    <Image
                      source={require('../../assets/images/arrow-right.png')}
                    />
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.wrapButton}
                onPress={confirmAndMakeCall}>
                <Text style={styles.textButton}>Hotline</Text>
                <View style={styles.wrapText}>
                  <Text style={styles.textOption}>{phoneNumber}</Text>
                  <View style={styles.wrapIcon}>
                    <Image
                      source={require('../../assets/images/arrow-right.png')}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.boxContent}>
            <Text style={styles.title}>BẢO MẬT</Text>
            <View style={styles.wrapContent}>
              <TouchableOpacity
                style={styles.wrapButton}
                onPress={() => navigation.navigate('ChangePassword')}>
                <Text style={styles.textButton}>Thay đổi mật khẩu</Text>
                <View style={styles.wrapText}>
                  <View style={styles.wrapIcon}>
                    <Image
                      source={require('../../assets/images/arrow-right.png')}
                    />
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.wrapButton}>
                <Text style={styles.textButton}>Chính sách quyền riêng tư</Text>
                <View style={styles.wrapText}>
                  <View style={styles.wrapIcon}>
                    <Image
                      source={require('../../assets/images/arrow-right.png')}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* <Modalize
            ref={modalizeRef}
            modalHeight={300}
            handleStyle={styles.handle}
            overlayStyle={styles.overlay}
            modalStyle={styles.modal}>
            <View style={styles.content}>
              <Text style={styles.title}>Nội dung Bottom Sheet</Text>
              <Button title="Đóng" onPress={closeBottomSheet} />
            </View>
          </Modalize> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    width: '100%',
    height: '100%',
  },
  
  containBody: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  boxContent: {
    marginBottom: 31,
  },
  title: {
    fontSize: 14,
    color: '#a2a2a7',
  },
  wrapContent: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 16,
  },
  wrapButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 22,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4',
  },
  textButton: {
    fontSize: 15,
    color: '#1e1e2d',
  },
  wrapText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    marginLeft: 16,
  },
  textOption: {
    fontSize: 14,
    color: '#a2a2a7',
  },
});
