import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Pressable,
  TextInput,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';

const BankBottomSheetPicker = ({
  visible,
  onClose,
  onSelect,
  selectedValue,
}) => {
  const [localVisible, setLocalVisible] = useState(visible);
  const [searchText, setSearchText] = useState('');
  const slideAnim = React.useRef(new Animated.Value(0)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setLocalVisible(true);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setLocalVisible(false);
      onClose();
    });
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').height, 0],
  });

  const banks = [
    { label: 'Vietcombank', value: 'vcb' },
    { label: 'Techcombank', value: 'tcb' },
    { label: 'TPBank', value: 'tpb' },
    { label: 'BIDV', value: 'bidv' },
    { label: 'Agribank', value: 'agr' },
    { label: 'MBBank', value: 'mb' },
    { label: 'VietinBank', value: 'vtb' },
    { label: 'ACB', value: 'acb' },
    { label: 'VPBank', value: 'vpb' },
    { label: 'SacomBank', value: 'scb' },
    { label: 'HDBank', value: 'hdb' },
    { label: 'OCB', value: 'ocb' },
    { label: 'SeABank', value: 'seab' }
  ];

  const filteredBanks = banks.filter(bank =>
    bank.label.toLowerCase().includes(searchText.toLowerCase()) // Changed from startsWith to includes for better search
  );

  return (
    <Modal
      visible={localVisible}
      transparent={true}
      animationType="none"
      onRequestClose={handleClose}>
      <View style={styles.modalContainer}>
        <Animated.View 
          style={[
            styles.overlay,
            {
              opacity: fadeAnim,
            }
          ]}>
          <Pressable style={styles.pressable} onPress={handleClose} />
        </Animated.View>
        <Animated.View 
          style={[
            styles.bottomSheetContainer,
            {
              transform: [{ translateY }],
            },
          ]}>
          <View style={styles.bottomSheet}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Chọn ngân hàng</Text>
              <TouchableOpacity onPress={handleClose}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm ngân hàng..."
              value={searchText}
              onChangeText={setSearchText}
            />

            <ScrollView style={styles.bankList}>
              {filteredBanks.length > 0 ? (
                filteredBanks.map((bank) => (
                  <TouchableOpacity
                    key={bank.value}
                    style={[
                      styles.bankItem,
                      selectedValue === bank.value && styles.selectedItem,
                    ]}
                    onPress={() => {
                      onSelect(bank.value);
                      handleClose();
                    }}>
                    <Text style={styles.bankItemText}>{bank.label}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>Không tìm thấy kết quả</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pressable: {
    flex: 1,
  },
  bottomSheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: Dimensions.get('window').height * 0.65,
  },
  bottomSheet: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 20,
    color: '#666',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#f8f8f8',
  },
  bankList: {
    flex: 1,
  },
  noResults: {
    padding: 16,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
  },
  bankItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedItem: {
    backgroundColor: '#f0f0f0',
  },
  bankItemText: {
    fontSize: 16,
  },
});

export default BankBottomSheetPicker;