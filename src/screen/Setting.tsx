import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const Setting = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        {/* Heading */}
        <View style={styles.containHeading}>
          <TouchableOpacity
            style={styles.borderArrow}
            onPress={() => navigation.navigate('Login')}>
            <Image source={require('../../assets/images/logout-icon.png')} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>Cài đặt</Text>
          </View>
          <TouchableOpacity
            style={styles.borderArrow}
            onPress={() => navigation.navigate('Notification')}>
            <Image
              source={require('../../assets/images/notification-icon.png')}
            />
          </TouchableOpacity>
        </View>

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

              <TouchableOpacity style={styles.wrapButton}>
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

              <TouchableOpacity style={styles.wrapButton}>
                <Text style={styles.textButton}>Hotline</Text>
                <View style={styles.wrapText}>
                  <Text style={styles.textOption}>01234567789</Text>
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
              <TouchableOpacity style={styles.wrapButton}>
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
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
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
