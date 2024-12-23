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

const Notification = ({navigation}) => {
  const notifications = [
    {
      id: 1,
      title: 'Số dư tài khoản',
      desc: 'Tài khoản của bạn được nạp thêm 5.000.000 đ. Số dư hiện tại là 100.000.000 đ',
      time: '1 phút trước',
      seen: false,
    },

    {
      id: 2,
      title: 'Số dư tài khoản',
      desc: 'Tài khoản của bạn được nạp thêm 10.000.000 đ. Số dư hiện tại là 90.000.000 đ',
      time: '3 phút trước',
      seen: true,
    },

    {
      id: 3,
      title: 'Cập nhật thông tin',
      desc: 'Đã cập nhật đầy đủ thông tin. Bạn có thể trải nghiệm mọi tính năng',
      time: '50 phút trước',
      seen: true,
    },
  ];

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        {/* Heading */}

        <Header Navbar="Notification" navigation={navigation} />

        {/* Body */}
        <ScrollView style={styles.body}>
          <View style={styles.wrapNotification}>
            {notifications.map(notification => (
              <ContentButton data={notification} key={notification.id} />
            ))}
          </View>
        </ScrollView>
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
  },

  wrapNotification: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    paddingBottom: Platform.OS === 'ios' ? 20 : 50,
  },
});
