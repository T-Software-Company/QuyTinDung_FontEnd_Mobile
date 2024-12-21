import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const Header = ({Navbar, navigation}) => {
  return (
    <>
      {/* Render header when navbar name home */}

      {Navbar === 'Home' && (
        <View style={styles.containHeadingHome}>
          <TouchableOpacity
            style={styles.borderAvatar}
            onPress={() => navigation.navigate('InfoPerson')}>
            <Image
              source={require('../../../assets/images/avatar.jpg')}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <View style={{flex: 1, marginLeft: 16, gap: 8}}>
            <Text>Chào bạn,</Text>
            <Text style={styles.heading}>Nguyễn Văn A</Text>
          </View>
          <TouchableOpacity
            style={styles.borderArrow}
            onPress={() => navigation.navigate('Notification')}>
            <Image
              source={require('../../../assets/images/notification-icon.png')}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Render header when navbar name save */}
      {Navbar === 'Save' && (
        <View style={styles.containHeading}>
          <TouchableOpacity
            style={styles.borderArrow}
            onPress={() => navigation.navigate('SentSave')}>
            <Image source={require('../../../assets/images/add-icon.png')} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>Số tiết kiệm</Text>
          </View>
          <TouchableOpacity
            style={styles.borderArrow}
            onPress={() => navigation.navigate('Notification')}>
            <Image
              source={require('../../../assets/images/notification-icon.png')}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Render header when navbar name loan */}
      {Navbar === 'Loan' && (
        <View style={styles.containHeading}>
          <TouchableOpacity
            style={styles.borderArrow}
            onPress={() => navigation.navigate('CreateLoan')}>
            <Image source={require('../../../assets/images/add-icon.png')} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>Khoản vay</Text>
          </View>
          <TouchableOpacity
            style={styles.borderArrow}
            onPress={() => navigation.navigate('Notification')}>
            <Image
              source={require('../../../assets/images/notification-icon.png')}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Render header when navbar name rate */}
      {Navbar === 'Rate' && (
        <View style={styles.containHeadingOneValue}>
          <View>
            <Text style={styles.heading}>Lãi suất</Text>
          </View>
        </View>
      )}

      {/* Render header when navbar name setting */}
      {Navbar === 'Setting' && (
        <View style={styles.containHeading}>
          <TouchableOpacity
            style={styles.borderArrow}
            onPress={() => navigation.navigate('Login')}>
            <Image source={require('../../../assets/images/logout-icon.png')} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>Cài đặt</Text>
          </View>
          <TouchableOpacity
            style={styles.borderArrow}
            onPress={() => navigation.navigate('Notification')}>
            <Image
              source={require('../../../assets/images/notification-icon.png')}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Render header when navbar name changePassword */}
      {Navbar === 'ChangePassword' && (
        <View style={styles.containHeading}>
          <TouchableOpacity
            style={styles.noBorderArrow}
            onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/images/arrow-left.png')} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>Thay đổi mật khẩu</Text>
          </View>
          <TouchableOpacity style={[styles.borderArrow, styles.hidden]}>
            <Image
              source={require('../../../assets/images/notification-icon.png')}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Render header when navbar name LanguageSetting */}
      {Navbar === 'LanguageSetting' && (
        <View style={styles.containHeading}>
          <TouchableOpacity
            style={styles.noBorderArrow}
            onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/images/arrow-left.png')} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>Ngôn ngữ</Text>
          </View>
          <TouchableOpacity style={[styles.borderArrow, styles.hidden]}>
            <Image
              source={require('../../../assets/images/notification-icon.png')}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Render header when navbar name InfoPerson */}
      {Navbar === 'InfoPerson' && (
        <View style={styles.containHeading}>
          <TouchableOpacity
            style={styles.noBorderArrow}
            onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/images/arrow-left.png')} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>Thông tin cá nhân</Text>
          </View>
          <TouchableOpacity style={[styles.borderArrow, styles.hidden]}>
            <Image
              source={require('../../../assets/images/notification-icon.png')}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Render header when navbar name Notification */}
      {Navbar === 'Notification' && (
        <View style={styles.containHeading}>
          <TouchableOpacity
            style={[styles.noBorderArrow]}
            onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/images/arrow-left.png')} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>Thông báo</Text>
          </View>
          <TouchableOpacity style={[styles.noBorderArrow]}>
            <Text
              style={{
                position: 'absolute',
                right: 0,
                width: '80',
                textAlign: 'right',
                flexShrink: 1,
                flexWrap: 'nowrap',
                flexDirection: 'row',
                color: '#007BFF',
                fontSize: 14,
              }}>
              Đã xem hết
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Render header when navbar name CreateLoan */}
      {Navbar === 'CreateLoan' && (
        <View style={styles.containHeading}>
          <TouchableOpacity
            style={styles.noBorderArrow}
            onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/images/arrow-left.png')} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>Tạo khoản vay</Text>
          </View>
          <TouchableOpacity style={[styles.borderArrow, styles.hidden]}>
            <Image
              source={require('../../../assets/images/notification-icon.png')}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Render header when navbar name SentSave */}
      {Navbar === 'SentSave' && (
        <View style={styles.containHeading}>
          <TouchableOpacity
            style={styles.noBorderArrow}
            onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/images/arrow-left.png')} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>Gửi tiết kiệm</Text>
          </View>
          <TouchableOpacity style={[styles.borderArrow, styles.hidden]}>
            <Image
              source={require('../../../assets/images/notification-icon.png')}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Render header when navbar name InfoSave */}
      {Navbar === 'InfoSave' && (
        <View style={styles.containHeading}>
          <TouchableOpacity
            style={styles.noBorderArrow}
            onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/images/arrow-left.png')} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>Thông tin sổ tiết kiệm</Text>
          </View>
          <TouchableOpacity style={[styles.borderArrow, styles.hidden]}>
            <Image
              source={require('../../../assets/images/notification-icon.png')}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Render header when navbar name InfoLoan */}
      {Navbar === 'InfoLoan' && (
        <View style={styles.containHeading}>
          <TouchableOpacity
            style={styles.noBorderArrow}
            onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/images/arrow-left.png')} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>Thông tin khoản vay</Text>
          </View>
          <TouchableOpacity style={[styles.borderArrow, styles.hidden]}>
            <Image
              source={require('../../../assets/images/notification-icon.png')}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  containHeading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  containHeadingHome: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingBottom: 8,
    backgroundColor: 'white',

    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  containHeadingOneValue: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
    height: 42,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e1e2d',
  },
  borderAvatar: {
    width: 50,
    height: 50,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 9999,
  },
  borderArrow: {
    width: 42,
    height: 42,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
  },
  noBorderArrow: {
    width: 42,
    height: 42,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
});
