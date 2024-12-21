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
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.boxNotification,
                  !notification.seen ? styles.boxActive : '',
                ]}>
                <View style={styles.boxHeader}>
                  <Text style={styles.headerNotification}>
                    {notification.title}
                  </Text>
                  {!notification.seen ? (
                    <View style={styles.circleHeader}></View>
                  ) : (
                    <></>
                  )}
                </View>
                <Text style={styles.descriptionNotification}>
                  {notification.desc}
                </Text>
                <Text style={styles.timeNotification}>{notification.time}</Text>
              </TouchableOpacity>
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
  boxNotification: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    backgroundColor: '#efffff',

    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },

  boxActive: {
    backgroundColor: '#c4eeff',
  },
  boxHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circleHeader: {
    width: 8,
    height: 8,
    backgroundColor: '#007BFF',
    borderRadius: 9999,
  },
  headerNotification: {
    fontWeight: 'bold',
  },
  descriptionNotification: {
    lineHeight: 22,
  },
  timeNotification: {
    color: '#aaa',
    fontSize: 12,
  },
});
