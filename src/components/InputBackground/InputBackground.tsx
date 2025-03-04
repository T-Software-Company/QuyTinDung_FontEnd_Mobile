import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../context/ThemeContext';

interface InputBackgroundProps extends Omit<TextInputProps, 'onChangeText'> {
  value?: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: TextInputProps['keyboardType'];
}

const InputBackground: React.FC<InputBackgroundProps> = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  ...props
}) => {
  // Convert undefined/null to empty string to avoid uncontrolled input warning
  const inputValue = value ?? '';
  const {theme} = useTheme(); // Add type assertion here

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.inputBackground,
      borderRadius: 8,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.borderInputBackground,
    },
    input: {
      height: 40,
      paddingHorizontal: 15,
      fontSize: 14,
      color: '#000',
      width: '100%',
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#999"
        onChangeText={onChangeText}
        value={inputValue}
        style={styles.input}
        keyboardType={keyboardType}
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
      />
    </View>
  );
};

export default InputBackground;
