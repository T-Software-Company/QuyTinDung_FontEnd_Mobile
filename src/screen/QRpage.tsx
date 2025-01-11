import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Button,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import Header from '../components/Header/Header';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next'; // Add missing import

interface FormDataAddress {
  [key: string]: any;
}

interface FormDataUser {
  [key: string]: any;
}

type RootStackParamList = {
  QrScreen: {
    formDataAddress: FormDataAddress;
    formDataUser: FormDataUser;
  };
  ResultQR: {
    formDataAddress: FormDataAddress;
    formDataUser: FormDataUser;
    qrData: string[];
  };
};

type QRNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'QrScreen'
>;


interface Code {
  value?: string;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const scanAreaSize = SCREEN_WIDTH * 0.7; // Scanner area is 70% of screen width

const QRScannerApp: React.FC = () => {
  const {t} = useTranslation(); // Add missing translation hook
  const navigation = useNavigation<QRNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'QrScreen'>>();
  const {formDataAddress, formDataUser} = route.params; // Lấy formData từ NotificationScan

  console.log('QR Screen formData:', formDataAddress); // Debug log

  const [lastScannedCode, setLastScannedCode] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const [isCameraActive, setIsCameraActive] = useState<boolean>(true);

  useEffect(() => {
    checkPermission();

    // Thêm focus listener
    const unsubscribe = navigation.addListener('focus', () => {
      setIsCameraActive(true);
      setIsScanning(true);
    });

    return () => {
      setIsCameraActive(false);
      unsubscribe(); // Cleanup listener khi unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const checkPermission = async () => {
    try {
      await requestPermission();
    } catch (error) {
      Alert.alert('Error', 'Failed to request camera permission');
    }
  };

  const isDuplicateCode = (code: string) => {
    return lastScannedCode === code;
  };

  const formatDate = (dateStr: string) => {
    // Xử lý chuỗi 8 ký tự dạng "DDMMYYYY"
    if (dateStr.length === 8) {
      const day = dateStr.substring(0, 2);
      const month = dateStr.substring(2, 4);
      const year = dateStr.substring(4, 8);
      return `${day}/${month}/${year}`;
    }

    // Xử lý chuỗi 6 ký tự dạng "DDMMYY"
    if (dateStr.length === 6) {
      const day = dateStr.substring(0, 2);
      const month = dateStr.substring(2, 4);
      const year = '20' + dateStr.substring(4, 6);
      return `${day}/${month}/${year}`;
    }

    return dateStr; // Trả về nguyên gốc nếu không match format nào
  };

  const processQRData = (rawData: string) => {
    // Bước 1: Chuẩn hóa data gốc
    let cleanData = rawData.trim();
    // Bước 2: Loại bỏ dấu {} nếu có
    cleanData = cleanData.replace(/^{|}$/g, '');
    // Bước 3: Split và xử lý từng phần tử
    const dataArray = cleanData
      .split('|')
      // eslint-disable-next-line semi
      .map(item => item.trim()); // loại bỏ khoảng trắng đầu cuối
    // .filter(item => item !== ''); // loại bỏ phần tử rỗng

    console.log('QR Data Array:', dataArray); // Debug log
    // Format lại date ở index 2 (ngày sinh) và 5 (ngày cấp)
    if (dataArray.length > 6) {
      dataArray[3] = formatDate(dataArray[3]);
      dataArray[6] = formatDate(dataArray[6]);
    }

    return dataArray;
  };

  const handleCodeScanned = (codes: Code[]) => {
    // eslint-disable-next-line curly
    if (!isScanning || codes.length === 0) return;

    const currentCode = codes[0].value ?? '';
    // eslint-disable-next-line curly
    if (isDuplicateCode(currentCode)) return; // Fix: Use isDuplicateCode function

    try {
      const qrData = processQRData(currentCode);
      setLastScannedCode(currentCode); // Fix: Update last scanned code
      setIsScanning(false);
      setIsCameraActive(false); // Deactivate camera before navigation

      // console.log('Navigating to ResultQR with:', {formData, qrData}); // Debug log

      navigation.navigate('ResultQR', {
        formDataUser: formDataUser,
        formDataAddress: formDataAddress,
        qrData: qrData,
      });
    } catch (error) {
      console.error('Scanning error:', error);
      Alert.alert('Error', 'Failed to process QR code');
    }
  };

  // Handle cases where camera is not available
  if (device == null) {
    return (
      <SafeAreaView>
        <Text style={styles.centerText}>
          {t('register.camera.notAvailable')}
        </Text>
      </SafeAreaView>
    );
  }

  if (!hasPermission) {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.centerText}>
            {t('register.camera.permissionRequired')}
          </Text>
          <Button
            title={t('register.camera.requestPermission')}
            onPress={checkPermission}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isCameraActive}
        codeScanner={{
          codeTypes: ['qr'],
          onCodeScanned: handleCodeScanned,
        }}
      />
      <Header Navbar="ScanQR" navigation={navigation} />

      {/* Overlay with blurred background and clear center */}
      <View style={styles.overlay}>
        {/* Top blur */}
        <View style={styles.overlaySection} />

        <View style={styles.centerRow}>
          {/* Left blur */}
          <View style={styles.overlaySection} />

          {/* Clear scanner area */}
          <View style={styles.scannerArea}>
            <View style={styles.cornerTL} />
            <View style={styles.cornerTR} />
            <View style={styles.cornerBL} />
            <View style={styles.cornerBR} />
          </View>

          {/* Right blur */}
          <View style={styles.overlaySection} />
        </View>

        {/* Bottom blur */}
        <View style={styles.overlaySection} />
      </View>

      <Text style={styles.instructionText}>
        {t('register.scanScreen.instruction')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // zIndex: 2
  },
  view: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 1,
  },
  camera: {
    flex: 1,
  },
  centerText: {
    fontSize: 18,
    padding: 16,
    textAlign: 'center',
    color: '#777',
  },
  dataContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dataText: {
    fontSize: 14,
    color: '#444',
    marginLeft: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  overlaySection: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  centerRow: {
    flexDirection: 'row',
    height: scanAreaSize,
  },
  scannerArea: {
    width: scanAreaSize,
    height: scanAreaSize,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  cornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderColor: '#FFF',
  },
  cornerTR: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderColor: '#FFF',
  },
  cornerBL: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#FFF',
  },
  cornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#FFF',
  },
  instructionText: {
    fontSize: 18,
    padding: 16,
    textAlign: 'center',
    color: '#FFF',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingBottom: 50,
  },
});

export default QRScannerApp;
