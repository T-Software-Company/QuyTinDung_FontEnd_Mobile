import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTranslation} from 'react-i18next';
import InputBackground from '../InputBackground/InputBackground';
import {addAssetCollateral} from '../../api/services/loan';
import {ApartmentAsset, AssetApiError} from '../../api/types/addAssets';
import {Theme} from '../../theme/colors';

// Add type for apartment fields
type OwnerInfo = keyof ApartmentAsset['apartment']['ownerInfo'];

interface FormAssetCollateralProps {
  theme: Theme;
  appId: string;
  onSuccess: () => void;
}

const FormAssetCollateral: React.FC<FormAssetCollateralProps> = ({
  theme,
  appId,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<ApartmentAsset>({
    assetType: 'APARTMENT',
    title: '',
    ownershipType: 'INDIVIDUAL',
    proposedValue: 0,
    documents: [],
    application: {id: appId},
    apartment: {
      plotNumber: '',
      mapNumber: '',
      address: '',
      area: 0,
      purpose: '',
      name: '',
      floorArea: 0,
      typeOfHousing: '',
      typeOfOwnership: '',
      certificateNumber: '',
      certificateBookNumber: '',
      issuingAuthority: '',
      ownerInfo: {
        fullName: '',
        dayOfBirth: '',
        idCardNumber: '',
        permanentAddress: '',
      },
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const {i18n} = useTranslation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(new Date());

  // Add maximum date calculation (18 years ago from today)
  const getMaxDate = () => {
    const today = new Date();
    return new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate(),
    );
  };

  // Add type guard for field access
  const handleChange = (field: string, value: any) => {
    setFormData(prev => {
      if (field.startsWith('apartment.ownerInfo.')) {
        const ownerField = field.split('.')[2] as keyof OwnerInfo;
        return {
          ...prev,
          apartment: {
            ...prev.apartment,
            ownerInfo: {
              ...prev.apartment.ownerInfo,
              [ownerField]: value,
            },
          },
        };
      }

      if (field.startsWith('apartment.')) {
        const apartmentField = field.split(
          '.',
        )[1] as keyof ApartmentAsset['apartment'];
        return {
          ...prev,
          apartment: {
            ...prev.apartment,
            [apartmentField]: value,
          },
        };
      }

      const topLevelField = field as keyof ApartmentAsset;
      return {
        ...prev,
        [topLevelField]: value,
      };
    });
  };

  const handleDatePress = () => {
    setShowDatePicker(true);
    // Set initial date to 18 years ago if no date is selected
    if (!tempDate) {
      setTempDate(getMaxDate());
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      setTempDate(selectedDate);
      const isoDate = selectedDate.toISOString();
      handleChange('apartment.ownerInfo.dayOfBirth', isoDate);
    }
  };

  const handleConfirmDate = () => {
    if (tempDate) {
      const isoDate = tempDate.toISOString();
      handleChange('apartment.ownerInfo.dayOfBirth', isoDate);
    }
    setShowDatePicker(false);
  };

  // Format date for display
  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(i18n.language === 'vi' ? 'vi-VN' : 'en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  console.log('formData', formData);
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await addAssetCollateral(appId, formData);
      onSuccess();
    } catch (error: unknown) {
      const assetError = error as AssetApiError;
      console.log(assetError.response);
    } finally {
      setIsLoading(false);
    }
  };

  const getInputValue = (value: any): string => {
    if (value === undefined || value === null) return '';
    return String(value);
  };

  const styles = StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingBottom: 20,
    },
    body: {
      paddingTop: 8,
      marginTop: 12,
      paddingHorizontal: 20,
      paddingBottom: 8,
    },
    section: {
      marginBottom: 24,
      backgroundColor: theme.backgroundBox,
      borderRadius: 12,
      padding: 16,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 16,
      color: theme.text,
      borderLeftWidth: 3,
      borderLeftColor: theme.buttonSubmit,
      paddingLeft: 8,
    },
    fieldContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      marginBottom: 8,
      color: theme.noteText,
      fontWeight: '500',
    },
    dateInput: {
      backgroundColor: theme.text,
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.tableBorderColor,
    },
    dateText: {
      color: '#000',
      fontSize: 14,
    },
    datePlaceholder: {
      color: theme.noteText,
      fontSize: 14,
    },
    submitButton: {
      backgroundColor: theme.buttonSubmit,
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      // marginHorizontal: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    datePickerOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    datePickerContainer: {
      backgroundColor: theme.background,
      width: '90%',
      maxWidth: 340,
      borderRadius: 12,
      alignSelf: 'center',
      padding: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    datePickerWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    },
    datePickerButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: theme.tableBorderColor,
    },
    datePickerButton: {
      padding: 10,
      minWidth: 80,
      alignItems: 'center',
    },
    datePickerButtonText: {
      color: theme.buttonSubmit,
      fontSize: 16,
      fontWeight: '500',
    },
  });

  // Update the apartment fields mapping with proper types
  const apartmentFields: Array<{
    field: keyof ApartmentAsset['apartment'];
    label: string;
    placeholder: string;
    numeric?: boolean;
  }> = [
    {field: 'plotNumber', label: 'Số thửa', placeholder: 'Nhập số thửa'},
    {
      field: 'mapNumber',
      label: 'Số tờ bản đồ',
      placeholder: 'Nhập số tờ bản đồ',
    },
    {
      field: 'address',
      label: 'Địa chỉ',
      placeholder: 'Nhập địa chỉ',
    },
    {
      field: 'area',
      label: 'Diện tích (m²)',
      placeholder: 'Nhập diện tích',
      numeric: true,
    },
    {
      field: 'purpose',
      label: 'Mục đích sử dụng',
      placeholder: 'Nhập mục đích sử dụng',
    },
    {
      field: 'name',
      label: 'Tên căn hộ',
      placeholder: 'Nhập tên căn hộ',
    },
    {
      field: 'floorArea',
      label: 'Diện tích sàn (m²)',
      placeholder: 'Nhập diện tích sàn',
      numeric: true,
    },
    {
      field: 'typeOfHousing',
      label: 'Loại nhà ở',
      placeholder: 'Nhập loại nhà ở',
    },
    {
      field: 'typeOfOwnership',
      label: 'Hình thức sở hữu',
      placeholder: 'Nhập hình thức sở hữu',
    },
    {
      field: 'certificateNumber',
      label: 'Số giấy chứng nhận',
      placeholder: 'Nhập số giấy chứng nhận',
    },
    {
      field: 'certificateBookNumber',
      label: 'Số vào sổ cấp GCN',
      placeholder: 'Nhập số vào sổ',
    },
    {
      field: 'issuingAuthority',
      label: 'Cơ quan cấp',
      placeholder: 'Nhập cơ quan cấp',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Basic Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Tên tài sản</Text>
          <InputBackground
            value={getInputValue(formData.title)}
            onChangeText={value => handleChange('title', value)}
            placeholder="Nhập tên tài sản"
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Giá trị đề xuất</Text>
          <InputBackground
            value={getInputValue(formData.proposedValue)}
            onChangeText={value => handleChange('proposedValue', Number(value))}
            placeholder="Nhập giá trị"
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Apartment Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin căn hộ</Text>
        {apartmentFields.map(({field, label, placeholder, numeric}) => (
          <View key={field} style={styles.fieldContainer}>
            <Text style={styles.label}>{label}</Text>
            <InputBackground
              value={getInputValue(formData.apartment[field])}
              onChangeText={value =>
                handleChange(
                  `apartment.${field}`,
                  numeric ? Number(value) : value,
                )
              }
              placeholder={placeholder}
              keyboardType={numeric ? 'numeric' : 'default'}
            />
          </View>
        ))}
      </View>

      {/* Owner Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin chủ sở hữu</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Họ và tên</Text>
          <InputBackground
            value={formData.apartment.ownerInfo.fullName}
            onChangeText={value =>
              handleChange('apartment.ownerInfo.fullName', value)
            }
            placeholder="Nhập họ và tên"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Ngày sinh</Text>
          <TouchableOpacity style={styles.dateInput} onPress={handleDatePress}>
            <Text
              style={
                formData.apartment.ownerInfo.dayOfBirth
                  ? styles.dateText
                  : styles.datePlaceholder
              }>
              {formData.apartment.ownerInfo.dayOfBirth
                ? formatDisplayDate(formData.apartment.ownerInfo.dayOfBirth)
                : 'Chọn ngày sinh'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Platform specific date picker */}
        {showDatePicker &&
          (Platform.OS === 'ios' ? (
            <View style={styles.datePickerOverlay}>
              <View style={styles.datePickerContainer}>
                <View style={styles.datePickerWrapper}>
                  <DateTimePicker
                    value={tempDate}
                    mode="date"
                    display="spinner"
                    onChange={(event, date) => {
                      if (date) setTempDate(date);
                    }}
                    maximumDate={getMaxDate()}
                    locale={i18n.language === 'vi' ? 'vi-VN' : 'en-US'}
                    textColor={theme.text}
                  />
                </View>
                <View style={styles.datePickerButtons}>
                  <TouchableOpacity
                    style={styles.datePickerButton}
                    onPress={() => setShowDatePicker(false)}>
                    <Text style={styles.datePickerButtonText}>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.datePickerButton}
                    onPress={handleConfirmDate}>
                    <Text style={styles.datePickerButtonText}>Xác nhận</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <DateTimePicker
              value={tempDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={getMaxDate()}
              locale={i18n.language === 'vi' ? 'vi-VN' : 'en-US'}
            />
          ))}

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Số CMND/CCCD</Text>
          <InputBackground
            value={formData.apartment.ownerInfo.idCardNumber}
            onChangeText={value =>
              handleChange('apartment.ownerInfo.idCardNumber', value)
            }
            placeholder="Nhập số CMND/CCCD"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Địa chỉ thường trú</Text>
          <InputBackground
            value={formData.apartment.ownerInfo.permanentAddress}
            onChangeText={value =>
              handleChange('apartment.ownerInfo.permanentAddress', value)
            }
            placeholder="Nhập địa chỉ thường trú"
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Tiếp tục</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default FormAssetCollateral;
