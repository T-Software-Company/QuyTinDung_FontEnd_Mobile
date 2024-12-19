import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const InfoLoan = ({navigation}) => {
  const data = [
    {key: 'Số hợp đồng', value: '123-456-789'},
    {key: 'Số tiền vay', value: '100.000.000 đ'},
    {key: 'Mục đích vay', value: 'Mua nhà'},

    {key: 'Kỳ hạn', value: '12 tháng'},
    {key: 'Lãi suất', value: '12%/năm'},

    {key: 'Chu kỳ trả gốc', value: '6 tháng'},
    {key: 'Chu kỳ trả lãi', value: '6 tháng'},

    {key: 'Ngày có hiệu lực', value: '22/04/2024'},
    {key: 'Ngày đến hạn', value: '22/10/2024'},
  ];

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        {/* Heading */}

        <View style={styles.containHeading}>
          <TouchableOpacity
            style={styles.borderArrow}
            onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/images/arrow-left.png')} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>Thông tin khoản vay</Text>
          </View>
          <TouchableOpacity style={[styles.borderArrow, styles.hidden]}>
            <Image
              source={require('../../assets/images/notification-icon.png')}
            />
          </TouchableOpacity>
        </View>

        {/* Body */}

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <View style={styles.listInfos}>
              <View style={styles.boxList}>
                {data.map((box, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.boxWrap,
                      idx === 0 && styles.firstChild, // Áp dụng kiểu cho phần tử đầu tiên
                      idx > 0 && idx < data.length - 1 && styles.middleChild, // Phần tử giữa
                    ]}>
                    <Text
                      style={[
                        idx === 0 && styles.textKeyRow,
                        idx > 0 && idx < data.length - 1 && styles.textRow,
                      ]}>
                      {box.key}
                    </Text>
                    <Text
                      style={[
                        idx === 0 && styles.textKeyRow,
                        idx > 0 && idx < data.length - 1 && styles.textRow,
                      ]}>
                      {box.value}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default InfoLoan;

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
    marginTop: 16,
    paddingHorizontal: 20,
  },

  textWhite: {
    color: 'white',
  },
  textPrimary: {
    color: '#007BFF',
  },
  iconPrimary: {
    tintColor: '#007BFF',
  },

  boxList: {
    marginVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 12,

    // Shadow for iOS
    shadowColor: '#171717', // Màu bóng
    shadowOffset: {width: 0, height: 2}, // Độ lệch bóng
    shadowOpacity: 0.2, // Độ trong suốt
    shadowRadius: 5, // Bán kính làm mờ bóng
    // Shadow for Android
    elevation: 5, // Mức độ nổi
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
  },

  boxWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },

  firstChild: {
    backgroundColor: '#f4f4f4',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  middleChild: {
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
  },

  textKeyRow: {
    fontWeight: 'bold',
  },
  textRow: {
    fontWeight: 'regular',
  },

  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
});
