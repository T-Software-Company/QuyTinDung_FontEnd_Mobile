import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/Header/Header';
import i18n from '../../i18n';
import {useTheme} from '../context/ThemeContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigators/RootNavigator';
import {RouteProp} from '@react-navigation/native';

type InfoLoanScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'InfoLoan'
>;
type InfoLoanScreenRouteProp = RouteProp<RootStackParamList, 'InfoLoan'>;

interface InfoLoanProps {
  navigation: InfoLoanScreenNavigationProp;
  route: InfoLoanScreenRouteProp;
}

interface Theme {
  background: string;
  headerShadow: string;
  tableChildBackground: string;
  tableHeaderBackground: string;
  tableBorderColor: string;
  text: string;
}

interface LoanDataItem {
  key: string;
  value: string;
}

const InfoLoan: React.FC<InfoLoanProps> = ({navigation}) => {
  const currentLanguage = i18n.language;
  const {theme} = useTheme() as {theme: Theme};

  const dataVietnam: LoanDataItem[] = [
    {key: 'Số hợp đồng', value: '123-456-789'},
    {key: 'Số tiền vay', value: '100.000.000 đ'},
    {key: 'Mục đích vay', value: 'Mua nhà'},

    {key: 'Kỳ hạn', value: '12 tháng'},
    {key: 'Lãi suất', value: '12%/năm'},

    {key: 'Chu kỳ trả gốc', value: '6 tháng'},
    {key: 'Chu kỳ trả lãi', value: '6 tháng'},

    {key: 'Ngày có hiệu lực', value: '22/04/2024'},
    {key: 'Ngày đến hạn', value: '22/10/2024'},
  ];

  const dataEnglish: LoanDataItem[] = [
    {key: 'Contract Number', value: '123-456-789'},
    {key: 'Loan Amount', value: '100,000,000 VND'},
    {key: 'Loan Purpose', value: 'Buying a house'},

    {key: 'Term', value: '12 months'},
    {key: 'Interest Rate', value: '12%/year'},

    {key: 'Principal Payment Cycle', value: '6 months'},
    {key: 'Interest Payment Cycle', value: '6 months'},

    {key: 'Effective Date', value: '22/04/2024'},
    {key: 'Maturity Date', value: '22/10/2024'},
  ];

  const data = currentLanguage === 'vi' ? dataVietnam : dataEnglish;

  const styles = StyleSheet.create({
    view: {
      flex: 1,
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

    boxList: {
      marginVertical: 12,
      backgroundColor: theme.tableChildBackground,
      borderRadius: 12,

      // Shadow for iOS
      shadowColor: theme.headerShadow, // Màu bóng
      shadowOffset: {width: 0, height: 2}, // Độ lệch bóng
      shadowOpacity: 0.2, // Độ trong suốt
      shadowRadius: 5, // Bán kính làm mờ bóng
      // Shadow for Android
      elevation: 5, // Mức độ nổi
      display: 'flex',
      flexDirection: 'column',
      height: 'auto',
    },

    boxWrap: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 12,
    },

    firstChild: {
      backgroundColor: theme.tableHeaderBackground,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    middleChild: {
      borderBottomColor: theme.tableBorderColor,
      borderBottomWidth: 1,
    },

    textKeyRow: {
      fontWeight: 'bold',
      color: theme.text,
    },
    textRow: {
      fontWeight: 'regular',
      color: theme.text,
    },

    hidden: {
      opacity: 0,
      pointerEvents: 'none',
    },
  });

  return (
    <SafeAreaView style={[styles.view, {backgroundColor: theme.background}]}>
      <View style={styles.container}>
        {/* Heading */}

        <Header Navbar="InfoLoan" navigation={navigation} />

        {/* Body */}

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <View>
              <View style={styles.boxList}>
                {data.map((box, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.boxWrap,
                      idx === 0 && styles.firstChild, // Áp dụng kiểu cho phần tử đầu tiên
                      idx > 0 && idx < data.length - 1 && styles.middleChild, // Phần tử giữa
                    ]}>
                    <Text
                      style={[
                        idx === 0 && styles.textKeyRow,
                        idx > 0 && idx < data.length && styles.textRow,
                      ]}>
                      {box.key}
                    </Text>
                    <Text
                      style={[
                        idx === 0 && styles.textKeyRow,
                        idx > 0 && idx < data.length && styles.textRow,
                      ]}>
                      {box.value}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default InfoLoan;
