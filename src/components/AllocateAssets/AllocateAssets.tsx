import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme} from '../../theme/colors';

interface DataType {
  title: string;
  money: string;
  interest: string;
}
interface AllocateAssetsProps {
  theme: Theme;
  hide: boolean;
  data: DataType[];
}

const AllocateAssets: React.FC<AllocateAssetsProps> = ({data, theme, hide}) => {
  const styles = StyleSheet.create({
    wrapBox: {
      marginTop: 30,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    colorText: {
      color: theme.text,
    },
    boxContainer: {
      padding: 12,
      backgroundColor: theme.tableHeaderBackground,
      marginTop: 16,
      borderRadius: 12,
      flexDirection: 'column',
      gap: 16,
    },
    boxSave: {
      padding: 16,
      backgroundColor: theme.tableChildBackground,
      borderRadius: 12,
    },
    boxSaveContent: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
    titleBox: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    profit: {
      color: theme.profit,
    },
    primaryText: {
      color: theme.interest,
    },
    hide: {
      transform: [{translateY: 4}],
    },
  });
  return (
    <View style={styles.wrapBox}>
      <Text style={[styles.title, styles.colorText]}>Phân bổ</Text>

      <View style={styles.boxContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.boxSave}>
            <Text style={[styles.titleBox, styles.colorText]}>
              {item.title}
            </Text>
            <View style={styles.boxSaveContent}>
              <Text style={styles.colorText}>Số tiền gốc</Text>
              {hide ? (
                <Text style={[styles.colorText, styles.hide]}>*** ***</Text>
              ) : (
                <Text style={styles.colorText}>{item.money}</Text>
              )}
            </View>
            <View style={styles.boxSaveContent}>
              <Text style={styles.colorText}>Tiền lãi tạm tính</Text>
              {hide ? (
                <Text style={[styles.colorText, styles.hide]}>*** ***</Text>
              ) : (
                <Text
                  style={[
                    item.title === 'Tổng tiền khoản vay'
                      ? styles.primaryText
                      : styles.profit,
                  ]}>
                  {item.interest}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default AllocateAssets;
