/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Header from '../components/Header/Header';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../context/ThemeContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigators/RootNavigator';

type DarkModeSettingNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DarkModeSetting'
>;

interface DarkModeSettingProps {
  navigation: DarkModeSettingNavigationProp;
}

interface OptionProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}

const DarkModeSetting: React.FC<DarkModeSettingProps> = ({navigation}) => {
  const {t} = useTranslation();
  const {isDarkMode, toggleTheme, theme} = useTheme();

  const Option: React.FC<OptionProps> = ({title, isSelected, onPress}) => (
    <TouchableOpacity
      style={[styles.option, isSelected && styles.selectedOption]}
      onPress={onPress}>
      <Text style={[styles.optionText, isSelected && styles.selectedText]}>
        {title}
      </Text>
      {isSelected && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
    },
    optionsContainer: {
      padding: 20,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
      backgroundColor: isDarkMode ? '#222' : '#f5f5f5',
    },
    selectedOption: {
      backgroundColor: isDarkMode ? '#333' : '#e8f0fe',
    },
    optionText: {
      fontSize: 16,
      color: theme.text,
    },
    selectedText: {
      color: '#1a73e8',
    },
    checkmark: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#1a73e8',
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkmarkText: {
      color: '#fff',
      fontSize: 14,
    },
  });

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        <Header Navbar="DarkModeSetting" navigation={navigation} />

        <View style={styles.optionsContainer}>
          <Option
            title={t('screen.light')}
            isSelected={!isDarkMode}
            onPress={toggleTheme}
          />
          <Option
            title={t('screen.dark')}
            isSelected={isDarkMode}
            onPress={toggleTheme}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DarkModeSetting;
