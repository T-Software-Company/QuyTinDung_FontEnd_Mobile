import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header/Header';
import ContentButton from '../components/ContentButton/ContentButton';
import i18n from '../../i18n';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../context/ThemeContext';
import {AppIcons} from '../icons';
import {useRoute} from '@react-navigation/native';

const Notification = ({navigation}) => {
  const currentLanguage = i18n.language;
  const route = useRoute();
  const {formData} = route.params; // Lấy formData từ Register
  const {t} = useTranslation();
  const {theme} = useTheme();
  console.log('Notification formData:', formData); // Debug log

  return (
    <SafeAreaView style={[styles.view, {backgroundColor: theme.background}]}>
      <View style={styles.container}>
        {/* Heading */}

        <Header Navbar="NotificationScan" navigation={navigation} />

        {/* Body */}
        <View style={styles.body}>
          <View style={styles.wrapNotification}>
            <View style={styles.wrapBanner}>
              <Image source={AppIcons.banner} style={styles.banner} />
            </View>

            <View>
              <Text style={{color: theme.text, lineHeight: 24, fontSize: 13}}>
                Bạn sẽ chịu trách nhiệm trước pháp luật về việc cung cấp{' '}
                <Text style={{fontWeight: 600}}>
                  CCCD gắn chip là bản gốc, chính chủ, còn hiệu lực
                </Text>
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('QrScreen', {formData})}>
                {/* Sửa cách truyền params */}
                <Text style={styles.textButton}>
                  {t('notificationScan.button')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    width: '100%',
    height: '100%',
  },

  body: {
    paddingTop: 20,
    marginTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 8,
    flex: 1,
  },

  wrapNotification: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: Platform.OS === 'ios' ? 8 : 32,
  },
  wrapBanner: {
    width: '100%',
    height: 250,
  },
  banner: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: '#0066ff',
    padding: 20,
    alignItems: 'center',
    borderRadius: 16,
    marginTop: 12,
  },
  textButton: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
