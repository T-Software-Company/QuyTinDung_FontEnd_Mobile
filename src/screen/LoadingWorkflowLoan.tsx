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

const stepPriority = [
  'create-loan-request',
  'create-loan-plan',
  'create-financial-info',
  'create-credit-rating',
  'add-asset-collateral',
];

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
        const appId = '6ed5ada9-72dd-4a7a-a096-08a9071e613c';
        const response = await fetchWorkflowStatus(appId);
        console.log('response', response);

        if (response.code === 200) {
          const {nextSteps, prevSteps} = response.result;
          let nextScreen: ScreenName;

          // Case: prevSteps does not include 'init' -> go to IntroduceLoan
          if (!prevSteps.includes('init')) {
            nextScreen = 'IntroduceLoan';
          } else {
            // Sort currentSteps based on stepPriority
            const sortedSteps = nextSteps.sort(
              (a, b) => stepPriority.indexOf(a) - stepPriority.indexOf(b),
            );

            // Get the first step from sortedSteps as it represents the next active step
            const nextActiveStep = sortedSteps[0];
            if (nextActiveStep in stepToScreenMap) {
              nextScreen = stepToScreenMap[nextActiveStep as WorkflowStepType];
            } else {
              nextScreen = 'IntroduceLoan'; // Fallback
            }
          }

          await AsyncStorage.setItem('currentStep', nextSteps[0] || 'init');
          console.log('nextScreen', nextScreen);
          navigation.replace(nextScreen);
        }
      } catch (error) {
        console.log('Error checking workflow status:', error);
        console.error('Error checking workflow status:', error);
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
