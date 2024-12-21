import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import InputBackground from '../InputBackground/InputBackground';

const FormCreateSave = () => {
  const [value, setValue] = useState(null);
  const rates = [
    {
      value: '1',
      lable: '5 tháng',
      rate: '4%',
    },
    {
      value: '2',
      lable: '8 tháng',
      rate: '5%',
    },

    {
      value: '3',
      lable: '12 tháng',
      rate: '5.5%',
    },
  ];

  const method_extend = [
    {
      value: '1',
      lable: 'Gộp cả lãi',
    },
    {
      value: '2',
      lable: 'Trả lãi gốc',
    },

    {
      value: '3',
      lable: 'Trả lãi hàng tháng',
    },
  ];

  const method_pay = [
    {
      value: '1',
      lable: 'Online',
    },
    {
      value: '2',
      lable: 'Tại quầy',
    },
  ];

  const [selectedRate, setSelectedRate] = useState(null);
  const [methodExtend, setMethodExtend] = useState(null);
  const [method, setMethod] = useState(null);

  return (
    <View style={styles.form}>
      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>Số tiền cần gửi</Text>
        <InputBackground
          value={value}
          onValue={setValue}
          placeholder="Tối thiểu 1 triệu, tối đa 10 tỷ"
          keyboardType="numeric"
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
            Lãi suất của kỳ hạn {selectedRate.lable} là {selectedRate.rate}
          </Text>
        ) : (
          <></>
        )}
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>Hình thức gia hạn</Text>
        <Dropdown
          style={styles.textInput}
          selectedTextStyle={styles.selectedTextStyle}
          placeholderStyle={styles.placeholderStyle}
          imageStyle={styles.imageStyle}
          iconStyle={styles.iconStyle}
          maxHeight={200}
          value={methodExtend}
          data={method_extend}
          valueField="value"
          labelField="lable"
          imageField="false"
          placeholder="Chọn hình thức gia hạn"
          searchPlaceholder="Search..."
          onChange={e => {
            setMethodExtend(e.value);
          }}
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>Phương thức thanh toán</Text>
        <Dropdown
          style={styles.textInput}
          selectedTextStyle={styles.selectedTextStyle}
          placeholderStyle={styles.placeholderStyle}
          imageStyle={styles.imageStyle}
          iconStyle={styles.iconStyle}
          maxHeight={200}
          value={method}
          data={method_pay}
          valueField="value"
          labelField="lable"
          imageField="false"
          placeholder="Chọn phương thức thanh toán"
          searchPlaceholder="Search..."
          onChange={e => {
            setMethod(e.value);
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => Alert.alert('Thông báo', 'Bạn đã gửi thành công')}>
        <Text
          style={[styles.textWhite, {fontWeight: 'bold', textAlign: 'center'}]}>
          Gửi
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormCreateSave;

const styles = StyleSheet.create({
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

  textWhite: {
    color: 'white',
  },
});
