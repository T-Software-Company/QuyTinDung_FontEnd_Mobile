import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme} from '../../theme/colors';

interface RecentPaymentProps {
  theme: Theme;
}

const RecentPayment: React.FC<RecentPaymentProps> = ({theme}) => {
  const dataRecentPayment = [
    {
      title: 'Rút tiền',
      money: '- 50.000.000đ',
      date: '08/01/2025',
      status: 'Thất bại',
    },
    {
      title: 'Trả tiền khoản vay',
      money: '+ 100.000.000đ',
      date: '25/12/2024',
      status: 'Thành công',
    },
    {
      title: 'Nạp tiền',
      money: '+ 100.000đ',
      date: '23/12/2024',
      status: 'Thành công',
    },
  ];
  const styles = StyleSheet.create({
    boxContent: {
      marginTop: 20,
    },
    title: {
      color: theme.text,
      fontSize: 16,
      fontWeight: 'bold',
    },
    seeAll: {
      color: '#007BFF',
    },
    wrapBox: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    boxColor: {
      backgroundColor: theme.backgroundBox,
      padding: 12,
      borderRadius: 6,
      marginTop: 16,
      flexDirection: 'column',
      gap: 4,
    },
    colorText: {
      color: theme.text,
    },
    profit: {
      color: theme.profit,
    },
    error: {
      color: theme.error,
    },
    noteText: {
      color: theme.noteText,
      fontSize: 12,
    },
  });
  return (
    <View style={styles.boxContent}>
      <View style={styles.wrapBox}>
        <Text style={styles.title}>Giao dịch gần đây</Text>
        <Text style={styles.seeAll}>Xem tất cả</Text>
      </View>

      {dataRecentPayment.map((item, index) => (
        <View key={index} style={styles.boxColor}>
          <View style={styles.wrapBox}>
            <Text style={styles.colorText}>{item.title}</Text>
            <Text style={styles.colorText}>{item.money}</Text>
          </View>
          <View style={styles.wrapBox}>
            <Text style={styles.noteText}>{item.date}</Text>
            <Text style={item.status === "Thành công" ? styles.profit : styles.error}>{item.status}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default RecentPayment;
