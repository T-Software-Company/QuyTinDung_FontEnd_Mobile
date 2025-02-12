import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import Header from '../components/Header/Header';
import FormCreateLoanPlan from '../components/FormCreateLoanPlan/FormCreateLoanPlan';
import {useTheme} from '../context/ThemeContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigators/RootNavigator';
import {RouteProp} from '@react-navigation/native';

type CreateLoanPlanNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateLoanPlan'
>;

type CreateLoanPlanRouteProp = RouteProp<RootStackParamList, 'CreateLoanPlan'>;

interface CreateLoanPlanProps {
  navigation: CreateLoanPlanNavigationProp;
  route: CreateLoanPlanRouteProp;
}

const CreateLoanPlan: React.FC<CreateLoanPlanProps> = ({navigation, route}) => {
  const {theme} = useTheme();
  const {appId} = route.params;

  const styles = StyleSheet.create({
    view: {
      flex: 1,
    },
    container: {
      width: '100%',
      height: '100%',
    },
    body: {
      marginTop: 16,
      paddingHorizontal: 20,
    },
  });

  return (
    <SafeAreaView style={[styles.view, {backgroundColor: theme.background}]}>
      <View style={styles.container}>
        <Header Navbar="CreateLoanPlan" navigation={navigation} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <FormCreateLoanPlan theme={theme} navigation={navigation} appId={appId} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CreateLoanPlan;
