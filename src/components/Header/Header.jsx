import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {AppIcons} from '../../icons';

const Header = ({Navbar, navigation}) => {
  const {t} = useTranslation();
  return (
    <>
      {/* Render header when navbar name home */}

      {Navbar === 'Home' && (
        <View style={styles.containHeadingHome}>
          <TouchableOpacity
            style={styles.borderAvatar}
            onPress={() => navigation.navigate('InfoPerson')}>
            <Image source={AppIcons.avatar} style={styles.avatar} />
          </TouchableOpacity>
          <View style={{flex: 1, marginLeft: 16, gap: 8}}>
            <Text>{t('home.welcome')}</Text>
            <Text style={styles.heading}>{t('home.name')}</Text>
          </View>
          <TouchableOpacity
            style={styles.borderArrow}
            onPress={() => navigation.navigate('Notification')}>
            <Image source={AppIcons.notification} />
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
            <Text style={styles.heading}>{t('save.title')}</Text>
          </View>
          <TouchableOpacity
            style={styles.borderArrow}
            onPress={() => navigation.navigate('Notification')}>
            <Image source={AppIcons.notification} />
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
            <Text style={styles.heading}>{t('loan.title')}</Text>
          </View>
          <TouchableOpacity
            style={styles.borderArrow}
            onPress={() => navigation.navigate('Notification')}>
            <Image source={AppIcons.notification} />
          </TouchableOpacity>
        </View>
      )}

      {/* Render header when navbar name rate */}
      {Navbar === 'Rate' && (
        <View style={styles.containHeadingOneValue}>
          <View>
            <Text style={styles.heading}>{t('rate.title')}</Text>
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
            <Text style={styles.heading}>{t('settings.title')}</Text>
          </View>
          <TouchableOpacity
            style={styles.borderArrow}
            onPress={() => navigation.navigate('Notification')}>
            <Image source={AppIcons.notification} />
          </TouchableOpacity>
        </View>
      )}

      {/* Render header when navbar name changePassword */}
      {Navbar === 'ChangePassword' && (
        <View style={styles.containHeading}>
          <TouchableOpacity
            style={styles.noBorderArrow}
            onPress={() => navigation.goBack()}>
            <Image source={AppIcons.back} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>Thay đổi mật khẩu</Text>
          </View>
          <TouchableOpacity style={[styles.borderArrow, styles.hidden]}>
            <Image source={AppIcons.notification} />
          </TouchableOpacity>
        </View>
      )}

      {/* Render header when navbar name LanguageSetting */}
      {Navbar === 'LanguageSetting' && (
        <View style={styles.containHeading}>
          <TouchableOpacity
            style={styles.noBorderArrow}
            onPress={() => navigation.goBack()}>
            <Image source={AppIcons.back} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>{t('languageSettings.title')}</Text>
          </View>
          <TouchableOpacity style={[styles.borderArrow, styles.hidden]}>
            <Image source={AppIcons.notification} />
          </TouchableOpacity>
        </View>
      )}

      {/* Render header when navbar name InfoPerson */}
      {Navbar === 'InfoPerson' && (
        <View style={styles.containHeading}>
          <TouchableOpacity
            style={styles.noBorderArrow}
            onPress={() => navigation.goBack()}>
            <Image source={AppIcons.back} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>Thông tin cá nhân</Text>
          </View>
          <TouchableOpacity style={[styles.borderArrow, styles.hidden]}>
            <Image source={AppIcons.notification} />
          </TouchableOpacity>
        </View>
      )}

      {/* Render header when navbar name Notification */}
      {Navbar === 'Notification' && (
        <View style={styles.containHeading}>
          <TouchableOpacity
            style={[styles.noBorderArrow]}
            onPress={() => navigation.goBack()}>
            <Image source={AppIcons.back} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>{t('notification.title')}</Text>
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
              {t('notification.seen')}
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
            <Image source={AppIcons.back} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>{t('formCreateLoan.title')}</Text>
          </View>
          <TouchableOpacity style={[styles.borderArrow, styles.hidden]}>
            <Image source={AppIcons.notification} />
          </TouchableOpacity>
        </View>
      )}

      {/* Render header when navbar name SentSave */}
      {Navbar === 'SentSave' && (
        <View style={styles.containHeading}>
          <TouchableOpacity
            style={styles.noBorderArrow}
            onPress={() => navigation.goBack()}>
            <Image source={AppIcons.back} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>{t('formCreateSave.title')}</Text>
          </View>
          <TouchableOpacity style={[styles.borderArrow, styles.hidden]}>
            <Image source={AppIcons.notification} />
          </TouchableOpacity>
        </View>
      )}

      {/* Render header when navbar name Deposit */}
      {Navbar === 'Deposit' && (
        <View style={styles.containHeading}>
          <TouchableOpacity
            style={styles.noBorderArrow}
            onPress={() => navigation.goBack()}>
            <Image source={AppIcons.back} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>{t('deposit.title')}</Text>
          </View>
          <TouchableOpacity style={[styles.borderArrow, styles.hidden]}>
            <Image source={AppIcons.notification} />
          </TouchableOpacity>
        </View>
      )}

      {/* Render header when navbar name Deposit */}
      {Navbar === 'Transfer' && (
        <View style={styles.containHeading}>
          <TouchableOpacity
            style={styles.noBorderArrow}
            onPress={() => navigation.goBack()}>
            <Image source={AppIcons.back} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>{t('transfer.title')}</Text>
          </View>
          <TouchableOpacity style={[styles.borderArrow, styles.hidden]}>
            <Image source={AppIcons.notification} />
          </TouchableOpacity>
        </View>
      )}

      {/* Render header when navbar name InfoSave */}
      {Navbar === 'InfoSave' && (
        <View style={styles.containHeading}>
          <TouchableOpacity
            style={styles.noBorderArrow}
            onPress={() => navigation.goBack()}>
            <Image source={AppIcons.back} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>{t('infoSave.title')}</Text>
          </View>
          <TouchableOpacity style={[styles.borderArrow, styles.hidden]}>
            <Image source={AppIcons.notification} />
          </TouchableOpacity>
        </View>
      )}

      {/* Render header when navbar name InfoLoan */}
      {Navbar === 'InfoLoan' && (
        <View style={styles.containHeading}>
          <TouchableOpacity
            style={styles.noBorderArrow}
            onPress={() => navigation.goBack()}>
            <Image source={AppIcons.back} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>{t('infoLoan.title')}</Text>
          </View>
          <TouchableOpacity style={[styles.borderArrow, styles.hidden]}>
            <Image source={AppIcons.notification} />
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
    paddingTop: 8,
    backgroundColor: 'white',
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
    paddingTop: 8,
  },
  containHeadingOneValue: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
    height: 50, //height + px padding top = 50 = 42 + 8
    paddingTop: 8,
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
