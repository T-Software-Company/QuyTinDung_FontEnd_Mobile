import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {fetchWorkflowStatus} from '../api/services/loan';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigators/RootNavigator';
import {useTheme} from '../context/ThemeContext';
import {StepName} from '../api/types/loanInit';
import {getApplication} from '../api/services/getApplicationsLoan';
import {getAccessToken} from '../../tokenStorage';

// Add type for screen names
type ScreenName =
  | 'IntroduceLoan'
  | 'CreateLoanRequest'
  | 'CreateLoanPlan'
  | 'CreateFinancialInfo'
  | 'CreditRating'
  | 'AssetCollateral'
  | 'InfoCreateLoan';

// Define the step to screen mapping with proper types
const stepToScreenMap: Record<StepName, ScreenName> = {
  init: 'IntroduceLoan',
  'create-loan-request': 'CreateLoanRequest',
  'create-loan-plan': 'CreateLoanPlan',
  'create-financial-info': 'CreateFinancialInfo',
  'create-credit-rating': 'CreditRating',
  'add-asset-collateral': 'AssetCollateral',
} as const;

type LoadingWorkflowLoanScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LoadingWorkflowLoan'
>;

interface LoadingWorkflowLoanProps {
  navigation: LoadingWorkflowLoanScreenNavigationProp;
}

const LoadingWorkflowLoan: React.FC<LoadingWorkflowLoanProps> = ({
  navigation,
}) => {
  const {theme} = useTheme();
  const user = useSelector((state: RootState) => state.user.userData);
  const sortScreen = [
    'CreateLoanRequest',
    'CreateLoanPlan',
    'CreateFinancialInfo',
    'AssetCollateral',
    'CreditRating',
  ];

  const findNextScreen = (
    prevSteps: string[],
    currentSteps: string[],
    nextSteps: string[],
  ): ScreenName => {
    // Check if all required steps are completed or in progress
    const allRequiredSteps = [
      'init',
      'create-loan-request',
      'create-loan-plan',
      'create-financial-info',
      'create-credit-rating',
      'add-asset-collateral',
    ];

    const completedAndInProgressSteps = [...prevSteps, ...currentSteps];
    const isAllRequiredStepsHandled = allRequiredSteps.every(step =>
      completedAndInProgressSteps.includes(step),
    );

    // If we have a current step that is in progress (add-asset-collateral in your example)
    if (currentSteps.length > 0) {
      const currentStep = currentSteps[0] as StepName;

      // If all required steps are either completed or in progress, show the InfoCreateLoan screen
      if (isAllRequiredStepsHandled) {
        return 'InfoCreateLoan';
      }

      // Otherwise navigate to the current step screen
      return stepToScreenMap[currentStep];
    }

    // If no current steps but we have not initialized yet
    if (!prevSteps.includes('init')) {
      return 'IntroduceLoan';
    }

    // Convert workflow steps to screen names
    const completedScreens = prevSteps.map(
      step => stepToScreenMap[step as StepName],
    );
    const nextScreens = nextSteps.map(
      step => stepToScreenMap[step as StepName],
    );

    // Find the first screen in sortScreen that hasn't been completed
    for (const screenName of sortScreen) {
      if (
        !completedScreens.includes(screenName as ScreenName) &&
        nextScreens.includes(screenName as ScreenName)
      ) {
        return screenName as ScreenName;
      }
    }

    return 'IntroduceLoan';
  };

  const navigateToScreen = (screen: ScreenName, appId: string) => {
    switch (screen) {
      case 'IntroduceLoan':
        navigation.replace('IntroduceLoan'); // No params for IntroduceLoan
        break;
      case 'CreateLoanRequest':
        navigation.replace('CreateLoanRequest', {appId});
        break;
      case 'CreateLoanPlan':
        navigation.replace('CreateLoanPlan', {appId});
        break;
      case 'CreateFinancialInfo':
        navigation.replace('CreateFinancialInfo', {appId});
        break;
      case 'CreditRating':
        navigation.replace('CreditRating', {appId});
        break;
      case 'AssetCollateral':
        navigation.replace('AssetCollateral', {appId});
        break;
      case 'InfoCreateLoan':
        navigation.replace('InfoCreateLoan', {appId});
        break;
    }
  };

  useEffect(() => {
    const checkWorkflowStatus = async (retryCount = 0) => {
      try {
        // Check for token first
        const token = await getAccessToken();
        if (!token) {
          console.log('No token found, redirecting to login');
          navigation.replace('Login');
          return;
        }

        // Check if user exists
        if (!user?.id) {
          console.log('No user found');
          navigation.replace('Login');
          return;
        }

        // Get application with retry
        const appId = await getApplication(user.id);
        if (!appId?.id) {
          if (retryCount < 1) {
            console.log('Application not found, retrying...');
            setTimeout(() => checkWorkflowStatus(retryCount + 1), 1000);
            return;
          }
          console.log('Application not found after retry');
          navigation.replace('IntroduceLoan');
          return;
        }

        // Fetch workflow status with retry
        const response = await fetchWorkflowStatus(appId.id);
        if (!response || response.code !== 200) {
          if (retryCount < 1) {
            console.log('Workflow status failed, retrying...');
            setTimeout(() => checkWorkflowStatus(retryCount + 1), 1000);
            return;
          }
          console.log('Workflow status failed after retry');
          navigation.replace('IntroduceLoan');
          return;
        }
        console.log('Workflow status:', response);

        const {prevSteps, currentSteps, nextSteps} = response.result;
        const nextScreen = findNextScreen(
          prevSteps || [],
          currentSteps || [],
          nextSteps || [],
        );

        if (currentSteps && currentSteps.length > 0) {
          await AsyncStorage.setItem('currentStep', currentSteps[0]);
        } else if (nextSteps && nextSteps.length > 0) {
          await AsyncStorage.setItem('currentStep', nextSteps[0] || 'init');
        }

        console.log('Navigating to:', nextScreen);
        navigateToScreen(nextScreen, appId.id);
      } catch (error) {
        if (retryCount < 1) {
          console.log('Error occurred, retrying...', error);
          setTimeout(() => checkWorkflowStatus(retryCount + 1), 1000);
          return;
        }
        console.log('Error occurred after retry:', error);
        navigation.replace('Login');
      }
    };

    checkWorkflowStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigation]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    loadingText: {
      marginTop: 12,
      color: theme.borderInputBackground,
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.borderInputBackground} />
      <Text style={styles.loadingText}>Đang lấy dữ liệu...</Text>
    </View>
  );
};

export default LoadingWorkflowLoan;
