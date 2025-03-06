import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import InputBackground from '../InputBackground/InputBackground';
import DatePicker from '../DatePicker/DatePicker';
import {formatDate} from '../../utils/dateUtils';
import {addAssetCollateral} from '../../api/services/loan';
import {
  landFields,
  commonFields,
  landMetadataFields,
  transferInfoFields,
  ownerInfoFields,
} from './formFields';
import {createStyles} from './styles';
import {Theme} from '../../theme/colors';
import KeyboardWrapper from '../KeyboardWrapper/KeyboardWrapper';

interface FormLandFieldsProps {
  theme: Theme;
  appId: string;
  onSuccess: () => void;
}

const FormLandFields: React.FC<FormLandFieldsProps> = ({
  theme,
  appId,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    assetType: 'LAND',
    title: '',
    ownershipType: 'INDIVIDUAL',
    proposedValue: 0,
    documents: [],
    application: {id: appId},
    landAsset: {
      plotNumber: '',
      mapNumber: '',
      address: '',
      area: 0,
      purpose: '',
      expirationDate: '',
      originOfUsage: '',
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
      metadata: {
        zoning: '',
        frontage: '',
        landUseRights: '',
        developmentPotential: '',
      },
    },
  });

  const [selectedDateField, setSelectedDateField] = useState<string | null>(
    null,
  );
  const [tempDate, setTempDate] = useState(new Date());

  const styles = createStyles(theme);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => {
      if (field.startsWith('landAsset.')) {
        const landField = field.split('.')[1];
        return {
          ...prev,
          landAsset: {
            ...prev.landAsset,
            [landField]: value,
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

  const handleDatePress = (fieldPath: string) => {
    let currentValue = null;
    const pathParts = fieldPath.split('.');

    if (pathParts.length === 2) {
      currentValue =
        formData.landAsset[pathParts[1] as keyof typeof formData.landAsset];
    } else if (pathParts.length === 3) {
      const section = formData.landAsset[
        pathParts[1] as keyof typeof formData.landAsset
      ] as any;
      currentValue = section[pathParts[2]];
    }

    setTempDate(currentValue ? new Date(currentValue) : new Date());
    setSelectedDateField(fieldPath);
  };

  const handleDateConfirm = (dateString: string) => {
    if (selectedDateField) {
      const pathParts = selectedDateField.split('.');

      if (pathParts.length === 2) {
        setFormData(prev => ({
          ...prev,
          landAsset: {
            ...prev.landAsset,
            [pathParts[1]]: dateString,
          },
        }));
      } else if (pathParts.length === 3) {
        setFormData(prev => ({
          ...prev,
          landAsset: {
            ...prev.landAsset,
            [pathParts[1]]: {
              ...prev.landAsset[pathParts[1] as keyof typeof prev.landAsset],
              [pathParts[2]]: dateString,
            },
          },
        }));
      }
      setSelectedDateField(null);
    }
  };

  const handleDateChange = (date: Date) => {
    setTempDate(date);
  };

  const getFieldValue = (fieldPath: string): string => {
    const pathParts = fieldPath.split('.');
    if (pathParts.length === 2) {
      return formData.landAsset[
        pathParts[1] as keyof typeof formData.landAsset
      ] as string;
    } else if (pathParts.length === 3) {
      const section = formData.landAsset[
        pathParts[1] as keyof typeof formData.landAsset
      ] as any;
      return section[pathParts[2]] as string;
    }
    return '';
  };

  const renderField = (field: any, value: string, fieldPath: string) => {
    if (field.isDate) {
      const displayValue = value ? formatDate(new Date(value)) : '';
      return (
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => handleDatePress(fieldPath)}>
          <Text
            style={
              displayValue ? styles.dateInputText : styles.dateInputPlaceholder
            }>
            {displayValue || field.placeholder}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <InputBackground
        value={getInputValue(value)}
        onChangeText={value =>
          handleChange(fieldPath, field.numeric ? Number(value) : value)
        }
        placeholder={field.placeholder}
        keyboardType={field.numeric ? 'numeric' : 'default'}
      />
    );
  };

  return (
    <KeyboardWrapper>
      <View style={styles.wrapper}>
        <ScrollView
          style={styles.container}
          scrollEnabled={!selectedDateField} // Disable scroll when date picker is visible
        >
          {/* Common Fields */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
            {commonFields.map(({field, label, placeholder, numeric}) => (
              <View key={field} style={styles.fieldContainer}>
                <Text style={styles.label}>{label}</Text>
                {renderField(
                  {field, label, placeholder, numeric},
                  getInputValue(formData[field]),
                  field,
                )}
              </View>
            ))}
          </View>
  
          {/* Land Fields */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin đất</Text>
            {landFields.map(({field, label, placeholder, numeric, isDate}) => (
              <View key={field} style={styles.fieldContainer}>
                <Text style={styles.label}>{label}</Text>
                {renderField(
                  {field, label, placeholder, numeric, isDate},
                  getInputValue(
                    formData.landAsset[field as keyof typeof formData.landAsset],
                  ),
                  `landAsset.${field}`,
                )}
              </View>
            ))}
          </View>
  
          {/* Owner Info Fields */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin chủ sở hữu</Text>
            {ownerInfoFields.map(({field, label, placeholder, isDate}) => (
              <View key={field} style={styles.fieldContainer}>
                <Text style={styles.label}>{label}</Text>
                {renderField(
                  {field, label, placeholder, isDate},
                  getInputValue(
                    formData.landAsset.ownerInfo[
                      field as keyof typeof formData.landAsset.ownerInfo
                    ],
                  ),
                  `landAsset.ownerInfo.${field}`,
                )}
              </View>
            ))}
          </View>
  
          {/* Land Metadata Fields */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin bổ sung</Text>
            {landMetadataFields.map(({field, label, placeholder}) => (
              <View key={field} style={styles.fieldContainer}>
                <Text style={styles.label}>{label}</Text>
                {renderField(
                  {field, label, placeholder},
                  getInputValue(
                    formData.landAsset.metadata[
                      field as keyof typeof formData.landAsset.metadata
                    ],
                  ),
                  `landAsset.metadata.${field}`,
                )}
              </View>
            ))}
          </View>
  
          {/* Transfer Info Fields */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin chuyển nhượng</Text>
            {transferInfoFields.map(({field, label, placeholder, isDate}) => (
              <View key={field} style={styles.fieldContainer}>
                <Text style={styles.label}>{label}</Text>
                {renderField(
                  {field, label, placeholder, isDate},
                  getInputValue(
                    formData.landAsset.transferInfo[
                      field as keyof typeof formData.landAsset.transferInfo
                    ],
                  ),
                  `landAsset.transferInfo.${field}`,
                )}
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
  
        {/* Move DatePicker outside ScrollView */}
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

export default FormLandFields;
