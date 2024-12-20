import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React, {useState} from 'react';

const LanguageSetting = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('vi');

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        {/* Heading */}

        <View style={styles.containHeading}>
          <TouchableOpacity
            style={styles.borderArrow}
            onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/images/arrow-left.png')} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>Ngôn ngữ</Text>
          </View>
          <TouchableOpacity style={[styles.borderArrow, styles.hidden]}>
            <Image
              source={require('../../assets/images/notification-icon.png')}
            />
          </TouchableOpacity>
        </View>

        {/* Body */}

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <View style={styles.form}>
              <View style={styles.optionContainer}>
                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() => setSelectedLanguage('vi')}>
                  <View style={[styles.radioCircle]}>
                    {selectedLanguage === 'vi' && (
                      <View style={styles.radioFill} />
                    )}
                  </View>
                  <Text style={styles.label}>Tiếng Việt</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() => setSelectedLanguage('en')}>
                  <View style={[styles.radioCircle]}>
                    {selectedLanguage === 'en' && (
                      <View style={styles.radioFill} />
                    )}
                  </View>
                  <Text style={styles.label}>English</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.btn}
                onPress={() =>
                  Alert.alert(
                    `${
                      selectedLanguage === 'vi' ? 'Thông báo' : 'Notification'
                    }`,
                    `${
                      selectedLanguage === 'vi'
                        ? 'Bạn đã chọn ngôn ngữ Tiếng Việt'
                        : 'You have selected English language.'
                    }`,
                  )
                }>
                <Text
                  style={[
                    styles.textWhite,
                    {fontWeight: 'bold', textAlign: 'center'},
                  ]}>
                  Xác nhận
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LanguageSetting;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    width: '100%',
    height: '100%',
  },

  containHeading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e1e2d',
  },
  borderArrow: {
    width: 42,
    height: 42,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  body: {
    marginTop: 16,
    paddingHorizontal: 20,
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

  btn: {
    width: '100%',
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },

  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },

  optionContainer: {
    flexDirection: 'column',
    marginBottom: 8,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    padding: 3,
  },
  radioFill: {
    width: '100%',
    height: '100%',
    backgroundColor: '#007BFF',
    borderRadius: 7,
  },

  radioSelected: {},
  label: {
    fontSize: 16,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: 'italic',
  },
});
