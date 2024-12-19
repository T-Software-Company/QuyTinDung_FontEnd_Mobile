import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

const Rate = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('saving');

  const loanRates = [
    {key: 'Kỳ hạn', value: 'Lãi suất'},
    {key: '1 tháng', value: '12%'},
    {key: '3 tháng', value: '12%'},
    {key: '6 tháng', value: '12%'},
    {key: '9 tháng', value: '12%'},
    {key: '12 tháng', value: '12%'},
  ];

  const saveRates = [
    {key: 'Kỳ hạn', value: 'Lãi suất'},
    {key: '7 ngày', value: '0.2%'},
    {key: '14 ngày', value: '0.2%'},
    {key: '1 tháng', value: '1.6%'},
    {key: '2 tháng', value: '1.6%'},
    {key: '3 tháng', value: '1.9%'},
    {key: '6 tháng', value: '2.9%'},
    {key: '9 tháng', value: '2.9%'},
    {key: '12 tháng', value: '4.6%'},
    {key: '24 tháng', value: '4.8%'},
  ];

  const data = selectedTab === 'saving' ? saveRates : loanRates;

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        {/* Heading */}

        <View style={styles.containHeading}>
          <View>
            <Text style={styles.heading}>Lãi suất</Text>
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>
          <View style={styles.tabBar}>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'saving' && styles.activeTab]}
              onPress={() => setSelectedTab('saving')}>
              <Text
                style={[
                  styles.tabText,
                  selectedTab === 'saving' && styles.tabTextActive,
                ]}>
                Tiết kiệm
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'loan' && styles.activeTab]}
              onPress={() => setSelectedTab('loan')}>
              <Text
                style={[
                  styles.tabText,
                  selectedTab === 'loan' && styles.tabTextActive,
                ]}>
                Cho vay
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.boxList}>
            {data.map((box, idx) => (
              <View
                key={idx}
                style={[
                  styles.boxWrap,
                  idx === 0 && styles.firstChild, // Áp dụng kiểu cho phần tử đầu tiên
                  idx > 0 && idx < loanRates.length - 1 && styles.middleChild, // Phần tử giữa
                ]}>
                <Text
                  style={[
                    idx === 0 && styles.textKeyRow,
                    idx > 0 && idx < loanRates.length - 1 && styles.textRow,
                  ]}>
                  {box.key}
                </Text>
                <Text
                  style={[
                    idx === 0 && styles.textKeyRow,
                    idx > 0 && idx < loanRates.length - 1 && styles.textRow,
                  ]}>
                  {box.value}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Rate;

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

  body: {
    marginTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },

  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tab: {
    padding: 12,
    backgroundColor: '#ddd',
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#007BFF', // Màu nền khi tab được chọn
  },
  tabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  tabTextActive: {
    color: '#fff',
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
});
