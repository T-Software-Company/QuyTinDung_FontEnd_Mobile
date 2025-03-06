import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Switch,
} from 'react-native';
import InputBackground from '../InputBackground/InputBackground';
import DatePicker from '../DatePicker/DatePicker';
import {formatDate} from '../../utils/dateUtils';
import {addAssetCollateral} from '../../api/services/loan';
import {
  marketStallFields,
  commonFields,
  marketStallMetadataFields,
} from './formFields';
import {createStyles} from './styles';
import {Theme} from '../../theme/colors';
import KeyboardWrapper from '../KeyboardWrapper/KeyboardWrapper';

interface FormMarketStallsFieldsProps {
  theme: Theme;
  appId: string;
  onSuccess: () => void;
}

const FormMarketStallsFields: React.FC<FormMarketStallsFieldsProps> = ({
  theme,
  appId,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    assetType: 'MARKET_STALLS',
    title: '',
    ownershipType: 'INDIVIDUAL',
    proposedValue: 0,
    documents: [],
    application: {id: appId},
    marketStalls: {
      stallName: '',
      ownerName: '',
      category: '',
      areaSize: 0,
      rentPrice: 0,
      rentStartDate: '',
      rentEndDate: '',
      location: '',
      contactNumber: '',
      isOccupied: false,
      note: '',
      metadata: {
        utilities: '',
        stallNumber: '',
        refrigeration: '',
        storageSpace: '',
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
      if (field.startsWith('marketStalls.')) {
        const marketField = field.split('.')[1];
        return {
          ...prev,
          marketStalls: {
            ...prev.marketStalls,
            [marketField]: value,
          },
        };
      }
      if (field.startsWith('marketStalls.metadata.')) {
        const metadataField = field.split('.')[2];
        return {
          ...prev,
          marketStalls: {
            ...prev.marketStalls,
            metadata: {
              ...prev.marketStalls.metadata,
              [metadataField]: value,
            },
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

  const renderField = (field: any, value: any, fieldPath: string) => {
    if (field.isDate) {
      const displayValue = value ? formatDate(new Date(value)) : '';
      return (
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setSelectedDateField(fieldPath)}>
          <Text
            style={
              displayValue ? styles.dateInputText : styles.dateInputPlaceholder
            }>
            {displayValue || field.placeholder}
          </Text>
        </TouchableOpacity>
      );
    }

    if (field.isBoolean) {
      return (
        <Switch
          value={value}
          onValueChange={value => handleChange(fieldPath, value)}
        />
      );
    }

    return (
      <InputBackground
        value={String(value || '')}
        onChangeText={value =>
          handleChange(fieldPath, field.numeric ? Number(value) : value)
        }
        placeholder={field.placeholder}
        keyboardType={field.numeric ? 'numeric' : 'default'}
      />
    );
  };

  const getFieldValue = (fieldPath: string): any => {
    const pathParts = fieldPath.split('.');
    if (pathParts.length === 2) {
      return formData.marketStalls[
        pathParts[1] as keyof typeof formData.marketStalls
      ];
    } else if (pathParts.length === 3) {
      return formData.marketStalls.metadata[
        pathParts[2] as keyof typeof formData.marketStalls.metadata
      ];
    }
    return formData[fieldPath as keyof typeof formData];
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

          {/* Market Stall Fields */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin gian hàng</Text>
            {marketStallFields.map(
              ({field, label, placeholder, isDate, numeric, isBoolean}) => (
                <View key={field} style={styles.fieldContainer}>
                  <Text style={styles.label}>{label}</Text>
                  {renderField(
                    {field, label, placeholder, isDate, numeric, isBoolean},
                    getFieldValue(`marketStalls.${field}`),
                    `marketStalls.${field}`,
                  )}
                </View>
              ),
            )}
          </View>

          {/* Metadata Fields */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin bổ sung</Text>
            {marketStallMetadataFields.map(({field, label, placeholder}) => (
              <View key={field} style={styles.fieldContainer}>
                <Text style={styles.label}>{label}</Text>
                {renderField(
                  {field, label, placeholder},
                  getFieldValue(`marketStalls.metadata.${field}`),
                  `marketStalls.metadata.${field}`,
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
            onConfirm={date => handleChange(selectedDateField, date)}
            value={tempDate}
            onChange={setTempDate}
            theme={theme}
            locale="vi-VN"
          />
        )}
      </View>
    </KeyboardWrapper>
  );
};

export default FormMarketStallsFields;
