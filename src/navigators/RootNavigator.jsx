import {Text, View, SafeAreaView, Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TransitionPresets} from '@react-navigation/stack';
import HomeScreen from '../screen/Home';
import SettingScreen from '../screen/Setting';
import LoanScreen from '../screen/Loan';
import SaveScreen from '../screen/Save';
import RateScreen from '../screen/Rate';
import InfoSaveScreen from '../screen/InfoSave';
import InfoLoanScreen from '../screen/InfoLoan';
import SentSaveScreen from '../screen/SentSave';
import DepositScreen from '../screen/Deposit';
import TransferScreen from '../screen/Transfer';
import CreateLoanScreen from '../screen/CreateLoan';
import NotificationScreen from '../screen/Notification';
import InfoPersonScreen from '../screen/InfoPerson';
import LanguageSettingScreen from '../screen/LanguageSetting';
import DarkModeSettingScreen from '../screen/DarkModeSetting';
import ChangePasswordScreen from '../screen/ChangePassword';
import QRScannerApp from '../screen/QRpage';
import ResultQRApp from '../screen/ResultQR';
import NotificationScanScreen from '../screen/NotificationScan';

import LoginScreen from '../screen/Login';
import ForgetPasswordScreen from '../screen/ForgetPassword';
import RegisterScreen from '../screen/Register';

import Footer from '../components/Footer/Footer';
import {useTranslation} from 'react-i18next';
import {AppIcons} from '../icons';
import {useTheme} from '../context/ThemeContext';

const Tab = createBottomTabNavigator();
// const RootStack = createStackNavigator<RootStackParams>();
const MyTabs = () => {
  const {t} = useTranslation();
  const {theme} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({focused}) => {
          let iconSource;

          // Gán biểu tượng tùy vào tên route
          switch (route.name) {
            case t('navbar.home'):
              iconSource = AppIcons.home;
              break;
            case t('navbar.save'):
              iconSource = AppIcons.save;
              break;
            case t('navbar.loan'):
              iconSource = AppIcons.loan;
              break;
            case t('navbar.rate'):
              iconSource = AppIcons.rate;
              break;
            case t('navbar.setting'):
              iconSource = AppIcons.settings;
              break;
            default:
              break;
          }

          return (
            <View style={styles.tabIconContainer}>
              <Image
                source={iconSource}
                style={[
                  styles.icon,
                  {
                    tintColor: focused
                      ? theme.iconColorActive
                      : theme.iconColor,
                  },
                ]}
              />
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: focused ? theme.iconColorActive : theme.iconColor,
                    fontSize: 10,
                  },
                ]}>
                {route.name}
              </Text>
            </View>
          );
        },
        tabBarStyle: {
          height: 75, // Tăng chiều cao thanh điều hướng
          paddingBottom: 20,
          paddingTop: 15,
          backgroundColor: theme.tabBarBackground,
        },
      })}>
      <Tab.Screen
        name={t('navbar.home')}
        value="Trang chủ"
        component={HomeScreen}
      />
      <Tab.Screen
        name={t('navbar.save')}
        value="Tiết kiệm"
        component={SaveScreen}
      />
      <Tab.Screen
        name={t('navbar.loan')}
        value="Khoản vay"
        component={LoanScreen}
      />
      <Tab.Screen
        name={t('navbar.rate')}
        value="Lãi suất"
        component={RateScreen}
      />
      <Tab.Screen
        name={t('navbar.setting')}
        value="Cài đặt"
        component={SettingScreen}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

export default RootComponent = function () {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeTabs" component={MyTabs} />

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        <Stack.Screen name="QrScreen" component={QRScannerApp} />
        <Stack.Screen name="ResultQR" component={ResultQRApp} />
        <Stack.Screen
          name="NotificationScan"
          component={NotificationScanScreen}
        />

        <Stack.Screen name="InfoSave" component={InfoSaveScreen} />
        <Stack.Screen name="InfoLoan" component={InfoLoanScreen} />
        <Stack.Screen name="InfoPerson" component={InfoPersonScreen} />
        <Stack.Screen name="Deposit" component={DepositScreen} />
        <Stack.Screen name="Transfer" component={TransferScreen} />
        <Stack.Screen name="SentSave" component={SentSaveScreen} />
        <Stack.Screen name="CreateLoan" component={CreateLoanScreen} />
        <Stack.Screen
          name="LanguageSetting"
          component={LanguageSettingScreen}
        />
        <Stack.Screen
          name="DarkModeSetting"
          component={DarkModeSettingScreen}
        />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />

        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            ...TransitionPresets.ModalSlideFromBottomIOS, // Hiệu ứng chỉ áp dụng cho ScreenA
            gestureDirection: 'vertical',
            cardStyleInterpolator: ({current, layouts}) => ({
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0], // Từ dưới lên
                    }),
                  },
                ],
              },
            }),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});
