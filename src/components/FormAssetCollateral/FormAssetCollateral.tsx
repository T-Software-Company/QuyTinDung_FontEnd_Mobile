/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef} from 'react';
import DropdownComponent from '../DropdownComponent/DropdownComponent';
import InputBackground from '../InputBackground/InputBackground';
import {useTranslation} from 'react-i18next';
import i18n from '../../../i18n';
import {Theme} from '../../theme/colors';
import {
  LoanRequestBody,
  BorrowerType,
  LoanSecurityType,
  LoanCollateralType,
} from '../../api/types/loanRequest';
import {loanRequest} from '../../api/services/createLoan';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigators/RootNavigator';
import CustomMultiSelect from '../CustomMultiSelect/CustomMultiSelect';

interface FormAssetCollateralProps {
  theme: Theme;
  appId: string;
  navigation: StackNavigationProp<RootStackParamList, 'AssetCollateral'>;
}

interface TargetItem {
  value: string;
  label: string;
}

interface FormData extends Omit<LoanRequestBody, 'application'> {
  selectedRate?: TargetItem;
  method?: string;
}

interface FormErrors {
  amount?: string;
  purpose?: string;
  asset?: string;
  note?: string;
  loanCollateralTypes?: string;
}

const FormAssetCollateral: React.FC<FormAssetCollateralProps> = ({
  theme,
  appId,
  navigation,
}) => {
  const currentLanguage = i18n.language;
  const {t} = useTranslation();

  const borrowerTypes = [
    {
      value: 'INDIVIDUAL',
      label: currentLanguage === 'vi' ? 'Cá nhân' : 'Individual',
    },
    {
      value: 'BUSINESS',
      label: currentLanguage === 'vi' ? 'Doanh nghiệp' : 'Business',
    },
  ];

  const securityTypes = [
    {
      value: 'MORTGAGE',
      label: currentLanguage === 'vi' ? 'Thế chấp' : 'Mortgage',
    },
    {
      value: 'UNSECURED',
      label: currentLanguage === 'vi' ? 'Tín chấp' : 'Unsecured',
    },
  ];

  const collateralTypes = [
    {
      value: 'VEHICLE',
      label: currentLanguage === 'vi' ? 'Phương tiện' : 'Vehicle',
    },
    {
      value: 'PROPERTY',
      label: currentLanguage === 'vi' ? 'Bất động sản' : 'Property',
    },
    {
      value: 'EQUIPMENT',
      label: currentLanguage === 'vi' ? 'Thiết bị' : 'Equipment',
    },
  ];

  const [formData, setFormData] = useState<FormData>({
    purpose: '',
    amount: 0,
    borrowerType: 'INDIVIDUAL',
    asset: '',
    loanSecurityType: 'UNSECURED',
    loanCollateralTypes: [],
    note: '',
    metadata: {
      key1: '',
      key2: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isOpen, setIsOpen] = useState(false);
  const multiSelectRef = useRef<View>(null);

  const handleOnchange = (field: keyof FormData, value: any): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.amount || formData.amount <= 1000000) {
      newErrors.amount =
        currentLanguage === 'vi'
          ? 'Vui lòng nhập số tiền lớn hơn 1000000'
          : 'Please enter a valid amount';
      isValid = false;
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose =
        currentLanguage === 'vi'
          ? 'Vui lòng nhập mục đích vay'
          : 'Please enter loan purpose';
      isValid = false;
    }

    if (!formData.asset.trim()) {
      newErrors.asset =
        currentLanguage === 'vi'
          ? 'Vui lòng nhập tài sản'
          : 'Please enter asset';
      isValid = false;
    }

    if (!formData.note.trim()) {
      newErrors.note =
        currentLanguage === 'vi'
          ? 'Vui lòng nhập ghi chú'
          : 'Please enter a note';
      isValid = false;
    }

    if (
      !formData.loanCollateralTypes ||
      formData.loanCollateralTypes.length === 0
    ) {
      newErrors.loanCollateralTypes =
        currentLanguage === 'vi'
          ? 'Vui lòng chọn ít nhất một loại tài sản'
          : 'Please select at least one collateral type';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    console.log('Form data:', formData);
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);

      const loanData = {
        purpose: formData.purpose,
        amount: formData.amount,
        borrowerType: formData.borrowerType,
        asset: formData.asset,
        loanSecurityType: formData.loanSecurityType,
        loanCollateralTypes: formData.loanCollateralTypes,
        note: formData.note,
        metadata: {
          key1: '',
          key2: '',
        },
      };
      console.log('Loan data:', loanData, appId);

      const response = await loanRequest(appId, loanData);
      console.log('Loan request response:', response);

      if (response) {
        navigation.replace('CreateLoanPlan', {appId});
      }
    } catch (error) {
      console.error('Error creating loan request:', error);
      Alert.alert(
        currentLanguage === 'vi' ? 'Lỗi' : 'Error',
        currentLanguage === 'vi'
          ? 'Có lỗi xảy ra khi tạo khoản vay'
          : 'Error occurred while creating loan request',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const styles = StyleSheet.create({
    boxInput: {
      marginBottom: 12,
    },

    headingTitle: {
      fontWeight: 'bold',
      marginBottom: 8,
      color: theme.text,
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

    // dropdown: {
    //   borderColor: '#ccc',
    //   borderWidth: 1,
    //   borderRadius: 5,
    //   height: 50,
    //   zIndex: 5000,
    // },
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
    errorText: {
      color: 'red',
      fontSize: 12,
      marginTop: 8,
    },
    checkboxContainer: {
      flexDirection: 'column',
      flexWrap: 'wrap',
      gap: 12,
    },
    checkboxItem: {
      // flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f4f4f4',
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    checkboxSelected: {
      backgroundColor: '#e3f0ff',
      borderColor: '#007BFF',
    },
    checkboxText: {
      color: '#000',
    },
    checkboxTextSelected: {
      color: '#007BFF',
    },
    multiSelect: {
      backgroundColor: '#f4f4f4',
      borderRadius: 8,
      minHeight: 50,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    selectedItemsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    selectedItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#e3f0ff',
      borderRadius: 4,
      paddingHorizontal: 8,
      paddingVertical: 4,
      margin: 2,
    },
    selectedItemText: {
      fontSize: 14,
      color: '#007BFF',
      marginRight: 4,
    },
    deleteButton: {
      padding: 2,
    },
    deleteButtonText: {
      color: '#007BFF',
      fontSize: 16,
    },
    clearAllButton: {
      marginLeft: 'auto',
      padding: 4,
    },
    selectedStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20, // More rounded corners
      backgroundColor: '#007BFF',
      paddingHorizontal: 12,
      paddingVertical: 6,
      margin: 4,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    placeholderStyle: {
      fontSize: 14,
      color: '#aaa',
    },
    chipContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 4,
    },
    closeIcon: {
      color: '#fff',
      fontSize: 16,
      marginLeft: 4,
    },
    dropdownStyle: {
      backgroundColor: '#fff',
      borderRadius: 12,
      marginTop: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 8,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.05)',
    },
    itemStyle: {
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    itemText: {
      fontSize: 14,
      color: '#333',
      fontWeight: '500',
    },
    itemSelected: {
      backgroundColor: 'rgba(0,123,255,0.05)',
    },
    noDataText: {
      textAlign: 'center',
      padding: 16,
      color: '#666',
    },
    searchInput: {
      backgroundColor: '#f8f9fa',
      padding: 12,
      borderRadius: 8,
      marginHorizontal: 8,
      marginVertical: 4,
    },
    multiSelectContainer: {
      position: 'relative',
    },
    inputContainer: {
      backgroundColor: '#f4f4f4',
      borderRadius: 8,
      padding: 8,
      minHeight: 45,
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
    },
    tag: {
      backgroundColor: '#e3f0ff',
      borderRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 4,
      paddingHorizontal: 8,
    },
    tagText: {
      color: '#007BFF',
      fontSize: 14,
      marginRight: 4,
    },
    removeTag: {
      color: '#007BFF',
      fontSize: 16,
      fontWeight: '600',
    },
    clearAll: {
      padding: 8,
      marginRight: 4,
    },
    clearAllText: {
      color: '#666',
      fontSize: 16,
      fontWeight: '500',
    },
    tagsContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
    },
    placeholder: {
      color: '#999',
      fontSize: 14,
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: 'white',
      marginTop: 4,
      borderRadius: 8,
      padding: 8,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
      zIndex: 1000,
    },
    option: {
      padding: 12,
      borderRadius: 6,
      marginVertical: 2,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    optionSelected: {
      backgroundColor: '#f0f9ff',
    },
    optionText: {
      fontSize: 14,
      color: '#333',
    },
    checkmark: {
      color: '#007BFF',
      fontWeight: 'bold',
    },
    arrowIcon: {
      padding: 8,
      color: '#666',
    },
    rightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  const handleCollateralTypeChange = (value: LoanCollateralType) => {
    setFormData(prev => {
      const currentTypes = prev.loanCollateralTypes || [];
      const newTypes = currentTypes.includes(value)
        ? currentTypes.filter(type => type !== value)
        : [...currentTypes, value];

      return {
        ...prev,
        loanCollateralTypes: newTypes,
      };
    });
  };

  return (
    <View>
      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {currentLanguage === 'vi' ? 'Số tiền vay' : 'Loan Amount'}
        </Text>
        <InputBackground
          placeholder={
            currentLanguage === 'vi' ? 'Nhập số tiền' : 'Enter amount'
          }
          keyboardType="numeric"
          onChangeText={(value: string) =>
            handleOnchange('amount', Number(value))
          }
          value={formData.amount.toString()}
        />
        {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {currentLanguage === 'vi' ? 'Mục đích vay' : 'Loan Purpose'}
        </Text>
        <InputBackground
          placeholder={
            currentLanguage === 'vi' ? 'Nhập mục đích' : 'Enter purpose'
          }
          onChangeText={(value: string) => handleOnchange('purpose', value)}
          value={formData.purpose}
        />
        {errors.purpose && (
          <Text style={styles.errorText}>{errors.purpose}</Text>
        )}
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {currentLanguage === 'vi' ? 'Loại người vay' : 'Borrower Type'}
        </Text>
        <DropdownComponent
          value={formData.borrowerType}
          data={borrowerTypes}
          placeholder={currentLanguage === 'vi' ? 'Chọn loại' : 'Select type'}
          onChange={(value: TargetItem) =>
            handleOnchange('borrowerType', value.value as BorrowerType)
          }
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {currentLanguage === 'vi' ? 'Tài sản' : 'Asset'}
        </Text>
        <InputBackground
          placeholder={
            currentLanguage === 'vi' ? 'Nhập tài sản' : 'Enter asset'
          }
          onChangeText={(value: string) => handleOnchange('asset', value)}
          value={formData.asset}
        />
        {errors.asset && <Text style={styles.errorText}>{errors.asset}</Text>}
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {currentLanguage === 'vi' ? 'Hình thức bảo đảm' : 'Security Type'}
        </Text>
        <DropdownComponent
          value={formData.loanSecurityType}
          data={securityTypes}
          placeholder={
            currentLanguage === 'vi' ? 'Chọn hình thức' : 'Select type'
          }
          onChange={(value: TargetItem) =>
            handleOnchange('loanSecurityType', value.value as LoanSecurityType)
          }
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {currentLanguage === 'vi'
            ? 'Loại tài sản đảm bảo'
            : 'Collateral Type'}
        </Text>
        <CustomMultiSelect
          ref={multiSelectRef}
          value={formData.loanCollateralTypes}
          options={collateralTypes}
          placeholder={
            currentLanguage === 'vi'
              ? 'Chọn loại tài sản'
              : 'Select collateral types'
          }
          onChange={value => handleOnchange('loanCollateralTypes', value)}
          onItemSelect={handleCollateralTypeChange}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        {errors.loanCollateralTypes && (
          <Text style={styles.errorText}>{errors.loanCollateralTypes}</Text>
        )}
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.headingTitle}>
          {currentLanguage === 'vi' ? 'Ghi chú' : 'Note'}
        </Text>
        <InputBackground
          placeholder={currentLanguage === 'vi' ? 'Nhập ghi chú' : 'Enter note'}
          onChangeText={(value: string) => handleOnchange('note', value)}
          value={formData.note}
        />
        {errors.note && <Text style={styles.errorText}>{errors.note}</Text>}
      </View>

      <TouchableOpacity
        style={[styles.btn, isLoading && {opacity: 0.7}]}
        onPress={handleSubmit}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text
            style={[
              styles.textWhite,
              {fontWeight: 'bold', textAlign: 'center'},
            ]}>
            {t('formCreateLoan.next')}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default FormAssetCollateral;
