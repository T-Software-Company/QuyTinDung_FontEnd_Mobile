import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import BankBottomSheetPicker from '../BankBottomSheetPicker/BankBottomSheetPicker';
import {useTheme} from '../../context/ThemeContext';

const FormTransfer = () => {
  const [selectedBank, setSelectedBank] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [amount, setAmount] = useState('');
  const [content, setContent] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const {theme} = useTheme();
  
  const getBankName = value => {
    if (!value) return 'Chọn ngân hàng';

    const banks = {
      vcb: 'Vietcombank',
      tcb: 'Techcombank',
      tpb: 'TPBank',
      bidv: 'BIDV',
      agr: 'Agribank',
      mb: 'MBBank',
      vtb: 'VietinBank',
      acb: 'ACB',
      vpb: 'VPBank',
      scb: 'SacomBank',
      hdb: 'HDBank',
      ocb: 'OCB',
      seab: 'SeABank',
    };
    return banks[value] || value;
  };

  const styles = StyleSheet.create({
    box: {
      marginBottom: 80,
    },
    sourceMoney: {
      backgroundColor: theme.background,
      marginTop: 20,
      marginHorizontal: 20,
      borderRadius: 12,
      padding: 12,
      display: 'flex',
      flexDirection: 'column',
    },
    heading: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.text,
    },
    boxWrapMoney: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12,
    },
    titleMoney: {
      color: theme.noteText,
      fontSize: 12,
    },
  
    boxTransfer: {
      backgroundColor: theme.background,
      marginTop: 20,
      marginHorizontal: 20,
      borderRadius: 12,
      padding: 12,
      display: 'flex',
      flexDirection: 'column',
    },
    formGroup: {
      marginTop: 12,
    },
    label: {
      fontSize: 12,
      color: theme.text,
      marginBottom: 8,
    },
    bankSelector: {
      borderWidth: 1,
      borderColor: '#aaa',
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
      backgroundColor: '#fff',
    },
    input: {
      borderWidth: 1,
      borderColor: '#aaa',
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
      backgroundColor: '#fff',
      color: '#000', // Changed from 'red' to '#000' for consistency
    },
    contentInput: {
      height: 100,
      textAlignVertical: 'top',
    },
    charCount: {
      fontSize: 12,
      color: '#aaa',
      textAlign: 'right',
      marginTop: -8,
      marginBottom: 12,
    },
    wrapToggle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // height: 32,  // Adjust this value based on your label height
    },
    labelToggle: {
      fontSize: 12,
      color: theme.text,
    },
    switch: {
      transform: [{scaleX: 0.6}, {scaleY: 0.6}],
    },
  });

  return (
    <View style={styles.box}>
      <View style={styles.sourceMoney}>
        <Text style={styles.heading}>Nguồn tiền</Text>
        <View style={styles.boxWrapMoney}>
          <Text style={styles.titleMoney}>Tiền mặt khả dụng</Text>
          <Text style={styles.heading}>500.000đ</Text>
        </View>
        <View style={styles.boxWrapMoney}>
          <Text style={styles.titleMoney}>Tiền hạn mức khả dụng</Text>
          <Text style={styles.heading}>500.000đ</Text>
        </View>
      </View>

      <View style={styles.boxTransfer}>
        <Text style={styles.heading}>Chuyển tiền</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Ngân hàng nhận</Text>
          <TouchableOpacity
            style={styles.bankSelector}
            onPress={() => setShowPicker(true)}>
            <Text>{getBankName(selectedBank)}</Text>
          </TouchableOpacity>

          <BankBottomSheetPicker
            visible={showPicker}
            onClose={() => setShowPicker(false)}
            onSelect={setSelectedBank}
            selectedValue={selectedBank}
          />

          <Text style={styles.label}>Số tài khoản/Số thẻ</Text>
          <TextInput
            style={styles.input}
            value={accountNumber}
            onChangeText={setAccountNumber}
            keyboardType="numeric"
            placeholder="Nhập số tài khoản/số thẻ"
          />

          {accountNumber.length > 5 && (
            <>
              <Text style={styles.label}>Tên người nhận</Text>
              <TextInput
                style={[styles.input, {color: '#000'}]}
                value={'NGUYEN VAN A'}
                editable={false}
              />
            </>
          )}

          <Text style={styles.label}>Số tiền chuyển</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="Nhập số tiền chuyển"
          />

          <Text style={styles.label}>Nội dung chuyển khoản</Text>
          <TextInput
            style={[styles.input, styles.contentInput]}
            value={content}
            onChangeText={setContent}
            multiline
            maxLength={160}
            placeholder="Nhập nội dung chuyển khoản"
          />
          <Text style={styles.charCount}>{content.length}/160</Text>
          <View style={styles.wrapToggle}>
            <Text style={styles.labelToggle}>Lưu người nhận</Text>
            <Switch
              style={styles.switch}
              trackColor={{false: '#E0E0E0', true: '#007BFF'}}
              thumbColor={isEnabled ? '#FFFFFF' : '#FFFFFF'}
              ios_backgroundColor="#E0E0E0"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FormTransfer;


