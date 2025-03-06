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
  machineryFields,
  commonFields,
  machineryMetadataFields,
} from './formFields';
import {createStyles} from './styles';
import {Theme} from '../../theme/colors';
import KeyboardWrapper from '../KeyboardWrapper/KeyboardWrapper';

interface FormMachineryFieldsProps {
  theme: Theme;
  appId: string;
  onSuccess: () => void;
}

const FormMachineryFields: React.FC<FormMachineryFieldsProps> = ({
  theme,
  appId,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    assetType: 'MACHINERY',
    title: '',
    ownershipType: 'INDIVIDUAL',
    proposedValue: 0,
    documents: [],
    application: {id: appId},
    machinery: {
      name: '',
      model: '',
      manufacturer: '',
      manufactureDate: '',
      purchaseDate: '',
      purchasePrice: 0,
      serialNumber: '',
      location: '',
      status: '',
      note: '',
      metadata: {
        warranty: '',
        maintenanceSchedule: '',
        powerConsumption: '',
        precision: '',
      },
    },
  });

  const [selectedDateField, setSelectedDateField] = useState<string | null>(
    null,
  );
  const [tempDate, setTempDate] = useState(new Date());

  const styles = createStyles(theme);

  // ...Implement handleChange, handleSubmit, handleDatePress, handleDateConfirm similar to FormLandFields...

  const handleChange = (field: string, value: any) => {
    setFormData(prev => {
      if (field.startsWith('machinery.')) {
        const landField = field.split('.')[1];
        return {
          ...prev,
          machinery: {
            ...prev.machinery,
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
        formData.machinery[pathParts[1] as keyof typeof formData.machinery];
    } else if (pathParts.length === 3) {
      const section = formData.machinery[
        pathParts[1] as keyof typeof formData.machinery
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
          machinery: {
            ...prev.machinery,
            [pathParts[1]]: dateString,
          },
        }));
      } else if (pathParts.length === 3) {
        setFormData(prev => ({
          ...prev,
          machinery: {
            ...prev.machinery,
            [pathParts[1]]: {
              ...prev.machinery[pathParts[1] as keyof typeof prev.machinery],
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
      return formData.machinery[
        pathParts[1] as keyof typeof formData.machinery
      ] as string;
    } else if (pathParts.length === 3) {
      const section = formData.machinery[
        pathParts[1] as keyof typeof formData.machinery
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
        <ScrollView style={styles.container} scrollEnabled={!selectedDateField}>
          {/* Common Fields */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
            {commonFields.map(({field, label, placeholder, numeric}) => (
              <View key={field} style={styles.fieldContainer}>
                <Text style={styles.label}>{label}</Text>
                {renderField(
                  {field, label, placeholder, numeric},
                  getFieldValue(field),
                  field,
                )}
              </View>
            ))}
          </View>

          {/* Machinery Fields */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin máy móc</Text>
            {machineryFields.map(
              ({field, label, placeholder, isDate, numeric}) => (
                <View key={field} style={styles.fieldContainer}>
                  <Text style={styles.label}>{label}</Text>
                  {renderField(
                    {field, label, placeholder, isDate, numeric},
                    getFieldValue(`machinery.${field}`),
                    `machinery.${field}`,
                  )}
                </View>
              ),
            )}
          </View>

          {/* Metadata Fields */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin bổ sung</Text>
            {machineryMetadataFields.map(({field, label, placeholder}) => (
              <View key={field} style={styles.fieldContainer}>
                <Text style={styles.label}>{label}</Text>
                {renderField(
                  {field, label, placeholder},
                  getFieldValue(`machinery.metadata.${field}`),
                  `machinery.metadata.${field}`,
                )}
              </View>
            ))}
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

export default FormMachineryFields;
