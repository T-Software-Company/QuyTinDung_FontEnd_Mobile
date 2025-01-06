import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {AppIcons} from '../icons';
import {useTheme} from '../context/ThemeContext';
import FieldInputLogin from '../components/FieldInputLogin/FieldInputLogin';
import {useTranslation} from 'react-i18next';
import Header from '../components/Header/Header';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RegisterAddress = ({navigation, route}) => {
  // Get formData from Register screen
  const previousFormData = route.params?.formData || {};

  const [formData, setFormData] = useState({
    ...previousFormData, // Merge previous data
    country: 'Việt Nam',
    cityProvince: 'Hà Nội',
    district: 'Cầu Giấy',
    wardOrCommune: 'Dịch Vọng',
    streetAddress: 'Số 1, Phố Dịch Vọng',
  });
  const {theme} = useTheme();
  const {t} = useTranslation();

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const {country, cityProvince, district, wardOrCommune, streetAddress} = formData;

    if (!country || !cityProvince || !district || !wardOrCommune || !streetAddress) {
      Alert.alert(t('notification.title'), 'Vui lòng điền đầy đủ thông tin địa chỉ');
      return;
    }

    // Pass complete formData to next screen
    navigation.navigate('NotificationScan', {
      formData: {
        ...previousFormData,
        country,
        cityProvince, 
        district,
        wardOrCommune,
        streetAddress
      }
    });
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
    },
    body: {
      paddingTop: 8,
      marginTop: 12,
      paddingHorizontal: 20,
      paddingBottom: 8,
    },
    button: {
      backgroundColor: theme.buttonSubmit,
      padding: 20,
      alignItems: 'center',
      borderRadius: 16,
      marginHorizontal: 20,
      marginBottom: 16,
    },
    title: {
      color: theme.text,
      fontSize: 32,
      lineHeight: 32,
      marginBottom: 38,
    },

    textButton: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
    },
  });

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        <Header Navbar="ConfirmInfo" navigation={navigation} />

        <ScrollView style={styles.body}>
          <View>
            <FieldInputLogin
              name="Quốc gia"
              iconSource={AppIcons.location}
              placeholder="Nhập quốc gia"
              onSetValue={value => handleChange('country', value)}
              value={formData.country}
              theme={theme}
            />

            <FieldInputLogin
              name="Tỉnh/Thành phố"
              iconSource={AppIcons.location}
              placeholder="Nhập tỉnh/thành phố"
              onSetValue={value => handleChange('cityProvince', value)}
              value={formData.cityProvince}
              theme={theme}
            />

            <FieldInputLogin
              name="Quận/Huyện"
              iconSource={AppIcons.location}
              placeholder="Nhập quận/huyện"
              onSetValue={value => handleChange('district', value)}
              value={formData.district}
              theme={theme}
            />

            <FieldInputLogin
              name="Phường/Xã"
              iconSource={AppIcons.location}
              placeholder="Nhập phường/xã"
              onSetValue={value => handleChange('wardOrCommune', value)}
              value={formData.wardOrCommune}
              theme={theme}
            />

            <FieldInputLogin
              name="Nhập số nhà, tên đường"
              iconSource={AppIcons.location}
              placeholder="Nhập số nhà, tên đường"
              onSetValue={value => handleChange('streetAddress', value)}
              value={formData.streetAddress}
              theme={theme}
            />
          </View>
        </ScrollView>

        <View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.textButton}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterAddress;
