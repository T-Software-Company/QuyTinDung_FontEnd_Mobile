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
import {vehicleFields, vehicleMetadataFields, commonFields} from './formFields';
import {createStyles} from './styles';
import {Theme} from '../../theme/colors';
import KeyboardWrapper from '../KeyboardWrapper/KeyboardWrapper';

interface FormVehicleFieldsProps {
  theme: Theme;
  appId: string;
  onSuccess: () => void;
}

const FormVehicleFields: React.FC<FormVehicleFieldsProps> = ({
  theme,
  appId,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDateField, setSelectedDateField] = useState<string | null>(
    null,
  );
  const [tempDate, setTempDate] = useState(new Date());
  const [formData, setFormData] = useState({
    assetType: 'VEHICLE',
    title: '',
    ownershipType: 'INDIVIDUAL',
    proposedValue: 0,
    documents: [],
    application: {id: appId},
    vehicle: {
      model: '',
      ownerName: '',
      address: '',
      engineNumber: '',
      chassisNumber: '',
      brand: '',
      modelNumber: '',
      vehicleType: '',
      engineCapacity: 0,
      color: '',
      loadCapacity: '',
      seatCapacity: 0,
      registrationExpiryDate: '',
      licensePlateNumber: '',
      firstRegistrationDate: '',
      issueDate: '',
      registrationCertificateNumber: '',
      note: '',
      kilometersDriven: 0,
      inspectionCertificateNumber: '',
      metadata: {
        fuelType: '',
        transmission: '',
        lastService: '',
        warranty: '',
      },
    },
  });

  const styles = createStyles(theme);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => {
      if (field.startsWith('vehicle.metadata.')) {
        const metadataField = field.split('.')[2];
        return {
          ...prev,
          vehicle: {
            ...prev.vehicle,
            metadata: {
              ...prev.vehicle.metadata,
              [metadataField]: value,
            },
          },
        };
      }
      if (field.startsWith('vehicle.')) {
        const vehicleField = field.split('.')[1];
        return {
          ...prev,
          vehicle: {
            ...prev.vehicle,
            [vehicleField]: value,
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
        formData.vehicle[pathParts[1] as keyof typeof formData.vehicle];
    } else if (pathParts.length === 3) {
      const section = formData.vehicle[
        pathParts[1] as keyof typeof formData.vehicle
      ] as any;
      currentValue = section[pathParts[2]];
    }

    setTempDate(currentValue ? new Date(currentValue) : new Date());
    setSelectedDateField(fieldPath);
  };

  const handleDateConfirm = (dateString: string) => {
    if (selectedDateField) {
      handleChange(selectedDateField, dateString);
      setSelectedDateField(null);
    }
  };

  const handleDateChange = (date: Date) => {
    setTempDate(date);
  };

  const validateNumericInput = (value: string): string => {
    // Remove any non-numeric characters except dots for decimal numbers
    const cleanedValue = value.replace(/[^0-9.]/g, '');

    // Ensure only one decimal point
    const parts = cleanedValue.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts[1];
    }

    return cleanedValue;
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
        onChangeText={value => {
          if (field.numeric) {
            const validatedValue = validateNumericInput(value);
            handleChange(
              fieldPath,
              validatedValue ? Number(validatedValue) : 0,
            );
          } else {
            handleChange(fieldPath, value);
          }
        }}
        placeholder={field.placeholder}
        keyboardType={field.numeric ? 'decimal-pad' : 'default'}
      />
    );
  };

  return (
    <KeyboardWrapper>
      <View style={[styles.wrapper, {minHeight: '100%'}]}>
        <ScrollView style={styles.container} scrollEnabled={!selectedDateField}>
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

          {/* Vehicle Fields */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin xe</Text>
            {vehicleFields.map(
              ({field, label, placeholder, numeric, isDate}) => (
                <View key={field} style={styles.fieldContainer}>
                  <Text style={styles.label}>{label}</Text>
                  {renderField(
                    {field, label, placeholder, numeric, isDate},
                    getInputValue(
                      formData.vehicle[field as keyof typeof formData.vehicle],
                    ),
                    `vehicle.${field}`,
                  )}
                </View>
              ),
            )}
          </View>

          {/* Vehicle Metadata */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin bổ sung</Text>
            {vehicleMetadataFields.map(
              ({field, label, placeholder, isDate}) => (
                <View key={field} style={styles.fieldContainer}>
                  <Text style={styles.label}>{label}</Text>
                  {renderField(
                    {field, label, placeholder, isDate},
                    getInputValue(formData.vehicle.metadata[field]),
                    `vehicle.metadata.${field}`,
                  )}
                </View>
              ),
            )}
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

export default FormVehicleFields;
