import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import InputBackground from '../InputBackground/InputBackground';
import {addAssetCollateral} from '../../api/services/loan';
import {
  apartmentFields,
  commonFields,
  apartmentMetadataFields,
  transferInfoFields,
  ownerInfoFields,
} from './formFields';
import {createStyles} from './styles';
import {Theme} from '../../theme/colors';
import DatePicker from '../DatePicker/DatePicker';
import KeyboardWrapper from '../KeyboardWrapper/KeyboardWrapper';

interface FormApartmentFieldsProps {
  theme: Theme;
  appId: string;
  onSuccess: () => void;
}

const FormApartmentFields: React.FC<FormApartmentFieldsProps> = ({
  theme,
  appId,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
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
      ownershipTerm: '',
      notes: '',
      sharedFacilities: '',
      certificateNumber: '',
      certificateBookNumber: '',
      issuingAuthority: '',
      issueDate: '',
      expirationDate: '',
      originOfUsage: '',
      metadata: {
        parkingSpace: '',
        floor: 0,
        view: '',
        renovationStatus: '',
      },
      ownerInfo: {
        fullName: '',
        dayOfBirth: '',
        idCardNumber: '',
        permanentAddress: '',
      },
      transferInfo: {
        fullName: '',
        dayOfBirth: '',
        idCardNumber: '',
        permanentAddress: '',
        transferDate: '',
        transferRecordNumber: '',
      },
    },
  });

  const styles = createStyles(theme);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => {
      if (field.startsWith('apartment.')) {
        const apartmentField = field.split('.')[1];
        return {
          ...prev,
          apartment: {
            ...prev.apartment,
            [apartmentField]: value,
          },
        };
      }
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await addAssetCollateral(appId, formData);
      onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getInputValue = (value: any): string => {
    if (value === undefined || value === null) return '';
    return String(value);
  };

  return (
    <KeyboardWrapper>
      <View style={styles.wrapper}>
        <ScrollView style={styles.container} scrollEnabled={!selectedDateField}>
          {/* Common Fields */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
            {commonFields.map(({field, label, placeholder, numeric}) => (
              <View key={field} style={styles.fieldContainer}>
                <Text style={styles.label}>{label}</Text>
                <InputBackground
                  value={getInputValue(formData[field])}
                  onChangeText={value =>
                    handleChange(field, numeric ? Number(value) : value)
                  }
                  placeholder={placeholder}
                  keyboardType={numeric ? 'numeric' : 'default'}
                />
              </View>
            ))}
          </View>

          {/* Apartment Fields */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin căn hộ</Text>
            {apartmentFields.map(({field, label, placeholder, numeric}) => (
              <View key={field} style={styles.fieldContainer}>
                <Text style={styles.label}>{label}</Text>
                <InputBackground
                  value={getInputValue(
                    formData.apartment[
                      field as keyof typeof formData.apartment
                    ],
                  )}
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

          {/* Owner Info Fields */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin chủ sở hữu</Text>
            {ownerInfoFields.map(({field, label, placeholder, isDate}) => (
              <View key={field} style={styles.fieldContainer}>
                <Text style={styles.label}>{label}</Text>
                <InputBackground
                  value={getInputValue(
                    formData.apartment.ownerInfo[
                      field as keyof typeof formData.apartment.ownerInfo
                    ],
                  )}
                  onChangeText={value =>
                    handleChange(`apartment.ownerInfo.${field}`, value)
                  }
                  placeholder={placeholder}
                  keyboardType="default"
                />
              </View>
            ))}
          </View>

          {/* Metadata Fields */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin bổ sung</Text>
            {apartmentMetadataFields.map(
              ({field, label, placeholder, numeric}) => (
                <View key={field} style={styles.fieldContainer}>
                  <Text style={styles.label}>{label}</Text>
                  <InputBackground
                    value={getInputValue(
                      formData.apartment.metadata[
                        field as keyof typeof formData.apartment.metadata
                      ],
                    )}
                    onChangeText={value =>
                      handleChange(
                        `apartment.metadata.${field}`,
                        numeric ? Number(value) : value,
                      )
                    }
                    placeholder={placeholder}
                    keyboardType={numeric ? 'numeric' : 'default'}
                  />
                </View>
              ),
            )}
          </View>

          {/* Transfer Info Fields */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin chuyển nhượng</Text>
            {transferInfoFields.map(({field, label, placeholder, isDate}) => (
              <View key={field} style={styles.fieldContainer}>
                <Text style={styles.label}>{label}</Text>
                <InputBackground
                  value={getInputValue(
                    formData.apartment.transferInfo[
                      field as keyof typeof formData.apartment.transferInfo
                    ],
                  )}
                  onChangeText={value =>
                    handleChange(`apartment.transferInfo.${field}`, value)
                  }
                  placeholder={placeholder}
                  keyboardType="default"
                />
              </View>
            ))}
          </View>

          {/* Submit Button */}
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
        </ScrollView>

        {selectedDateField && (
          <DatePicker
            isVisible={!!selectedDateField}
            onClose={() => setSelectedDateField(null)}
            onConfirm={handleDateConfirm}
            value={tempDate}
            onChange={handleDateChange}
            theme={theme}
            locale="vi-VN"
          />
        )}
      </View>
    </KeyboardWrapper>
  );
};

export default FormApartmentFields;
