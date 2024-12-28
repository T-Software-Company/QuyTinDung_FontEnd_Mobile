import {
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import React, {useRef} from 'react';
import Header from '../components/Header/Header';
import ButtonSetting from '../components/ButtonSetting/ButtonSetting';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../context/ThemeContext';
import i18n from '../../i18n';
// import { Modalize } from 'react-native-modalize';

const Setting = ({navigation}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const {isDarkMode} = useTheme();
  const currentLanguage = i18n.language;
  // const modalizeRef = useRef(null);

  // const openBottomSheet = () => {
  //   modalizeRef.current?.open();
  // };

  // const closeBottomSheet = () => {
  //   modalizeRef.current?.close();
  // };
  const phoneNumber = '1234567890'; // Thay bằng số điện thoại bạn muốn
  console.log(currentLanguage)
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

  // Move StyleSheet inside component to access theme
  const styles = StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: theme.background,
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
      color: theme.noteText,
      textTransform: 'uppercase',
    },
    wrapContent: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: 16,
    },
  });

  return (
    <SafeAreaView style={[styles.view, {backgroundColor: theme.background}]}>
      <View style={styles.container}>
        {/* Heading */}

        <Header Navbar="Setting" navigation={navigation} />

        {/* Body */}

        <View style={styles.containBody}>
          <View style={styles.boxContent}>
            <Text style={styles.title}>{t('settings.generalInformation')}</Text>
            <View style={styles.wrapContent}>
              <ButtonSetting
                title={t('settings.personalInformation')}
                icon={require('../../assets/images/arrow-right.png')}
                onPress={() => navigation.navigate('InfoPerson')}
              />

              <ButtonSetting
                title={t('settings.language')}
                icon={require('../../assets/images/arrow-right.png')}
                onPress={() => navigation.navigate('LanguageSetting')}
                optionText={t('settings.languageSelected')}
              />

              <ButtonSetting
                title={t('settings.screenMode')}
                icon={require('../../assets/images/arrow-right.png')}
                onPress={() => navigation.navigate('DarkModeSetting')}
                optionText={currentLanguage === "vi" ? (isDarkMode ? 'Tối' : 'Sáng') : (isDarkMode ? 'Dark' : 'Light')}  
              />

              <ButtonSetting
                title={t('settings.hotline')}
                icon={require('../../assets/images/arrow-right.png')}
                onPress={confirmAndMakeCall}
                optionText={phoneNumber}
              />
            </View>
          </View>

          <View style={styles.boxContent}>
            <Text style={styles.title}>{t('settings.security')}</Text>
            <View style={styles.wrapContent}>
              <ButtonSetting
                title={t('settings.changePassword')}
                icon={require('../../assets/images/arrow-right.png')}
                onPress={() => navigation.navigate('ChangePassword')}
              />

              <ButtonSetting
                title={t('settings.privacyPolicy')}
                icon={require('../../assets/images/arrow-right.png')}
              />
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
