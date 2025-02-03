import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {fetchWorkflowStatus} from '../api/services/createLoan';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigators/RootNavigator';
import {useTheme} from '../context/ThemeContext';
import {WorkflowStepType} from '../api/types/loan';

// Add type for screen names
type ScreenName =
  | 'IntroduceLoan'
  | 'LoanRequest'
  | 'LoanPlan'
  | 'FinancialInfo'
  | 'CreditRating'
  | 'AssetCollateral';

// Define the step to screen mapping with proper types
const stepToScreenMap: Record<WorkflowStepType, ScreenName> = {
  init: 'IntroduceLoan',
  'create-loan-request': 'LoanRequest',
  'create-loan-plan': 'LoanPlan',
  'create-financial-info': 'FinancialInfo',
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
        const appId = '6ed5ada9-72dd-4a7a-a096-08a9071e613c';
        const response = await fetchWorkflowStatus(appId);
        console.log('response', response);

        if (response.code === 200) {
          const {currentSteps, prevSteps} = response.result;

          // If currentSteps is empty and init was completed, show IntroduceLoan
          if (currentSteps.length === 0 && prevSteps.includes('init')) {
            navigation.replace('IntroduceLoan');
            return;
          }

          // For other cases, use the first current step to determine screen
          const nextScreen =
            currentSteps.length > 0 && currentSteps[0] in stepToScreenMap
              ? stepToScreenMap[currentSteps[0] as WorkflowStepType]
              : 'IntroduceLoan';

          await AsyncStorage.setItem('currentStep', currentSteps[0] || 'init');
          navigation.replace(nextScreen);
        }
      } catch (error) {
        console.error('Error checking workflow status:', error);
        // In case of error, default to IntroduceLoan
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
      <Text style={styles.loadingText}>
        Đang kiểm tra...
      </Text>
    </View>
  );
};

export default LoadingWorkflowLoan;
