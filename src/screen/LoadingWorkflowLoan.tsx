import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {fetchWorkflowStatus} from '../api/services/createLoan';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigators/RootNavigator';
import {useTheme} from '../context/ThemeContext';
import {WorkflowStepType} from '../api/types/loanInit';

// Add type for screen names
type ScreenName =
  | 'IntroduceLoan'
  | 'CreateLoanRequest'
  | 'CreateLoanPlan'
  | 'CreateFinancialInfo'
  | 'CreditRating'
  | 'AssetCollateral';

// Define the step to screen mapping with proper types
const stepToScreenMap: Record<WorkflowStepType, ScreenName> = {
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
  console.log('user', user);

  useEffect(() => {
    const checkWorkflowStatus = async () => {
      try {
        const appId = '2923a721-f018-40aa-a60e-0d911873f168';
        const response = await fetchWorkflowStatus(appId);
        console.log('response', response);

        if (response.code === 200) {
          const {currentSteps, prevSteps} = response.result;
          let nextScreen: ScreenName;

          // Case 1: prevSteps includes 'init' -> go to CreateLoanRequest
          if (prevSteps.includes('init')) {
            nextScreen = 'CreateLoanRequest';
          }
          // Case 2: Empty currentSteps or empty prevSteps without init -> go to IntroduceLoan
          else if (
            currentSteps.length === 0 ||
            (prevSteps.length === 0 && !prevSteps.includes('init'))
          ) {
            nextScreen = 'IntroduceLoan';
          }
          // Case 3: Check for the first step in currentSteps
          else {
            // Get the first step from currentSteps as it represents the current active step
            const currentActiveStep = currentSteps[0];
            if (currentActiveStep in stepToScreenMap) {
              nextScreen =
                stepToScreenMap[currentActiveStep as WorkflowStepType];
            } else {
              nextScreen = 'IntroduceLoan'; // Fallback
            }
          }

          await AsyncStorage.setItem('currentStep', currentSteps[0] || 'init');
          console.log('nextScreen', nextScreen);
          navigation.replace(nextScreen);
        }
      } catch (error) {
        console.log('Error checking workflow status:', error);
        navigation.replace('IntroduceLoan');
      }
    };

    checkWorkflowStatus();
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
      color: theme.text,
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.text} />
      <Text style={styles.loadingText}>Đang kiểm tra...</Text>
    </View>
  );
};

export default LoadingWorkflowLoan;
