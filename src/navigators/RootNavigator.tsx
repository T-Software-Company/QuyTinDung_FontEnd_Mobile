/* eslint-disable react/react-in-jsx-scope */
import {Text, View, Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {AppIcons} from '../icons';
import {useTheme} from '../context/ThemeContext';

// Import all screens
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
import RegisterAddressScreen from '../screen/RegisterAddress';

export type RootStackParamList = {
  HomeTabs: undefined;
  Login: undefined;
  Register: undefined;
  RegisterAddress: undefined;
  ForgetPassword: undefined;
  QrScreen: undefined;
  ResultQR: undefined;
  NotificationScan: undefined;
  InfoSave: undefined;
  InfoLoan: undefined;
  InfoPerson: undefined;
  Deposit: undefined;
  Transfer: undefined;
  SentSave: undefined;
  CreateLoan: undefined;
  LanguageSetting: undefined;
  DarkModeSetting: undefined;
  ChangePassword: undefined;
  Notification: undefined;
};

export type TabParamList = {
  [key: string]: undefined; // Allow dynamic tab names from translations
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const MyTabs: React.FC = () => {
  const {t} = useTranslation();
  const {theme} = useTheme();

  const getTabIcon = (routeName: string) => {
    switch (routeName) {
      case 'Home':
        return AppIcons.home;
      case 'Save':
        return AppIcons.save;
      case 'Loan':
        return AppIcons.loan;
      case 'Rate':
        return AppIcons.rate;
      case 'Setting':
        return AppIcons.settings;
      default:
        return AppIcons.home;
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused}) => {
          const iconSource = getTabIcon(route.name);

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
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    color: focused ? theme.iconColorActive : theme.iconColor,
                    fontSize: 10,
                  },
                ]}>
                {t(`navbar.${route.name.toLowerCase()}`)}
              </Text>
            </View>
          );
        },
        tabBarStyle: {
          height: 75,
          paddingBottom: 20,
          paddingTop: 15,
          backgroundColor: theme.tabBarBackground,
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Save" component={SaveScreen} />
      <Tab.Screen name="Loan" component={LoanScreen} />
      <Tab.Screen name="Rate" component={RateScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
};

const RootComponent: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeTabs" component={MyTabs} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="RegisterAddress"
          component={RegisterAddressScreen}
        />
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
            ...TransitionPresets.ModalSlideFromBottomIOS,
            gestureDirection: 'vertical',
            cardStyleInterpolator: ({
              current,
              layouts,
            }: {
              current: any;
              layouts: any;
            }) => ({
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0],
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

export default RootComponent;
