import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import Header from '../components/Header/Header';
import SelectedTabs from '../components/SelectedTabs/SelectedTabs';
import {AppIcons} from '../icons';
import {useTheme} from '../context/ThemeContext';
import i18n from '../../i18n';

import {RootStackParamList} from '../navigators/RootNavigator';

type InfoPersonScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'InfoPerson'
>;

interface InfoPersonProps {
  navigation: InfoPersonScreenNavigationProp;
}

interface TabItem {
  key: string;
  label: string;
}

interface PersonInfo {
  id: number;
  name: string;
  nameFund: string;
  phone: string;
  address: string;
  email: string;
  sex: string;
  birthday: string;
  idcccd: string;
  startDayCccd: string;
  expireDayCccd: string;
  placeCccd: string;
  addressCccd: string;
}

const InfoPerson: React.FC<InfoPersonProps> = ({navigation}) => {
  const currentLanguage = i18n.language;
  const {t} = useTranslation();
  const [number, setNumber] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'info' | 'paper'>('info');
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const {theme} = useTheme();

  const tabs: TabItem[] = [
    {key: 'info', label: (t('info.infoContact') as string).toUpperCase()},
    {key: 'paper', label: (t('info.identityDocument') as string).toUpperCase()},
  ];

  const infoPerson: PersonInfo = {
    id: 1,
    name: 'Nguyễn Văn A',
    nameFund: 'Quỹ TDND Thành Đức',
    phone: '0912345678',
    address: 'Phước Long B, TP. Thủ Đức, TP. Hồ Chí Minh',
    email: 'abcd@gmail.com',
    sex: 'Nam',
    birthday: '01/07/1999',
    idcccd: '0123456789',
    startDayCccd: '22/07/2020',
    expireDayCccd: '22/07/2024',
    placeCccd: 'Cục trưởng cục cảnh sát',
    addressCccd: 'Thôn 7, Huyện Nam Hà, Tỉnh Hà Nam',
  };

  const handleSubmit = (): void => {
    Alert.alert(
      currentLanguage === 'vi' ? 'Thông báo' : 'Notification',
      currentLanguage === 'vi' ? 'Cập nhật thành công' : 'Update successfully',
    );
    setIsEditable(false);
  };

  const styles = StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: 'white',
    },
    container: {
      width: '100%',
      height: '100%',
    },

    body: {
      marginTop: 16,
      paddingHorizontal: 20,
    },
    boxAvatar: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    avatar: {
      width: 100,
      height: 100,
      resizeMode: 'cover',
      borderRadius: 9999,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 24,
    },
    nameTitle: {
      marginTop: 4,
      fontSize: 14,
      color: '#aaa',
    },

    textWhite: {
      color: 'white',
    },
    textPrimary: {
      color: '#007BFF',
    },
    iconPrimary: {
      tintColor: '#007BFF',
    },

    boxInput: {
      marginBottom: 12,
    },

    headingTitle: {
      fontWeight: 'bold',
      fontSize: 12,
      marginBottom: 8,
      color: theme.text,
    },
    textInput: {
      backgroundColor: theme.backgroundBox,
      borderRadius: 8,
      height: 40,
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 10,
      paddingBottom: 10,
      color: '#888',
      paddingVertical: 0,
      textAlignVertical: 'center',
    },
    textEdit: {
      color: theme.text,
    },

    placeholderStyle: {
      color: '#aaa',
      fontSize: 14,
    },

    selectedTextStyle: {
      color: '#000',
      fontSize: 14,
    },

    wrapBtn: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },

    btn: {
      // flex: '1',
      width: '48%',
      padding: 12,
      borderRadius: 12,
      marginTop: 8,
    },

    btnPrimary: {
      backgroundColor: '#007BFF',
    },

    btnNormal: {
      backgroundColor: '#ddd',
    },
  });

  return (
    <SafeAreaView style={[styles.view, {backgroundColor: theme.background}]}>
      <View style={styles.container}>
        {/* Heading */}

        <Header Navbar="InfoPerson" navigation={navigation} />

        {/* Body */}

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <View>
              <View style={styles.boxAvatar}>
                <Image style={styles.avatar} source={AppIcons.avatar} />
                <Text style={[styles.name, {color: theme.text}]}>
                  Nguyễn Văn A
                </Text>
                <Text style={styles.nameTitle}>Quỹ TDND Châu Đức</Text>
              </View>

              {/* Tabs bar */}
              <SelectedTabs
                tabs={tabs}
                selectedTab={selectedTab}
                onSelectTab={(key: string) =>
                  setSelectedTab(key as 'info' | 'paper')
                }
                theme={theme}
              />

              {selectedTab === 'info' ? (
                <View>
                  <View style={styles.boxInput}>
                    <Text style={styles.headingTitle}>{t('info.phone')}</Text>
                    <TextInput
                      placeholder="Nhập số điện thoại của bạn"
                      placeholderTextColor="#aaa"
                      keyboardType="numeric"
                      onChangeText={setNumber}
                      value={infoPerson?.phone}
                      style={[
                        styles.textInput,
                        isEditable ? styles.textEdit : '',
                      ]}
                      editable={isEditable} // Chỉ cho phép focus khi `isEditable` là true
                    />
                  </View>

                  <View style={styles.boxInput}>
                    <Text style={styles.headingTitle}>{t('info.email')}</Text>
                    <TextInput
                      placeholder="Nhập email của bạn"
                      placeholderTextColor="#aaa"
                      keyboardType="email-address"
                      onChangeText={setNumber}
                      value={infoPerson?.email}
                      style={[
                        styles.textInput,
                        isEditable ? styles.textEdit : '',
                      ]}
                      editable={isEditable} // Chỉ cho phép focus khi `isEditable` là true
                    />
                  </View>

                  <View style={styles.boxInput}>
                    <Text style={styles.headingTitle}>{t('info.gender')}</Text>
                    <TextInput
                      placeholder="Chọn giới tính của bạn"
                      placeholderTextColor="#aaa"
                      onChangeText={setNumber}
                      value={infoPerson?.sex}
                      style={[
                        styles.textInput,
                        isEditable ? styles.textEdit : '',
                      ]}
                      editable={isEditable} // Chỉ cho phép focus khi `isEditable` là true
                    />
                  </View>

                  <View style={styles.boxInput}>
                    <Text style={styles.headingTitle}>
                      {t('info.dateOfBirth')}
                    </Text>
                    <TextInput
                      placeholder="Chọn ngày sinh của bạn"
                      placeholderTextColor="#aaa"
                      onChangeText={setNumber}
                      value={infoPerson?.birthday}
                      style={[
                        styles.textInput,
                        isEditable ? styles.textEdit : '',
                      ]}
                      editable={isEditable} // Chỉ cho phép focus khi `isEditable` là true
                    />
                  </View>

                  <View style={styles.boxInput}>
                    <Text style={styles.headingTitle}>{t('info.address')}</Text>
                    <TextInput
                      placeholder="Nhập địa chỉ hiện tại"
                      placeholderTextColor="#aaa"
                      keyboardType="numeric"
                      onChangeText={setNumber}
                      value={infoPerson?.address}
                      style={[
                        styles.textInput,
                        isEditable ? styles.textEdit : '',
                      ]}
                      editable={isEditable} // Chỉ cho phép focus khi `isEditable` là true
                    />
                  </View>
                </View>
              ) : (
                <View>
                  <View style={styles.boxInput}>
                    <Text style={styles.headingTitle}>
                      {t('info.identityNumber')}
                    </Text>
                    <TextInput
                      placeholder="Nhập số CCCD"
                      placeholderTextColor="#aaa"
                      keyboardType="numeric"
                      onChangeText={setNumber}
                      value={infoPerson?.idcccd}
                      style={[
                        styles.textInput,
                        isEditable ? styles.textEdit : '',
                      ]}
                      editable={isEditable} // Chỉ cho phép focus khi `isEditable` là true
                    />
                  </View>

                  <View style={styles.boxInput}>
                    <Text style={styles.headingTitle}>
                      {t('info.identityAddress')}
                    </Text>
                    <TextInput
                      placeholder="Nhập nơi cấp CCCD"
                      placeholderTextColor="#aaa"
                      onChangeText={setNumber}
                      value={infoPerson?.placeCccd}
                      style={[
                        styles.textInput,
                        isEditable ? styles.textEdit : '',
                      ]}
                      editable={isEditable} // Chỉ cho phép focus khi `isEditable` là true
                    />
                  </View>

                  <View style={styles.boxInput}>
                    <Text style={styles.headingTitle}>
                      {t('info.identitySupplyDay')}
                    </Text>
                    <TextInput
                      placeholder="Chọn ngày cấp CCCD"
                      placeholderTextColor="#aaa"
                      onChangeText={setNumber}
                      value={infoPerson?.startDayCccd}
                      style={[
                        styles.textInput,
                        isEditable ? styles.textEdit : '',
                      ]}
                      editable={isEditable} // Chỉ cho phép focus khi `isEditable` là true
                    />
                  </View>

                  <View style={styles.boxInput}>
                    <Text style={styles.headingTitle}>
                      {t('info.identityDueDay')}
                    </Text>
                    <TextInput
                      placeholder="Chọn ngày hết hạn CCCD"
                      placeholderTextColor="#aaa"
                      onChangeText={setNumber}
                      value={infoPerson?.expireDayCccd}
                      style={[
                        styles.textInput,
                        isEditable ? styles.textEdit : '',
                      ]}
                      editable={isEditable} // Chỉ cho phép focus khi `isEditable` là true
                    />
                  </View>

                  <View style={styles.boxInput}>
                    <Text style={styles.headingTitle}>
                      {t('info.identityHome')}
                    </Text>
                    <TextInput
                      placeholder="Nhập địa chỉ thường trú của bạn"
                      placeholderTextColor="#aaa"
                      onChangeText={setNumber}
                      value={infoPerson?.addressCccd}
                      style={[
                        styles.textInput,
                        isEditable ? styles.textEdit : '',
                      ]}
                      editable={isEditable} // Chỉ cho phép focus khi `isEditable` là true
                    />
                  </View>
                </View>
              )}
              <View style={styles.wrapBtn}>
                <TouchableOpacity
                  style={[styles.btn, styles.btnNormal]}
                  onPress={() => setIsEditable(true)}>
                  <Text
                    style={[
                      styles.textWhite,
                      {fontWeight: 'bold', textAlign: 'center', color: '#000'},
                    ]}>
                    {t('info.edit')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btn, styles.btnPrimary]}
                  onPress={handleSubmit}>
                  <Text
                    style={[
                      styles.textWhite,
                      {fontWeight: 'bold', textAlign: 'center'},
                    ]}>
                    {t('info.update')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default InfoPerson;
