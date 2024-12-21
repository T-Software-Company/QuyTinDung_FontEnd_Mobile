import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header/Header';
import Table from '../components/Table/Table';
import SelectedTabs from '../components/SelectedTabs/SelectedTabs';

const Rate = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('saving');

  const tabs = [
    {key: 'saving', label: 'Tiết kiệm'},
    {key: 'loan', label: 'Cho vay'},
  ];

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

        <Header Navbar="Rate" />

        {/* Body */}
        <View style={styles.body}>
          <SelectedTabs
            tabs={tabs}
            selectedTab={selectedTab}
            onSelectTab={setSelectedTab}
          />

          {/* View data */}
          <View style={styles.boxList}>
            <Table name="rate" data={data} />
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

  body: {
    marginTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 8,
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
});
