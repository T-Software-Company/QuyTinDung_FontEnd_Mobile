import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Button,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header/Header';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const scanAreaSize = SCREEN_WIDTH * 0.7; // Scanner area is 70% of screen width

const QRScannerApp = () => {
  const navigation = useNavigation();
  const [scannedItems, setScannedItems] = useState([]);
  const [lastScannedCode, setLastScannedCode] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    try {
      await requestPermission();
    } catch (error) {
      Alert.alert('Error', 'Failed to request camera permission');
    }
  };

  const isDuplicateCode = (code) => {
    return lastScannedCode === code;
  };

  const processQRData = (rawData) => {
    // Bước 1: Chuẩn hóa data gốc
    let cleanData = rawData.trim();
    // Bước 2: Loại bỏ dấu {} nếu có
    cleanData = cleanData.replace(/^{|}$/g, '');
    // Bước 3: Split và xử lý từng phần tử
    return cleanData
      .split('|')
      .map(item => item.trim()) // loại bỏ khoảng trắng đầu cuối
      .filter(item => item !== ''); // loại bỏ phần tử rỗng
  };

  const handleCodeScanned = codes => {
    if (!isScanning || codes.length === 0) return;

    console.log('Scanned codes:', codes);
    const currentCode = codes[0].value;
    console.log(currentCode)
    
    if (currentCode === lastScannedCode) return;

    try {
      const processedData = processQRData(currentCode);
      setIsScanning(false);
      navigation.navigate('ResultQR', { qrData: processedData });
      
      setTimeout(() => {
        setIsScanning(true);
      }, 2000);

    } catch (error) {
      console.error('Scanning error:', error);
      Alert.alert('Error', 'Failed to process QR code');
    }
  };

  // Handle cases where camera is not available
  if (device == null) {
    return (
      <SafeAreaView>
        <Text style={styles.centerText}>Camera not available</Text>
      </SafeAreaView>
    );
  }

  if (!hasPermission) {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.centerText}>Camera permission is required</Text>
          <Button title="Request Permission" onPress={checkPermission} />
        </View>
      </SafeAreaView>
    );
  }

  console.log('Scanned items:', scannedItems);
  return (
    <View style={styles.container}>
      
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
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
          Đưa mã QR trên CCCD vào khung ảnh
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
    paddingBottom: 50
  },
});

export default QRScannerApp;
