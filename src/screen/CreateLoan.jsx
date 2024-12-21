import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Dropdown, SelectCountry} from 'react-native-element-dropdown';

import React, {useState} from 'react';
import Header from '../components/Header/Header';

const CreateLoan = ({navigation}) => {
  const [number, setNumber] = useState(null);

  const rates = [
    {
      value: '1',
      lable: '1 tháng',
      rate: '12%',
    },
    {
      value: '2',
      lable: '3 tháng',
      rate: '10.5%',
    },

    {
      value: '3',
      lable: '12 tháng',
      rate: '8%',
    },
  ];

  const target_loan = [
    {
      value: '1',
      lable: 'Mua nhà',
    },
    {
      value: '2',
      lable: 'Mua ô tô',
    },

    {
      value: '3',
      lable: 'Vay tiêu dùng',
    },
  ];

  const frequency_pay = [
    {
      value: '1',
      lable: 'Hàng tuần',
    },
    {
      value: '2',
      lable: 'Hàng tháng',
    },
    {
      value: '3',
      lable: '2 tháng',
    },
  ];

  const [selectedRate, setSelectedRate] = useState(null);
  const [methodExtend, setMethodExtend] = useState(null);
  const [method, setMethod] = useState(null);

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        {/* Heading */}

        <Header Navbar="CreateLoan" navigation={navigation} />

        {/* Body */}

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <View style={styles.form}>
              <View style={styles.boxInput}>
                <Text style={styles.headingTitle}>Số tiền cần vay</Text>
                <TextInput
                  placeholder="Tối thiểu 1 triệu, tối đa 100 tỷ"
                  placeholderTextColor="#aaa"
                  keyboardType="numeric"
                  onChangeText={setNumber}
                  value={number}
                  style={styles.textInput}
                />
              </View>

              <View style={styles.boxInput}>
                <Text style={styles.headingTitle}>Kỳ hạn và lãi suất</Text>
                <Dropdown
                  style={styles.textInput}
                  selectedTextStyle={styles.selectedTextStyle}
                  placeholderStyle={styles.placeholderStyle}
                  imageStyle={styles.imageStyle}
                  iconStyle={styles.iconStyle}
                  maxHeight={200}
                  value={selectedRate?.value}
                  data={rates}
                  valueField="value"
                  labelField="lable"
                  imageField="false"
                  placeholder="Chọn kỳ hạn và lãi suất"
                  searchPlaceholder="Search..."
                  onChange={value => {
                    setSelectedRate(value);
                  }}
                />

                {selectedRate ? (
                  <Text style={styles.rateText}>
                    Lãi suất của kỳ hạn {selectedRate.lable} là{' '}
                    {selectedRate.rate}
                  </Text>
                ) : (
                  <></>
                )}
              </View>

              <View style={styles.boxInput}>
                <Text style={styles.headingTitle}>Mục đích vay</Text>
                <Dropdown
                  style={styles.textInput}
                  selectedTextStyle={styles.selectedTextStyle}
                  placeholderStyle={styles.placeholderStyle}
                  imageStyle={styles.imageStyle}
                  iconStyle={styles.iconStyle}
                  maxHeight={200}
                  value={methodExtend}
                  data={target_loan}
                  valueField="value"
                  labelField="lable"
                  imageField="false"
                  placeholder="Chọn mục đích vay"
                  searchPlaceholder="Search..."
                  onChange={e => {
                    setMethodExtend(e.value);
                  }}
                />
              </View>

              <View style={styles.boxInput}>
                <Text style={styles.headingTitle}>Tần suất trả lãi</Text>
                <Dropdown
                  style={styles.textInput}
                  selectedTextStyle={styles.selectedTextStyle}
                  placeholderStyle={styles.placeholderStyle}
                  imageStyle={styles.imageStyle}
                  iconStyle={styles.iconStyle}
                  maxHeight={200}
                  value={method}
                  data={frequency_pay}
                  valueField="value"
                  labelField="lable"
                  imageField="false"
                  placeholder="Chọn tần suất trả lãi"
                  searchPlaceholder="Search..."
                  onChange={e => {
                    setMethod(e.value);
                  }}
                />
              </View>
              <TouchableOpacity
                style={styles.btn}
                onPress={() =>
                  Alert.alert(
                    'Thông báo',
                    'Bạn đã tạo khoản vay thành công.\nVui lòng chờ nhân viên hỗ trợ tư vấn và xác nhận.',
                  )
                }>
                <Text
                  style={[
                    styles.textWhite,
                    {fontWeight: 'bold', textAlign: 'center'},
                  ]}>
                  Tạo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CreateLoan;

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

  boxInput: {
    marginBottom: 12,
  },

  headingTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#000',
    paddingVertical: 0,
    textAlignVertical: 'center',
  },

  placeholderStyle: {
    color: '#aaa',
    fontSize: 14,
  },

  selectedTextStyle: {
    color: '#000',
    fontSize: 14,
  },

  btn: {
    width: '100%',
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },

  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },

  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    zIndex: 5000,
  },
  dropdownContainer: {
    borderColor: '#ccc',
    zIndex: 5000,
    position: 'absolute',
  },

  rateText: {
    marginTop: 12,
    fontSize: 14,
    color: '#007BFF',
  },
});
