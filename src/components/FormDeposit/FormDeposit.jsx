import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  Switch,
  Animated,
  Platform,
  // Clipboard,  // Add this import
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard'; // Add this import
import React, {useState, useRef} from 'react';
import DropdownComponent from '../DropdownComponent/DropdownComponent';
import InputBackground from '../InputBackground/InputBackground';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import icon FontAwesome
import {useTranslation} from 'react-i18next';
import i18n from '../../../i18n';
import {AppIcons} from '../../icons';

const FormDeposit = ({theme}) => {
  const currentLanguage = i18n.language;
  const {t} = useTranslation();

  const [value, setValue] = useState(null);
  const [isVisibleQR, setIsVisibleQR] = useState(false); // Trạng thái toggle
  const [isVisibleBank, setIsVisibleBank] = useState(true); // Trạng thái toggle
  const [selectedBank, setSelectedBank] = useState('TPBank'); // Add new state for active bank
  const [activeSection, setActiveSection] = useState('qr');

  const animation = useRef(new Animated.Value(0)).current; // Giá trị animation

  // Xử lý toggle nội dung và animation
  const toggleQRContent = () => {
    if (activeSection === 'qr') {
      setActiveSection(null);
      Animated.timing(animation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
    } else {
      setActiveSection('qr');
      Animated.timing(animation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  };

  const toggleBankContent = () => {
    if (activeSection === 'bank') {
      setActiveSection(null);
      Animated.timing(animation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
    } else {
      setActiveSection('bank');
      Animated.timing(animation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  };

  // Tính chiều cao của nội dung dựa trên animation
  const contentHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 'auto'], // Chiều cao nội dung trượt (100px)
  });

  const bankInfo = {
    TPBank: {
      accountNumber: {
        label: t('deposit.accountFields.accountNumber'),
        value: '888888888888',
        icon: true,
      },
      accountName: {
        label: t('deposit.accountFields.accountName'),
        value: 'Pham Minh Quang',
      },
      branch: {
        label: t('deposit.accountFields.branch'),
        value: 'TPBank Saigon',
      },
      desc: {
        label: t('deposit.accountFields.content'),
        value: 'Pham Minh Quang 99MC9999',
        icon: true,
      },
    },
    BIDV: {
      accountNumber: {
        label: t('deposit.accountFields.accountNumber'),
        value: '888888888888',
        icon: true,
      },
      accountName: {
        label: t('deposit.accountFields.accountName'),
        value: 'Pham Minh Quang',
      },
      branch: {
        label: t('deposit.accountFields.branch'),
        value: 'BIDV Saigon',
      },
      desc: {
        label: t('deposit.accountFields.content'),
        value: 'Pham Minh Quang 99MC9999',
        icon: true,
      },
    },
  };

  const handleCopy = text => {
    Clipboard.setString(text);
    Alert.alert(
      currentLanguage === 'vi' ? 'Thông báo' : 'Notification',
      currentLanguage === 'vi' ? 'Sao chép thành công!' : 'Copied successfully',
      [
        {
          text: 'OK',
          style: 'cancel',
        },
      ],
    );
  };

  const styles = StyleSheet.create({
    form: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },

    wrapFunction: {
      paddingHorizontal: 20,
      borderTopColor: '#bbb',
      borderTopWidth: 1,
      paddingBottom: 16,
    },
    hidden: {
      opacity: 0,
      pointerEvents: 'none',
    },

    icon: {
      tintColor: theme.iconColor,
    },

    toggleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderRadius: 5,
      paddingBottom: 12,
    },
    buttonText: {
      color: theme.text,
      fontSize: 16,
      fontWeight: 'bold',
    },

    content: {
      overflow: 'hidden', // Đảm bảo nội dung không tràn ra ngoài
      marginVertical: 0,
      width: '100%',
    },
    contentText: {
      color: theme.text,
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    wrapQr: {
      display: 'flex',
      backgroundColor: theme.backgroundBox,
      paddingHorizontal: 10, // Đệm ngang cho nội dung
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
      gap: 24,
      borderRadius: 8,
    },
    wrapImageQr: {
      width: 110,
      height: 110,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      backgroundColor: 'white',
      borderRadius: 8,
    },
    qr: {
      width: 100,
      height: 100,
      padding: Platform.OS === 'ios' ? 0 : 0,
      backgroundColor: 'white',
      resizeMode: 'contain',
      borderRadius: 8,
    },
    wrapDownload: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    iconDownload: {
      tintColor: theme.iconColor,
      width: 15,
      height: 15,
    },

    textDownload: {
      color: theme.text,
    },

    wrapTransfer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: 'orange',
      marginTop: 12,
      borderRadius: 8,
    },
    wrapQrText: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      gap: 6,
    },
    wrapTextTransfer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    textTitle: {
      fontSize: 12,
      color: theme.noteText,
    },
    compulsory: {
      color: 'red',
    },
    descTransfer: {
      fontSize: 14,
      color: theme.text,
      fontWeight: 'bold',
    },

    wrapTransferBank: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
    },

    noteTransfer: {
      fontSize: 12,
      color: theme.noteText,
      lineHeight: 18,
    },

    wrapBank: {
      display: 'flex',
      flexDirection: 'row',
      gap: 8,
      justifyContent: 'space-between',
    },

    borderBank: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      padding: 12,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      width: '48%',
      backgroundColor: theme.background,
    },
    activeBank: {
      borderColor: 'orange',
      borderWidth: 2,
    },

    iconBank: {
      width: 24,
      height: 24,
    },

    textBank: {
      color: theme.text,
    },

    wrapBankTransfer: {
      display: 'flex',
      backgroundColor: theme.backgroundBox,
      flexDirection: 'column',
      paddingHorizontal: 16, // Đệm ngang cho nội dung
      paddingVertical: 12,
      gap: 20,
      borderRadius: 8,
    },

    wrapField: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    wrapTitleBank: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    },
    titleBank: {
      fontSize: 12,
      color: theme.noteText,
    },
    descBank: {
      fontSize: 14,
      color: theme.text,
      fontWeight: 'bold',
    },
  });

  const BankField = ({label, value, icon}) => (
    <TouchableOpacity
      style={styles.wrapField}
      onPress={() => handleCopy(value)}>
      <View style={styles.wrapTitleBank}>
        <Text style={styles.titleBank}>{label}</Text>
        <Text style={styles.descBank}>{value}</Text>
      </View>
      {icon && (
        <View onPress={() => handleCopy(value)}>
          <Image style={styles.iconDownload} source={AppIcons.copy} />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.form}>
      <View style={styles.wrapFunction}>
        {/* Nút bấm để toggle */}
        <TouchableOpacity onPress={toggleQRContent} style={styles.toggleButton}>
          <Text style={styles.buttonText}>{t('deposit.scanQR')}</Text>
          {activeSection === 'qr' ? (
            <Image style={styles.icon} source={AppIcons.chevronUp} />
          ) : (
            <Image style={styles.icon} source={AppIcons.chevronDown} />
          )}
        </TouchableOpacity>

        {/* Nội dung có animation */}
        <Animated.View style={[styles.content, {height: contentHeight}]}>
          {activeSection === 'qr' && (
            <>
              <View style={styles.wrapQr}>
                <Text style={styles.contentText}>
                  Pham Minh Quang - 99MC9999
                </Text>
                <View style={styles.wrapImageQr}>
                  <Image style={styles.qr} source={AppIcons.qr} />
                </View>
                <TouchableOpacity style={styles.wrapDownload}>
                  <Image
                    style={styles.iconDownload}
                    source={AppIcons.downLoad}
                  />
                  <Text style={styles.textDownload}>
                    {t('deposit.downloadQR')}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.wrapTransfer}
                onPress={() => handleCopy('Pham Minh Quang 99MC9999')}>
                <View style={styles.wrapQrText}>
                  <View style={styles.wrapTextTransfer}>
                    <Text style={styles.textTitle}>
                      {t('deposit.transferContent')}
                    </Text>
                    <Text style={[styles.textTitle, styles.compulsory]}>
                      {t('deposit.required')}
                    </Text>
                  </View>
                  <Text style={styles.descTransfer}>
                    Pham Minh Quang 99MC9999
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleCopy('Pham Minh Quang 99MC9999')}>
                  <Image style={styles.iconDownload} source={AppIcons.copy} />
                </TouchableOpacity>
              </TouchableOpacity>
            </>
          )}
        </Animated.View>
      </View>

      <View style={styles.wrapFunction}>
        {/* Nút bấm để toggle */}
        <TouchableOpacity
          onPress={toggleBankContent}
          style={styles.toggleButton}>
          <Text style={styles.buttonText}>{t('deposit.transferFromBank')}</Text>
          {activeSection === 'bank' ? (
            <Image style={styles.icon} source={AppIcons.chevronUp} />
          ) : (
            <Image style={styles.icon} source={AppIcons.chevronDown} />
          )}
        </TouchableOpacity>

        {/* Nội dung có animation */}
        <Animated.View style={[styles.content, {height: contentHeight}]}>
          {activeSection === 'bank' && (
            <View style={styles.wrapTransferBank}>
              <Text style={styles.noteTransfer}>
                {t('deposit.transferNote')}
              </Text>

              <View style={styles.wrapBank}>
                <TouchableOpacity
                  style={[
                    styles.borderBank,
                    selectedBank === 'TPBank' && styles.activeBank,
                  ]}
                  onPress={() => setSelectedBank('TPBank')}>
                  <Image style={styles.iconBank} source={AppIcons.tpBank} />
                  <Text style={styles.textBank}>TPBank</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.borderBank,
                    selectedBank === 'BIDV' && styles.activeBank,
                  ]}
                  onPress={() => setSelectedBank('BIDV')}>
                  <Image style={styles.iconBank} source={AppIcons.tpBIDV} />
                  <Text style={styles.textBank}>BIDV</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.wrapBankTransfer}>
                {Object.values(bankInfo[selectedBank]).map((field, index) => (
                  <BankField
                    key={index}
                    label={field.label}
                    value={field.value}
                    icon={field.icon}
                  />
                ))}
              </View>
            </View>
          )}
        </Animated.View>
      </View>
    </View>
  );
};

export default FormDeposit;
