import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header from '../components/Header/Header';
import Table from '../components/Table/Table';
import BoxAdd from '../components/BoxAdd/BoxAdd';

const Save = ({navigation}) => {
  const data = [
    {
      id: 1,
      boxes: [
        {key: 'Số tiền vay', value: '100.000.000 đ'},
        {key: 'Số hợp đồng', value: '123-456-789'},
        {key: 'Ngày đến hạn', value: '22/07/2024'},
      ],
    },
    {
      id: 2,
      boxes: [
        {key: 'Số tiền vay', value: '200.000.000 đ'},
        {key: 'Số hợp đồng', value: '987-654-321'},
        {key: 'Ngày đến hạn', value: '15/08/2024'},
      ],
    },
    {
      id: 3,
      boxes: [
        {key: 'Số tiền vay', value: '300.000.000 đ'},
        {key: 'Số hợp đồng', value: '987-654-321'},
        {key: 'Ngày đến hạn', value: '15/08/2024'},
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        {/* Heading */}

        <Header Navbar="Loan" navigation={navigation} />

        {/* Body */}

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <BoxAdd
              title="Tổng số tiền vay"
              number="100.000.000 đ"
              navigation={navigation}
              add="CreateLoan"
              addText="Vay thêm"
            />

            <View style={styles.listSaves}>
              <Text style={styles.headingList}>Danh sách khoản vay</Text>

              <Table
                name="loan"
                data={data}
                navigation={navigation}
                detail="InfoLoan"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Save;

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
  },

  listSaves: {
    marginTop: 18,
  },
  headingList: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
